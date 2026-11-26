{
/* ---------- settings ---------- */
const CONFIG = { whatsapp: '', freeShipOver: 999, shipFee: 79 };
const SIZES = [
  { id: 'mp-100', label: 'Daily', detail: '4 pcs · 100 g', price: 249 },
  { id: 'mp-250', label: 'Signature box', detail: '8 pcs · 250 g', price: 549 },
  { id: 'mp-1000', label: 'Family box', detail: '4 × 250 g', price: 1999 }
];
const SWEETS = [
  { slug: 'mysore-pak', name: 'Mysore Pak', deva: 'मैसूर पाक', c: '#E9A21B', status: 'Available now · ₹549' },
  { slug: 'besan-ladoo', name: 'Besan Ladoo', deva: 'बेसन लड्डू', c: '#F06B26', status: 'Coming 2027' },
  { slug: 'kaju-katli', name: 'Kaju Katli', deva: 'काजू कतली', c: '#2E3A8C', status: 'Coming 2027' },
  { slug: 'pista-barfi', name: 'Pista Barfi', deva: 'पिस्ता बर्फी', c: '#7FA650', status: 'Coming 2027' },
  { slug: 'gulkand-peda', name: 'Gulkand Peda', deva: 'गुलकंद पेड़ा', c: '#E5487A', status: 'Coming 2027' }
];
const $ = id => document.getElementById(id);
const inr = n => '₹' + Math.round(n).toLocaleString('en-IN');
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- collection rail ---------- */
$('rail').innerHTML = SWEETS.map(s => `
  <article class="card" style="--c:${s.c}">
    <figure class="ph r45" data-art="box" data-accent="${s.c}"><img src="assets/box-${s.slug}.jpg" alt="Thoda Sa ${esc(s.name)} box" loading="lazy"></figure>
    <span class="rule"></span>
    <h3>${esc(s.name)}</h3>
    <div class="meta"><span class="deva">${esc(s.deva)}</span><span>${esc(s.status)}</span></div>
  </article>`).join('');

/* ---------- fine-line drawings shown until photos are added ---------- */
const INK = '#1E1A17';
const lattice = (x, y, w, h, id) => {
  let l = '';
  for (let i = -h; i < w; i += 18) l += `<line x1="${x + i}" y1="${y + h}" x2="${x + i + h}" y2="${y}"/><line x1="${x + i}" y1="${y}" x2="${x + i + h}" y2="${y + h}"/>`;
  return `<g clip-path="url(#${id})" stroke="${INK}" stroke-opacity=".22" stroke-width=".8">${l}</g>`;
};
const archPath = (x, y, w, h) => `M${x} ${y + h} V${y + w / 2} A${w / 2} ${w / 2} 0 0 1 ${x + w} ${y + w / 2} V${y + h} Z`;
let artN = 0;
const ART = {
  box: a => { const id = 'c' + (artN++); return [400, 500, `
    <rect x="80" y="70" width="240" height="330" rx="6" fill="#FFFDF8" stroke="${INK}" stroke-width="1.3"/>
    <clipPath id="${id}"><path d="${archPath(120, 120, 160, 190)}"/></clipPath>
    <path d="${archPath(120, 120, 160, 190)}" fill="none" stroke="${a}" stroke-width="2"/>${lattice(120, 120, 160, 190, id)}
    <line x1="80" y1="372" x2="320" y2="372" stroke="${a}" stroke-width="3"/>
    <text x="200" y="352" text-anchor="middle" font-family="Archivo, sans-serif" font-weight="800" font-size="20" letter-spacing="4" fill="${INK}">THODA SA</text>
    <circle cx="300" cy="300" r="20" fill="none" stroke="#B3261E" stroke-width="1.3"/><circle cx="300" cy="300" r="15" fill="none" stroke="#B3261E" stroke-width=".7"/>`]; },
  piece: a => [400, 400, `
    <path d="M110 170 L230 130 L310 175 L190 220 Z" fill="none" stroke="${INK}" stroke-width="1.3"/>
    <path d="M110 170 V250 L190 300 V220" fill="none" stroke="${INK}" stroke-width="1.3"/><path d="M190 300 L310 255 V175" fill="none" stroke="${INK}" stroke-width="1.3"/>
    ${[[150, 240], [168, 262], [140, 214], [230, 240], [262, 226], [250, 262], [285, 210], [205, 270]].map(p => `<circle cx="${p[0]}" cy="${p[1]}" r="3" fill="none" stroke="${a}"/>`).join('')}
    <path d="M110 170 L230 130 L310 175" fill="none" stroke="${a}" stroke-width="2"/>`],
  flatlay: a => [600, 400, `
    <circle cx="170" cy="200" r="95" fill="none" stroke="${INK}" stroke-width="1.3"/><circle cx="170" cy="200" r="70" fill="none" stroke="${INK}" stroke-opacity=".3"/>
    <circle cx="390" cy="150" r="70" fill="none" stroke="${INK}" stroke-width="1.3"/><circle cx="390" cy="150" r="40" fill="none" stroke="${a}" stroke-width="2"/>
    <circle cx="430" cy="300" r="55" fill="none" stroke="${INK}" stroke-width="1.3"/>
    ${[[290, 300], [310, 320], [270, 330], [300, 350]].map(p => `<ellipse cx="${p[0]}" cy="${p[1]}" rx="12" ry="6" transform="rotate(30 ${p[0]} ${p[1]})" fill="none" stroke="${a}" stroke-width="1.4"/>`).join('')}`],
  tray: a => [800, 500, `
    <rect x="170" y="90" width="460" height="320" rx="6" fill="#FFFDF8" stroke="${INK}" stroke-width="1.3"/>
    ${[0, 1, 2, 3].map(i => [0, 1].map(j => `<rect x="${200 + i * 108}" y="${125 + j * 140}" width="88" height="110" rx="5" fill="none" stroke="${INK}" stroke-opacity=".5"/><rect x="${212 + i * 108}" y="${150 + j * 140}" width="64" height="58" rx="5" fill="none" stroke="${a}" stroke-width="1.6"/>`).join('')).join('')}`],
  row: a => [800, 450, ['#E9A21B', '#F06B26', '#2E3A8C', '#7FA650', '#E5487A'].map((c, i) => { const x = 70 + i * 140; return `<rect x="${x}" y="110" width="110" height="160" rx="4" fill="#FFFDF8" stroke="${INK}" stroke-width="1.2"/><path d="${archPath(x + 22, 135, 66, 95)}" fill="none" stroke="${c}" stroke-width="2"/><line x1="${x}" y1="255" x2="${x + 110}" y2="255" stroke="${c}" stroke-width="3"/>`; }).join('') + `<line x1="40" y1="272" x2="760" y2="272" stroke="${INK}" stroke-opacity=".35"/>`],
  sensor: a => [400, 500, `
    <path d="M120 470 C 130 330, 150 200, 175 40 M280 470 C 270 330, 250 200, 228 40" fill="none" stroke="${INK}" stroke-width="1.3"/>
    <circle cx="203" cy="230" r="34" fill="#FFFDF8" stroke="${INK}" stroke-width="1.3"/><circle cx="203" cy="230" r="12" fill="none" stroke="${a}" stroke-width="2"/>
    <path d="M120 400 C 170 398, 190 330, 230 330 S 290 390, 330 392" fill="none" stroke="${a}" stroke-width="1.6"/>`],
  plates: a => [600, 400, `
    <circle cx="190" cy="200" r="110" fill="none" stroke="${INK}" stroke-width="1.3"/><circle cx="190" cy="200" r="85" fill="none" stroke="${INK}" stroke-opacity=".3"/>
    <circle cx="410" cy="200" r="110" fill="none" stroke="${INK}" stroke-width="1.3"/><circle cx="410" cy="200" r="85" fill="none" stroke="${INK}" stroke-opacity=".3"/>
    <rect x="160" y="178" width="60" height="44" rx="5" fill="none" stroke="${a}" stroke-width="1.6"/><rect x="380" y="178" width="60" height="44" rx="5" fill="none" stroke="${a}" stroke-width="1.6"/>
    <text x="190" y="345" text-anchor="middle" font-family="Inter" font-size="20" fill="${INK}">A</text><text x="410" y="345" text-anchor="middle" font-family="Inter" font-size="20" fill="${INK}">B</text>`],
  family: a => { const id = 'c' + (artN++); return [400, 500, `
    <clipPath id="${id}"><path d="${archPath(90, 60, 220, 360)}"/></clipPath>
    <path d="${archPath(90, 60, 220, 360)}" fill="none" stroke="${INK}" stroke-width="1.3"/>${lattice(90, 60, 220, 360, id)}
    <path d="M170 440 Q200 470 230 440 Z" fill="none" stroke="${a}" stroke-width="1.8"/><path d="M200 438 C 190 420, 200 405, 200 398 C 202 408, 212 420, 200 438" fill="none" stroke="${a}" stroke-width="1.6"/>`]; },
  parcel: a => [600, 400, `
    <rect x="190" y="110" width="220" height="190" rx="4" fill="#FFFDF8" stroke="${INK}" stroke-width="1.3"/>
    <line x1="300" y1="110" x2="300" y2="300" stroke="${a}" stroke-width="2"/><line x1="190" y1="200" x2="410" y2="200" stroke="${a}" stroke-width="2"/>
    <path d="M300 110 C 270 80, 250 95, 300 110 C 350 95, 330 80, 300 110" fill="none" stroke="${a}" stroke-width="1.6"/>`],
  trunk: a => [600, 400, `
    <rect x="130" y="150" width="340" height="170" rx="6" fill="#FFFDF8" stroke="${INK}" stroke-width="1.3"/>
    <path d="M130 150 L160 80 H440 L470 150" fill="none" stroke="${INK}" stroke-width="1.3"/>
    ${['#E9A21B', '#F06B26', '#7FA650', '#E5487A'].map((c, i) => `<rect x="${150 + i * 80}" y="175" width="62" height="120" rx="4" fill="none" stroke="${c}" stroke-width="1.8"/>`).join('')}
    <rect x="130" y="150" width="340" height="170" rx="6" fill="none" stroke="${a}" stroke-width="1" stroke-dasharray="2 4" transform="translate(6 6) scale(.98)"/>`]
};
function fallback(fig) {
  if (fig.classList.contains('empty')) return;
  if (fig.hasAttribute('data-optional')) { fig.hidden = true; return; }
  const make = ART[fig.dataset.art] || ART.box;
  const [w, h, body] = make(fig.dataset.accent || '#E9A21B');
  fig.classList.add('empty');
  fig.insertAdjacentHTML('beforeend', `<svg class="art" viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid meet" aria-hidden="true">${body}</svg>`);
}
document.querySelectorAll('.ph').forEach(fig => {
  const img = fig.querySelector('img');
  if (!img) return;
  if (img.complete && img.naturalWidth === 0) fallback(fig);
  img.addEventListener('error', () => fallback(fig));
});

/* ---------- shop + cart ---------- */
let cart = [];
try { cart = JSON.parse(localStorage.getItem('kam-cart') || '[]'); if (!Array.isArray(cart)) cart = []; } catch (e) { cart = []; }
const persist = () => { try { localStorage.setItem('kam-cart', JSON.stringify(cart)); } catch (e) {} };
let size = SIZES[1], qty = 1;
function drawSizes() {
  $('sizes').innerHTML = SIZES.map(s => `<button type="button" class="pill" data-id="${s.id}" aria-pressed="${s.id === size.id}">${esc(s.label)} · ${inr(s.price)}<small>${esc(s.detail)}</small></button>`).join('');
  $('price').textContent = inr(size.price * qty); $('qty').textContent = qty;
}
$('sizes').addEventListener('click', e => { const b = e.target.closest('.pill'); if (!b) return; size = SIZES.find(s => s.id === b.dataset.id); drawSizes(); });
$('minus').addEventListener('click', () => { qty = Math.max(1, qty - 1); drawSizes(); });
$('plus').addEventListener('click', () => { qty = Math.min(20, qty + 1); drawSizes(); });
$('addBtn').addEventListener('click', () => {
  addLine({ key: size.id, name: 'Mysore Pak · ' + size.label, detail: size.detail, price: size.price, qty });
  $('addedMsg').textContent = `Added ${qty} × ${size.label}.`; qty = 1; drawSizes(); openSheet('cartSheet');
});
function addLine(l) { const hit = cart.find(x => x.key === l.key); if (hit) hit.qty = Math.min(50, hit.qty + l.qty); else cart.push(l); persist(); drawCart(); }
function totals() {
  const sub = cart.reduce((s, l) => s + l.price * l.qty, 0);
  const ship = sub === 0 || sub >= CONFIG.freeShipOver || cart.some(l => l.key.startsWith('sub-')) ? 0 : CONFIG.shipFee;
  return { sub, ship, total: sub + ship };
}
const sumHTML = t => `<span>Subtotal</span><span class="num">${inr(t.sub)}</span><span>Delivery</span><span class="num">${t.ship ? inr(t.ship) : 'Free'}</span><span class="t">Total</span><span class="num t">${inr(t.total)}</span>`;
function drawCart() {
  $('cartCount').textContent = cart.reduce((s, l) => s + l.qty, 0);
  if (!cart.length) { $('lines').innerHTML = '<p class="empty-cart">Your cart is empty. The Mysore Pak is waiting.</p>'; $('cartSum').innerHTML = ''; $('toCheckout').hidden = true; return; }
  const t = totals(); $('toCheckout').hidden = false;
  $('lines').innerHTML = cart.map((l, i) => `<div class="line"><strong>${esc(l.name)}</strong><span class="num">${inr(l.price * l.qty)}</span><span class="meta">${esc(l.detail)}</span><span class="ctl"><span class="qty"><button type="button" data-dec="${i}" aria-label="Fewer">−</button><output>${l.qty}</output><button type="button" data-inc="${i}" aria-label="More">+</button></span><button class="link" type="button" data-rm="${i}">Remove</button></span></div>`).join('');
  $('cartSum').innerHTML = sumHTML(t) + (t.ship ? `<span class="small" style="grid-column:1/-1">Add ${inr(CONFIG.freeShipOver - t.sub)} more for free delivery.</span>` : '');
}
$('lines').addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b) return;
  if (b.dataset.inc) cart[+b.dataset.inc].qty = Math.min(50, cart[+b.dataset.inc].qty + 1);
  if (b.dataset.dec) { const l = cart[+b.dataset.dec]; l.qty -= 1; if (l.qty < 1) cart.splice(+b.dataset.dec, 1); }
  if (b.dataset.rm) cart.splice(+b.dataset.rm, 1);
  persist(); drawCart();
});

