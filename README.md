# Den Skrå Avis / The Skewed Ebay

##
Installation

Til næste gang jeg committer sebastians nemid kodeord fra config filen:
`
  git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch app/config/db.config.js" \
  --prune-empty --tag-name-filter cat -- --all
  git push --force --verbose --dry-run
  git push --force`