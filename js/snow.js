// Nieve animada en <canvas>: 3 capas de profundidad con viento suave.
(function () {
  const canvas = document.getElementById("snow");
  const ctx = canvas.getContext("2d");
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let w, h, dpr, flakes = [], last = 0, running = true;

  const LAYERS = [
    { size: [0.8, 1.6], speed: [18, 30], alpha: 0.55, share: 0.5 },  // lejos
    { size: [1.6, 2.6], speed: [34, 55], alpha: 0.8, share: 0.35 },  // medio
    { size: [2.6, 4.2], speed: [60, 90], alpha: 0.95, share: 0.15 }, // cerca
  ];
  const rnd = (a, b) => a + Math.random() * (b - a);

  function makeFlake(layer, anyY) {
    return {
      x: Math.random() * w,
      y: anyY ? Math.random() * h : -10,
      r: rnd(...layer.size),
      vy: rnd(...layer.speed),
      sway: rnd(0.4, 1.4),
      phase: Math.random() * Math.PI * 2,
      alpha: layer.alpha,
      layer,
    };
  }

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const total = Math.round(Math.min(420, (w * h) / 5200) * (reduced ? 0.3 : 1));
    flakes = [];
    LAYERS.forEach((l) => {
      for (let i = 0; i < total * l.share; i++) flakes.push(makeFlake(l, true));
    });
  }

  function frame(t) {
    if (!running) return;
    const dt = Math.min((t - last) / 1000 || 0, 0.05);
    last = t;
    const wind = Math.sin(t / 7000) * 18;
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "#ffffff";
    for (const f of flakes) {
      f.phase += dt * f.sway;
      f.y += f.vy * dt;
      f.x += (wind + Math.sin(f.phase) * 12) * dt * (f.r / 2);
      if (f.y > h + 10) Object.assign(f, makeFlake(f.layer, false));
      if (f.x > w + 10) f.x = -10;
      if (f.x < -10) f.x = w + 10;
      ctx.globalAlpha = f.alpha;
      ctx.beginPath();
      ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
      ctx.fill();
    }
    requestAnimationFrame(frame);
  }

  document.addEventListener("visibilitychange", () => {
    running = !document.hidden;
    if (running) { last = performance.now(); requestAnimationFrame(frame); }
  });
  window.addEventListener("resize", resize);
  resize();
  requestAnimationFrame(frame);
})();
