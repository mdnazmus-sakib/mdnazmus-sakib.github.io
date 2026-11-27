// ============================================================
//  Md. Nazmus Sakib — portfolio script
//  EDIT captions / categories here. "f" must match a file in photos/
//  (both .webp and .jpg exist for every entry).
// ============================================================
const PHOTOS = [
  { f: 'name-stack', c: 'creative', t: 'Layered portrait', alt: 'Two layered portraits with a script signature and progress bar', w: 1024, h: 1536 },
  { f: 'red-camellias', c: 'outdoor', t: 'Among the camellias', alt: 'Black suit against a wall of red camellia flowers', w: 941, h: 1672 },
  { f: 'through-glass', c: 'creative', t: 'Through the glass', alt: 'Black and white portrait seen through glass, hands above the head', w: 1086, h: 1448 },
  { f: 'orange-studio', c: 'portrait', t: 'Orange studio', alt: 'Studio portrait on an orange backdrop wearing glasses and a black turtleneck', w: 1086, h: 1448 },
  { f: 'wave-poster', c: 'creative', t: 'Sakib wave poster', alt: 'Poster-style portrait rising out of a breaking wave under large type', w: 1100, h: 1467 },
  { f: 'white-kurta-street', c: 'outdoor', t: 'Warm evening street', alt: 'White kurta on a street in warm evening light', w: 1086, h: 1448 },
  { f: 'sakib-letters', c: 'creative', t: 'Letter block', alt: 'Leaning against oversized white letters spelling SAKIB', w: 1086, h: 1448 },
  { f: 'stone-wall', c: 'outdoor', t: 'Morning stone wall', alt: 'Full length in a maroon kurta leaning on a dark stone wall', w: 1086, h: 1448 },
  { f: 'collage-grid', c: 'creative', t: 'Five panel collage', alt: 'Five panel collage mixing colour and black and white portraits', w: 1024, h: 1536 },
  { f: 'sepia-echo', c: 'creative', t: 'Sepia echo', alt: 'Full length portrait with a large sepia face behind it', w: 1024, h: 1536 },
  { f: 'amber-arch', c: 'outdoor', t: 'Arch view', alt: 'Red kurta framed by a carved stone arch with a hill fort behind', w: 1100, h: 1375 },
  { f: 'maroon-script', c: 'creative', t: 'Maroon signature', alt: 'Maroon studio backdrop with a brush script signature above', w: 1024, h: 1536 },
  { f: 'neon-jungle', c: 'creative', t: 'Neon in the jungle', alt: 'Neon name sign glowing above a tropical plant wall', w: 1023, h: 1537 },
  { f: 'ghost-face', c: 'creative', t: 'Ghosted face', alt: 'Portrait with a ghosted face in the background', w: 1086, h: 1448 },
  { f: 'red-studio', c: 'portrait', t: 'Deep red studio', alt: 'Low-key studio portrait on a deep red backdrop', w: 941, h: 1672 },
  { f: 'black-turtleneck', c: 'portrait', t: 'Black turtleneck', alt: 'Portrait looking away in a black turtleneck and blazer', w: 941, h: 1672 },
  { f: 'night-street', c: 'outdoor', t: 'Night street', alt: 'Evening street portrait with city bokeh while sitting on a stone sphere', w: 1086, h: 1448 },
  { f: 'sunset-field', c: 'outdoor', t: 'Sunset field', alt: 'Standing in a field at sunset in a green jacket', w: 1100, h: 880 },
  { f: 'cream-script', c: 'creative', t: 'Cream signature', alt: 'Cream toned portrait with a brush script signature', w: 1024, h: 1536 },
  { f: 'green-path', c: 'outdoor', t: 'Garden path', alt: 'Red kurta leaning on a railing beside a sunlit garden path', w: 1086, h: 1448 },
];
// ============================================================
//  OPTIONAL: load photos from Google Drive instead of local files
// ============================================================
//  LEAVE THIS OFF (false) unless you have a specific reason.
//  Google Drive is NOT an image host:
//    - external hotlinking was disabled in 2020
//    - the thumbnail endpoint is rate-limited per file
//    - every visitor counts against YOUR Drive quota
//    - it is slow from Bangladesh and serves unoptimised files
//  If you turn it on anyway, paste each file's ID below. Every image
//  that fails to load automatically falls back to the local copy in
//  photos/, so the site can never end up with broken images.
//
//  File ID = the part after /d/ and before /view in a share link:
//    https://drive.google.com/file/d/1AbCdEfGhIjKlMnOp/view?usp=sharing
//                                              ^^^^^^^^^^^^^^^ this
//
const USE_DRIVE = false;

const DRIVE_IDS = {
  // 'name-stack': '1AbCdEfGhIjKlMnOp',
  // 'red-camellias': '1QrStUvWxYz012345',
};

/** Resolve an image URL for a photo, honouring USE_DRIVE. */
function imageURL(slug, ext) {
  if (USE_DRIVE && DRIVE_IDS[slug]) {
    // lh3 is the only endpoint that reliably returns raw image bytes
    return `https://lh3.googleusercontent.com/d/${DRIVE_IDS[slug]}=w1200`;
  }
  return `photos/${slug}.${ext}`;
}

