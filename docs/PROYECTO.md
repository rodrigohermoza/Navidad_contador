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
- Contador (`js/countdown.js`). El 25/12 muestra "¡Feliz Navidad!"; desde el 26/12 cuenta al año siguiente.
- Paisaje SVG en capas (`index.html`) + estrellas/pinos generados con semilla (`js/landscape.js`).
  En móvil vertical cambia el `viewBox` para encuadrar cabaña y luna.
- Nieve en canvas (`js/snow.js`): 3 capas, viento, pausa con pestaña oculta, respeta reduced-motion.
- Fondo en video: `assets/fondo.mp4` = Mixkit #35040 "Snowing in a foggy forest, slow motion" (720p, 9.2 MB,
  30 s en bucle, licencia gratuita Mixkit). Aprobado por el usuario. Si el video falla, se muestra el paisaje SVG.
  La nieve del canvas sigue encima del video.
- Caja de regalo (`js/gift.js`): al hacer clic la tapa sale volando y aparece Santa (SVG) con la actividad del día.
  Antes del 1/12 → "Tu primer regalo se abre el 1 de diciembre". Después del 28/12 → mensaje de fin.
- Actividades: **1 al 28 de diciembre** (confirmado). Textos en `js/activities.js` (aún marcadores).
- Probar otro día: `?fecha=2026-12-05` en la URL (afecta contador y regalo).
- `<meta name="robots" content="noindex">`.

Pendiente:
1. Textos reales de las 28 actividades → `js/activities.js`.
2. (Regla) No descargar nada sin que el usuario vea el link y lo apruebe.
3. Limpiar la UI: quitar textos sobrantes (el usuario lo pedirá cuando esté todo implementado).
4. Reno que cruza el paisaje de vez en cuando.
5. Subir a GitHub (el usuario usa GitHub Desktop) y hostear (Cloudflare Pages / Netlify).

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
`python3 -m http.server 5173` desde esta carpeta → http://localhost:5173 (Ctrl+C para pararlo).
No dejar servidores corriendo en segundo plano: el usuario lo arranca solo cuando quiere.
(`.claude/launch.json` es solo config local del preview, está en .gitignore.)
