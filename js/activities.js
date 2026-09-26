// 28 actividades navideñas: del 1 al 28 de diciembre (una por día).
// Pendiente: el usuario enviará los textos reales. Por ahora son marcadores.
window.ACTIVITIES = Array.from({ length: 28 }, (_, i) => `Actividad ${i + 1} (pendiente)`);

// Fecha "de hoy". Para probar otro día: ?fecha=2026-12-05 en la URL.
window.getNow = function () {
  const m = new URLSearchParams(location.search).get("fecha");
  const now = new Date();
  if (!m || !/^\d{4}-\d{2}-\d{2}$/.test(m)) return now;
  const [y, mo, d] = m.split("-").map(Number);
  return new Date(y, mo - 1, d, now.getHours(), now.getMinutes(), now.getSeconds());
};

// Devuelve { day, text } si hoy toca actividad, o { status: "before" | "after" }.
window.todayActivity = function (now = window.getNow()) {
  const dec = now.getMonth() === 11;
  if (dec && now.getDate() <= window.ACTIVITIES.length) {
    return { day: now.getDate(), text: window.ACTIVITIES[now.getDate() - 1] };
  }
  return { status: dec ? "after" : "before" };
};