/** Local path — used as the onerror fallback. */
function localURL(slug, ext) {
  return `photos/${slug}.${ext}`;
}

const grid = document.getElementById('grid');
const chips = document.querySelectorAll('.chip');
const lb = document.getElementById('lb');
const lbImg = document.getElementById('lb-img');
const lbCap = document.getElementById('lb-cap');
const lbNum = document.getElementById('lb-num');
const photoCount = document.getElementById('photoCount');

let visible = PHOTOS.slice();
let current = 0;

/* ---------------- gallery ---------------- */

function render() {
  grid.innerHTML = '';
  photoCount.textContent = visible.length;

  if (visible.length === 0) {
    const note = document.createElement('p');
    note.className = 'empty';
    note.textContent = 'No photos in this category yet.';
    grid.appendChild(note);
    return;
  }

  visible.forEach((p, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'shot';
    b.setAttribute('aria-label', 'Open photo: ' + p.t);

    const img = document.createElement('img');
    img.alt = p.alt;
    img.width = p.w;
    img.height = p.h;
    img.loading = 'lazy';
    img.decoding = 'async';

    // if a remote (Drive) image fails, silently swap in the local file
    img.addEventListener('error', () => {
      const fallback = localURL(p.f, 'jpg');
      if (!img.src.endsWith(fallback)) img.src = fallback;
    });

    img.src = imageURL(p.f, 'jpg');

    const cap = document.createElement('span');
    cap.className = 'cap';
    cap.textContent = p.t;

    b.append(img, cap);
    b.addEventListener('click', () => open(i));
    grid.appendChild(b);
  });
}

/* ---------------- lightbox ---------------- */

function show(i) {
  current = (i + visible.length) % visible.length;
  const p = visible[current];
  lbImg.onerror = () => {
    const fallback = localURL(p.f, 'jpg');
    if (!lbImg.src.endsWith(fallback)) lbImg.src = fallback;
  };
  lbImg.src = imageURL(p.f, 'jpg');
  lbImg.alt = p.alt;
  lbCap.textContent = p.t;
  lbNum.textContent = `${current + 1} / ${visible.length}`;
}

function open(i) {
  show(i);
  lb.showModal();
  document.body.style.overflow = 'hidden';
}

function close() {
  lb.close();
  document.body.style.overflow = '';
}

/* ---------------- filters ---------------- */

chips.forEach((chip) =>
  chip.addEventListener('click', () => {
    chips.forEach((c) => {
      c.classList.remove('is-on');
      c.setAttribute('aria-pressed', 'false');
    });
    chip.classList.add('is-on');
    chip.setAttribute('aria-pressed', 'true');

    const f = chip.dataset.filter;
    visible = f === 'all' ? PHOTOS.slice() : PHOTOS.filter((p) => p.c === f);
    render();
  })
);

/* ---------------- lightbox controls ---------------- */

lb.querySelector('.prev').addEventListener('click', () => show(current - 1));
lb.querySelector('.next').addEventListener('click', () => show(current + 1));
lb.querySelector('.lb-close').addEventListener('click', close);

// click on the backdrop (not the figure) closes
lb.addEventListener('click', (e) => { if (e.target === lb) close(); });
lb.addEventListener('close', () => { document.body.style.overflow = ''; });

lb.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') show(current - 1);
  if (e.key === 'ArrowRight') show(current + 1);
});

// swipe left/right on touch
let touchX = null;
lb.addEventListener('touchstart', (e) => { touchX = e.changedTouches[0].clientX; }, { passive: true });
lb.addEventListener('touchend', (e) => {
  if (touchX === null) return;
  const dx = e.changedTouches[0].clientX - touchX;
  if (Math.abs(dx) > 50) show(current + (dx < 0 ? 1 : -1));
  touchX = null;
}, { passive: true });

/* ---------------- hero featured image ---------------- */

const heroImg = document.getElementById('heroImg');
const heroWebp = document.getElementById('heroWebp');

document.querySelectorAll('.thumb').forEach((t) => {
  t.addEventListener('click', () => {
    document.querySelectorAll('.thumb').forEach((o) => o.classList.remove('is-on'));
    t.classList.add('is-on');

    const f = t.dataset.src;
    const apply = () => {
      heroWebp.srcset = imageURL(f, 'webp');
      heroImg.onerror = () => {
        const fallback = localURL(f, 'jpg');
        if (!heroImg.src.endsWith(fallback)) heroImg.src = fallback;
      };
      heroImg.src = imageURL(f, 'jpg');
      heroImg.alt = t.dataset.alt;
      heroImg.width = t.dataset.w;
      heroImg.height = t.dataset.h;
      heroImg.classList.remove('is-swapping');
    };

    // preload, then fade in so there's no flash of an empty frame
    heroImg.classList.add('is-swapping');
    const pre = new Image();
    pre.onload = apply;
    pre.onerror = apply;
    pre.src = imageURL(f, 'jpg');
  });
});

/* ---------------- misc ---------------- */

document.getElementById('yr').textContent = new Date().getFullYear();
render();