/* ---------- sheets ---------- */
const SHEETS = ['cartSheet', 'checkoutSheet', 'doneSheet'];
let lastFocus = null;
function openSheet(id) { SHEETS.forEach(s => $(s).hidden = s !== id); $('scrim').hidden = false; lastFocus = lastFocus || document.activeElement; const f = $(id).querySelector('button, input'); if (f) f.focus(); }
function closeSheets() { SHEETS.forEach(s => $(s).hidden = true); $('scrim').hidden = true; if (lastFocus) lastFocus.focus(); lastFocus = null; }
$('openCart').addEventListener('click', () => { drawCart(); openSheet('cartSheet'); });
$('scrim').addEventListener('click', closeSheets);
document.querySelectorAll('[data-close]').forEach(b => b.addEventListener('click', closeSheets));
document.addEventListener('keydown', e => { if (e.key === 'Escape' && !$('scrim').hidden) closeSheets(); });
$('toCheckout').addEventListener('click', () => { $('checkoutSum').innerHTML = sumHTML(totals()); $('cErr').textContent = ''; openSheet('checkoutSheet'); });
function showDone(oid, text) {
  $('oid').textContent = oid; $('orderText').textContent = text;
  $('waLink').hidden = !CONFIG.whatsapp; $('setupNote').hidden = !!CONFIG.whatsapp;
  if (CONFIG.whatsapp) $('waLink').href = 'https://wa.me/' + CONFIG.whatsapp + '?text=' + encodeURIComponent(text);
  openSheet('doneSheet');
}
$('checkoutForm').addEventListener('submit', e => {
  e.preventDefault();
  const v = id => $(id).value.trim();
  const phone = v('cPhone').replace(/\D/g, '').slice(-10), pin = v('cPin');
  let err = '';
  if (!v('cName')) err = 'Please add your name.';
  else if (phone.length !== 10) err = 'Mobile number should be 10 digits.';
  else if (!v('cAddr') || !v('cCity')) err = 'Please add your full address and city.';
  else if (!/^\d{6}$/.test(pin)) err = 'PIN code should be 6 digits.';
  else if (v('cEmail') && !$('cEmail').checkValidity()) err = 'That email looks incomplete.';
  $('cErr').textContent = err; if (err || !cart.length) return;
  const t = totals(), oid = 'TS-' + Date.now().toString(36).toUpperCase().slice(-6);
  const text = [`New Thoda Sa order ${oid}`, ...cart.map(l => `${l.qty} × ${l.name} (${l.detail}) = ${inr(l.price * l.qty)}`), `Delivery: ${t.ship ? inr(t.ship) : 'Free'}`, `Total: ${inr(t.total)}`, '', `Name: ${v('cName')}`, `Mobile: ${phone}`, v('cEmail') ? `Email: ${v('cEmail')}` : '', `Address: ${v('cAddr')}, ${v('cCity')} ${pin}`, v('cNote') ? `Gift message: ${v('cNote')}` : ''].filter(Boolean).join('\n');
  cart = []; persist(); drawCart(); $('checkoutForm').reset(); showDone(oid, text);
});
$('copyOrder').addEventListener('click', async () => {
  try { await navigator.clipboard.writeText($('orderText').textContent); $('copyOrder').textContent = 'Copied'; } catch (e) { $('copyOrder').textContent = 'Select the text to copy'; }
});

