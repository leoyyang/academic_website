# Focused software previews

Built by `python3 scripts/build_tool_previews.py` using Pillow and reviewed screenshots. These are editorial feature overviews, not full-page screenshots or recordings of benchmark runs.

- `reproai-detail.gif`: two focused crops from the public reproai.org usage/example sections, showing commands and an illustrative wrong-dataset advisory. The footer explicitly says “Workflow example”. No execution results are fabricated.
- `tracker-detail.gif`: counts and common-baseline index views of the same existing July–August 2026 observations, captured from the actual local tracker in its light theme. Both crops retain the complete axes and legend in a fixed frame. No table or scrolling transition is included; no observations were changed.
- `gazetteer-detail.png`: a static feature overview using the documented 3,000+ county gazetteers count, advertised functions and a crop of the site's Chinese masthead. No login controls, player icon, or purported authenticated results appear.

The three compositions share a 640×360 canvas, aligned headings, content area and captions. GIFs are encoded at 512×288 with a common 96-color palette: 3.6-second holds and 300 ms dissolves, 7.8-second loops. Both GIFs together are 306,323 bytes. The old, less readable GIFs totaled 230,482 bytes; this revision prioritizes legibility and a less abrupt transition over that earlier size saving.

Static 640px feature posters are used when the browser requests reduced motion. Preview images remain lazy-loaded and clicking goes directly to the relevant website. There are no video players or modal dialogs.

Reviewed full screenshots are preserved in `detail-sources/`. Gazetteer's original screenshot is `gazetteer.png`. The earlier `frames/`, plain `*.gif` files and temporary MP4 drafts are historical inputs, not referenced by the new templates.
