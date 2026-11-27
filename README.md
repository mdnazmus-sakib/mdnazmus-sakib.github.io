# Md. Nazmus Sakib — Portfolio

A portfolio site for portraits and creative work. Plain HTML / CSS / JS — no build step,
no dependencies. Upload the folder to GitHub Pages and it runs.

## What's inside

```
index.html      structure + meta/OG tags
style.css       all styling (dark maroon theme, gold accent)
script.js       gallery, filters, lightbox, hero thumbnail switcher
photos/         20 photos, each in .webp (primary) and .jpg (fallback)
.nojekyll       tells GitHub Pages to serve files as-is
```

There are **40 files in `photos/`** — 20 photos × 2 formats. Both are needed: modern
browsers use the smaller WebP, older ones fall back to JPG.

## Your photos, optimised

The files you sent totalled about **44 MB**, mostly ~2.2 MB PNGs. I resized them to a
max of 1100px on the long edge and re-encoded them:

| | Before | After |
|---|---|---|
| 20 photos (WebP) | ~44 MB | **2.1 MB** |
| 20 photos (JPG fallback) | — | 3.4 MB |

Typical page load only pulls the WebP versions, and the grid lazy-loads, so the first
screen costs a fraction of that. Each photo also carries its true `width`/`height`, so the
grid doesn't jump around while images arrive.

## Sections

1. **Hero** — big `NAZMUS / SAKIB` type (SAKIB is outlined in gold), a featured photo, and
   four clickable thumbnails underneath that swap the featured image.
2. **Marquee** — a scrolling strip (Portraits · Creative Direction · Studio · Outdoors).
3. **About** — portrait plus your details. Placeholders marked `EDIT` in `index.html`.
4. **Gallery** — all 20 photos in a masonry grid, filterable by Portraits / Outdoors /
   Creative, with a live count.
5. **Contact** — email and social links.
6. **Lightbox** — click any photo to enlarge. Arrow keys, on-screen arrows, backdrop click
   to close, and swipe on touch.

## Edit your details

Search `EDIT` in `index.html`:
- the email (`hello@example.com`) appears in the About list and the Contact section
- the social links (Facebook / Instagram / LinkedIn) — delete the ones you don't use
- the About paragraphs and the "Based in" line

## Add or recategorise a photo

In `script.js`, each entry in `PHOTOS` looks like this:

```js
{ f: 'orange-studio', c: 'portrait', t: 'Orange studio',
  alt: 'Studio portrait on an orange backdrop...', w: 1086, h: 1448 },
```

- `f` — the filename **without** the extension (`photos/orange-studio.jpg`)
- `c` — `portrait`, `outdoor`, or `creative` (drive the filter buttons)
- `t` — the caption shown on hover and in the lightbox
- `alt` — what screen readers announce; keep it descriptive
- `w` / `h` — the real pixel dimensions, so the layout doesn't shift

To add a new photo, drop both `name.webp` and `name.jpg` into `photos/`, then add an entry.
If a category ends up empty, the grid shows "No photos in this category yet" instead of
going blank.

## Using Google Drive for the photos (optional — read this first)

The site keeps its photos in `photos/` and **that is the recommended setup.** Drive support
exists in `script.js` if you really need it, but it is switched off:

```js
const USE_DRIVE = false;
```

### Why Drive is a poor image host

| Problem | What happens |
|---|---|
| Hotlinking disabled (2020) | `uc?export=view` links return a "can't scan for viruses" page, not the image |
| Rate limiting | The only raw-bytes endpoint (`lh3…=w1200`) is throttled **per file**. A 20-photo gallery requests them all at once and tiles start failing |
| Your quota | Every visitor's load counts against **your** Drive storage quota. Enough traffic and Google temporarily blocks the files |
| No CDN | Slow from Bangladesh, no edge caching, no resizing — you lose the 44 MB → 2.1 MB optimisation completely |
| Sharing | Each file must be set to "Anyone with the link" individually, or it 404s |

### How to enable it anyway

1. Upload the photos to Drive and set each one to **Anyone with the link → Viewer**.
2. Copy each file's ID from its share link:
   `https://drive.google.com/file/d/`**`1AbCdEfGhIjKlMnOp`**`/view?usp=sharing`
3. Fill in the map in `script.js` and flip the switch:

```js
const USE_DRIVE = true;

const DRIVE_IDS = {
  'name-stack': '1AbCdEfGhIjKlMnOp',
  'red-camellias': '1QrStUvWxYz012345',
  // …one line per photo
};
```

**Safety net:** every image has an `onerror` handler, so if a Drive file fails to load —
throttled, deleted, or still private — the browser silently falls back to the local copy in
`photos/`. You can never end up with broken tiles. This is why you should still upload the
`photos/` folder.

### A better free option

If you don't want the photos sitting in the repo, put `photos/` on a free image CDN —
**Cloudinary**, **imgix**, or **Cloudflare Images** — and point the URLs at those. They give
you real CDN delivery, on-the-fly resizing, and no per-file throttling. All three have a
generous free tier and would take about ten minutes to wire up.
`imageURL()` in `script.js` is the single place you'd change.

## Publish free on GitHub Pages

1. github.com → **New repository**. Name it `YOUR-USERNAME.github.io` and make it **Public**.
2. **uploading an existing file** → drag in *everything* from this folder
   (`index.html`, `style.css`, `script.js`, `.nojekyll`, and the `photos` folder) → commit.
3. **Settings → Pages** → Source: *Deploy from a branch* → Branch: `main`, folder `/(root)` → Save.
4. Wait 1–2 minutes, then open `https://YOUR-USERNAME.github.io`.

## One thing to get right

**`index.html` and the `photos/` folder must stay side by side.** If the HTML is uploaded
without the folder, every image 404s and you get broken-image icons — that's exactly what
happened with the earlier version of this site. Upload the whole folder.

Filename case matters too: `Orange-Studio.jpg` is not `orange-studio.jpg`.

## Local preview

```bash
cd sakib-portfolio
python3 -m http.server 8100
# open http://localhost:8100
```
