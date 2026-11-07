# Pendientes e ideas

## En curso
- **Santas temáticos** — `js/santas.js` genera cada Santa (`santaSVG(id)`), galería en `preview/santas.html`.
  Hechos (9): clasico, rockero, veraniego, andino, futbolero, dj, mago, pijama, chef. Falta decidir con el usuario:
  1. Cuáles van y si hay ajustes.
  2. Cómo se alternan (uno por día según la fecha, al azar en cada visita, o uno distinto cada vez que se toca).
  3. Luego integrar: reemplazar el SVG de `#big-santa` en `index.html` por `santaSVG(...)` (mantiene las
     clases `.arm--left/.arm--right/.belly/.head`; el brazo izquierdo nuevo gira con
     `transform-box: view-box; transform-origin: 62px 168px`) y actualizar la cabeza del modal.
- Otras ideas propuestas (no pedidas aún): cumbiero, del Titicaca (caballito de totora), limeño con emoliente,
  marinera, karaoke, disco, esquiador, surfista, astronauta, ciclista, pirata, superhéroe, vampiro tierno,
  repostero (galletas de jengibre), lector, cinéfilo. Idea: que el Santa del día combine con la actividad.

## Después
- Limpiar la UI: quitar textos sobrantes (el usuario lo pedirá cuando todo esté implementado).