/* ---------- gifting ---------- */
$('subMonths').addEventListener('change', () => { $('subPrice').textContent = inr(+$('subMonths').value * 549); });
$('subForm').addEventListener('submit', e => {
  e.preventDefault();
  const m = +$('subMonths').value, city = $('subCity').value.trim(), note = $('subNote').value.trim();
  if (!city) { $('subMsg').textContent = 'Add the city your parents live in.'; return; }
  addLine({ key: `sub-${m}-${city.toLowerCase()}`, name: `Monthly signature box · ${m} months`, detail: `To ${city}${note ? ' · note: ' + note : ''}`, price: m * 549, qty: 1 });
  $('subMsg').textContent = 'Added to cart. The delivery address goes in at checkout.'; openSheet('cartSheet');
});
$('bulkForm').addEventListener('submit', e => {
  e.preventDefault();
  const q = +$('bulkQty').value, phone = $('bulkPhone').value.replace(/\D/g, '');
  if (!$('bulkOrg').value.trim() || q < 25 || !$('bulkDate').value || phone.length < 10) { $('bulkErr').textContent = 'Fill in every field. Bulk orders start at 25.'; return; }
  $('bulkErr').textContent = '';
  const oid = 'TS-B' + Date.now().toString(36).toUpperCase().slice(-5);
  showDone(oid, `Bulk quote request ${oid}\nFor: ${$('bulkOrg').value.trim()}\nHow many: ${q}\nNeeded by: ${$('bulkDate').value}\nPhone: ${phone}`);
});
$('bulkDate').min = new Date(Date.now() + 7 * 864e5).toISOString().slice(0, 10);

