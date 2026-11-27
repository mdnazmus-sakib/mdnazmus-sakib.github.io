// EDIT: caption / alt text and category for each photo.
// category: "portrait" | "outdoor" | "creative"
const PHOTOS = [
  { f: '02', c: 'portrait', t: 'Studio portrait against an orange wall, round glasses' },
  { f: '13', c: 'portrait', t: 'Black blazer on a deep red backdrop' },
  { f: '12', c: 'portrait', t: 'Low-key portrait in a maroon kurta' },
  { f: '06', c: 'portrait', t: 'Black and white portrait through glass' },
  { f: '07', c: 'creative', t: 'Poster-style portrait rising from a wave' },
  { f: '03', c: 'outdoor',  t: 'Evening street portrait with city bokeh' },
  { f: '10', c: 'creative', t: 'Neon name sign in a jungle setting' },
  { f: '19', c: 'outdoor',  t: 'Framed by a carved stone arch with a fort behind' },
  { f: '04', c: 'creative', t: 'Portrait collage in colour and black and white' },
  { f: '14', c: 'outdoor',  t: 'Standing in a field at sunset' },
  { f: '09', c: 'creative', t: 'Maroon studio portrait with brush-script name' },
  { f: '05', c: 'outdoor',  t: 'Black suit against a wall of red camellias' },
  { f: '18', c: 'creative', t: 'Full-length portrait with a giant sepia face behind' },
  { f: '20', c: 'outdoor',  t: 'Red kurta on a sunlit garden path' },
  { f: '01', c: 'creative', t: 'Double portrait with a loading-bar title' },
  { f: '15', c: 'creative', t: 'Cream-toned portrait with brush-script name' },
  { f: '17', c: 'outdoor',  t: 'Leaning on a stone wall in morning light' },
  { f: '11', c: 'creative', t: 'Portrait with a ghosted face in the background' },
  { f: '16', c: 'creative', t: 'Leaning on large white letters spelling SAKIB' },
  { f: '08', c: 'outdoor',  t: 'White kurta, warm light on a street' },
];

const grid = document.getElementById('grid');
const chips = document.querySelectorAll('.chip');
const lb = document.getElementById('lb');
const lbImg = document.getElementById('lb-img');
const lbCap = document.getElementById('lb-cap');
let visible = PHOTOS.slice();
let current = 0;

function render() {
  grid.innerHTML = '';
  visible.forEach((p, i) => {
    const b = document.createElement('button');
    b.className = 'shot';
    b.type = 'button';
    b.setAttribute('aria-label', 'Open photo: ' + p.t);
    const img = document.createElement('img');
    img.src = `photos/${p.f}.jpg`;
    img.alt = p.t;
    img.loading = 'lazy';
    img.decoding = 'async';
    b.appendChild(img);
    b.addEventListener('click', () => open(i));
    grid.appendChild(b);
  });
}

function show(i) {
  current = (i + visible.length) % visible.length;
  const p = visible[current];
  lbImg.src = `photos/${p.f}.jpg`;
  lbImg.alt = p.t;
  lbCap.textContent = `${p.t}  (${current + 1}/${visible.length})`;
}
function open(i) { show(i); lb.showModal(); }

chips.forEach((chip) =>
  chip.addEventListener('click', () => {
    chips.forEach((c) => { c.classList.remove('is-on'); c.setAttribute('aria-pressed', 'false'); });
    chip.classList.add('is-on');
    chip.setAttribute('aria-pressed', 'true');
    const f = chip.dataset.filter;
    visible = f === 'all' ? PHOTOS.slice() : PHOTOS.filter((p) => p.c === f);
    render();
  })
);

lb.querySelector('.prev').addEventListener('click', () => show(current - 1));
lb.querySelector('.next').addEventListener('click', () => show(current + 1));
lb.querySelector('.lb-close').addEventListener('click', () => lb.close());
lb.addEventListener('click', (e) => { if (e.target === lb) lb.close(); });
lb.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') show(current - 1);
  if (e.key === 'ArrowRight') show(current + 1);
});

document.getElementById('yr').textContent = new Date().getFullYear();
render();
