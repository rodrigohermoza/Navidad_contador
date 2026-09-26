# 🎄 Navidad Contador

Página web estática con una cuenta atrás hasta Navidad sobre un paisaje nocturno nevado (luna, montañas, pinos, cabaña y nieve animada).

## Ver en local

```bash
cd /Users/rodrigohermoza/Desktop/Proyectos/Fran_automatizacion/Navidad_clock && python3 -m http.server 5173
```

Entra a http://localhost:5173 y para el servidor con `Ctrl + C`.
Para probar otro día: http://localhost:5173/?fecha=2026-12-05

## Estructura

```
index.html          Estructura + paisaje SVG (capas de fondo a primer plano)
css/styles.css      Estilos (paleta roja/blanca/verde, tarjeta de vidrio)
js/landscape.js     Genera estrellas y filas de pinos; reencuadre en móvil
js/snow.js          Nieve animada en <canvas> (3 capas de profundidad)
js/countdown.js     Cuenta atrás al 25 de diciembre (hora local)
js/activities.js    28 actividades (1–28 de diciembre) + helpers de fecha
js/gift.js          Caja de regalo, Santa con la actividad del día, video de fondo
assets/fondo.mp4    (opcional) video de fondo; si no está, se usa el paisaje SVG
docs/PROYECTO.md    Contexto completo: objetivo, decisiones, limitaciones, pendientes
```

## Hosting

Sitio 100 % estático, sin backend, sin build. Ver `docs/PROYECTO.md` → *Hosting*.
