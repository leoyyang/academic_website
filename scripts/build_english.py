#!/usr/bin/env python3
"""Build English Hugo output into the independent public checkout, without deleting files.

Chinese pages are retained unless --include-chinese is given. Deployment
configuration and independently collected tracker data are always retained. This command does not stage, commit, or push either repo.
"""
from pathlib import Path
import argparse
import filecmp
import json
import re
import os
import shutil
import subprocess
import tempfile

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / 'public'
SKIP_TOP = {'zh', '.git', '.github', 'admin', '_headers', '_redirects', 'CNAME', 'netlify.toml'}

def is_protected(relative):
    return relative.parts[0] in SKIP_TOP or relative.as_posix().startswith('job-tracker/data/')

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--baseline', type=Path, help='A prior Hugo build. Preserve existing public files whose generated content has not changed since that build.')
    parser.add_argument('--dry-run', action='store_true', help='Build and list changes without updating public.')
    parser.add_argument('--manifest', type=Path, help='Write the list of copied paths to a JSON file outside public.')
    parser.add_argument('--include-chinese', action='store_true', help='Also synchronize generated Chinese pages, keeping content from content/zh.')
    args = parser.parse_args()
    if args.include_chinese:
        SKIP_TOP.discard('zh')
    for checkout in [ROOT, PUBLIC]:
        actual = subprocess.check_output(['git', '-C', str(checkout), 'rev-parse', '--show-toplevel'], text=True).strip()
        if Path(actual).resolve() != checkout.resolve():
            raise SystemExit(f'{checkout} must be its own Git checkout.')
    before = {str(p.relative_to(PUBLIC)): (p.stat().st_size, p.stat().st_mtime_ns)
              for p in PUBLIC.rglob('*') if p.is_file() and is_protected(p.relative_to(PUBLIC)) and '.git' not in p.relative_to(PUBLIC).parts}
    with tempfile.TemporaryDirectory(prefix='leoyang-english-') as folder:
        build = Path(folder)
        subprocess.run(['hugo', '--destination', str(build), '--minify', '--buildFuture'], cwd=ROOT, check=True)
        changes = []
        for source in sorted(build.rglob('*')):
            if not source.is_file():
                continue
            relative = source.relative_to(build)
            if is_protected(relative):
                continue
            destination = PUBLIC / relative
            if destination.exists() and args.baseline:
                previous = args.baseline / relative
                if previous.is_file() and filecmp.cmp(source, previous, shallow=False):
                    continue
            if destination.exists():
                info = destination.stat()
                # Content-addressed Hugo resources can be compared by their
                # immutable name and size, without hydrating Dropbox placeholders.
                fingerprinted = re.search(r'(?:[._])[0-9a-f]{32,64}(?:[._])|_hu[0-9a-f]{32}', destination.name)
                if fingerprinted and source.stat().st_size == info.st_size:
                    continue
                dataless = bool(getattr(info, 'st_flags', 0) & 0x40000000)
                if not dataless and filecmp.cmp(source, destination, shallow=False):
                    continue
            changes.append(relative.as_posix())
            if not args.dry_run:
                destination.parent.mkdir(parents=True, exist_ok=True)
                # Write beside the destination and replace atomically. This
                # avoids reading cloud-only copies before writing fresh output.
                with tempfile.NamedTemporaryFile(dir=destination.parent, prefix='.hugo-', delete=False) as handle:
                    temporary = Path(handle.name)
                try:
                    shutil.copy2(source, temporary)
                    os.replace(temporary, destination)
                finally:
                    temporary.unlink(missing_ok=True)
        for relative, metadata in before.items():
            current = PUBLIC / relative
            if not current.exists() or (current.stat().st_size, current.stat().st_mtime_ns) != metadata:
                raise RuntimeError(f'Protected file changed unexpectedly: {relative}')
        if args.manifest:
            args.manifest.parent.mkdir(parents=True, exist_ok=True)
            args.manifest.write_text(json.dumps(changes, indent=2) + '\n')
        print(f'{"Would update" if args.dry_run else "Updated"} {len(changes)} files in the public repository.')
        print(f'Preserved {len(before)} protected files. No files deleted; no Git commits or pushes made.')

if __name__ == '__main__':
    main()
