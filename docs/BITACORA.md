# Bitácora

Formato: fecha — pedido del usuario → qué se hizo (decisiones). Lo más nuevo al final.

## 2026-09-26
- Pedido inicial: contador a Navidad con paisaje nevado, 28 actividades (luego fueron 25), caja de regalo →
  Santa, reno de vez en cuando, colores rojo/blanco/verde. → Página estática con paisaje SVG (luna, montañas,
  pinos, cabaña) + nieve en canvas + contador. Hosting recomendado sin backend.
- No se pudo hacer `git push` (sin credenciales en la terminal) → el usuario usa GitHub Desktop.
- Actividades pasan a 1–28 dic (luego 1–25). Caja de regalo + modal con Santa.
- Video de fondo: el usuario pidió ver links antes de descargar; aprobó Mixkit #35040 (bosque con niebla).
- "Cuenta atrás" → "Countdown navideño". Luces en el borde superior.
- El usuario pidió no aparecer Claude como co-autor desde entonces. Reescribir el historial fue bloqueado
  por permisos y el usuario decidió no hacerlo: solo aplica a commits nuevos.

## 2026-09-29
- Luces también por los costados; **fondo rojo** (se quita el video y el paisaje); la caja de regalo se
  reemplaza por un **Santa gordito que se infla y estalla en confeti** (alegre, no violento).
- Título "Falta poco para Navidad" y sin fecha.
- Despliegue en **Vercel** (el nombre del proyecto debe ir en minúsculas).
- Rama `decoraciones`: más luces, bolas colgantes, colinas con pinos iluminados, destellos, copos grandes,
  todo con interruptores en `js/config.js`.
- Santa con pelo blanco (se veía calvo; en la tarjeta la cara tapaba el gorro → base roja del gorro).
  Textos latinos: "¡Vamos!", "¡Entendido!", "¡Listo!".
- Renos volando: primero 4, luego **9** (Rudolph + 8 en parejas). Santa más grande y adaptable.
- `servir.py` (sin caché) porque el navegador del usuario mostraba versiones viejas.
- Regalos en la nieve desactivados (`gifts: false`).
- El usuario fusionó `decoraciones` en `main` y lo subió.
- 25 actividades reales del usuario (1–25 dic), con tildes corregidas.

## 2026-11-06
- Docs reorganizados en `docs/` (README índice, PROYECTO, ARQUITECTURA, BITACORA, PENDIENTES).
- Pedido: varios Santas para hacerlo más divertido (rockero, veraniego, con chullo andino…). Primero
  **rediseñar el Santa actual** ("se ve medio feo") y mostrar una vista previa antes de aplicarlo →
  `preview/santa.html` (actual vs. nuevo). El usuario **aprobó** el nuevo diseño (ojos abiertos, barba
  esponjosa, saluda con la mano, guantes verdes).
- Pedido: opciones de Santas y diseñar los que mencionó → `js/santas.js` (base común + piezas por tema) y
  galería `preview/santas.html` con 4: **Clásico**, **Rockero** (cuero negro, gorro negro, lentes, guitarra
  amarilla, mano 🤘), **Veraniego** (camisa hawaiana, short, sandalias, sombrero de paja, coco, tabla de
  surf), **Andino** (chullo con orejeras y pompones, poncho con grecas, taza de chocolatada). Aún no
  están en la página real: falta que el usuario elija cuáles y cómo se alternan.
