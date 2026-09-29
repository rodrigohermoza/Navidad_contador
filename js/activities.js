// 25 actividades navideñas: una por día, del 1 al 25 de diciembre.
// La posición en la lista = el día de diciembre (la primera es el 1, la última el 25).
window.ACTIVITIES = [
  "Decorar la casa full navidad",
  "Ver Una Navidad de locos",
  "Leer Los fantasmas de Scrooge",
  "Decorar galletas de jengibre + la casita de jengibre",
  "Hacer chocolatada navideña (full canela, nuez moscada, azúcar)",
  "Ver Santa Cláusula 1",
  "Organizar intercambio de regalos",
  "Hacer cócteles navideños",
  "Jugar bingo navideño",
  "Ver Las crónicas de Navidad 1",
  "Blastear playlist navideña",
  "Organizar fiesta navideña",
  "Ver Klaus",
  "Hacer cartita a Santa",
  "Ver Arthur Christmas",
  "Preparar galletas y chocolatada para Santa, zanahorias para los renos",
  "Jugar tutifrutti navideño",
  "Intercambio de regalos",
  "Jugar charadas navideñas",
  "Día de sweater navideño",
  "Fiesta navideña con amigos",
  "Ver El Grinch",
  "Compras navideñas de último minuto",
  "Cena navideña familiar",
  "Mañana navideña de películas y recalentado",
];

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
