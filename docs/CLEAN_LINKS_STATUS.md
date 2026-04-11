# Clean Links Status

## Fixed areas

### 1. Documentation links
HTML documentation pages were added so public-facing navigation no longer has to rely on raw Markdown files.

### 2. Contact link safety
A safe public contact page was added:
- `contact-clean.html`

This keeps WhatsApp available while email publication remains deferred until mailbox confirmation.

### 3. Social placeholders
A safe social status page was added:
- `social-clean.html`

This avoids exposing generic placeholder social URLs as if they were official accounts.

### 4. Local placeholder media
A local placeholder asset was added:
- `assets/placeholders/placeholder-home.svg`

A public-safe preview page was added:
- `index.public-clean.html`

A central clean-links hub was added:
- `clean-links.html`

## Remaining note

The legacy `index.html` still contains older placeholder/public links because it has not yet been directly rewritten. The clean replacements now exist in parallel and are ready to be adopted as the public-facing path.
