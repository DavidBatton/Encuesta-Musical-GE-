/* ═══════════════════════════════════════════════════════════
   PLATAFORMA MUSICAL GE — script.js
   TFG: Francisco Ngua Iwango — AAUCA
   Motor genérico compartido por artista.js y consumidores.js
   ═══════════════════════════════════════════════════════════ */

// IMPORTANTE: Reemplaza esta URL con la tuya tras desplegar el Apps Script
// Menú Apps Script → Implementar → Nueva implementación → Aplicación web
// Ejecutar como: Yo | Acceso: Cualquier usuario
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwjTAoWUXntsUjPfTPxeFjJuvOrodb2XmA7c9bXi9-vqjxw68IgzBP1LMINKc4tS-w4/exec';

// ── SVG icons ────────────────────────────────────────────────────────
const SVG = {
  arrowRight:  `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`,
  arrowLeft:   `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>`,
  check:       `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>`,
  checkCircle: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
  alertCircle: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
  checkSmall:  `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
};

// ── Estado ───────────────────────────────────────────────────────────
// Estas variables son inicializadas por artista.js / consumidores.js
// antes de que DOMContentLoaded se dispare:
//   window.SURVEY_TYPE   — 'artista' | 'consumidor'
//   window.SURVEY_LS_KEY — clave localStorage única
//   window.SURVEY_QUESTIONS — array de preguntas
//   window.SURVEY_ACCENT — color CSS var name (ej: '--purple')
//   window.SURVEY_SECTIONS — array de secciones para step-dots

let currentSec = 1;
let TOTAL_SECS = 1; // se calcula en init

// ── Init ─────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Calcular total de secciones únicas en las preguntas
  const secs = [...new Set((window.SURVEY_QUESTIONS || []).map(q => q.sec || 1))];
  TOTAL_SECS = secs.length;

  // Si ya respondió, mostrar pantalla de éxito directamente
  if (localStorage.getItem(window.SURVEY_LS_KEY)) {
    document.getElementById('introScreen').classList.add('hidden');
    const ss = document.getElementById('successScreen');
    ss.classList.add('active');
    const p = ss.querySelector('p');
    if (p) p.innerHTML = 'Ya has participado en esta encuesta. Tu respuesta fue registrada correctamente.<br/>Gracias por tu colaboración.';
    return;
  }

  buildStepDots();
  createToast();
});

// ── Step dots ────────────────────────────────────────────────────────
function buildStepDots() {
  const wrap = document.getElementById('stepDots');
  if (!wrap) return;
  wrap.innerHTML = Array.from({ length: TOTAL_SECS }, (_, i) =>
    `<div class="step-dot" id="dot-${i + 1}"></div>`
  ).join('');
}

function updateStepDots() {
  for (let i = 1; i <= TOTAL_SECS; i++) {
    const dot = document.getElementById(`dot-${i}`);
    if (!dot) continue;
    dot.className = 'step-dot';
    if (i < currentSec) dot.classList.add('done');
    else if (i === currentSec) dot.classList.add('active');
  }
}

// ── Toast ─────────────────────────────────────────────────────────────
function createToast() {
  if (document.getElementById('toast')) return;
  const t = document.createElement('div');
  t.id = 'toast';
  t.innerHTML = `<span class="toast-icon"></span><span class="toast-text"></span>`;
  document.body.appendChild(t);
}

function showToast(msg, type = 'error') {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.querySelector('.toast-icon').innerHTML = type === 'error' ? SVG.alertCircle : SVG.checkSmall;
  toast.querySelector('.toast-text').textContent = msg;
  toast.className = type === 'error' ? 'toast-error' : 'toast-success';
  toast.classList.remove('show');
  void toast.offsetWidth; // reflow para reiniciar animación
  toast.classList.add('show');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('show'), 3500);
}

// ── Errores ───────────────────────────────────────────────────────────
function markBlockError(block) {
  block.classList.add('has-error');
  if (!block.querySelector('.error-msg')) {
    const msg = document.createElement('div');
    msg.className = 'error-msg';
    msg.innerHTML = `${SVG.alertCircle} Esta pregunta es obligatoria`;
    block.appendChild(msg);
  }
  block.querySelectorAll('input').forEach(inp =>
    inp.addEventListener('change', () => clearBlockError(block), { once: true })
  );
}

function clearBlockError(block) {
  block.classList.remove('has-error');
  block.querySelector('.error-msg')?.remove();
}

// ── Iniciar encuesta ──────────────────────────────────────────────────
function startSurvey() {
  document.getElementById('introScreen').classList.add('hidden');
  document.getElementById('surveyWrap').classList.add('active');
  document.getElementById('navBar').classList.remove('hidden');
  document.getElementById('stepCounter').style.display = 'block';
  document.getElementById('btnBack').style.display = 'none';
  currentSec = 1;
  // Activar la primera sección (no tiene 'active' en el HTML para evitar
  // que el formulario sea visible antes de pulsar "Comenzar")
  getSection(1)?.classList.add('active');
  updateProgress();
  updateStepDots();
  updateNavButtons();
}

// ── Progreso ──────────────────────────────────────────────────────────
function updateProgress() {
  // Mostrar al menos 8% en la primera sección para dar feedback visual
  const pct = TOTAL_SECS > 1
    ? Math.max(8, ((currentSec - 1) / (TOTAL_SECS - 1)) * 100)
    : 100;
  document.getElementById('progressBar').style.width = pct + '%';
  const counter = document.getElementById('stepCounter');
  if (counter) counter.textContent = `${currentSec} / ${TOTAL_SECS}`;
}

// ── Botones de navegación ─────────────────────────────────────────────
function updateNavButtons() {
  const btnBack = document.getElementById('btnBack');
  const btnNext = document.getElementById('btnNext');
  btnBack.style.display = currentSec === 1 ? 'none' : 'flex';
  if (currentSec === TOTAL_SECS) {
    btnNext.innerHTML = `Enviar encuesta <span class="icon">${SVG.check}</span>`;
    btnNext.className = 'btn-nav btn-submit';
    btnNext.onclick = enviar;
  } else {
    btnNext.innerHTML = `Siguiente <span class="icon">${SVG.arrowRight}</span>`;
    btnNext.className = 'btn-nav btn-next';
    btnNext.onclick = next;
  }
}

function getSection(n) {
  return document.querySelector(`.section[data-sec="${n}"]`);
}

// ── Validación ────────────────────────────────────────────────────────
function validateCurrent() {
  const sec = getSection(currentSec);
  if (!sec) return true;

  let firstError = null;
  let errorCount = 0;

  // Limpiar errores previos
  sec.querySelectorAll('.has-error').forEach(el => el.classList.remove('has-error'));
  sec.querySelectorAll('.error-msg').forEach(el => el.remove());

  // Radios obligatorios (excluye bloques ocultos)
  const radioNames = new Set(
    [...sec.querySelectorAll('input[type="radio"][required]')]
      .filter(r => {
        const bloque = r.closest('[id^="bloque-"]');
        return !bloque || bloque.style.display !== 'none';
      })
      .map(r => r.name)
  );

  for (const name of radioNames) {
    const group = [...sec.querySelectorAll(`input[name="${name}"]`)];
    if (!group.some(r => r.checked)) {
      const block = group[0]?.closest('.q-block');
      if (block) { markBlockError(block); if (!firstError) firstError = block; }
      errorCount++;
    }
  }

  // Checkboxes: al menos uno por grupo (data-group), solo si bloque visible
  const checkGroups = new Set(
    [...sec.querySelectorAll('input[type="checkbox"][data-group]')]
      .filter(c => {
        const bloque = c.closest('[id^="bloque-"]');
        return !bloque || bloque.style.display !== 'none';
      })
      .map(c => c.dataset.group)
  );

  for (const group of checkGroups) {
    const boxes = [...sec.querySelectorAll(`input[type="checkbox"][data-group="${group}"]`)]
      .filter(c => {
        const bloque = c.closest('[id^="bloque-"]');
        return !bloque || bloque.style.display !== 'none';
      });
    if (boxes.length > 0 && !boxes.some(b => b.checked)) {
      const block = boxes[0]?.closest('.q-block');
      if (block) { markBlockError(block); if (!firstError) firstError = block; }
      errorCount++;
    }
  }

  if (errorCount > 0) {
    showToast(
      errorCount === 1
        ? 'Hay 1 pregunta obligatoria sin responder.'
        : `Hay ${errorCount} preguntas obligatorias sin responder.`,
      'error'
    );
    firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return false;
  }
  return true;
}

// ── Siguiente ─────────────────────────────────────────────────────────
function next() {
  if (!validateCurrent()) return;
  getSection(currentSec).classList.remove('active');
  currentSec++;
  getSection(currentSec)?.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  updateProgress();
  updateStepDots();
  updateNavButtons();
}

// ── Anterior ──────────────────────────────────────────────────────────
function back() {
  getSection(currentSec).classList.remove('active');
  currentSec--;
  getSection(currentSec)?.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  updateProgress();
  updateStepDots();
  updateNavButtons();
}

// ── Recopilar datos ───────────────────────────────────────────────────
function collectData() {
  const data = { type: window.SURVEY_TYPE };
  const questions = window.SURVEY_QUESTIONS || [];

  if (questions.length === 0) {
    // Fallback: leer todos los inputs del formulario directamente
    console.warn('[survey] SURVEY_QUESTIONS no disponible, leyendo DOM directamente');
    const names = new Set([...document.querySelectorAll('#form input[name]')].map(i => i.name));
    names.forEach(name => {
      const checks = [...document.querySelectorAll(`input[name="${name}"][type="checkbox"]:checked`)];
      if (checks.length > 0) {
        data[name] = checks.map(c => c.value);
      } else {
        const radio = document.querySelector(`input[name="${name}"]:checked`);
        data[name] = radio ? radio.value : '';
      }
    });
    return data;
  }

  questions.forEach(q => {
    if (q.type === 'checkbox') {
      const checked = [...document.querySelectorAll(`input[name="${q.id}"]:checked`)]
        .map(c => c.value);
      data[q.id] = checked;
    } else {
      const checked = document.querySelector(`input[name="${q.id}"]:checked`);
      data[q.id] = checked ? checked.value : '';
    }
  });

  return data;
}

// ── Enviar ────────────────────────────────────────────────────────────
function enviar() {
  if (!validateCurrent()) return;

  const data = collectData();
  const btnNext = document.getElementById('btnNext');
  btnNext.innerHTML = 'Enviando...';
  btnNext.disabled = true;

  // Modo desarrollo: URL no configurada
  if (!SCRIPT_URL || SCRIPT_URL === 'TU_URL_APPS_SCRIPT_AQUI') {
    console.log('[DEV] Payload que se enviaría:', data);
    setTimeout(mostrarExito, 800);
    return;
  }

  // Iframe oculto para evitar problemas de CORS con Apps Script
  const form = document.createElement('form');
  form.method = 'POST';
  form.action = SCRIPT_URL;
  form.target = 'hidden-iframe';
  form.style.display = 'none';

  const input = document.createElement('input');
  input.type = 'hidden';
  input.name = 'payload';
  input.value = JSON.stringify(data);
  form.appendChild(input);

  let iframe = document.getElementById('hidden-iframe');
  if (!iframe) {
    iframe = document.createElement('iframe');
    iframe.id = 'hidden-iframe';
    iframe.name = 'hidden-iframe';
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
  }

  document.body.appendChild(form);
  form.submit();
  setTimeout(mostrarExito, 1200);
}

// ── Pantalla de éxito ─────────────────────────────────────────────────
function mostrarExito() {
  localStorage.setItem(window.SURVEY_LS_KEY, '1');
  document.getElementById('surveyWrap').style.display = 'none';
  document.getElementById('navBar').classList.add('hidden');
  document.getElementById('successScreen').classList.add('active');
  document.getElementById('progressBar').style.width = '100%';
  document.getElementById('stepCounter').textContent = 'Completado';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
