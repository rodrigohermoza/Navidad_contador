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
- Textos en español latinoamericano natural (el usuario es de Perú): nada de "vale", "a por ello", "vosotros".
- Commits solo bajo el nombre del usuario: sin "Co-Authored-By: Claude" ni menciones a Claude.

## Estado actual (2026-09-29)
Hecho:
- Título: "Falta poco para Navidad" (sin mostrar la fecha, solo cuánto falta).
- Contador (`js/countdown.js`). El 25/12 muestra "¡Feliz Navidad!"; desde el 26/12 cuenta al año siguiente.
- Fondo: degradado rojo navideño en CSS (`body`). Se quitaron el video y el paisaje SVG por pedido del usuario
  (siguen en el historial de git: commits "Video de fondo..." y "Contador de Navidad con paisaje nevado").
- Nieve en canvas (`js/snow.js`) encima del fondo rojo.
- Luces navideñas (`js/lights.js`): cruzan el borde superior y bajan ~38% de la altura por los costados.
  Colores dorado/verde/blanco/rosa (el rojo no se vería sobre el fondo). Se regeneran al redimensionar.
- Santa gordito (`index.html` + `js/santa.js`): su tamaño se adapta al espacio libre bajo la tarjeta
  (máx. 300px de alto, mín. 120px) para que siempre quepa con su etiqueta. Respira y saluda en reposo; al tocarlo se infla con un bamboleo,
  hace "¡puf!" en confeti/estrellas/copos (animación alegre, no violenta) y aparece la tarjeta con la actividad
  del día. Al cerrar, Santa vuelve rebotando.
  Antes del 1/12 → "Tu primera actividad llega el 1 de diciembre". Después del 28/12 → mensaje de fin.
- [Rama `decoraciones`, a prueba] Decoraciones extra con interruptores en `js/config.js`
  (`js/decorations.js`): bolas colgantes que esquivan la tarjeta, colinas nevadas con pinos iluminados
  (estrella en la punta) a los costados; regalos desactivados (`gifts: false`) (el centro queda libre para Santa), destellos dorados,
  copos grandes girando, y más luces en la guirnalda (4 por curva, bajan 50% por los costados).
- [Rama `decoraciones`] Renos volando (`js/reindeer.js`, config `DECOR.reindeer` en `js/config.js`): cada
  18–35 s cruzan los 9 renos: Rudolph (nariz roja brillante) adelante y 8 detrás en parejas, unidos por
  riendas doradas; la fila de atrás es más pequeña y oscura para dar profundidad. Vuelan detrás de la tarjeta y de Santa. No salen si la pestaña está oculta o con reduced-motion.
- Actividades: **1 al 28 de diciembre**. Textos en `js/activities.js` (aún marcadores).
- Probar otro día: `?fecha=2026-12-05` en la URL (afecta contador y Santa).
- `<meta name="robots" content="noindex">`.

Pendiente:
1. Textos reales de las 28 actividades → `js/activities.js`.
2. Limpiar la UI: quitar textos sobrantes (el usuario lo pedirá cuando esté todo implementado).
4. Hostear (Cloudflare Pages / Netlify). El usuario sube con GitHub Desktop.
- Regla: no descargar nada sin que el usuario vea el link y lo apruebe.

## Decisiones técnicas
- HTML/CSS/JS puro, sin frameworks ni build → se puede hostear en cualquier hosting estático.
- Todo es vectorial/CSS (Santa, luces, confeti): pesa poco y se ve nítido en cualquier pantalla.
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
Ojo: el navegador cachea los JS/CSS; si no ves un cambio, recarga con Cmd + Shift + R.
`python3 servir.py` desde esta carpeta → http://localhost:5173 (Ctrl+C para pararlo). Envía `Cache-Control: no-store`
para que el navegador no muestre versiones viejas.
No dejar servidores corriendo en segundo plano: el usuario lo arranca solo cuando quiere.
(`.claude/launch.json` es solo config local del preview, está en .gitignore.)
