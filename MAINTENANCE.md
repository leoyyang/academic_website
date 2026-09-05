# Source and publication repositories

This directory and `public/` are two separate Git repositories:

| Directory | Repository | Purpose |
| --- | --- | --- |
| Project root | `leoyyang/academic_website` | Hugo content, templates, styles and scripts |
| `public/` | `leoyyang/leoyyang.github.io` | Published site, tracker data and its update workflow |

`public/` is registered as a submodule in the source repository, with its own checkout and history. Run Git commands against each repository explicitly. Existing staged and unstaged changes must be reviewed separately; building does not commit either repository or update its submodule pointer.

## Build the English site

```sh
node scripts/test_tracker.cjs
python3 scripts/build_english.py --dry-run
python3 scripts/build_english.py
```

The helper builds to a temporary directory first. It copies generated English pages and their assets into `public/`, retaining existing files rather than deleting old assets that the Chinese pages may still reference. It preserves `public/zh/`, `public/.github/`, tracker data, CMS files, CNAME and deployment configuration. It never stages, commits or pushes. For a presentation-only update with a saved pre-change Hugo build, pass `--baseline /path/to/prior-build` to retain existing published files whose generated content has not changed (including independently edited media and citations).

Do not run `hugo --cleanDestinationDir` against `public/` or replace the entire folder with a clean output directory: that can remove its independently maintained data and deployment files. A plain full Hugo build also rewrites Chinese pages; use the helper to preserve the publication repository safeguards.

For a preview with the independently maintained tracker data present:

```sh
python3 -m http.server 8765 --bind 127.0.0.1 --directory public
```

## Where to edit

- English homepage sections: `content/en/home/` and `layouts/partials/blocks/v1/research-*.html` / `academic-about.html`.
- Research entries: `content/en/publication/`. Homepage entries retain `featured: true` and all appear; each original abstract is available in a native disclosure control. `summary` is the short description used in the full archive and on detail pages.
- Shared English/Chinese styling and interaction: `assets/scss/english.scss`, its `editorial.scss` presentation layer and English-only `polish.scss` refinements, and `assets/js/english.js`.
- Tracker display: `content/en/job-tracker/index.md`, `layouts/page/job-tracker.html`, `assets/js/tracker*.js`.
- Tracker observations: **`public/job-tracker/data/job-data.json`**, maintained by the publishing repository's existing `.github/` workflow. Do not copy stale source snapshots over this file.

The homepage uses Newsreader display type and Manrope reading/UI type, bundled under `static/fonts/english/` with their SIL Open Font Licences. Research is grouped by year with two columns on desktop and one on mobile; all homepage papers remain visible by default. Software uses a three-item grid with one prominent tile, insights use article images specified by `preview_image` or text covers specified by `preview_stat`, and talks have separate upcoming/recent treatments. Accent and surface tokens support both themes.

Homepage paper cards use equal column widths and stretch to the tallest paper in each row, with no global minimum height. Within a collapsed desktop pair, shorter metadata leaves only the space needed to align resource controls. Published venues are highlighted by `.paper-journal`; working papers remain neutral. Open abstracts and audio panels grow naturally. Single papers retain the regular column width, including after filtering.

All desktop pairs share heading, resource, Abstract, and Listen rows via CSS subgrid on desktop while collapsed. Shorter metadata leaves space before resources, and wrapped resource buttons still preserve disclosure alignment. When any disclosure opens, the group switches to independent card heights; closing all disclosures restores alignment. On mobile, cards use natural vertical flow. English homepage author/venue text is 14px and resource controls are 13px; archive headings, filters, and resource controls share the homepage styling.

Data Insights includes all English posts in a native horizontal scroll-snap track: three articles per desktop view, one with a next-card preview on mobile. Images use a shared 160px desktop / 144px mobile content area; `short_title`, `deck`, `preview_image`, and `preview_alt` control compact previews. Optional `preview_crop: [x, y, width, height]` uses original-image pixel coordinates to display a chart region through CSS, without modifying the source image. Retain all plotted data and tick labels; preserve aspect ratio when fitting the crop within its frame. The full original remains in the article. Optional `preview_stat` provides `kicker`, `value`, `label`, and `note` for a readable text cover; each number must be supported by the article body. Mouse dragging, previous/next controls, and keyboard arrows enhance native touch/trackpad scrolling; keyboard navigation is immediate, pointer navigation may scroll smoothly, and there is no automatic rotation. Upcoming and Recent talks share compact padding and date/title columns, with city and country taken from each event's existing address fields. Only Upcoming adds the highlighted surface.

English motion is scoped to the introduction, short interaction feedback, and one-time software/image entrances. Text stays visible without JavaScript. CSS and JavaScript both respect `prefers-reduced-motion`; running Web Animations cancel when that preference changes or the tab becomes hidden. Pointer-operated Abstract and Listen disclosures animate their height for 220ms and settle to their intended state when interrupted by resizing, a hidden tab, or reduced-motion changes. Keyboard disclosures and anchor navigation are immediate; pointer anchor navigation may scroll smoothly. Narrow English layouts provide 44px resource and disclosure targets. Resource buttons retain each entry’s original icon metadata, with sensible defaults for standard links.

The tracker page is now generated by Hugo instead of hand-maintained in `public/job-tracker/index.html`. Its data schema remains unchanged. `Data through` derives only from the four displayed platform series; page-load time is not a collection timestamp. Empty ranges and missing observations remain distinct from zero. Chart.js 4.4.7 is vendored under `assets/js/vendor/`; its bundled MIT licence notice is retained.

Before publishing, review `git diff` and `git -C public diff` separately, then commit the intended files in each repository. Publishing is a distinct step from this local build.

## Chinese structure

Chinese pages now share the English navigation, visual tokens, paper components, resource icons, native abstract disclosures, themes, and motion. `assets/scss/chinese.scss` adapts CJK typography. The Chinese introduction uses `academic-about-zh.html` to render the existing author biography, interests, education and social links; it does not replace them with English content. The Chinese talks component retains existing event times and custom links. The two current Chinese papers appear side by side on desktop, with their year labels, and stack on mobile. No English posts or events are inserted into Chinese content.

To explicitly update both languages:

```sh
python3 scripts/build_english.py --include-chinese
```

The default command still preserves `public/zh/`. The opt-in flag copies Chinese generated pages too, while retaining `.git`, `.github`, deployment configuration and tracker data. For selective presentation updates, combine it with `--baseline`. Content edits continue to belong in `content/zh/`; structural changes belong in shared templates or the Chinese presentation overrides.
