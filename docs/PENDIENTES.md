# Pendientes e ideas

## En curso
- **Santas temáticos** — `js/santas.js` genera cada Santa (`santaSVG(id)`), galería en `preview/santas.html`.
  Hechos: clasico, rockero, veraniego, andino. Falta decidir con el usuario:
  1. Cuáles van y si hay ajustes.
  2. Cómo se alternan (uno por día según la fecha, al azar en cada visita, o uno distinto cada vez que se toca).
  3. Luego integrar: reemplazar el SVG de `#big-santa` en `index.html` por `santaSVG(...)` (mantiene las
     clases `.arm--left/.arm--right/.belly/.head`; el brazo izquierdo nuevo gira con
     `transform-box: view-box; transform-origin: 62px 168px`) y actualizar la cabeza del modal.
- Ideas extra de Santas propuestas al usuario: futbolero (camiseta de Perú), chef/panetón, DJ, surfista,
  astronauta, mago, Santa en pijama, Santa marinero/caballito de totora, Santa cumbiero.

## Después
- Limpiar la UI: quitar textos sobrantes (el usuario lo pedirá cuando todo esté implementado).
