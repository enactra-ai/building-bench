#!/usr/bin/env bash
# Rebuild enactra.ai/buildingbench/ from the live board, and publish it when what the page shows
# has changed. Runs from cron on ds-serv12, in a checkout kept for it (README, "Deploying"):
#
#   5-55/10 * * * *  /data/koe/bb-site/building-bench/website/publish.sh >> /data/koe/bb-site/publish.log 2>&1
#
# Each run resets this checkout to origin/$BB_BRANCH, then extract -> slim -> leaderboard -> build,
# and compares data/fingerprint.json with the committed one. Same: stop (one line in the log).
# Different: commit the page and its data here, copy buildingbench/ into the webpage checkout and
# push it (the enactra.ai Worker deploys every push to its main), then push here.
#
#   BB_BRANCH     branch of this repo the page is built from and recorded on   (default: website)
#   BB_WEBPAGE    checkout of enactra-ai/webpage                              (default: ../webpage beside this repo)
#   BB_DRY_RUN=1  build and report what would be published; commit and push nothing
#
# Do not edit files in this checkout: every run resets it. Change the branch and push instead.
set -euo pipefail

WEBSITE=$(cd "$(dirname "$0")" && pwd)
REPO=$(dirname "$WEBSITE")
WEBPAGE=${BB_WEBPAGE:-$(dirname "$REPO")/webpage}
BRANCH=${BB_BRANCH:-website}
# buildingbench-evolution/ on the live site is a 2026-09-09 build, left as it is on purpose.
EDITIONS=(buildingbench)
BOT=(-c user.name="BuildingBench auto-publish" -c user.email="${BB_GIT_EMAIL:-koe@ds-serv12.ucsd.edu}")
STEPLOG=$(mktemp); trap 'rm -f "$STEPLOG"' EXIT

log() { echo "[$(date '+%F %T')] $*"; }
# a step's output goes to the log only when it fails
step() { if ! "$@" > "$STEPLOG" 2>&1; then log "FAILED: $*"; cat "$STEPLOG"; exit 1; fi; }
fp() { python3 -c 'import json, sys; print(json.load(sys.stdin)["fingerprint"])'; }

main() {
    exec 9> /tmp/bb-site-publish.lock
    flock -n 9 || { log "skipped: the previous run is still going"; exit 0; }

    # 1. start from what is recorded as published, and from what the site serves
    cd "$REPO"
    step git fetch -q origin "$BRANCH"
    git checkout -q -f -B "$BRANCH" "origin/$BRANCH"
    git clean -qfd -- website             # leftovers of a failed run; cache/ and out/ are ignored, so kept
    local before; before=$({ git show HEAD:website/data/fingerprint.json 2>/dev/null || true; } | fp 2>/dev/null || echo none)
    git -C "$WEBPAGE" rebase --abort > /dev/null 2>&1 || true    # a replay a failed run left half done
    step git -C "$WEBPAGE" fetch -q origin main                  # fails here, not after a build, without access

    # 2. rebuild from the board
    cd "$WEBSITE"
    step python3 extract.py
    step python3 slim_all.py
    step python3 leaderboard.py
    step python3 build.py --no-demo
    local after; after=$(fp < data/fingerprint.json)
    if [ "$before" = "$after" ]; then log "no change"; exit 0; fi

    # 3. refuse a page that lost most of itself: a board outage looks like that
    if grep -q /cdn-cgi/ buildingbench/index.html; then log "REFUSED: /cdn-cgi/ in buildingbench/index.html"; exit 1; fi
    local summary
    summary=$({ git show HEAD:website/data/fingerprint.json 2>/dev/null || true; } | python3 -c '
import json, sys
try: old = json.load(sys.stdin)
except Exception: old = {"models": [], "results": 0, "buildings": 0}
new = json.load(open("data/fingerprint.json"))
if new["buildings"] < old["buildings"] or len(new["models"]) < len(old["models"]) - 2 or new["results"] < 0.9 * old["results"]:
    sys.exit("REFUSED: %d buildings, %d models, %d results, against %d, %d, %d published" % (
        new["buildings"], len(new["models"]), new["results"], old["buildings"], len(old["models"]), old["results"]))
print("BuildingBench: board snapshot %s, %d models, %d submissions (automatic)" % (new["snapshot"], len(new["models"]), new["results"]))
print()
added = [m for m in new["models"] if m not in old["models"]]
gone = [m for m in old["models"] if m not in new["models"]]
if added: print("New on the page: " + ", ".join(added))
if gone: print("No longer on the page: " + ", ".join(gone))
if not added and not gone: print("Same models; scores, runs or costs moved.")
if new["incomplete"]:
    print()
    print("website/catalog.py lacks, for models now on the page:")
    for m, what in new["incomplete"].items(): print("  %s: %s" % (m, ", ".join(what)))
print()
print("Built by website/publish.sh from the board at ds-serv12:8870.")
' 2>&1) || { log "$summary"; exit 1; }
    log "$(head -1 <<< "$summary")"

    if [ "${BB_DRY_RUN:-}" = 1 ]; then
        echo "$summary"; log "dry run: nothing committed or pushed"; exit 0
    fi

    # 4. record it here, deploy it there, then push the record
    cd "$REPO"
    git add -A website
    git "${BOT[@]}" commit -q -m "$summary"
    git -C "$WEBPAGE" checkout -q -f -B main origin/main
    local e
    for e in "${EDITIONS[@]}"; do rsync -a --delete "$WEBSITE/$e/" "$WEBPAGE/$e/"; done
    git -C "$WEBPAGE" add -A -- "${EDITIONS[@]}"
    if git -C "$WEBPAGE" diff --cached --quiet; then
        log "webpage already serves this build"
    else
        git -C "$WEBPAGE" "${BOT[@]}" commit -q -m "$summary"
        if ! git -C "$WEBPAGE" push -q origin HEAD:main 2> "$STEPLOG"; then
            # someone pushed in between: replay on top once
            step git -C "$WEBPAGE" pull -q --rebase origin main
            step git -C "$WEBPAGE" push -q origin HEAD:main
        fi
        log "deployed: webpage $(git -C "$WEBPAGE" rev-parse --short HEAD)"
    fi
    step git push -q origin "HEAD:$BRANCH"
    log "recorded: $BRANCH $(git rev-parse --short HEAD)"
}

main "$@"
