#!/usr/bin/env bash
# Print .deb download counts for GitHub releases of a6gitti/dawlunix-site.
# The site does not show these numbers. Requires the GitHub CLI (gh).
set -euo pipefail

gh api --paginate repos/a6gitti/dawlunix-site/releases \
  --jq '.[] | .tag_name as $t | .assets[] | select(.name|endswith(".deb")) | "\($t) \(.name) \(.download_count)"' \
  | awk '{print} {s+=$NF} END {print "total", s+0}'
