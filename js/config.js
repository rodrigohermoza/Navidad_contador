// ============================================================
//  CONFIGURACIÓN DE DECORACIONES
//  Cambia true/false para prender o apagar cada decoración.
//  Guarda el archivo y recarga la página (Cmd + Shift + R).
// ============================================================
window.DECOR = {
  // Luces del borde (arriba y costados)
  lights: {
    bulbsPerSegment: 4,   // bombillas por cada curva del cable (antes 3)
    sideLength: 0.5,      // cuánto bajan por los costados (0.38 = 38% de la pantalla)
  },

  ornaments: true,        // bolas navideñas colgando desde arriba
  ground: true,           // colinas nevadas abajo con pinos y regalos
  treeLights: true,       // lucecitas de colores en los pinos de abajo (requiere ground)
  stars: true,            // destellos dorados titilando en el fondo
  bigSnowflakes: true,    // copos de nieve grandes y suaves girando en el fondo

  // Renos volando (el de adelante es Rudolph, con la nariz roja)
  reindeer: {
    enabled: true,
    count: 9,             // cuántos renos (Rudolph adelante + el resto en parejas)
    everySeconds: [18, 35], // cada cuánto pasan (mínimo, máximo)
    firstAfter: 4,        // segundos hasta la primera pasada
  },
};