/* ---------- Spot the Sugar ---------- */
let round = 0, score = 0, answer = 0;
const plates = [...document.querySelectorAll('.plate')];
function newRound() { answer = Math.random() < 0.5 ? 0 : 1; plates.forEach(p => { p.disabled = false; p.classList.remove('right', 'wrong'); }); $('gameMsg').textContent = `Round ${round + 1} of 3. Which one is ours?`; }
plates.forEach(p => p.addEventListener('click', () => {
  if (p.disabled) return;
  const ok = +p.dataset.p === answer; if (ok) score += 1; round += 1;
  plates.forEach(x => x.disabled = true); plates[answer].classList.add('right'); if (!ok) p.classList.add('wrong');
  if (round < 3) { $('gameMsg').textContent = ok ? 'Right. Lucky guess?' : 'That one had sugar.'; setTimeout(newRound, 1100); }
  else $('gameMsg').textContent = `You got ${score} of 3. ${score === 3 ? 'Impressive, but a coin gets there 1 time in 8.' : 'About what a coin toss gets.'} Now try it with real pieces.`;
}));
$('gameReset').addEventListener('click', () => { round = 0; score = 0; newRound(); });
newRound(); drawSizes(); drawCart();

/* ---------- header ---------- */
const bar = document.querySelector('.top');
const onScroll = () => bar.classList.toggle('scrolled', window.scrollY > 10);
window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

