/* ═══════════════════════════════════════════════════════════
   PLATAFORMA MUSICAL GE — consumidores.js
   TFG: Francisco Ngua Iwango — AAUCA
   Configuración específica de la encuesta para consumidores
   ═══════════════════════════════════════════════════════════ */

// Configuración de esta encuesta (leída por script.js)
window.SURVEY_TYPE   = 'consumidor';
window.SURVEY_LS_KEY = 'fran_consumidor_enviada';

// Preguntas agrupadas por sección (sec: número de sección para step-dots)
window.SURVEY_QUESTIONS = [
  // ── Sección 1: Perfil del consumidor ──────────────────────────────
  {
    id: 'q1', sec: 1,
    title: '1. ¿Cuál es su rango de edad?',
    type: 'radio',
    options: ['Menos de 18 años', '18 – 25 años', '26 – 35 años', '36 – 45 años', 'Más de 45 años']
  },
  {
    id: 'q2', sec: 1,
    title: '2. ¿Escucha música de artistas ecuatoguineanos?',
    type: 'radio',
    options: ['Sí, frecuentemente', 'A veces', 'Rara vez', 'Nunca']
  },
  {
    id: 'q3', sec: 1,
    title: '3. ¿Dónde suele escuchar música habitualmente?',
    hint: 'Puede marcar varias opciones',
    type: 'checkbox',
    options: ['YouTube', 'Redes sociales', 'Música descargada', 'Plataformas internacionales', 'Discotecas / eventos']
  },

  // ── Sección 2: Hábitos de compra ──────────────────────────────────
  {
    id: 'q4', sec: 2,
    title: '4. ¿Ha comprado alguna vez música local en formato digital?',
    type: 'radio',
    options: ['Sí', 'No']
  },
  {
    id: 'q5', sec: 2,
    title: '5. ¿Cuánto suele pagar por una canción digital?',
    type: 'radio',
    options: ['Menos de 200 XAF', '200 XAF', 'Más de 200 XAF', 'Nunca he comprado música']
  },
  {
    id: 'q6', sec: 2,
    title: '6. ¿Cree que los artistas locales reciben ingresos justos por su música?',
    type: 'radio',
    options: ['Sí', 'No', 'No lo sé']
  },

  // ── Sección 3: Disposición a pagar ────────────────────────────────
  {
    id: 'q7', sec: 3,
    title: '7. ¿Pagaría 200 XAF para descargar legalmente una canción local?',
    type: 'radio',
    options: ['Sí', 'No', 'Tal vez']
  },
  {
    id: 'q8', sec: 3,
    title: '8. ¿Contrataría un pase semanal de música ilimitada si el precio es razonable?',
    type: 'radio',
    options: ['Sí', 'No', 'Depende del precio']
  },
  {
    id: 'q9', sec: 3,
    title: '9. ¿Cuál es su disposición general a pagar por música local digital?',
    type: 'radio',
    options: ['1 – Ninguna', '2 – Poca', '3 – Neutral', '4 – Dispuesto/a', '5 – Muy dispuesto/a']
  },

  // ── Sección 4: Pagos digitales ─────────────────────────────────────
  {
    id: 'q10', sec: 4,
    title: '10. ¿Tiene usted una cuenta de MUNI Dinero?',
    type: 'radio',
    options: ['Sí', 'No']
  },
  {
    id: 'q11', sec: 4,
    title: '11. ¿Se sentiría cómodo/a realizando micro-pagos por música?',
    type: 'radio',
    options: ['Sí', 'No', 'A veces']
  },
  {
    id: 'q12', sec: 4,
    title: '12. ¿Cree que los pagos electrónicos facilitan el acceso a la música local?',
    type: 'radio',
    options: ['Sí', 'No', 'No lo sé']
  },

  // ── Sección 5: Valoración final ────────────────────────────────────
  {
    id: 'q13', sec: 5,
    title: '13. ¿Qué tan importante le parece proteger económicamente a los artistas locales?',
    type: 'radio',
    options: ['Muy importante', 'Importante', 'Poco importante', 'No es necesario']
  },
  {
    id: 'q14', sec: 5,
    title: '14. ¿Apoyaría un sistema donde el dinero llegue directamente al artista?',
    type: 'radio',
    options: ['Sí', 'No', 'Tal vez']
  },
  {
    id: 'q15', sec: 5,
    title: '15. ¿Usaría esta plataforma si fuera sencilla y accesible desde su móvil?',
    type: 'radio',
    options: ['Sí', 'No', 'Depende de la experiencia']
  }
];
