// Año dinámico
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Menú móvil
const hamb = document.querySelector('.hamb');
const menu = document.querySelector('.menu');
if (hamb && menu) {
  hamb.addEventListener('click', () => {
    const open = menu.style.display === 'flex';
    menu.style.display = open ? 'none' : 'flex';
    menu.style.flexDirection = 'column';
    menu.style.gap = '4px';
    hamb.setAttribute('aria-expanded', String(!open));
  });
}

// Testimonios — carrusel simple
const data = [
  {
    name: 'Andrea Ríos',
    role: 'Senior Agile Manager | Product Owner — Adage LATAM',
    photo: 'https://images.unsplash.com/photo-1573496799515-eebbb63814f2?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2069',
    quote: 'Contigo hice una apuesta al contratarte, y no me equivoqué. El resultado superó expectativas.'
  },
  {
    name: 'Carlos Sánchez',
    role: 'CTO — NovaTech',
    photo: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=1200&auto=format&fit=crop',
    quote: 'Gran criterio de diseño y excelente ejecución front‑end. Comunicación impecable y entregas puntuales.'
  },
  {
    name: 'María López',
    role: 'Head of Marketing — Brava',
    photo: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=1200&auto=format&fit=crop',
    quote: 'Logró convertir ideas difusas en una web clara, rápida y que convierte.'
  }
];

let i = 0;
const slide = document.getElementById('slide');
function render(){
  if(!slide) return;
  const t = data[i];
  slide.innerHTML = `
    <div class="pic"><img src="${t.photo}" alt="${t.name}"/></div>
    <div class="quote">
      <p>“${t.quote}”</p>
      <strong>${t.name}</strong><br/>
      <span style="color:var(--muted)">${t.role}</span>
    </div>
  `;
}
render();

const prev = document.getElementById('prev');
const next = document.getElementById('next');
if (prev && next){
  prev.addEventListener('click', ()=>{ i = (i - 1 + data.length) % data.length; render(); });
  next.addEventListener('click', ()=>{ i = (i + 1) % data.length; render(); });
}

