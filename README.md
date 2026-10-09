# DawLunix site

Static showcase for DawLunix. GitHub Pages serves this repository from the `main` branch, at the site root:

https://a6gitti.github.io/dawlunix-site/

There is no build step and no framework. Open `index.html` in a browser to preview it.

## Edit the text

All of the visible copy is in `index.html`. Sections are marked with HTML comments:

- `HEADER`
- `HERO`
- `VISION`
- `FEATURES` (each feature is its own `article`)
- `SCREENSHOTS`
- `DOWNLOAD`
- `FOOTER`

Change the words inside the tags. Leave the comments in place so the next edit is easy to find.

The tagline on the page is the paragraph with `class="tagline"`. Other lines to try are listed in the comment at the top of `index.html`:

1. Made by a beat maker, for beat makers. (this is the one on the page)
2. A Linux DAW that stays out of the way of the beat.
3. Sequence, sample, and bounce without leaving Linux.
4. Native on Linux, built for the next loop.

## Edit the images

Pictures live in `images/`. The page refers to them with relative paths.

| File | Where it shows |
| --- | --- |
| `images/logo.png` | Header mark and the hero. Also the source for the favicon. |
| `favicon.ico`, `images/favicon-32.png`, `images/apple-touch-icon.png` | Browser icon. |
| `images/screenshot-playlist.png` | Arrangement: drums, piano roll, playlist tracks. |
| `images/screenshot-piano-roll.png` | Piano roll. |
| `images/screenshot-mixer.png` | Mixer. |
| `images/screenshot-dsynth.png` | dSynth window. |

To swap a screenshot, replace the file or point the `src` at a new one. Update the `alt` text in `index.html` so it still describes the picture. The `width` and `height` attributes should match the new file.

## Fonts

`fonts/` holds Liberation Sans and Liberation Mono. That is the sans-serif DawLunix uses on Linux when Verdana is not installed. `fonts/LICENSE.txt` is the font license. `css/style.css` loads the files with `@font-face`. Colours in that file follow the app: background `#121212`, panels `#1a1a1a`, accent `#00ff66`.

## How GitHub Pages deploys

1. Commit on `main`.
2. Push to this repository, `a6gitti/dawlunix-site`.
3. In the repository settings, Pages should use the `main` branch and the root folder (`/`).
4. The site is then served at https://a6gitti.github.io/dawlunix-site/

Links and images are relative (`css/style.css`, `images/...`), which is what that project URL needs. `.nojekyll` is in the root so Pages publishes the files as they are, without a Jekyll build.

There is no JavaScript. The text you edit in `index.html` is the text on the page.
