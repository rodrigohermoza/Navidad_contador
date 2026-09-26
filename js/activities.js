// 28 actividades navideñas, una por día.
// Pendiente: el usuario enviará los textos reales. Por ahora son marcadores.
// Rango asumido: del 27 de noviembre al 24 de diciembre (28 días).
// (Aún no se usan en la UI: la caja de regalo + Santa vendrán después.)
window.ACTIVITIES_START = { month: 10, day: 27 }; // month es 0-indexado (10 = noviembre)

window.ACTIVITIES = Array.from({ length: 28 }, (_, i) => ({
  day: i + 1,
  text: `Actividad ${i + 1} (pendiente)`,
}));
