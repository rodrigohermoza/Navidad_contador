# 🎄 Navidad Contador

Página web estática con una cuenta atrás hasta Navidad sobre un paisaje nocturno nevado (luna, montañas, pinos, cabaña y nieve animada).

## Ver en local

Ábrela con un servidor estático (abrir `index.html` con doble clic también funciona en la mayoría de navegadores):

```bash
python3 -m http.server 5173
```

Luego entra a http://localhost:5173

## Estructura

```
index.html          Estructura + paisaje SVG (capas de fondo a primer plano)
css/styles.css      Estilos (paleta roja/blanca/verde, tarjeta de vidrio)
js/landscape.js     Genera estrellas y filas de pinos; reencuadre en móvil
js/snow.js          Nieve animada en <canvas> (3 capas de profundidad)
js/countdown.js     Cuenta atrás al 25 de diciembre (hora local)
js/activities.js    28 actividades navideñas (marcadores, pendiente de textos)
docs/PROYECTO.md    Contexto completo: objetivo, decisiones, limitaciones, pendientes
```

## Hosting

Sitio 100 % estático, sin backend, sin build. Ver `docs/PROYECTO.md` → *Hosting*.
