#!/usr/bin/env python3
"""Compose compact website previews from reviewed, real screenshots (Pillow)."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageOps

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'assets/media/software/previews'
SRC = OUT / 'detail-sources'
BG = '#f7f6f3'
INK = '#292426'
MUTED = '#696461'
ACCENT = '#984c48'
FONT = Path('/System/Library/Fonts/Supplemental')

def font(size, bold=False):
    return ImageFont.truetype(str(FONT / ('Arial Bold.ttf' if bold else 'Arial.ttf')), size)

def canvas(title, stage, note):
    im = Image.new('RGB', (640, 360), BG)
    d = ImageDraw.Draw(im)
    d.text((26, 24), title, fill=INK, font=font(28, True))
    d.line((26, 70, 614, 70), fill='#dedbd5', width=1)
    d.text((26, 323), stage, fill=ACCENT, font=font(17, True))
    d.text((614, 323), note, fill=MUTED, font=font(16), anchor='ra')
    return im

def panel(im, path, box, bounds):
    crop = Image.open(path).convert('RGB').crop(box)
    crop = ImageOps.contain(crop, (bounds[2]-bounds[0], bounds[3]-bounds[1]), Image.Resampling.LANCZOS)
    im.paste(crop, (bounds[0] + (bounds[2]-bounds[0]-crop.width)//2,
                    bounds[1] + (bounds[3]-bounds[1]-crop.height)//2))

def save(name, stages):
    stages[0].save(OUT / f'{name}-detail.png', optimize=True)
    if len(stages) == 1:
        return
    # One shared palette prevents the stationary frame from changing color.
    stages = [im.resize((512, 288), Image.Resampling.LANCZOS) for im in stages]
    atlas = Image.new('RGB', (512, 288*len(stages)))
    for i, stage in enumerate(stages): atlas.paste(stage, (0, i*288))
    palette = atlas.quantize(colors=96, method=Image.Quantize.MEDIANCUT)
    frames, durations = [], []
    for i, stage in enumerate(stages):
        frames.append(stage.quantize(palette=palette, dither=Image.Dither.NONE)); durations.append(3600)
        following = stages[(i+1) % len(stages)]
        for alpha in (.33, .66):
            frames.append(Image.blend(stage, following, alpha).quantize(palette=palette, dither=Image.Dither.NONE))
            durations.append(150)
    frames[0].save(OUT / f'{name}-detail.gif', save_all=True, append_images=frames[1:],
                   duration=durations, loop=0, optimize=True, disposal=1)

repro = []
for file, box, stage in [
    ('reproai-usage.jpg', (133, 336, 604, 509), '01 / CHECK THE PACKAGE'),
    ('reproai-examples.jpg', (128, 290, 615, 441), '02 / REVIEW AN ISSUE'),
]:
    im = canvas('Prepare a reproducible package', stage, 'Workflow example')
    ImageDraw.Draw(im).rounded_rectangle((24, 91, 616, 303), radius=8, fill='#ffffff', outline='#e3e0da')
    panel(im, SRC/file, box, (36, 98, 604, 298))
    repro.append(im)
save('reproai', repro)

tracker = []
for file, stage in [('tracker-counts.jpg','OBSERVED POSTINGS'),('tracker-index.jpg','INDEX / BASELINE = 100')]:
    im = canvas('Compare job-posting trends', stage, 'Jul–Aug 2026')
    panel(im, SRC/file, (99, 174, 1167, 571), (20, 84, 620, 310))
    tracker.append(im)
save('tracker', tracker)

gaz = canvas("Explore China's local records", 'FULL TEXT · TABLES · AI RESEARCH', 'Database overview')
d = ImageDraw.Draw(gaz)
d.text((320, 103), '3,000+', fill=ACCENT, font=font(66), anchor='ma')
d.text((320, 178), 'county gazetteers', fill=INK, font=font(27), anchor='ma')
panel(gaz, OUT/'gazetteer.png', (384, 144, 884, 185), (62, 241, 578, 285))
save('gazetteer', [gaz])

for name in ['reproai', 'tracker', 'gazetteer']:
    p = OUT / f'{name}-detail.{"png" if name == "gazetteer" else "gif"}'
    print(f'{p.name}: {p.stat().st_size:,} bytes')
