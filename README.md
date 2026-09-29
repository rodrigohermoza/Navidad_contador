# 🎄 Navidad Contador

Página web estática con un countdown navideño sobre fondo rojo con nieve y luces. Un Santa gordito estalla en confeti y te da la actividad navideña del día (1–28 de diciembre).

## Ver en local

```bash
cd /Users/rodrigohermoza/Desktop/Proyectos/Fran_automatizacion/Navidad_clock && python3 servir.py
```

Entra a http://localhost:5173 y para el servidor con `Ctrl + C`.
Para probar otro día: http://localhost:5173/?fecha=2026-12-05

## Estructura

```
index.html          Estructura + Santa gordito (SVG) + tarjeta de actividad
css/styles.css      Estilos (fondo rojo, luces, animaciones de Santa y confeti)
js/config.js        Interruptores de decoraciones (true/false) — editar aquí
js/decorations.js   Bolas colgantes, colinas con pinos y regalos, destellos, copos grandes
js/reindeer.js      Renos volando de vez en cuando (Rudolph adelante)
js/lights.js        Luces del borde superior y parte alta de los costados
js/snow.js          Nieve animada en <canvas> (3 capas de profundidad)
js/countdown.js     Cuenta atrás al 25 de diciembre (hora local)
js/activities.js    28 actividades (1–28 de diciembre) + helpers de fecha
js/santa.js         Santa se infla, estalla en confeti y muestra la actividad del día
docs/PROYECTO.md    Contexto completo: objetivo, decisiones, limitaciones, pendientes
```

## Hosting

Sitio 100 % estático, sin backend, sin build. Ver `docs/PROYECTO.md` → *Hosting*.
