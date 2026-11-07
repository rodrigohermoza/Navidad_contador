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
- El usuario pidió más ideas de Santas y eligió 5: **futbolero, DJ, mago, en pijama, chef**. `js/santas.js`
  reorganizado en piezas (HATS, HEAD_EXTRAS, EYES, RAISED, REST_HANDS, REST_PROPS, PROPS, BACKS, FEET,
  clothes) y 9 temas en la galería: futbolero (camiseta de Perú, chimpunes, pelota), DJ (traje verde,
  audífonos con luces, consola), mago (sombrero morado, capa, varita), pijama (cuadros, gorro de dormir,
  pantuflas de reno, vela, almohada, Zzz), chef (gorro con acebo, mandil rojo, cuchara, panetón).
- Los 9 Santas pasan a la página real. **Selector arriba a la derecha** (botón redondo con la cara del Santa
  actual → panel 3×3 "Elige tu Santa"). La elección se guarda en `localStorage` (`navidad-santa`) de cada
  navegador; por defecto "clasico". La tarjeta muestra la cabeza del Santa elegido (recortada y con los
  hombros desvanecidos). Probado en computadora y celular.
- Link oficial confirmado: https://navidad-contador.vercel.app (los links con letras raras son de cada despliegue y piden login).

## 2026-11-07
- Se revisó la conexión: `gh` logueado como `rodrigohermoza`; el usuario sube con `git push` desde la terminal.
- Docs actualizados antes de compactar la conversación.
- Rama `santas-nuevos`:
  - Arreglos de bordes: la tabla de surf tenía las rayas fuera de la tabla (ahora tiene punta y las rayas van recortadas a
    su forma); las mangas cortas (veraniego, futbolero) eran "salchichas" sueltas: ahora siguen el brazo, con borde recto,
    dobladillo y el estampado de la camisa. Chequeo automático de piezas fuera del marco en los 22 Santas (cuerpo y
    cabeza): se corrigieron la "Z" del pijama y el ala del sombrero de paja en el selector (viewBox de cabeza
    `44 -12 196 204`) y el escudo vikingo.
  - Nuevos: **cuy** (disfraz de cuy tricolor con capucha, orejitas, bigotes, gorrito navideño, zanahoria) y **campesino**
    (sombrero de fieltro con cinta tejida, chaleco bordado, chumpi, ojotas, choclo y canasta de papas). Se hicieron como
    dos Santas distintos.
  - Después el usuario pidió 11 más: vampiro, vaquero, detective, vikingo, payaso, pirata, motociclista, bombero, doctor,
    comunista y "el Grinch vestido de Santa" → hecho como **gruñón verde** (diseño propio inspirado, no copia del personaje).
  - **Animaciones distintas por Santa** en `css/santas.css` (clásico se ríe jo-jo-jo, rockero headbanging, veraniego
    baila hula, andino mueve los pompones, futbolero salta, DJ cabecea, mago hace hechizos, pijama cabecea de sueño,
    chef revuelve, cuy da saltitos, campesino zapatea huayno, vampiro flota, vaquero cabalga con lazo, detective busca
    pistas, vikingo grita, payaso rebota, pirata se balancea, moto vibra, bombero echa agua, doctor sacude el
    termómetro, comunista marcha con bandera, gruñón camina de puntitas).
  - Selector: 4 columnas y scroll si no entra en pantalla. Probado en celular sin errores de consola.
  - Peso total ~130 KB (~37 KB comprimido): no hay riesgo de que la página no cargue.
- El usuario aprobó: `santas-nuevos` fusionada en `main` y subida (Vercel publica solo).
