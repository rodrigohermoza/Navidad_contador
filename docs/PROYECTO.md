# Contexto del proyecto (leer esto primero tras un /clear)

## Objetivo
Página web de cuenta atrás para Navidad, para compartir con una persona mediante un único link.
- Contador (días / horas / minutos / segundos) hasta el 25 de diciembre.
- Fondo: paisaje nevado bonito (lo más importante visualmente).
- 28 actividades navideñas, una por día. Se desbloquean con una **caja de regalo** que al hacer clic
  hace aparecer a **Santa** entregando la actividad del día.
- De vez en cuando pasa un **reno** por detrás del paisaje.
- Colores navideños: rojo, blanco y verde. UI limpia.

## Restricciones (del usuario)
- Trabajar SOLO dentro de esta carpeta `Navidad_clock/`.
- Sin backend. Todo gratis. Un único link "privado" para compartir.
- Nunca pedir contraseñas en la terminal; si hace falta autenticarse, que sea vía Google/Chrome en el navegador.
- Si se usan agentes: gastar pocos tokens y dar un resumen simple (qué hicieron, cuántos fueron).
- Repo: https://github.com/rodrigohermoza/Navidad_contador.git

## Estado actual (2026-09-26)
Hecho:
- Contador funcionando (`js/countdown.js`). El 25/12 muestra "¡Feliz Navidad!"; desde el 26/12 cuenta al año siguiente.
- Paisaje SVG en capas (`index.html`): cielo degradado, estrellas titilantes, luna, 2 filas de montañas,
  colinas, filas de pinos (generadas con semilla fija en `js/landscape.js`), cabaña roja con ventana encendida
  y humo, pinos grandes de primer plano.
- Nieve en canvas (`js/snow.js`): 3 capas, viento suave, se pausa si la pestaña está oculta, menos copos con
  `prefers-reduced-motion`.
- Móvil: en orientación vertical el SVG cambia su `viewBox` para encuadrar la cabaña y la luna.
- `<meta name="robots" content="noindex">` para que no lo indexen buscadores.

Pendiente:
1. Textos reales de las 28 actividades (el usuario los enviará) → `js/activities.js`.
2. Confirmar rango de fechas. Asumido: **27 nov → 24 dic** (28 días). Configurable en `ACTIVITIES_START`.
3. Caja de regalo clicable + animación de Santa entregando la actividad del día.
4. Reno que cruza el paisaje de vez en cuando (capa SVG entre montañas y colinas).
5. Decidir si antes del 27 nov / después del 24 dic la caja se muestra bloqueada.

## Decisiones técnicas
- HTML/CSS/JS puro, sin frameworks ni build → se puede hostear en cualquier hosting estático.
- Paisaje en SVG vectorial en vez de video: pesa poco, nítido en cualquier pantalla, sin depender de
  licencias de videos externos. Los pinos usan un `<symbol id="pine">` reutilizable con `color` variable.
- Fuentes: Google Fonts (Fraunces para títulos, Inter para texto).
- La hora es la local del dispositivo que abre la página.

## Limitaciones
- "Privado" = link no listado. Cualquiera con el link puede entrar (no hay login, porque no hay backend).
- La actividad del día depende del reloj del dispositivo (se puede "adelantar" cambiando la fecha del sistema).
- Si en el futuro se quiere guardar qué actividades se hicieron, solo se puede en `localStorage` (por navegador).

## Hosting (gratis, sin backend)
Recomendado: **Cloudflare Pages** o **Netlify** conectados al repo de GitHub (login con GitHub/Google en el
navegador). Funcionan con repo privado, dan un subdominio (`xxxx.pages.dev` / `xxxx.netlify.app`) y se
redeployan solos con cada `git push`. Build command: vacío. Output directory: `/` (raíz).
- GitHub Pages también sirve, pero en plan gratis exige que el repo sea **público**.

## Probar en local
`python3 -m http.server 5173` desde esta carpeta → http://localhost:5173
(`.claude/launch.json` es solo config local del preview, está en .gitignore.)
