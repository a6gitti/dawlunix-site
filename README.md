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
- `FOOTER` (includes the yabridge credit)

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

The only script is `js/stars.js`. It fills in the star count on the hero link. The words in `index.html` are the rest of the page.

## Star count

The hero link “Star on GitHub” goes to https://github.com/a6gitti/dawlunix-site. Starring needs a GitHub login. `js/stars.js` reads `stargazers_count` from https://api.github.com/repos/a6gitti/dawlunix-site and shows that integer beside the label.

A successful response is kept in `localStorage` (or `sessionStorage` if local storage is blocked) for 10 minutes, so a refresh in that window does not call the API again. If the request fails, is rate-limited, or does not contain an integer count, the link stays “Star on GitHub” and no number is shown.

## Download counts

Download totals are not on the site.

GitHub’s release `download_count` is public through the API to anyone who queries it. “Private” here means only that the number is not shown on the page.

With the GitHub CLI logged in, from this repository:

```
./scripts/downloads.sh
```

Or the same query as one line. Each line is the tag, the `.deb` name, and `download_count`. The last line is the total.

```
gh api --paginate repos/a6gitti/dawlunix-site/releases --jq '.[] | .tag_name as $t | .assets[] | select(.name|endswith(".deb")) | "\($t) \(.name) \(.download_count)"' | awk '{print} {s+=$NF} END {print "total", s+0}'
```

A count only you can read needs a counter you host. Point the download button at that URL. It adds one in a private store, then redirects to the release file. A small program on a machine you control, or a free function host, is enough. This repository does not do that, and the page does not show a download total.

## Publish a package

The Ubuntu package is a GitHub Release on this repository. It is not committed into the site tree. DawLunix source stays in its private repository and is never added here.

The current pre-release is tag `v1.0.0-beta3`:

- Package: https://github.com/a6gitti/dawlunix-site/releases/download/v1.0.0-beta3/dawlunix_1.0.0-beta3_amd64.deb (18,043,542 bytes)
- Release: https://github.com/a6gitti/dawlunix-site/releases/tag/v1.0.0-beta3

`v1.0.0-beta2` and `v1.0.0-beta1` are still published. This release's only asset is the `.deb`. The sha256 is in the release notes and on the download section.

The package version inside the `.deb` is `1.0.0~beta3`. The hosted filename is `dawlunix_1.0.0-beta3_amd64.deb`. A `~` in a release asset name is not kept (GitHub stores it as `.`), so use a hyphen in the uploaded name. The install commands on the page use that filename. `sudo apt remove dawlunix` does not, because that is the package name.

sha256 of this package: `6b6988ef4e54b7898e28fc1ce178e0ac8b2dd5c2571b62cfeb7b6612a89a46ef`

### A later release

1. Build the `.deb` outside this repository.
2. If the version contains `~`, copy the file to a hyphenated name before upload.
3. Write `SHA256SUMS.txt` in `sha256sum` form: the hash, two spaces, then the hosted filename. Check it with `sha256sum -c SHA256SUMS.txt`.
4. Publish the release. `--prerelease` marks a beta. Leave it off for a stable release. This creates the tag if it does not exist yet.

```
gh release create v1.0.0-beta4 --repo a6gitti/dawlunix-site --prerelease \
  --title "DawLunix 1.0.0 beta 4" \
  --notes "Pre-release package for Ubuntu 22.04 and 24.04 (amd64)." \
  dawlunix_1.0.0-beta4_amd64.deb SHA256SUMS.txt
```

5. In `index.html`, update the download section: the button label, the asset URL, the sha256, the file size, the install commands, the supported Ubuntu versions if they changed, and the beta notice if this release is still a beta. Update the yabridge version in the feature card and the footer if the bundled copy changed.
6. Commit that page change and push to `main`. Pages serves the site. The package is downloaded from the release URL.

If creating the release returns 403, commit the `.deb` and `SHA256SUMS.txt` under `downloads/` instead (the file is under GitHub's size limit) and link them with relative paths, for example `downloads/dawlunix_1.0.0-beta2_amd64.deb`. Pages will serve those files from the site root. Do not put a `~` in the committed filename.
