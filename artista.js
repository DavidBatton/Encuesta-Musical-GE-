/* ═══════════════════════════════════════════════════════════
   PLATAFORMA MUSICAL GE — artista.js
   TFG: Francisco Ngua Iwango — AAUCA
   Configuración específica de la encuesta para artistas
   ═══════════════════════════════════════════════════════════ */

// Configuración de esta encuesta (leída por script.js)
window.SURVEY_TYPE   = 'artista';
window.SURVEY_LS_KEY = 'fran_artista_enviada';

// Preguntas agrupadas por sección (sec: número de sección para step-dots)
window.SURVEY_QUESTIONS = [
  // ── Sección 1: Perfil del artista ──────────────────────────────────
  {
    id: 'q1', sec: 1,
    title: '1. Género musical principal',
    type: 'radio',
    options: ['Afrobeat', 'Gospel', 'Hip-hop / Rap', 'Makossa', 'Otro']
  },
  {
    id: 'q2', sec: 1,
    title: '2. ¿Cuántos años lleva activo como artista?',
    type: 'radio',
    options: ['Menos de 1 año', '1 – 3 años', '4 – 7 años', 'Más de 7 años']
  },
  {
    id: 'q3', sec: 1,
    title: '3. ¿Cómo genera ingresos actualmente?',
    hint: 'Puede marcar varias opciones',
    type: 'checkbox',
    options: ['Conciertos', 'Eventos privados', 'Streaming', 'Venta directa', 'No genero ingresos']
  },

  // ── Sección 2: Ingresos y compensación ────────────────────────────
  {
    id: 'q4', sec: 2,
    title: '4. ¿Recibe ingresos cuando venden o reproducen su música?',
    type: 'radio',
    options: ['Sí', 'No', 'No lo sé']
  },
  {
    id: 'q5', sec: 2,
    title: '5. ¿Recibe compensación cuando su música suena en discotecas o eventos?',
    type: 'radio',
    options: ['Siempre', 'A veces', 'Nunca']
  },
  {
    id: 'q6', sec: 2,
    title: '6. ¿Cuál es su nivel de satisfacción con sus ingresos actuales?',
    type: 'radio',
    options: ['1 – Muy insatisfecho', '2 – Insatisfecho', '3 – Neutral', '4 – Satisfecho', '5 – Muy satisfecho']
  },

  // ── Sección 3: Plataforma nacional ────────────────────────────────
  {
    id: 'q7', sec: 3,
    title: '7. ¿Registraría su música en una plataforma nacional de distribución?',
    type: 'radio',
    options: ['Sí', 'No', 'Depende de las condiciones']
  },
  {
    id: 'q8', sec: 3,
    title: '8. ¿Usaría la plataforma si garantiza transparencia en los ingresos?',
    type: 'radio',
    options: ['Sí', 'No', 'Tal vez']
  },
  {
    id: 'q9', sec: 3,
    title: '9. ¿La usaría como canal principal de distribución si genera ingresos reales?',
    type: 'radio',
    options: ['Sí', 'No', 'Depende']
  },
  {
    id: 'q10', sec: 3,
    title: '10. ¿Qué tan importante es el reconocimiento oficial del Ministerio de Cultura?',
    type: 'radio',
    options: ['Muy importante', 'Importante', 'Poco importante', 'No es necesario']
  },

  // ── Sección 4: Modelo económico ────────────────────────────────────
  {
    id: 'q11', sec: 4,
    title: '11. ¿Le parece justo un modelo donde el 40% de los ingresos va al artista?',
    type: 'radio',
    options: ['Sí', 'No', 'Necesito más información']
  },
  {
    id: 'q12', sec: 4,
    title: '12. ¿Aceptaría recibir micro-pagos por cada reproducción o descarga?',
    type: 'radio',
    options: ['Sí', 'No', 'Depende del volumen']
  },
  {
    id: 'q13', sec: 4,
    title: '13. ¿Cree que MUNI Dinero es una opción viable para recibir pagos?',
    type: 'radio',
    options: ['Sí', 'No', 'No conozco MUNI Dinero']
  },

  // ── Sección 5: Valoración final ────────────────────────────────────
  {
    id: 'q14', sec: 5,
    title: '14. ¿Qué tan beneficiosa sería esta iniciativa para los artistas ecuatoguineanos?',
    type: 'radio',
    options: ['1 – Nada beneficiosa', '2 – Poco beneficiosa', '3 – Moderadamente', '4 – Beneficiosa', '5 – Muy beneficiosa']
  },
  {
    id: 'q15', sec: 5,
    title: '15. ¿Participaría en un proyecto piloto de esta plataforma?',
    type: 'radio',
    options: ['Sí', 'No', 'Tal vez']
  }
];