// Scroll suave
const anchors = document.querySelectorAll('a[href^="#"]');
anchors.forEach(a => {
  a.addEventListener('click', e => {
    const to = document.querySelector(a.getAttribute('href'));
    if (to) { e.preventDefault(); to.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});

// ==============================
// Certificados — Galería + Pop-up
// ==============================

// 1) Inyectamos estilos para la galería y el modal (para no editar style.css)
(function injectCertsStyles(){
  const css = `
  /* Grid de certificados */
 #certificados {
   padding: 20px 0 0 0
 }

 #certificados .container {
   width: min(1140px, 92vw);
   margin-inline: auto
 }

 #certificados .section-head {
   display: flex;
   align-items: center;
   justify-content: center;
   flex-direction: column;
   gap: 6px;
   margin-bottom: 28px;
   text-align: center
 }

 .certs-grid {
   display: grid;
   grid-template-columns: repeat(4, 1fr);
   gap: 14px
 }

 .cert-thumb {
   position: relative;
   border-radius: 14px;
   overflow: hidden;
   border: 1px solid color-mix(in srgb, var(--text) 10%, transparent);
   cursor: pointer;
   background: #fff
 }

 .cert-thumb img {
   width: 100%;
   height: 160px;
   object-fit: cover;
   display: block
 }

 .cert-thumb .caption {
   position: absolute;
   inset: auto 8px 8px 8px;
   background: #f3e9dd;
   color: #E0A743; 
   padding: 6px 8px;
   border-radius: 10px;
   font-size: .85rem
 }

 @media (max-width:980px) {
   .certs-grid {
     grid-template-columns: repeat(3, 1fr)
   }
 }

 @media (max-width:680px) {
   .certs-grid {
     grid-template-columns: repeat(2, 1fr)
   }

   .cert-thumb img {
     height: 130px
   }
 }

 @media (max-width:460px) {
   .certs-grid {
     grid-template-columns: 1fr
   }
 }

 /* Modal (lightbox) */
 .lightbox {
   position: fixed;
   inset: 0;
   background: #8B0000;
   display: none;
   align-items: center;
   justify-content: center;
   padding: 20px;
   z-index: 1000
 }

 .lightbox[aria-hidden="false"] {
   display: flex
 }

 .lightbox .panel {
   position: relative;
   background: var(--surface);
   border-radius: 16px;
   max-width: min(960px, 92vw);
   max-height: 86vh;
   padding: 14px;
   box-shadow: var(--shadow)
 }

 .lightbox img {
   max-width: 100%;
   max-height: 70vh;
   display: block;
   border-radius: 12px
 }

 .lightbox .meta {
   display: flex;
   align-items: center;
   justify-content: space-between;
   gap: 10px;
   margin-top: 8px;
   color: var(--ink-2)
 }

 .lightbox .close,
 .lightbox .arrow {
   width: 40px;
   height: 40px;
   border-radius: 999px;
   border: 1px solid color-mix(in srgb, var(--text) 16%, transparent);
   display: grid;
   place-items: center;
   background: var(--surface);
   cursor: pointer
 }

 .lightbox .nav {
   position: absolute;
   inset: 0;
   display: flex;
   align-items: center;
   justify-content: space-between;
   padding: 0 6px
 }

 .lightbox .nav .arrow {
   opacity: .9
 }

 .title{
  color: #8B0000;
}
  `;
  if(!document.getElementById('certs-styles')){
    const s = document.createElement('style');
    s.id = 'certs-styles';
    s.textContent = css;
    document.head.appendChild(s);
  }
})();

// 2) Datos de certificados (reemplaza URLs y títulos por los tuyos)
const certificates = [
  { src: 'img/certificados/diploma-adobe-xd.jpg',                  title: 'Certificado Adobe XD — 2025' },
  { src: 'img/certificados/diploma-arquitectura-informacion.jpg',  title: 'Arquitectura de la información — 2025' },
  { src: 'img/certificados/diploma-basico-figma.jpg',              title: 'Figma Básico — 2025' },
  { src: 'img/certificados/diploma-figma-sistemas-diseno.jpg',     title: 'Figma para design systems — 2025' }, // <- sin ñ
  { src: 'img/certificados/diploma-javascript.jpg',                title: 'JavaScript — 2025' },
];


// 3) Sección de Certificados (si no existe, la creamos)
(function buildCertificatesSection(){
  // crea la sección si no existe
  let section = document.getElementById('certificados');
  if (!section) {
    section = document.createElement('section');
    section.id = 'certificados';
    section.innerHTML = `
      <div class="container">
        <div class="section-head">
          <h2 class="title">Certificados</h2>
          <p>Algunos logros y formaciones completadas recientemente.</p>
        </div>
        <div class="certs-grid" id="certsGrid"></div>
      </div>
    `;
    const servicios = document.getElementById('servicios');
    (servicios?.parentNode)?.insertBefore(section, servicios.nextSibling);
  }

  // siempre construimos un grid nuevo y reemplazamos el anterior si existe
  const container = section.querySelector('.container');
  const newGrid = document.createElement('div');
  newGrid.className = 'certs-grid';
  newGrid.id = 'certsGrid';
  newGrid.innerHTML = certificates.map((c, idx) => `
    <figure class="cert-thumb" data-idx="${idx}" tabindex="0"
            aria-label="Abrir certificado: ${c.title}">
      <img src="${c.src}" alt="${c.title}" />
      <figcaption class="caption">${c.title}</figcaption>
    </figure>
  `).join('');

  const oldGrid = section.querySelector('#certsGrid');
  if (oldGrid) {
    oldGrid.replaceWith(newGrid);
  } else {
    container.appendChild(newGrid);
  }
})();


// 4) Lightbox (modal)
(function buildLightbox(){
  if(document.querySelector('.lightbox')) return;
  const lb = document.createElement('div');
  lb.className = 'lightbox';
  lb.setAttribute('role','dialog');
  lb.setAttribute('aria-modal','true');
  lb.setAttribute('aria-hidden','true');
  lb.innerHTML = `
    <div class="panel">
      <div class="nav">
        <button class="arrow" data-dir="prev" aria-label="Anterior">←</button>
        <button class="arrow" data-dir="next" aria-label="Siguiente">→</button>
      </div>
      <img id="lbImg" alt="Certificado"/>
      <div class="meta">
        <div id="lbTitle"></div>
        <button class="close" id="lbClose" aria-label="Cerrar">✕</button>
      </div>
    </div>`;
  document.body.appendChild(lb);
})();

let current = 0;
const lb = document.querySelector('.lightbox');
const lbImg = document.getElementById('lbImg');
const lbTitle = document.getElementById('lbTitle');
const lbClose = document.getElementById('lbClose');

function openLightbox(idx){
  current = idx;
  const item = certificates[current];
  if(!item) return;
  lbImg.src = item.src;
  lbTitle.textContent = item.title;
  lb?.setAttribute('aria-hidden','false');
  // Enfoque para accesibilidad
  lbClose?.focus();
}

function closeLightbox(){
  lb?.setAttribute('aria-hidden','true');
}

function navLightbox(dir){
  current = (current + (dir === 'next' ? 1 : -1) + certificates.length) % certificates.length;
  const item = certificates[current];
  lbImg.src = item.src; lbTitle.textContent = item.title;
}

// Eventos de thumbs
const grid = document.getElementById('certsGrid');
if (grid){
  grid.addEventListener('click', (e)=>{
    const fig = e.target.closest('.cert-thumb');
    if(!fig) return;
    openLightbox(parseInt(fig.getAttribute('data-idx'))||0);
  });
  grid.addEventListener('keydown', (e)=>{
    if(e.key === 'Enter' || e.key === ' '){
      const fig = e.target.closest('.cert-thumb');
      if(fig){ e.preventDefault(); openLightbox(parseInt(fig.getAttribute('data-idx'))||0); }
    }
  });
}

// Eventos modal
lb?.addEventListener('click', (e)=>{
  if(e.target === lb) closeLightbox(); // click en overlay
});

lbClose?.addEventListener('click', closeLightbox);

lb?.querySelector('[data-dir="prev"]').addEventListener('click', ()=>navLightbox('prev'));
lb?.querySelector('[data-dir="next"]').addEventListener('click', ()=>navLightbox('next'));

// Teclado: Esc cierra, flechas navegan
document.addEventListener('keydown', (e)=>{
  if(lb?.getAttribute('aria-hidden') === 'true') return;
  if(e.key === 'Escape') closeLightbox();
  if(e.key === 'ArrowLeft') navLightbox('prev');
  if(e.key === 'ArrowRight') navLightbox('next');
});
