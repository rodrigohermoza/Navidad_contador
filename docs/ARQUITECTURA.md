# Arquitectura

HTML/CSS/JS puro, sin frameworks ni build. Todo vectorial (SVG/CSS) salvo fuentes de Google Fonts
(Fraunces para títulos, Inter para texto).

## Archivos
| Archivo | Qué hace |
|---|---|
| `index.html` | Estructura, Santa gordito (SVG inline), tarjeta/modal de actividad con Santa-cabeza (SVG inline) |
| `css/styles.css` | Todo el estilo: fondo rojo, tarjeta de vidrio, luces, decoraciones, Santa, confeti, modal |
| `js/config.js` | **Interruptores** `window.DECOR` (true/false) de decoraciones, luces y renos |
| `js/activities.js` | Lista `ACTIVITIES` (posición = día de diciembre), `getNow()` (soporta `?fecha=`), `todayActivity()` |
| `js/countdown.js` | Contador al 25/12 00:00 hora local; el 25/12 muestra "¡Feliz Navidad!" |
| `js/santa.js` | Click en Santa → se infla (0.75s) → "¡puf!" + 46 piezas de confeti + aro → modal (1.15s) → al cerrar vuelve rebotando |
| `js/lights.js` | Guirnalda SVG: borde superior + costados (`sideLength`), bombillas que titilan en 3 grupos |
| `js/decorations.js` | Bolas colgantes (esquivan la tarjeta), colinas con pinos iluminados, destellos, copos grandes, regalos (apagados) |
| `js/reindeer.js` | Cada 18–35 s cruzan 9 renos: Rudolph (nariz roja) adelante + 8 en parejas |
| `js/snow.js` | Nieve en `<canvas>`, 3 capas de profundidad |
| `servir.py` | Servidor local sin caché: `python3 servir.py` → http://localhost:5173 |
| `preview/` | Páginas de vista previa para que el usuario apruebe diseños antes de aplicarlos |

## Capas (z-index)
0 `#decor-back` (copos, destellos, colinas, pinos) y `#reindeer` · 1 `#snow` · 2 `.content` (tarjeta + Santa)
· 3 `#lights` y `#decor-front` (bolas colgantes) · 10 `#modal`.

## Detalles importantes
- Santa ocupa el espacio libre bajo la tarjeta (`.santa-stage` flex:1; `.big-santa` 120–300px de alto).
- `.modal[hidden] { display:none }` es necesario porque `.modal` usa `display:grid`.
- Clases que anima el CSS en el Santa gordito: `.arm--left`, `.arm--right`, `.belly`, `.head`,
  estados `.is-inflating`, `.is-popped`, `.is-back`.
- Renos y decoraciones usan aleatorio con semilla / se regeneran en `resize`.
- Los renos no salen si `document.hidden` (pestaña oculta) o con `prefers-reduced-motion`.

## Cómo probar
- `python3 servir.py` (si el puerto 5173 está ocupado, el usuario ya tiene uno corriendo: reutilizarlo).
- `?fecha=AAAA-MM-DD` simula otro día.
- El panel de navegador de Claude: reporta `document.hidden = true` (para ver renos, forzar
  `Object.defineProperty(document,'hidden',{get:()=>false})`); las capturas a veces llegan tarde con
  animaciones/video → verificar estado por JS o pausar la animación. Cachea JS: usar `fetch(url,{cache:'reload'})`.
- `preview_start` necesita `.claude/launch.json` en la carpeta padre (fuera del proyecto): no usarlo;
  levantar el servidor por Bash y abrir con `preview_start` + `url`.