/* ---------- motion ---------- */
const intro = $('intro');
const gsap = window.gsap, ST = window.ScrollTrigger;
if (!gsap || !ST || reduced) {
  intro.remove(); document.documentElement.classList.add('no-anim');
} else {
  gsap.registerPlugin(ST);
  // split headings into words
  document.querySelectorAll('.split, section h2').forEach(el => {
    if (el.querySelector('.w')) return;
    const walk = node => [...node.childNodes].forEach(n => {
      if (n.nodeType === 3) {
        const frag = document.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach(t => {
          if (!t) return;
          if (/^\s+$/.test(t)) { frag.append(t); return; }
          const w = document.createElement('span'); w.className = 'w';
          const i = document.createElement('span'); i.textContent = t; w.append(i); frag.append(w);
        });
        n.replaceWith(frag);
      } else if (n.nodeType === 1 && n.tagName !== 'BR') walk(n);
    });
    walk(el);
  });

  // intro
  const tl = gsap.timeline();
  tl.from('.intro-mark > *', { y: 24, opacity: 0, stagger: 0.12, duration: 0.7, ease: 'power3.out' })
    .to(intro, { yPercent: -100, duration: 0.9, ease: 'power4.inOut', delay: 0.5 })
    .add(() => intro.remove())
    .from('.hero h1 .w > span', { yPercent: 110, duration: 1, stagger: 0.06, ease: 'power4.out' }, '-=0.45')
    .from('.hero .kicker, .hero .lede, .hero .ctas', { y: 20, opacity: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out' }, '-=0.7')
    .fromTo('.hero-ph', { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.3, ease: 'power4.inOut' }, '-=1.1')
    .from('.hero-ph img', { scale: 1.25, duration: 1.6, ease: 'power3.out' }, '<');

  gsap.to('.hero-ph img, .hero-ph .art', { yPercent: 8, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });

  // section headings
  gsap.utils.toArray('section h2').forEach(h => {
    gsap.from(h.querySelectorAll('.w > span'), { yPercent: 110, duration: 0.9, stagger: 0.05, ease: 'power4.out', scrollTrigger: { trigger: h, start: 'top 85%' } });
  });
  // image reveals
  gsap.utils.toArray('.ph').forEach(f => {
    if (f.classList.contains('hero-ph') || f.classList.contains('fill') || f.closest('.rail')) return;
    gsap.fromTo(f, { clipPath: 'inset(18% 8% 0% 8%)', opacity: 0.4 }, { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: f, start: 'top 88%' } });
  });
  gsap.utils.toArray('.steps li, .ing li:not(.swap), details, .gift, .card').forEach(el => {
    gsap.from(el, { y: 26, opacity: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 92%' } });
  });

  // recipe: strike the sugar, bring in the sweetener
  const swap = document.querySelector('.swap');
  gsap.timeline({ scrollTrigger: { trigger: '#ing', start: 'top 65%', end: 'bottom 35%', scrub: 0.6 } })
    .fromTo(swap, { '--strike': 0 }, { '--strike': 1, ease: 'none' })
    .fromTo(swap, { '--newo': 0 }, { '--newo': 1, ease: 'none' });

  // unboxing: frame opens to full bleed
  gsap.fromTo('.unbox-frame', { '--ci': '9%', '--cr': '28px' }, { '--ci': '0%', '--cr': '0px', ease: 'none', scrollTrigger: { trigger: '.unbox', start: 'top 85%', end: 'top 15%', scrub: true } });
  gsap.fromTo('.unbox-frame', { '--zs': 1.15 }, { '--zs': 1, ease: 'none', scrollTrigger: { trigger: '.unbox', start: 'top bottom', end: 'bottom top', scrub: true } });
  gsap.from('.unbox-copy > *', { y: 30, opacity: 0, stagger: 0.12, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: '.unbox-copy', start: 'top 85%' } });

  // collection: horizontal scroll on wide screens
  const mm = gsap.matchMedia();
  mm.add('(min-width: 900px)', () => {
    const wrap = document.querySelector('.rail-wrap'), rail = $('rail');
    wrap.style.overflow = 'hidden';
    const dist = () => Math.max(0, rail.scrollWidth - wrap.clientWidth);
    const t = gsap.to(rail, { x: () => -dist(), ease: 'none', scrollTrigger: { trigger: wrap, start: 'center center', end: () => '+=' + dist(), pin: '.collection', scrub: 0.6, invalidateOnRefresh: true } });
    return () => { wrap.style.overflow = ''; t.scrollTrigger && t.scrollTrigger.kill(); gsap.set(rail, { x: 0 }); };
  });

  // proof curves draw in
  ['#curveKam'].forEach(sel => {
    const p = document.querySelector(sel), len = p.getTotalLength();
    gsap.fromTo(p, { strokeDasharray: len, strokeDashoffset: len }, { strokeDashoffset: 0, duration: 1.8, ease: 'power2.inOut', scrollTrigger: { trigger: '.chartcard', start: 'top 80%' } });
  });
  gsap.from('#curveReg', { opacity: 0, duration: 1.2, scrollTrigger: { trigger: '.chartcard', start: 'top 80%' } });

  // story quote
  gsap.from('.story-quote p', { y: 40, opacity: 0, duration: 1.1, ease: 'power3.out', scrollTrigger: { trigger: '.story', start: 'top 70%' } });
  gsap.from('.foot-mark > *', { yPercent: 40, opacity: 0, stagger: 0.12, duration: 1.1, ease: 'power3.out', scrollTrigger: { trigger: '.site-foot', start: 'top 85%' } });

  window.addEventListener('load', () => ST.refresh());
  document.querySelectorAll('.ph img').forEach(img => img.addEventListener('load', () => ST.refresh(), { once: true }));
}
}
