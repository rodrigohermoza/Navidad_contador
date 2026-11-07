# Proyecto: Countdown navideño

## Objetivo
Página web estática para compartir con una persona mediante un único link (sin backend, todo gratis):
- Contador (días / horas / minutos / segundos) hasta el 25 de diciembre. Título: "Falta poco para Navidad".
- 25 actividades navideñas, una por día (1–25 de diciembre). Se obtienen tocando a **Santa**, que se infla
  y estalla alegremente en confeti y entrega la actividad del día.
- Ambiente muy navideño: fondo rojo, nieve, luces, bolas colgantes, pinos iluminados, renos volando.
- Colores navideños (rojo, blanco, verde, dorado). UI limpia.

## Reglas del usuario (OBLIGATORIAS)
- Trabajar SOLO dentro de la carpeta `Navidad_clock/`.
- Sin backend. Todo gratis. Un único link "privado" (no listado) para compartir.
- Nunca pedir contraseñas en la terminal; autenticación solo vía Google/Chrome/GitHub en el navegador.
- **Commits solo bajo el nombre del usuario**: sin "Co-Authored-By: Claude" ni menciones a Claude/IA.
- **No descargar nada** (videos, imágenes…) sin que el usuario vea el link y lo apruebe.
- Textos en **español latinoamericano natural** (usuario de Perú): nada de "vale", "a por ello", "vosotros".
- Si se usan agentes: pocos tokens y un resumen simple al final (qué hicieron, cuántos).
- No dejar servidores corriendo en segundo plano: el usuario arranca `python3 servir.py` cuando quiere.
- Cuando el usuario no está seguro de un cambio visual: **mostrar primero una vista previa** (rama aparte o
  página de preview) y esperar su aprobación antes de aplicarlo.
- Las decoraciones deben ser fáciles de prender/apagar (`js/config.js`).

## Estado actual (2026-11-07)
- Todo está en `main`. El último commit (agricultor) puede estar sin subir: revisar con `git status`.
- Desplegado en **Vercel**: **https://navidad-contador.vercel.app** (proyecto `navidad-contador`, cuenta `rempenow`), conectado al repo:
  cada push a `main` publica automáticamente. Subir: `git push` desde la terminal (la cuenta de GitHub
  `rodrigohermoza` está conectada con `gh`; si pidiera contraseña, correr `gh auth setup-git`). También sirve
  GitHub Desktop. Hacer push solo si el usuario lo pide.
- Fondo rojo (sin video ni paisaje; están en el historial de git si se quieren recuperar).
- 22 Santas temáticos en la página (`js/santas.js`): clásico, rockero, veraniego, andino, futbolero, DJ, mago,
  en pijama, chef, cuy, agricultor, vampiro, vaquero, detective, vikingo, payaso, pirata, motociclista, bombero,
  doctor, comunista y gruñón verde, cada uno con su propia animación (`css/santas.css`). Se elige con el **selector arriba a la derecha**; se recuerda por navegador (localStorage).
  Galería de todos en `preview/santas.html`.
- 25 actividades reales cargadas (`js/activities.js`).
- Peso: toda la página pesa ~130 KB (~37 KB comprimida), sin imágenes; carga sin problema aunque se agreguen más Santas.
- Probar otro día: `?fecha=2026-12-05` en la URL.

## Repo y hosting
- Repo: https://github.com/rodrigohermoza/Navidad_contador.git (rama principal `main`).
- Hosting: Vercel (plan Hobby gratis). Framework preset "Other", sin build, raíz `./`.
- `<meta name="robots" content="noindex">` para que no lo indexen buscadores.

## Limitaciones
- "Privado" = link no listado: cualquiera con el link puede entrar (no hay login).
- La actividad del día depende del reloj del dispositivo.
- Guardar progreso solo sería posible en `localStorage` (por navegador).

## Cómo trabajamos (flujo)
1. Leer `docs/` al retomar. Cambios visuales dudosos → vista previa primero (`preview/` o rama aparte).
2. Probar en local: `python3 servir.py` (si el puerto 5173 está ocupado, el usuario ya tiene uno: reutilizarlo)
   y revisar con el navegador de Claude en computadora (1440×900) y celular (375×812), sin errores de consola.
3. Commit tras cada cambio, **sin** línea de co-autor (autor git: Rodrigo Hermoza).
4. Añadir entrada en `BITACORA.md` y actualizar `PROYECTO.md` / `PENDIENTES.md` / `ARQUITECTURA.md`.
5. Al terminar: apagar servidores propios, decir qué se probó y recordar que falta `git push` si aplica.
