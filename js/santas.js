// Santas temáticos: una base común (cara, barba, cuerpo) + piezas que cambian por tema.
// window.santaSVG(id, opciones) devuelve el SVG como texto; window.SANTA_THEMES lista los temas.
// Opciones: { prefix } ids únicos si el mismo Santa aparece dos veces; { cls } clase extra del <svg>;
// { head: true } solo cabeza y hombros (para la tarjeta y el selector).
// Para crear un Santa nuevo: añadir una entrada en THEMES (abajo) combinando las piezas,
// o crear una pieza nueva en el grupo que corresponda (HATS, EYES, RAISED, REST_PROPS, PROPS, BACKS, FEET).
(function () {
  const SKIN = "#f3c4a2";
  const SKIN_DARK = "#e8b08c";

  // ---------- Gorros (se dibujan encima de la cabeza) ----------
  const furBrim = (p) => `<g fill="url(#${p}-fur)"><rect x="74" y="72" width="92" height="22" rx="11" />
      <circle cx="84" cy="75" r="7.5" /><circle cx="98" cy="72" r="7.5" /><circle cx="112" cy="71" r="7.5" />
      <circle cx="126" cy="71" r="7.5" /><circle cx="140" cy="72" r="7.5" /><circle cx="154" cy="74" r="7.5" /></g>`;
  const star = (cx, cy, r, fill) => {
    const pts = Array.from({ length: 10 }, (_, i) => {
      const a = (Math.PI / 5) * i - Math.PI / 2, rr = i % 2 ? r * 0.45 : r;
      return `${(cx + Math.cos(a) * rr).toFixed(1)},${(cy + Math.sin(a) * rr).toFixed(1)}`;
    }).join(" ");
    return `<polygon points="${pts}" fill="${fill}" />`;
  };

  const HATS = {
    classic: (p) => `
      <path d="M80 86 C76 54 98 32 126 30 C154 28 176 42 186 66 C192 80 194 94 192 108 L178 102 C176 90 170 82 162 78 Z" fill="url(#${p}-hat)" />
      <path d="M150 42 C170 52 182 72 186 98 L178 102 C176 86 168 68 150 54 Z" fill="#000" opacity="0.18" />
      <circle cx="192" cy="112" r="13" fill="url(#${p}-fur)" /><circle cx="188" cy="108" r="4" fill="#fff" />
      ${furBrim(p)}`,

    // Sombrero de paja con cinta roja y acebo
    straw: () => `
      <ellipse cx="120" cy="84" rx="74" ry="15" fill="#e2b85c" /><ellipse cx="120" cy="82" rx="74" ry="13" fill="#efcd78" />
      <path d="M88 84 C86 52 100 38 120 38 C140 38 154 52 152 84 Z" fill="#efcd78" />
      <path d="M90 66 Q120 60 150 66 M89 50 Q120 44 151 50" stroke="#d8ad52" stroke-width="2" fill="none" />
      <path d="M88 72 Q120 66 152 72 L152 84 Q120 78 88 84 Z" fill="#c8102e" />
      <ellipse cx="142" cy="74" rx="9" ry="4" fill="#1f6b45" transform="rotate(-25 142 74)" />
      <ellipse cx="152" cy="73" rx="9" ry="4" fill="#2a8a5a" transform="rotate(25 152 73)" />
      <circle cx="146" cy="78" r="3" fill="#e01f3d" /><circle cx="151" cy="79" r="3" fill="#e01f3d" />`,

    // Chullo andino: gorro tejido con orejeras, cordones y pompones
    chullo: (p) => `
      <defs><clipPath id="${p}-dome"><path d="M78 92 C78 54 98 34 120 34 C142 34 162 54 162 92 Z" /></clipPath></defs>
      ${[[-1, 80], [1, 160]].map(([s, x]) => `
        <path d="M${x - 8 * s} 84 L${x - 6 * s} 132 Q${x + 4 * s} 144 ${x + 14 * s} 132 L${x + 18 * s} 90 Z" fill="#c8102e" />
        <path d="M${x - 6 * s} 104 L${x} 112 L${x + 6 * s} 104 L${x + 12 * s} 112 L${x + 16 * s} 106" stroke="#fff" stroke-width="2.5" fill="none" />
        <path d="M${x - 6 * s} 120 L${x + 15 * s} 120" stroke="#f2c14e" stroke-width="4" />
        <g class="tassel"><path d="M${x + 4 * s} 140 Q${x + 2 * s} 160 ${x + 6 * s} 178" stroke="#f2c14e" stroke-width="3" fill="none" />
        <circle cx="${x + 6 * s}" cy="182" r="7" fill="#2a8a5a" /><circle cx="${x + 4 * s}" cy="180" r="2.5" fill="#fff" opacity="0.5" /></g>`).join("")}
      <path d="M78 92 C78 54 98 34 120 34 C142 34 162 54 162 92 Z" fill="#c8102e" />
      <g clip-path="url(#${p}-dome)">
        <rect x="70" y="80" width="100" height="14" fill="#1f6b45" />
        <path d="M72 87 l6 -5 l6 5 l6 -5 l6 5 l6 -5 l6 5 l6 -5 l6 5 l6 -5 l6 5 l6 -5 l6 5 l6 -5 l6 5 l6 -5" stroke="#fff" stroke-width="2.5" fill="none" />
        <rect x="70" y="66" width="100" height="10" fill="#f2c14e" />
        ${[84, 98, 112, 126, 140, 154].map((x) => `<path d="M${x} 66 l5 5 l-5 5 l-5 -5 Z" fill="#c8102e" />`).join("")}
        <rect x="70" y="52" width="100" height="8" fill="#ffffff" />
        ${[82, 94, 106, 118, 130, 142, 154].map((x) => `<circle cx="${x}" cy="56" r="2.2" fill="#2a8a5a" />`).join("")}
      </g>
      <circle cx="120" cy="32" r="9" fill="#f2c14e" /><circle cx="117" cy="29" r="3" fill="#fff" opacity="0.5" />`,

    // Sombrero de mago morado con estrellas, luna y borde de peluche
    wizard: (p) => `
      <defs><linearGradient id="${p}-wiz" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#7b55c4" /><stop offset="1" stop-color="#3d2470" /></linearGradient></defs>
      <path d="M80 86 C92 60 104 34 112 14 C116 4 124 0 134 4 C142 8 146 2 150 -2 C150 8 144 16 134 14 C130 30 144 58 162 86 Z" fill="url(#${p}-wiz)" />
      ${star(112, 58, 7, "#f2c14e")}${star(136, 40, 5, "#ffe6a8")}${star(126, 70, 4, "#ffe6a8")}
      <path d="M100 38 a8 8 0 1 0 6 12 a6 6 0 1 1 -6 -12 Z" fill="#ffe6a8" />
      <circle cx="152" cy="-4" r="7" fill="#f2c14e" />
      ${furBrim(p)}`,

    // Gorro de dormir largo a rayas que cae sobre el hombro
    nightcap: (p) => `
      <defs><pattern id="${p}-stripes" width="18" height="18" patternUnits="userSpaceOnUse" patternTransform="rotate(40)">
        <rect width="18" height="18" fill="#c8102e" /><rect width="7" height="18" fill="#ffffff" /></pattern></defs>
      <path d="M80 86 C76 54 98 32 126 30 C160 28 186 50 196 86 C204 116 206 148 200 176 L188 172 C190 140 184 108 170 86 Z" fill="url(#${p}-stripes)" />
      <path d="M170 86 C184 108 190 140 188 172 L200 176 C206 148 204 116 196 86 Z" fill="#000" opacity="0.12" />
      <circle cx="195" cy="182" r="11" fill="url(#${p}-fur)" />
      <rect x="76" y="74" width="88" height="18" rx="9" fill="url(#${p}-fur)" />`,

    // Gorro de chef con un acebo prendido
    toque: () => `
      <circle cx="94" cy="50" r="20" fill="#ffffff" /><circle cx="120" cy="38" r="25" fill="#ffffff" /><circle cx="146" cy="50" r="20" fill="#ffffff" />
      <rect x="84" y="46" width="72" height="30" fill="#ffffff" />
      <path d="M104 44 Q108 58 106 72 M136 44 Q132 58 134 72" stroke="#dfe5ee" stroke-width="2.5" fill="none" />
      <rect x="80" y="70" width="80" height="22" rx="5" fill="#f1f4f8" /><rect x="80" y="70" width="80" height="4" fill="#dfe5ee" />
      <ellipse cx="148" cy="78" rx="7" ry="3.5" fill="#1f6b45" transform="rotate(-25 148 78)" />
      <ellipse cx="156" cy="77" rx="7" ry="3.5" fill="#2a8a5a" transform="rotate(25 156 77)" />
      <circle cx="152" cy="82" r="2.6" fill="#e01f3d" />`,

    // Capucha de cuy (tipo pijama de animal): orejitas, carita con bigotes, mechón blanco y un gorrito navideño
    cuy: (p) => {
      const side = (s) => { const X = (x) => (s < 0 ? x : 240 - x);
        return `<path d="M${X(80)} 84 C${X(60)} 96 ${X(55)} 124 ${X(63)} 146 C${X(71)} 155 ${X(88)} 153 ${X(95)} 142 C${X(90)} 122 ${X(90)} 102 ${X(96)} 90 Z" fill="#7a4a2c" />`; };
      const ear = (s) => `<g class="ear ear--${s < 0 ? "l" : "r"}"><ellipse cx="${120 + 36 * s}" cy="46" rx="14" ry="17" fill="#6b4026" transform="rotate(${-28 * s} ${120 + 36 * s} 46)" />
        <ellipse cx="${120 + 36 * s}" cy="47" rx="8" ry="10" fill="#f0a39a" transform="rotate(${-28 * s} ${120 + 36 * s} 47)" /></g>`;
      return `<defs><radialGradient id="${p}-cuyhood" cx="0.4" cy="0.3" r="0.8"><stop offset="0" stop-color="#b07a4f" /><stop offset="1" stop-color="#6b4026" /></radialGradient>
        <clipPath id="${p}-hood"><path d="M76 92 C74 56 96 32 120 32 C144 32 166 56 164 92 Z" /></clipPath></defs>
      ${ear(-1)}${ear(1)}${side(-1)}${side(1)}
      <path d="M76 92 C74 56 96 32 120 32 C144 32 166 56 164 92 Z" fill="url(#${p}-cuyhood)" />
      <g clip-path="url(#${p}-hood)"><ellipse cx="150" cy="44" rx="22" ry="16" fill="#d98a3e" />
        <path d="M112 30 C116 46 114 64 108 80 L132 80 C126 64 124 46 128 30 Z" fill="#f6ecdf" /></g>
      <rect x="74" y="82" width="92" height="14" rx="7" fill="#f6ecdf" />
      <circle cx="104" cy="60" r="4.5" fill="#1a0f08" /><circle cx="136" cy="60" r="4.5" fill="#1a0f08" />
      <circle cx="105.5" cy="58.5" r="1.5" fill="#fff" /><circle cx="137.5" cy="58.5" r="1.5" fill="#fff" />
      <path d="M115 68 L125 68 L120 74 Z" fill="#e88b8b" stroke="#e88b8b" stroke-width="2" stroke-linejoin="round" />
      <path d="M120 74 L120 77 M114 78 Q117 81 120 77 Q123 81 126 78" stroke="#4f2d18" stroke-width="1.8" fill="none" stroke-linecap="round" />
      <g class="whiskers" stroke="#4f2d18" stroke-width="1.3" stroke-linecap="round" opacity="0.8">
        <path d="M110 72 L92 68 M110 75 L92 77 M130 72 L148 68 M130 75 L148 77" /></g>
      <g transform="rotate(16 120 34)"><path d="M104 36 C106 20 118 10 134 4 C136 16 137 26 136 36 Z" fill="#d4132f" />
        <rect x="100" y="31" width="40" height="9" rx="4.5" fill="url(#${p}-fur)" /><circle cx="135" cy="4" r="5.5" fill="url(#${p}-fur)" /></g>`;
    },

    // Sombrero de paja de ala ancha con cinta de tela y una espiga de trigo
    farmhat: () => `
      <ellipse cx="120" cy="86" rx="78" ry="15" fill="#d9a94e" /><ellipse cx="120" cy="84" rx="76" ry="13" fill="#e8c06a" />
      <path d="M50 86 Q120 96 190 86" stroke="#c4913c" stroke-width="2" fill="none" stroke-dasharray="4 3" />
      <path d="M90 85 C88 54 100 40 120 40 C140 40 152 54 150 85 Z" fill="#e8c06a" />
      <path d="M92 64 Q120 58 148 64 M91 50 Q120 44 149 50" stroke="#c4913c" stroke-width="2" fill="none" />
      <path d="M120 41 L120 50" stroke="#c4913c" stroke-width="3" stroke-linecap="round" />
      <path d="M90 72 Q120 67 150 72 L150 84 Q120 79 90 84 Z" fill="#7a4a2c" />
      <path d="M136 79 L152 50" stroke="#c99a2e" stroke-width="2" stroke-linecap="round" />
      ${[0, 1, 2, 3].map((k) => `<ellipse cx="${148 - k * 2.6}" cy="${57 + k * 5}" rx="2.4" ry="4" fill="#e0b048" transform="rotate(30 ${148 - k * 2.6} ${57 + k * 5})" />`).join("")}
      ${[0, 1, 2].map((k) => `<ellipse cx="${154 - k * 2.6}" cy="${60 + k * 5}" rx="2.4" ry="4" fill="#d4a03c" transform="rotate(-30 ${154 - k * 2.6} ${60 + k * 5})" />`).join("")}`,
  };

  // Extras encima de la cabeza (después del gorro)
  const HEAD_EXTRAS = {
    // Audífonos de DJ con luces verdes
    headphones: () => `
      <path d="M68 116 C64 40 176 40 172 116" stroke="#26262b" stroke-width="8" fill="none" stroke-linecap="round" />
      <rect x="58" y="98" width="22" height="38" rx="10" fill="#26262b" /><rect x="62" y="104" width="12" height="26" rx="6" fill="#3fd47f" class="neon" />
      <rect x="160" y="98" width="22" height="38" rx="10" fill="#26262b" /><rect x="166" y="104" width="12" height="26" rx="6" fill="#3fd47f" class="neon" />`,
    // Zzz de sueño
    zzz: () => `<g class="zzz" fill="#ffffff" font-family="Fraunces, Georgia, serif" font-weight="700">
      <text x="198" y="66" font-size="16">z</text><text x="209" y="46" font-size="22">z</text><text x="219" y="22" font-size="28">Z</text></g>`,
  };

  // ---------- Ojos ----------
  const EYES = {
    open: () => `
      <ellipse cx="106" cy="108" rx="4.6" ry="5.8" fill="#2b1d16" /><ellipse cx="134" cy="108" rx="4.6" ry="5.8" fill="#2b1d16" />
      <circle cx="107.6" cy="105.8" r="1.7" fill="#fff" /><circle cx="135.6" cy="105.8" r="1.7" fill="#fff" />`,
    shades: () => `
      <rect x="92" y="99" width="26" height="16" rx="5" fill="#141418" /><rect x="122" y="99" width="26" height="16" rx="5" fill="#141418" />
      <path d="M118 104 L122 104" stroke="#141418" stroke-width="3" />
      <path d="M96 103 L104 103 M126 103 L134 103" stroke="#fff" stroke-width="2" opacity="0.55" stroke-linecap="round" />`,
    round: (p) => `
      <defs><linearGradient id="${p}-lens" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff9a3c" /><stop offset="1" stop-color="#ff4f7b" /></linearGradient></defs>
      <circle cx="105" cy="108" r="11" fill="url(#${p}-lens)" stroke="#2b1d16" stroke-width="2.5" />
      <circle cx="135" cy="108" r="11" fill="url(#${p}-lens)" stroke="#2b1d16" stroke-width="2.5" />
      <path d="M116 106 Q120 102 124 106" stroke="#2b1d16" stroke-width="2.5" fill="none" />
      <path d="M99 103 Q102 100 106 100 M129 103 Q132 100 136 100" stroke="#fff" stroke-width="2" opacity="0.7" fill="none" stroke-linecap="round" />`,
    // Ojos cerrados de sueño
    sleepy: () => `<path d="M100 107 q6 5 12 0 M128 107 q6 5 12 0" stroke="#2b1d16" stroke-width="3" fill="none" stroke-linecap="round" />`,
  };

  // ---------- Mano en alto (brazo izquierdo, el que se mueve) ----------
  const mitten = (p, t) => `<circle cx="39" cy="83" r="14" fill="url(#${p}-mitten)" /><ellipse cx="53" cy="88" rx="6" ry="7" fill="${t.mitten[1]}" />`;
  const fist = (x = 40, y = 86) => `<circle cx="${x}" cy="${y}" r="12" fill="${SKIN}" /><ellipse cx="${x + 5}" cy="${y + 6}" rx="8" ry="4" fill="${SKIN_DARK}" />`;
  const RAISED = {
    mitten: (p, t) => `<ellipse cx="40" cy="100" rx="16" ry="9" fill="url(#${p}-fur)" transform="rotate(-8 40 100)" />${mitten(p, t)}`,
    rock: () => `<rect x="28" y="56" width="8" height="24" rx="4" fill="${SKIN}" /><rect x="45" y="60" width="7" height="20" rx="3.5" fill="${SKIN}" />${fist()}`,
    // Puño en alto celebrando un gol
    fist: () => `${fist(40, 84)}<path d="M32 78 q4 -3 8 0 M38 76 q4 -3 8 0" stroke="${SKIN_DARK}" stroke-width="2" fill="none" />`,
    // Índice apuntando al cielo (DJ)
    finger: () => `<rect x="35" y="50" width="9" height="30" rx="4.5" fill="${SKIN}" />${fist()}`,
    coconut: () => `<circle cx="40" cy="68" r="15" fill="#6b4226" /><ellipse cx="40" cy="58" rx="11" ry="4" fill="#f4ead8" />
      <path d="M44 58 L54 34" stroke="#ff6f91" stroke-width="3" stroke-linecap="round" />
      <path d="M28 52 L32 36" stroke="#8a6a4a" stroke-width="1.5" /><path d="M20 38 Q32 26 44 38 Z" fill="#2ab0a6" /><path d="M26 38 Q32 30 38 38" fill="#f2c14e" />
      <circle cx="40" cy="86" r="11" fill="${SKIN}" />`,
    mug: (p) => `<g class="steam" stroke="#fff" stroke-width="2.5" fill="none" stroke-linecap="round" opacity="0.8">
        <path d="M32 50 q-5 -7 0 -14 q5 -7 0 -14" /><path d="M44 50 q-5 -7 0 -14 q5 -7 0 -14" /></g>
      <rect x="24" y="54" width="30" height="28" rx="5" fill="#fff" /><rect x="24" y="64" width="30" height="7" fill="#c8102e" />
      <path d="M54 60 q10 0 10 9 q0 9 -10 9" stroke="#fff" stroke-width="4" fill="none" />
      <ellipse cx="39" cy="56" rx="13" ry="3" fill="#6b3a1f" /><circle cx="30" cy="84" r="12" fill="url(#${p}-mitten)" />`,
    // Varita mágica con estrella y chispitas
    wand: (p, t) => `<path d="M40 82 L24 26" stroke="#1f1f24" stroke-width="5" stroke-linecap="round" />
      <path d="M27 36 L24 26" stroke="#ffffff" stroke-width="5" stroke-linecap="round" />
      <g class="sparkles">${star(22, 18, 12, "#f2c14e")}
        <circle cx="6" cy="10" r="2.5" fill="#ffe6a8" /><circle cx="38" cy="4" r="2" fill="#ffffff" /><circle cx="10" cy="34" r="1.8" fill="#ffffff" /></g>
      ${mitten(p, t)}`,
    // Vela encendida en su platito
    candle: () => `<circle cx="40" cy="36" r="14" fill="#ffd27a" opacity="0.25" class="glow" />
      <path d="M40 26 C47 35 47 42 40 45 C33 42 33 35 40 26 Z" fill="#ffd27a" class="flame" /><path d="M40 34 C43 38 43 42 40 44 C37 42 37 38 40 34 Z" fill="#ff8a3c" />
      <rect x="35" y="46" width="10" height="26" rx="2" fill="#f4f8fd" />
      <ellipse cx="40" cy="74" rx="17" ry="5" fill="#f2c14e" /><circle cx="58" cy="73" r="4" fill="none" stroke="#f2c14e" stroke-width="2.5" />
      ${fist(40, 88)}`,
    // Cuchara de palo
    spoon: () => `<path d="M40 84 L30 32" stroke="#c8915a" stroke-width="6" stroke-linecap="round" />
      <ellipse cx="28" cy="22" rx="10" ry="13" fill="#c8915a" /><ellipse cx="28" cy="22" rx="6" ry="8" fill="#a8743f" />${fist()}`,
    // Patita de cuy con almohadillas rosadas
    paw: (p) => `<circle cx="40" cy="84" r="14" fill="url(#${p}-mitten)" />
      <circle cx="31" cy="74" r="3.2" fill="#f0a39a" /><circle cx="40" cy="71" r="3.2" fill="#f0a39a" /><circle cx="49" cy="74" r="3.2" fill="#f0a39a" />`,
    // Horquilla de campo con mango de madera
    pitchfork: () => `<path d="M42 118 L38 10" stroke="#a8743f" stroke-width="5.5" stroke-linecap="round" />
      <path d="M38 22 L38 12" stroke="#8a909c" stroke-width="6" stroke-linecap="round" />
      <path d="M24 -10 L24 4 Q24 14 38 14 Q52 14 52 4 L52 -10 M38 14 L38 -12" stroke="#9aa0ad" stroke-width="3.5" fill="none" stroke-linecap="round" />
      ${fist(40, 86)}`,
  };

  // ---------- Mano apoyada (brazo derecho) y lo que sostiene ----------
  const REST_HANDS = {
    mitten: (p) => `<circle cx="157" cy="217" r="14" fill="url(#${p}-mitten)" />`,
    skin: () => `<circle cx="157" cy="217" r="12" fill="${SKIN}" />`,
    paw: (p) => `<circle cx="157" cy="217" r="13" fill="url(#${p}-mitten)" /><circle cx="150" cy="225" r="2.6" fill="#f0a39a" /><circle cx="158" cy="228" r="2.6" fill="#f0a39a" />`,
  };
  const REST_PROPS = {
    // Pelota bajo la mano (se dibuja antes que la mano)
    ball: { under: true, svg: () => `<circle cx="168" cy="238" r="20" fill="#ffffff" stroke="#26262b" stroke-width="1.5" />
      <polygon points="168,230 175,235 172,243 164,243 161,235" fill="#26262b" />
      <path d="M168 230 L168 219 M175 235 L186 231 M172 243 L179 253 M164 243 L157 253 M161 235 L150 231" stroke="#26262b" stroke-width="1.5" />
      <path d="M183 224 l5 2 l-1 6 M153 224 l-5 2 l1 6" stroke="#26262b" stroke-width="2" fill="none" />` },
    // Almohada abrazada
    pillow: { under: true, svg: () => `<g transform="rotate(-18 182 232)"><rect x="160" y="216" width="46" height="32" rx="12" fill="#f4f8fd" />
      <path d="M166 224 L200 224 M166 240 L200 240" stroke="#c9dcf2" stroke-width="3" /></g>` },
    // Panetón sobre la mano
    panettone: { under: false, svg: () => `<g transform="translate(173 212) scale(1.35) translate(-173 -212)"><rect x="150" y="196" width="46" height="20" rx="3" fill="#f2c14e" />
      <path d="M156 196 L156 216 M168 196 L168 216 M180 196 L180 216 M190 196 L190 216" stroke="#c8102e" stroke-width="3" />
      <path d="M148 198 C148 172 198 172 198 198 Z" fill="#b5651d" />
      <ellipse cx="173" cy="182" rx="16" ry="5" fill="#8a4a16" />
      <circle cx="160" cy="190" r="2.5" fill="#e01f3d" /><circle cx="174" cy="192" r="2.5" fill="#2a8a5a" /><circle cx="186" cy="188" r="2.5" fill="#e01f3d" /><circle cx="168" cy="186" r="2" fill="#f2c14e" /></g>` },
    // Zanahoria bajo la patita del cuy
    carrot: { under: true, svg: () => `<g transform="rotate(-35 170 220)">
      <ellipse cx="212" cy="214" rx="11" ry="4" fill="#3c9a4e" transform="rotate(-30 212 214)" />
      <ellipse cx="214" cy="220" rx="12" ry="4" fill="#2f8a43" />
      <ellipse cx="212" cy="226" rx="11" ry="4" fill="#3c9a4e" transform="rotate(30 212 226)" />
      <path d="M134 220 C150 213 180 210 196 213 C202 215 202 225 196 227 C180 230 150 227 134 220 Z" fill="#f08a2c" />
      <path d="M176 214 L178 218 M186 222 L188 226 M164 219 L166 223" stroke="#c8641a" stroke-width="1.6" stroke-linecap="round" /></g>` },
    // Caja de madera con verduras de la cosecha
    crate: { under: true, svg: () => `<path d="M156 204 C150 190 154 180 160 176 C162 186 162 196 160 204 Z" fill="#3c9a4e" />
      <path d="M162 204 C164 188 172 182 178 182 C174 192 170 198 166 204 Z" fill="#2f8a43" />
      <path d="M156 212 L162 194 L168 212 Z" fill="#f08a2c" />
      <circle cx="180" cy="202" r="9" fill="#e01f3d" /><circle cx="192" cy="206" r="7.5" fill="#d4132f" />
      <path d="M177 194 l3 2 l3 -2" stroke="#2f8a43" stroke-width="2" fill="none" stroke-linecap="round" />
      <ellipse cx="170" cy="206" rx="10" ry="8" fill="#7fb04e" /><path d="M166 202 Q170 208 174 202" stroke="#5f8f36" stroke-width="1.5" fill="none" />
      <rect x="144" y="208" width="58" height="40" rx="3" fill="#c8915a" />
      <path d="M144 221 L202 221 M144 235 L202 235" stroke="#a8743f" stroke-width="2.5" />
      <path d="M150 208 L150 248 M196 208 L196 248" stroke="#a8743f" stroke-width="3" />` },
  };

  // ---------- Objetos delante del cuerpo (detrás de la mano apoyada) ----------
  const PROPS = {
    guitar: () => `<path d="M150 230 L60 146" stroke="#7a4a2b" stroke-width="10" stroke-linecap="round" />
      ${[0.2, 0.35, 0.5, 0.65, 0.8].map((k) => `<path d="M${150 - 90 * k - 4} ${230 - 84 * k + 4} l8 -8" stroke="#e8d9b0" stroke-width="1.5" />`).join("")}
      <path d="M64 150 L50 134 L42 142 L56 158 Z" fill="#141418" />
      <circle cx="47" cy="139" r="2" fill="#d7dbe3" /><circle cx="53" cy="146" r="2" fill="#d7dbe3" />
      <path d="M172 214 C190 206 200 222 190 236 C206 248 196 276 172 270 C156 282 128 272 132 252 C120 238 136 216 152 226 C156 214 166 212 172 214 Z" fill="#f2c14e" />
      <path d="M150 236 C160 230 174 236 172 250 C170 262 152 266 146 256 C140 248 142 240 150 236 Z" fill="#fff" opacity="0.9" />
      <rect x="150" y="242" width="16" height="5" rx="1.5" fill="#26262b" transform="rotate(-43 158 244)" />
      <rect x="158" y="252" width="16" height="5" rx="1.5" fill="#26262b" transform="rotate(-43 166 254)" />
      <circle cx="182" cy="258" r="3" fill="#26262b" /><circle cx="186" cy="248" r="3" fill="#26262b" />
      <path d="M170 262 L62 148 M174 258 L66 144" stroke="#f4f0e6" stroke-width="0.9" opacity="0.85" />`,
    // Consola de DJ con dos tornamesas y lucecitas
    deck: () => `<rect x="40" y="226" width="160" height="48" rx="9" fill="#26262e" />
      <rect x="40" y="226" width="160" height="9" rx="4.5" fill="#3a3a46" />
      <g class="vinyl"><ellipse cx="84" cy="229" rx="28" ry="7" fill="#111114" /><ellipse cx="84" cy="229" rx="9" ry="2.6" fill="#c8102e" /></g>
      <g class="vinyl"><ellipse cx="156" cy="229" rx="28" ry="7" fill="#111114" /><ellipse cx="156" cy="229" rx="9" ry="2.6" fill="#3fd47f" /></g>
      <circle cx="112" cy="246" r="4" fill="#9aa0ad" /><circle cx="128" cy="246" r="4" fill="#9aa0ad" />
      <rect x="108" y="256" width="24" height="5" rx="2.5" fill="#55555f" /><rect x="116" y="254" width="6" height="9" rx="2" fill="#d7dbe3" />
      ${["#ff4f7b", "#ffd27a", "#3fd47f", "#7fd0ff", "#ff4f7b", "#ffd27a", "#3fd47f", "#7fd0ff"].map((c, i) =>
        `<circle cx="${56 + i * 18.5}" cy="266" r="3" fill="${c}" class="led" style="animation-delay:${-i * 0.15}s" />`).join("")}`,
  };

  // ---------- Detrás del Santa ----------
  const BACKS = {
    // Tabla de surf con punta; las rayas van recortadas a la forma de la tabla para que no se salgan
    surfboard: (p) => {
      const board = "M200 70 C214 96 221 146 218 198 C216 230 209 250 200 250 C191 250 184 230 182 198 C179 146 186 96 200 70 Z";
      return `<g transform="rotate(14 200 160)"><defs><clipPath id="${p}-board"><path d="${board}" /></clipPath></defs>
      <path d="${board}" fill="#ffffff" />
      <g clip-path="url(#${p}-board)"><rect x="196" y="60" width="8" height="200" fill="#c8102e" />
        <rect x="189" y="60" width="3" height="200" fill="#2a8a5a" /><rect x="208" y="60" width="3" height="200" fill="#2a8a5a" />
        <path d="M214 90 C220 140 220 200 214 240 L224 240 L224 90 Z" fill="#000" opacity="0.08" /></g>
      <path d="${board}" fill="none" stroke="#dfe5ee" stroke-width="1.5" /></g>`;
    },
    // Capa de mago con borde dorado y estrellitas
    cape: () => `<path d="M64 130 C24 196 22 252 30 278 L210 278 C218 252 216 196 176 130 Z" fill="#4b2a7b" />
      <path d="M30 278 L210 278" stroke="#f2c14e" stroke-width="5" stroke-linecap="round" />
      ${star(42, 230, 5, "#f2c14e")}${star(198, 214, 4, "#ffe6a8")}${star(50, 258, 3, "#ffe6a8")}${star(192, 252, 5, "#f2c14e")}`,
  };

  // ---------- Calzado ----------
  const FEET = {
    boots: (t) => `<ellipse cx="90" cy="268" rx="25" ry="11" fill="${t.bootColor || "#26262b"}" />
      <ellipse cx="150" cy="268" rx="25" ry="11" fill="${t.bootColor || "#26262b"}" /><ellipse cx="84" cy="264" rx="8" ry="3" fill="#fff" opacity="0.18" />`,
    sandals: () => `<ellipse cx="90" cy="270" rx="22" ry="9" fill="${SKIN}" /><ellipse cx="150" cy="270" rx="22" ry="9" fill="${SKIN}" />
      <path d="M80 270 Q90 260 100 270 M140 270 Q150 260 160 270" stroke="#2a8a5a" stroke-width="4" fill="none" />`,
    // Chimpunes con tres rayas y tapones
    cleats: () => [90, 150].map((x) => `<ellipse cx="${x}" cy="268" rx="25" ry="10" fill="#1f1f24" />
      <path d="M${x - 8} 262 l6 10 M${x} 261 l6 10 M${x + 8} 262 l6 10" stroke="#fff" stroke-width="2.5" stroke-linecap="round" />
      ${[-14, -4, 6, 16].map((d) => `<rect x="${x + d - 2}" y="277" width="4" height="4" rx="1" fill="#9aa0ad" />`).join("")}`).join(""),
    // Pantuflas de reno con nariz roja
    slippers: () => [90, 150].map((x) => `<path d="M${x - 8} 258 l-6 -10 m3 5 l-6 -2 M${x + 8} 258 l6 -10 m-3 5 l6 -2" stroke="#6b4226" stroke-width="2.5" fill="none" stroke-linecap="round" />
      <ellipse cx="${x}" cy="268" rx="25" ry="11" fill="#8b5a3c" />
      <circle cx="${x - 6}" cy="264" r="2" fill="#1a0f08" /><circle cx="${x + 6}" cy="264" r="2" fill="#1a0f08" />
      <circle cx="${x}" cy="272" r="5" fill="#e01f3d" />`).join(""),
    // Patitas de cuy
    paws: () => [90, 150].map((x) => `<ellipse cx="${x}" cy="269" rx="22" ry="10" fill="#6b4026" />
      ${[-10, 0, 10].map((d) => `<ellipse cx="${x + d}" cy="275" rx="4" ry="3" fill="#f0a39a" />`).join("")}`).join(""),
  };

  // ---------- Ropa (dentro del cuerpo, recortada a su forma) ----------
  function clothes(p, t) {
    let s = "";
    const pat = t.pattern;
    if (pat === "hibiscus") s += `<rect x="30" y="120" width="180" height="160" fill="url(#${p}-hib)" opacity="0.95" />`;
    if (pat === "plaid") s += `<rect x="30" y="120" width="180" height="160" fill="url(#${p}-plaid)" />`;
    if (pat === "poncho") s += `<rect x="30" y="152" width="180" height="8" fill="#f2c14e" /><rect x="30" y="160" width="180" height="16" fill="#fff" />
        ${Array.from({ length: 12 }, (_, i) => `<path d="M${36 + i * 15} 168 l6 -6 l6 6 l-6 6 Z" fill="#1f6b45" />`).join("")}
        <rect x="30" y="176" width="180" height="8" fill="#f2c14e" /><rect x="30" y="222" width="180" height="10" fill="#1f6b45" />
        ${Array.from({ length: 18 }, (_, i) => `<path d="M${30 + i * 10} 232 l5 8 l5 -8 Z" fill="#f2c14e" />`).join("")}`;
    // Camiseta de Perú: franja roja diagonal
    if (pat === "peru") s += `<path d="M30 118 L86 118 L214 246 L214 292 L170 292 L30 152 Z" fill="#d4132f" />
        <path d="M86 118 L214 246" stroke="#ffffff" stroke-width="2" opacity="0.35" />`;
    // Mandil rojo de chef con bolsillo
    if (pat === "apron") s += `<rect x="30" y="186" width="180" height="110" fill="#c8102e" /><rect x="30" y="186" width="180" height="4" fill="#ffffff" opacity="0.35" />
        <rect x="98" y="222" width="44" height="22" rx="4" fill="#a50d26" /><path d="M98 226 L142 226" stroke="#fff" stroke-width="1.5" stroke-dasharray="3 3" opacity="0.6" />`;

    // Cuy tricolor: manchas naranjas y panza blanca
    if (pat === "cuy") s += `<ellipse cx="58" cy="168" rx="44" ry="34" fill="#d98a3e" /><ellipse cx="196" cy="240" rx="40" ry="34" fill="#d98a3e" />
        <ellipse cx="120" cy="226" rx="50" ry="48" fill="#f6ecdf" />`;
    // Chaleco (vaquero)
    if (pat === "vest") s += [[-1, 104], [1, 136]].map(([sd, x]) => `<path d="M${x} 118 L${x + 8 * -sd} 292 L${120 + 110 * sd} 292 L${120 + 110 * sd} 118 Z" fill="${t.vestColor || "#26262e"}" />${t.vestTrim === false ? "" : `
        <path d="M${x} 118 L${x + 8 * -sd} 292" stroke="#c8102e" stroke-width="4" />
        <path d="M${x + 5 * sd} 118 L${x + 8 * -sd + 5 * sd} 292" stroke="#f2c14e" stroke-width="2.5" stroke-dasharray="5 4" />
        <path d="M${x + 10 * sd} 118 L${x + 8 * -sd + 10 * sd} 292" stroke="#2a8a5a" stroke-width="2" />`}`).join("");
    s += clothesExtra(p, t);
    if (t.frontStrip === "fur") s += `<rect x="107" y="120" width="26" height="160" fill="url(#${p}-fur)" />`;
    if (t.frontStrip === "tee") s += `<rect x="104" y="120" width="32" height="160" fill="#c8102e" />
        <rect x="100" y="130" width="3" height="140" fill="#b8bcc6" /><rect x="137" y="130" width="3" height="140" fill="#b8bcc6" />`;
    if (t.frontStrip === "buttons") s += [205, 228].map((y) => `<circle cx="120" cy="${y}" r="3" fill="#ffffff" />`).join("");

    if (t.bottom === "fur") s += `<g fill="url(#${p}-fur)"><rect x="30" y="248" width="180" height="40" />
        ${[40, 54, 68, 82, 96, 144, 158, 172, 186, 200].map((x) => `<circle cx="${x}" cy="${248 - Math.min(4, Math.min(x - 30, 210 - x) / 14)}" r="8" />`).join("")}</g>`;
    if (t.bottom === "hem") s += `<rect x="30" y="250" width="180" height="40" fill="${t.hemColor || "#0b0b0e"}" />`;
    if (t.bottom === "shorts") s += `<rect x="30" y="238" width="180" height="50" fill="${t.shortsColor || "#2a78b8"}" /><rect x="30" y="238" width="180" height="4" fill="#fff" opacity="0.6" />`;
    if (t.belt) s += `<rect x="30" y="198" width="180" height="22" fill="${t.beltColor || "#1f1f24"}" /><rect x="30" y="200" width="180" height="3" fill="#fff" opacity="0.12" />` +
      (t.belt === "studs" ? Array.from({ length: 15 }, (_, i) => `<circle cx="${38 + i * 12}" cy="209" r="2.6" fill="#d7dbe3" />`).join("") : "");
    return s;
  }

  // =====================================================================================
  // ---------- Piezas de la segunda tanda (vampiro, vaquero, detective, vikingo, payaso, pirata,
  //            motociclista, bombero, doctor, comunista y gruñón verde) ----------
  // =====================================================================================
  const mirrorX = (d) => d.replace(/(-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?)/g, (m, x, y) => `${240 - +x} ${y}`);

  Object.assign(HATS, {
    // Sombrero de vaquero con el ala curvada
    cowboy: () => `
      <path d="M52 84 C60 98 86 98 120 95 C154 98 180 98 188 84 C192 76 186 72 180 78 C170 88 150 86 120 86 C90 86 70 88 60 78 C54 72 48 76 52 84 Z" fill="#7a4a2c" />
      <path d="M86 87 C84 60 92 40 104 38 C112 37 116 45 120 45 C124 45 128 37 136 38 C148 40 156 60 154 87 Z" fill="#a8703f" />
      <path d="M134 40 C148 44 154 62 154 87 L140 87 C142 64 140 50 134 40 Z" fill="#000" opacity="0.12" />
      <path d="M86 77 L154 77 L154 87 L86 87 Z" fill="#4a2f1c" />${star(120, 82, 4.5, "#f2c14e")}`,

    // Gorro de detective a cuadros con visera y lacito arriba
    deerstalker: (p) => `<defs><pattern id="${p}-check" width="12" height="12" patternUnits="userSpaceOnUse">
        <rect width="12" height="12" fill="#c9a86a" /><rect width="12" height="4" fill="#7a5a2c" opacity="0.45" /><rect width="4" height="12" fill="#7a5a2c" opacity="0.45" /></pattern></defs>
      <path d="M78 92 C76 56 98 36 120 36 C142 36 164 56 162 92 Z" fill="url(#${p}-check)" />
      <path d="M120 38 C108 24 98 32 112 40 Z M120 38 C132 24 142 32 128 40 Z" fill="#7a5a2c" /><circle cx="120" cy="38" r="3" fill="#5a4020" />
      <path d="M80 88 C96 99 144 99 160 88 L163 95 C146 106 94 106 77 95 Z" fill="#a88a55" />`,

    // Casco vikingo con cuernos
    viking: (p) => `<defs><linearGradient id="${p}-steel" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e3e7ee" /><stop offset="1" stop-color="#8a909c" /></linearGradient></defs>
      <path d="M84 74 C62 72 48 54 50 28 C60 46 72 54 90 58 Z" fill="#f4ead8" stroke="#cdbb95" stroke-width="2" />
      <path d="${mirrorX("M84 74 C62 72 48 54 50 28 C60 46 72 54 90 58 Z")}" fill="#f4ead8" stroke="#cdbb95" stroke-width="2" />
      <path d="M78 90 C76 56 98 38 120 38 C142 38 164 56 162 90 Z" fill="url(#${p}-steel)" />
      <rect x="116" y="39" width="8" height="44" fill="#b8bec9" />
      <rect x="75" y="80" width="90" height="14" rx="5" fill="#8a6a3a" />
      ${[86, 100, 140, 154].map((x) => `<circle cx="${x}" cy="87" r="2.4" fill="#e3e7ee" />`).join("")}`,

    // Gorrito de payaso + pelo de colores a los lados
    clownhat: () => `${[[80, 84, "#ff4f7b"], [70, 100, "#3a8ee6"], [160, 84, "#3fd47f"], [170, 100, "#f2c14e"]].map(([x, y, c]) => `<circle cx="${x}" cy="${y}" r="15" fill="${c}" />`).join("")}
      <g transform="rotate(-10 120 74)"><path d="M98 78 L120 18 L142 78 Z" fill="#3a8ee6" />
        <path d="M106 58 L134 58 L131 66 L109 66 Z M114 38 L126 38 L124 45 L116 45 Z" fill="#f2c14e" />
        <circle cx="120" cy="16" r="7" fill="#ff4f7b" /><rect x="94" y="72" width="52" height="9" rx="4.5" fill="#ffffff" /></g>`,

    // Sombrero pirata de tres picos con calavera
    tricorn: () => `
      <path d="M58 82 C66 54 96 62 120 46 C144 62 174 54 182 82 C170 98 150 92 120 98 C90 92 70 98 58 82 Z" fill="#1f1f24" />
      <path d="M61 82 C72 93 92 89 120 95 C148 89 168 93 179 82" stroke="#f2c14e" stroke-width="3" fill="none" />
      <circle cx="120" cy="68" r="8" fill="#fff" /><rect x="115.5" y="72" width="9" height="6" rx="1.5" fill="#fff" />
      <circle cx="117" cy="67" r="2" fill="#1f1f24" /><circle cx="123" cy="67" r="2" fill="#1f1f24" />
      <path d="M108 80 L132 88 M132 80 L108 88" stroke="#fff" stroke-width="3" stroke-linecap="round" />`,

    // Casco de moto abierto con lentes en la frente
    moto: (p) => `
      <path d="M72 106 C68 56 96 30 120 30 C144 30 172 56 168 106 L156 106 C156 82 146 72 120 72 C94 72 84 82 84 106 Z" fill="url(#${p}-hat)" />
      <path d="M113 31 L127 31 L127 72 L113 72 Z" fill="#ffffff" />
      <path d="M150 40 C160 52 164 64 166 80" stroke="#fff" stroke-width="4" opacity="0.4" fill="none" stroke-linecap="round" />
      <rect x="78" y="72" width="84" height="8" fill="#26262b" />
      <circle cx="104" cy="77" r="11" fill="#7fd0ff" stroke="#9aa0ad" stroke-width="3.5" /><circle cx="136" cy="77" r="11" fill="#7fd0ff" stroke="#9aa0ad" stroke-width="3.5" />
      <path d="M99 73 Q102 70 106 70 M131 73 Q134 70 138 70" stroke="#fff" stroke-width="2" fill="none" />`,

    // Casco de bombero con placa dorada
    firehelmet: (p) => `
      <path d="M56 92 C58 80 80 76 120 76 C160 76 182 80 184 92 C172 102 68 102 56 92 Z" fill="#8f0b20" />
      <path d="M80 88 C78 54 98 36 120 36 C142 36 162 54 160 88 Z" fill="url(#${p}-hat)" />
      <path d="M120 37 L120 88" stroke="#8f0b20" stroke-width="7" />
      <path d="M102 50 L138 50 L134 76 L120 84 L106 76 Z" fill="#f2c14e" stroke="#c99a2e" stroke-width="2.5" />
      ${star(120, 64, 8, "#c8102e")}`,

    // Pelo blanco con el espejo de doctor
    doctor: () => `<g fill="#ffffff">${[[88, 84, 14], [102, 75, 14], [120, 71, 15], [138, 75, 14], [152, 84, 14]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" />`).join("")}</g>
      <path d="M80 94 C90 80 150 80 160 94" stroke="#26262b" stroke-width="5" fill="none" />
      <circle cx="120" cy="78" r="13" fill="#d7dbe3" stroke="#9aa0ad" stroke-width="3" /><circle cx="120" cy="78" r="4" fill="#26262b" />
      <path d="M112 72 Q115 69 119 69" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round" />`,

    // Ushanka (gorro ruso de piel) con estrella roja
    ushanka: () => `
      <rect x="68" y="76" width="24" height="44" rx="11" fill="#8a5a3b" /><rect x="148" y="76" width="24" height="44" rx="11" fill="#8a5a3b" />
      <path d="M80 84 C78 50 98 36 120 36 C142 36 162 50 160 84 Z" fill="#6b4026" />
      <rect x="72" y="64" width="96" height="28" rx="13" fill="#a8805a" />
      <path d="M80 70 Q120 62 160 70" stroke="#c9a37a" stroke-width="3" fill="none" />
      ${star(120, 78, 10, "#d4132f")}`,

    // Pelo blanco peinado hacia atrás (pico de vampiro) y gorrito navideño negro
    vamphair: (p) => `
      <path d="M76 102 C72 62 96 44 120 44 C144 44 168 62 164 102 C158 86 142 80 130 82 L120 96 L110 82 C98 80 82 86 76 102 Z" fill="#f4f6fa" />
      <path d="M96 60 Q112 52 128 54 M100 70 Q114 62 126 64" stroke="#d9e0ea" stroke-width="2" fill="none" />
      <g transform="rotate(18 124 46)"><path d="M106 48 C108 30 120 18 138 10 C140 24 141 36 140 48 Z" fill="#1f1f24" />
        <rect x="102" y="43" width="42" height="9" rx="4.5" fill="#c8102e" /><circle cx="139" cy="10" r="6" fill="#c8102e" /></g>`,
  });

  Object.assign(HEAD_EXTRAS, {
    // Lorito pirata en el hombro, con gorrito navideño
    parrot: (p) => `<g class="parrot">
      <path d="M194 156 L204 186 L190 166 Z" fill="#3a8ee6" />
      <ellipse cx="192" cy="146" rx="11" ry="17" fill="#2fae5c" /><path d="M186 140 C182 150 184 158 190 162" stroke="#1f8a45" stroke-width="3" fill="none" />
      <circle cx="194" cy="126" r="10" fill="#e01f3d" />
      <path d="M202 124 C210 124 212 132 206 136 L202 130 Z" fill="#f2c14e" />
      <circle cx="197" cy="123" r="2.6" fill="#fff" /><circle cx="197.6" cy="123" r="1.3" fill="#1f1f24" />
      <g transform="rotate(-20 192 116)"><path d="M184 118 C186 108 192 102 200 100 C201 108 201 113 200 118 Z" fill="#d4132f" />
        <rect x="182" y="115" width="20" height="5" rx="2.5" fill="url(#${p}-fur)" /><circle cx="200" cy="100" r="3" fill="url(#${p}-fur)" /></g></g>`,
  });

  Object.assign(EYES, {
    // Parche de pirata en el ojo derecho
    patch: () => `<ellipse cx="106" cy="108" rx="4.6" ry="5.8" fill="#2b1d16" /><circle cx="107.6" cy="105.8" r="1.7" fill="#fff" />
      <path d="M80 92 L166 118" stroke="#1f1f24" stroke-width="3" />
      <ellipse cx="135" cy="109" rx="11" ry="9" fill="#1f1f24" />`,
    // Ojos amarillos y cejas de gruñón
    grump: () => `<ellipse cx="104" cy="108" rx="9" ry="7" fill="#f2e86a" /><ellipse cx="136" cy="108" rx="9" ry="7" fill="#f2e86a" />
      <circle cx="107" cy="109" r="3.4" fill="#c8102e" /><circle cx="139" cy="109" r="3.4" fill="#c8102e" />
      <path d="M95 104 Q104 98 113 104 L113 101 Q104 94 95 101 Z M127 104 Q136 98 145 104 L145 101 Q136 94 127 101 Z" fill="#6d9332" />
      <path d="M90 96 L116 102 M150 96 L124 102" stroke="#3f5a1a" stroke-width="5" stroke-linecap="round" />`,
  });

  const glove = (p, x = 40, y = 86) => `<circle cx="${x}" cy="${y}" r="12.5" fill="url(#${p}-mitten)" />`;
  Object.assign(RAISED, {
    // Murcielaguito volando sobre la mano
    bat: () => `<g class="bat"><g class="wing wing--l"><path d="M38 44 C32 34 20 32 8 36 C14 40 16 46 14 52 C20 48 28 50 34 54 Z" fill="#26262b" /></g>
        <g class="wing wing--r"><path d="M46 44 C52 34 64 32 76 36 C70 40 68 46 70 52 C64 48 56 50 50 54 Z" fill="#26262b" /></g>
        <ellipse cx="42" cy="47" rx="7" ry="9" fill="#33333b" /><path d="M37 40 L37 33 L41 38 Z M47 40 L47 33 L43 38 Z" fill="#33333b" />
        <circle cx="39.5" cy="45" r="1.5" fill="#ff4f5e" /><circle cx="44.5" cy="45" r="1.5" fill="#ff4f5e" /></g>${fist()}`,
    // Lazo de vaquero girando
    lasso: () => `<path d="M40 82 C34 70 38 60 44 52" stroke="#c8915a" stroke-width="3.5" fill="none" />
      <g class="lasso"><ellipse cx="44" cy="40" rx="30" ry="9" fill="none" stroke="#c8915a" stroke-width="4" /></g>${fist()}`,
    // Lupa de detective
    magnifier: () => `<path d="M40 84 L33 64" stroke="#6b4226" stroke-width="7" stroke-linecap="round" />
      <circle cx="29" cy="47" r="17" fill="#bfe6ff" fill-opacity="0.45" stroke="#c99a2e" stroke-width="5" />
      <path d="M20 41 Q24 35 31 35" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round" />${fist()}`,
    // Hacha vikinga (de juguete)
    axe: (p) => `<path d="M40 96 L40 22" stroke="#8a5a34" stroke-width="7" stroke-linecap="round" />
      <path d="M42 26 C58 20 70 32 68 52 C60 44 52 44 42 46 Z" fill="#d7dbe3" stroke="#9aa0ad" stroke-width="2" />
      <path d="M38 26 C28 24 22 30 22 38 C28 34 32 34 38 36 Z" fill="#d7dbe3" stroke="#9aa0ad" stroke-width="2" />${glove(p)}`,
    // Globos de colores
    balloons: (p, t) => `<g class="balloons"><path d="M40 80 L22 36 M40 80 L44 26 M40 80 L62 40" stroke="#ffffff" stroke-width="1.3" opacity="0.8" />
      <ellipse cx="22" cy="26" rx="12" ry="14" fill="#e01f3d" /><ellipse cx="44" cy="14" rx="13" ry="15" fill="#3fd47f" /><ellipse cx="64" cy="30" rx="11" ry="13" fill="#f2c14e" />
      <path d="M17 20 Q19 16 23 15 M39 8 Q41 4 45 3 M60 24 Q62 20 65 20" stroke="#fff" stroke-width="2" fill="none" opacity="0.7" /></g>${mitten(p, t)}`,
    // Garfio de pirata
    hook: () => `<path d="M40 84 L40 64 C40 48 24 46 22 60" stroke="#c9ced8" stroke-width="5" fill="none" stroke-linecap="round" />
      <ellipse cx="40" cy="88" rx="14" ry="8" fill="#6b4226" />`,
    // Pulgar arriba con guante
    thumb: (p) => `<rect x="44" y="60" width="10" height="22" rx="5" fill="url(#${p}-mitten)" />${glove(p)}`,
    // Manguera con chorrito de agua
    nozzle: (p) => `<path d="M40 86 L31 58" stroke="#c9ced8" stroke-width="10" stroke-linecap="round" />
      <path d="M31 60 L25 42" stroke="#f2c14e" stroke-width="7" stroke-linecap="round" />
      <g class="water" fill="#9fdcff">${[[22, 30, 3.5], [18, 20, 3], [26, 16, 2.6], [14, 9, 2.4], [24, 4, 2]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" />`).join("")}</g>${glove(p)}`,
    // Termómetro
    thermometer: () => `<rect x="35" y="40" width="9" height="38" rx="4.5" fill="#fff" stroke="#c9ced8" stroke-width="1.5" />
      <rect x="38" y="52" width="3" height="24" fill="#e01f3d" /><circle cx="39.5" cy="76" r="5" fill="#e01f3d" />${fist(40, 88)}`,
    // Bandera roja con estrella
    flag: (p, t) => `<path d="M40 98 L40 4" stroke="#c99a2e" stroke-width="4" stroke-linecap="round" /><circle cx="40" cy="4" r="3.5" fill="#f2c14e" />
      <g class="flag"><path d="M42 8 C56 2 66 14 84 8 L84 40 C66 46 56 34 42 40 Z" fill="#d4132f" />${star(58, 23, 7, "#f2c14e")}</g>${mitten(p, t)}`,
    // Esfera navideña "prestada" del árbol
    bauble: () => `<path d="M40 76 L40 64" stroke="#c99a2e" stroke-width="2" />
      <circle cx="40" cy="50" r="14" fill="#3a8ee6" /><rect x="35" y="34" width="10" height="6" rx="1.5" fill="#c99a2e" />
      <path d="M30 46 Q33 40 39 39" stroke="#fff" stroke-width="2.5" fill="none" opacity="0.7" stroke-linecap="round" />${fist()}`,
  });

  Object.assign(REST_PROPS, {
    // Bocina de payaso
    horn: { under: true, svg: () => `<path d="M162 212 L186 202 C194 200 198 212 196 222 C194 230 188 230 162 224 Z" fill="#f2c14e" />
      <ellipse cx="194" cy="216" rx="4" ry="11" fill="#c99a2e" /><circle cx="150" cy="216" r="11" fill="#e01f3d" />` },
    // Saco lleno de regalos (¡robados!)
    sack: { under: true, svg: () => `<rect x="160" y="182" width="20" height="18" rx="2" fill="#3fd47f" /><rect x="168" y="182" width="4" height="18" fill="#f2c14e" />
      <rect x="180" y="188" width="16" height="14" rx="2" fill="#3a8ee6" /><rect x="186" y="188" width="4" height="14" fill="#fff" />
      <path d="M152 212 C140 236 148 266 176 270 C206 272 220 246 208 218 C204 206 196 200 186 200 L162 200 C156 202 154 206 152 212 Z" fill="#8a6a3a" />
      <path d="M160 204 C172 210 190 210 204 204" stroke="#5a4020" stroke-width="3" fill="none" />
      <path d="M170 240 Q180 236 190 242" stroke="#6b4e2a" stroke-width="2" fill="none" />` },
  });

  Object.assign(PROPS, {
    // Manubrio de moto con faro
    handlebar: () => `<path d="M48 214 C70 228 92 232 120 232 C148 232 170 228 192 214" stroke="#3a3a46" stroke-width="7" fill="none" stroke-linecap="round" />
      <rect x="36" y="206" width="22" height="12" rx="6" fill="#141418" transform="rotate(25 47 212)" />
      <rect x="182" y="206" width="22" height="12" rx="6" fill="#141418" transform="rotate(-25 193 212)" />
      <circle cx="120" cy="246" r="17" fill="#c9ced8" /><circle cx="120" cy="246" r="12" fill="#fff6c8" class="led" /><circle cx="116" cy="242" r="3.5" fill="#fff" />`,
  });

  Object.assign(BACKS, {
    // Capa de vampiro negra por fuera, roja por dentro, con cuello alto
    vampcape: () => `<path d="M58 128 C22 196 20 254 28 280 L212 280 C220 254 218 196 182 128 Z" fill="#141418" />
      <path d="M58 128 C30 190 28 240 34 270 L46 270 C42 236 46 190 70 140 Z" fill="#a50d26" />
      <path d="${mirrorX("M58 128 C30 190 28 240 34 270 L46 270 C42 236 46 190 70 140 Z")}" fill="#a50d26" />
      <path d="M74 146 C58 116 60 86 70 66 C82 94 96 112 112 122 Z" fill="#c8102e" stroke="#141418" stroke-width="4" stroke-linejoin="round" />
      <path d="${mirrorX("M74 146 C58 116 60 86 70 66 C82 94 96 112 112 122 Z")}" fill="#c8102e" stroke="#141418" stroke-width="4" stroke-linejoin="round" />`,
    // Escudo vikingo redondo
    shield: (p) => `<defs><clipPath id="${p}-shield"><circle cx="196" cy="196" r="38" /></clipPath></defs>
      <circle cx="196" cy="196" r="38" fill="#8a5a34" />
      <path d="M196 150 L196 242 M150 196 L242 196" stroke="#c8102e" stroke-width="10" clip-path="url(#${p}-shield)" />
      <circle cx="196" cy="196" r="38" fill="none" stroke="#9aa0ad" stroke-width="5" />
      <circle cx="196" cy="196" r="9" fill="#c9ced8" stroke="#8a909c" stroke-width="2" />`,
  });

  Object.assign(FEET, {
    // Botas con espuelas
    spurs: (t) => FEET.boots(t) + [64, 176].map((x) => `${star(x, 266, 6, "#c9ced8")}`).join(""),
    // Zapatos gigantes de payaso
    clown: () => [[82, "l"], [158, "r"]].map(([x]) => `<ellipse cx="${x}" cy="268" rx="32" ry="12" fill="#e01f3d" />
      <ellipse cx="${x - 8}" cy="263" rx="10" ry="3.5" fill="#fff" opacity="0.35" />`).join(""),
  });

  // =====================================================================================
  // ---------- Tercera tanda: boxeador, hippie y disco ----------
  // =====================================================================================
  const daisy = (x, y, r = 5, c = "#ffffff", mid = "#f2c14e") => `<g>${[0, 60, 120, 180, 240, 300].map((a) =>
    `<ellipse cx="${x}" cy="${y - r}" rx="${r * 0.5}" ry="${r * 0.85}" fill="${c}" transform="rotate(${a} ${x} ${y})" />`).join("")}
    <circle cx="${x}" cy="${y}" r="${r * 0.55}" fill="${mid}" /></g>`;

  Object.assign(HATS, {
    // Pelo largo hippie con vincha de cuero y florcitas
    flowers: () => {
      const side = "M80 92 C64 112 62 150 68 184 C72 196 86 194 90 184 C84 152 84 120 92 100 Z";
      return `<g fill="#ffffff" stroke="#d9e0ea" stroke-width="1.5"><path d="${side}" /><path d="${mirrorX(side)}" />
        <path d="M78 98 C74 60 98 42 120 42 C142 42 166 60 162 98 C150 82 136 78 120 80 C104 78 90 82 78 98 Z" /></g>
      <path d="M72 158 C70 168 72 176 76 182 M168 158 C170 168 168 176 164 182" stroke="#d9e0ea" stroke-width="2" fill="none" />
      <path d="M78 84 Q120 68 162 84" stroke="#7a4a2c" stroke-width="6" fill="none" stroke-linecap="round" />
      ${daisy(88, 79, 6, "#ffffff")}${daisy(104, 74, 6, "#ff7aa8")}${daisy(120, 72.5, 7, "#f2c14e", "#ff7a1a")}${daisy(136, 74, 6, "#7fd0ff")}${daisy(152, 79, 6, "#ffffff")}`;
    },

    // Afro blanco gigante con un gorrito navideño chiquito encima
    afro: (p) => `<g fill="#ffffff">${[[70, 98, 17], [64, 74, 20], [74, 50, 22], [96, 32, 24], [120, 26, 26], [144, 32, 24], [166, 50, 22], [176, 74, 20], [170, 98, 17]]
        .map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" />`).join("")}<ellipse cx="120" cy="58" rx="54" ry="30" /></g>
      <g fill="#e3e9f1">${[[70, 80], [86, 48], [112, 34], [140, 42], [164, 64], [172, 92], [98, 62], [146, 68]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3.5" />`).join("")}</g>
      <g transform="rotate(18 136 12)"><path d="M120 14 C122 2 132 -4 144 -8 C146 2 147 8 146 14 Z" fill="url(#${p}-hat)" />
        <rect x="116" y="11" width="34" height="7" rx="3.5" fill="url(#${p}-fur)" /><circle cx="144" cy="-8" r="4" fill="url(#${p}-fur)" /></g>`,
  });

  Object.assign(HEAD_EXTRAS, {
    // Curita en el cachete (gajes del oficio)
    bandaid: () => `<g transform="rotate(-25 92 116)"><rect x="82" y="112" width="20" height="8" rx="4" fill="#f0c890" />
      <rect x="89" y="112" width="6" height="8" fill="#e2b072" /><circle cx="85.5" cy="116" r="0.9" fill="#c9965a" /><circle cx="98.5" cy="116" r="0.9" fill="#c9965a" /></g>`,
  });

  Object.assign(EYES, {
    // Lentes disco: marco dorado y lunas moradas
    disco: () => {
      const lens = "M88 100 L117 100 L115 113 Q104 121 92 114 Z";
      return `<path d="${lens}" fill="#7b2fa8" stroke="#f2c14e" stroke-width="3" stroke-linejoin="round" />
      <path d="${mirrorX(lens)}" fill="#7b2fa8" stroke="#f2c14e" stroke-width="3" stroke-linejoin="round" />
      <path d="M117 103 Q120 100 123 103" stroke="#f2c14e" stroke-width="3" fill="none" />
      <path d="M93 104 L101 104 M127 104 L135 104" stroke="#fff" stroke-width="2" opacity="0.6" stroke-linecap="round" />`;
    },
  });

  Object.assign(RAISED, {
    // Guante de box en alto
    boxglove: () => `<path d="M24 86 C16 66 28 50 44 52 C60 54 64 72 58 88 C54 98 30 98 24 86 Z" fill="#d4132f" />
      <ellipse cx="24" cy="78" rx="7" ry="11" fill="#b00f28" transform="rotate(18 24 78)" />
      <path d="M33 61 Q42 56 51 63" stroke="#fff" stroke-width="3" opacity="0.4" fill="none" stroke-linecap="round" />
      <rect x="29" y="92" width="24" height="13" rx="4" fill="#ffffff" transform="rotate(-6 41 98)" />`,
    // Señal de paz y amor (dedos en V)
    peace: () => `<rect x="28" y="54" width="8" height="28" rx="4" fill="${SKIN}" transform="rotate(-14 32 80)" />
      <rect x="42" y="54" width="8" height="28" rx="4" fill="${SKIN}" transform="rotate(14 46 80)" />${fist()}`,
  });

  Object.assign(REST_HANDS, {
    boxglove: () => `<rect x="160" y="205" width="13" height="24" rx="4" fill="#ffffff" transform="rotate(-25 166 217)" />
      <path d="M136 220 C134 204 146 200 156 202 C168 204 170 222 162 232 C154 240 138 236 136 220 Z" fill="#d4132f" />
      <ellipse cx="144" cy="206" rx="8" ry="6" fill="#b00f28" />
      <path d="M142 214 Q150 208 158 212" stroke="#fff" stroke-width="2.5" opacity="0.4" fill="none" stroke-linecap="round" />`,
  });

  Object.assign(REST_PROPS, {
    // Margarita en la mano
    daisy: { under: false, svg: () => `<path d="M158 214 C164 196 170 184 180 172" stroke="#2f8a43" stroke-width="3" fill="none" stroke-linecap="round" />
      <ellipse cx="168" cy="192" rx="7" ry="3" fill="#3c9a4e" transform="rotate(-40 168 192)" />
      <g class="spin">${daisy(181, 168, 9, "#ffffff")}</g>` },
  });

  Object.assign(BACKS, {
    // Bola disco colgando con destellos
    discoball: (p) => `<path d="M204 -20 L204 14" stroke="#c9ced8" stroke-width="1.5" />
      <defs><clipPath id="${p}-ball"><circle cx="204" cy="34" r="20" /></clipPath></defs>
      <circle cx="204" cy="34" r="20" fill="#9aa0ad" />
      <g clip-path="url(#${p}-ball)" class="facets">${Array.from({ length: 6 }, (_, r) => Array.from({ length: 6 }, (_, c) =>
        `<rect x="${184 + c * 7}" y="${14 + r * 7}" width="6" height="6" fill="${["#e3e7ee", "#c9ced8", "#ffffff", "#b8bec9", "#d7dbe3"][(r * 2 + c) % 5]}" />`).join("")).join("")}</g>
      <circle cx="204" cy="34" r="20" fill="none" stroke="#8a909c" stroke-width="1.5" />
      <g class="glints">${star(196, 26, 5, "#ffffff")}${star(214, 42, 3.5, "#fff6c8")}${star(222, 14, 4, "#ffffff")}</g>`,
  });

  Object.assign(FEET, {
    // Botas de boxeo blancas con pasadores rojos
    boxboots: () => [90, 150].map((x) => `<rect x="${x - 15}" y="244" width="30" height="24" rx="6" fill="#f4f6fa" />
      <ellipse cx="${x}" cy="269" rx="24" ry="10" fill="#f4f6fa" stroke="#c9d0db" stroke-width="1.5" />
      <path d="M${x - 6} 250 l12 4 M${x - 6} 256 l12 4 M${x - 6} 262 l12 4" stroke="#d4132f" stroke-width="2" stroke-linecap="round" />`).join(""),
    // Zapatos de plataforma dorados
    platforms: () => [90, 150].map((x) => `<ellipse cx="${x}" cy="262" rx="23" ry="9" fill="#f2c14e" />
      <rect x="${x - 21}" y="262" width="42" height="14" rx="5" fill="#c99a2e" />
      <path d="M${x - 14} 266 l4 0 M${x} 270 l4 0 M${x + 10} 266 l4 0" stroke="#fff6c8" stroke-width="2" stroke-linecap="round" />`).join(""),
  });

  // Ropa extra (se llama desde clothes)
  function clothesExtra(p, t) {
    const pat = t.pattern;
    let s = "";
    if (pat === "vamp") s += `<path d="M96 120 L120 222 L144 120 Z" fill="#f4f6fa" />
        <circle cx="120" cy="206" r="8" fill="#c8102e" stroke="#f2c14e" stroke-width="3" />`;
    if (pat === "trench") s += `<path d="M98 120 L118 206 L104 206 L78 132 Z" fill="#a88a55" /><path d="M142 120 L122 206 L136 206 L162 132 Z" fill="#a88a55" />
        ${[104, 136].map((x) => [234, 254].map((y) => `<circle cx="${x}" cy="${y}" r="4" fill="#5a4020" />`).join("")).join("")}`;
    if (pat === "viking") s += `<path d="M30 150 L210 250" stroke="#4a2f1c" stroke-width="12" />
        <path d="M30 140 C80 124 160 124 210 140 L210 168 C160 150 80 150 30 168 Z" fill="#c9ced8" />
        ${[50, 74, 98, 122, 146, 170, 194].map((x) => `<circle cx="${x}" cy="${160 - Math.abs(120 - x) / 12}" r="9" fill="#e3e7ee" />`).join("")}`;
    if (pat === "dots") s += Array.from({ length: 7 }, (_, r) => Array.from({ length: 8 }, (_, c) =>
        `<circle cx="${36 + c * 24 + (r % 2) * 12}" cy="${132 + r * 24}" r="6" fill="${["#e01f3d", "#3a8ee6", "#2a8a5a", "#ff7aa8"][(r + c) % 4]}" />`).join("")).join("");
    if (pat === "stripes") s += Array.from({ length: 11 }, (_, i) => `<rect x="30" y="${124 + i * 16}" width="180" height="8" fill="#c8102e" />`).join("");
    if (pat === "biker") s += `<path d="M98 120 L114 210 L96 214 L76 134 Z" fill="#2a1a12" /><path d="M142 120 L126 210 L144 214 L164 134 Z" fill="#2a1a12" />
        <path d="M128 186 L140 290" stroke="#c9ced8" stroke-width="3" stroke-dasharray="3 2" />
        ${[[70, 236], [172, 236]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3" fill="#c9ced8" />`).join("")}`;
    if (pat === "reflective") s += [204, 244].map((y) => `<rect x="30" y="${y}" width="180" height="14" fill="#f2c14e" /><rect x="30" y="${y + 5}" width="180" height="4" fill="#e3e7ee" />`).join("") +
        [186, 228, 268].map((y) => `<rect x="112" y="${y}" width="16" height="7" rx="2" fill="#c9ced8" />`).join("");
    if (pat === "labcoat") s += `<path d="M98 120 L120 212 L142 120" stroke="#c9d0db" stroke-width="3" fill="none" /><path d="M120 212 L120 290" stroke="#c9d0db" stroke-width="2.5" />
        ${[232, 256].map((y) => `<circle cx="128" cy="${y}" r="3" fill="#c9d0db" />`).join("")}
        <rect x="146" y="214" width="28" height="24" rx="3" fill="none" stroke="#c9d0db" stroke-width="2.5" />
        <rect x="152" y="204" width="4" height="16" rx="2" fill="#3a8ee6" /><rect x="160" y="206" width="4" height="14" rx="2" fill="#e01f3d" />
        <path d="M92 178 C86 214 106 238 122 238" stroke="#3a3f4a" stroke-width="4" fill="none" /><path d="M148 178 C154 200 148 214 136 222" stroke="#3a3f4a" stroke-width="4" fill="none" />
        <circle cx="126" cy="238" r="7" fill="#d7dbe3" stroke="#8a909c" stroke-width="2.5" />
        <path d="M74 214 L86 214 M80 208 L80 220" stroke="#e01f3d" stroke-width="4" />`;
    if (pat === "tunic") s += `${star(68, 178, 11, "#f2c14e")}` + [104, 136].map((x) => [234, 254].map((y) => `<circle cx="${x}" cy="${y}" r="4" fill="#f2c14e" />`).join("")).join("");
    if (t.badge === "sheriff") s += `${star(68, 178, 12, "#f2c14e")}<circle cx="68" cy="178" r="4" fill="#c99a2e" />`;
    // Overol de jean (agricultor): peto con bolsillo, tirantes con botones y costuras
    if (t.overalls) s += `<path d="M78 120 L96 178 M162 120 L144 178" stroke="#2f5f9a" stroke-width="12" />
        <path d="M90 176 L150 176 L150 214 L210 214 L210 292 L30 292 L30 214 L90 214 Z" fill="#3a6fb0" />
        <path d="M94 180 L146 180 L146 214 M94 180 L94 214 M30 218 L210 218" stroke="#f2c14e" stroke-width="1.6" stroke-dasharray="4 3" fill="none" opacity="0.8" />
        <rect x="106" y="188" width="28" height="20" rx="3" fill="#2f5f9a" />
        <path d="M120 218 L120 292" stroke="#2f5f9a" stroke-width="2.5" />
        ${[97, 143].map((x) => `<circle cx="${x}" cy="182" r="4.5" fill="#f2c14e" /><circle cx="${x}" cy="182" r="1.6" fill="#c99a2e" />`).join("")}`;
    // Boxeador: short blanco con franjas y cinturón de campeón
    if (pat === "boxer") s += `<rect x="30" y="214" width="180" height="80" fill="#ffffff" />
        <path d="M56 214 L48 292 M184 214 L192 292" stroke="#d4132f" stroke-width="8" />
        <rect x="30" y="204" width="180" height="22" fill="#f2c14e" /><rect x="30" y="207" width="180" height="2.5" fill="#fff" opacity="0.5" />
        ${[66, 174].map((x) => `<circle cx="${x}" cy="215" r="4.5" fill="#d4132f" stroke="#fff3c4" stroke-width="1.5" />`).join("")}
        <ellipse cx="120" cy="215" rx="28" ry="19" fill="#f2c14e" stroke="#c99a2e" stroke-width="3" />
        <ellipse cx="120" cy="215" rx="20" ry="13" fill="none" stroke="#c99a2e" stroke-width="1.5" />${star(120, 215, 10, "#d4132f")}`;
    // Hippie: polo teñido (tie-dye) y collar de paz y amor
    if (pat === "tiedye") s += ["#ff4f7b", "#ff9a3c", "#f2c14e", "#3fd47f", "#3a8ee6", "#8e5ad6", "#ff7aa8"].map((c, i) =>
        `<circle cx="${120 + (i % 2 ? 4 : -4)}" cy="${206 + (i % 2 ? -3 : 3)}" r="${116 - i * 15}" fill="${c}" />`).join("") +
        `<g stroke="#ffffff" stroke-width="3" fill="none" opacity="0.25"><path d="M60 170 Q90 150 120 176 T180 170" /><path d="M50 230 Q86 206 120 236 T194 226" /></g>
        <path d="M94 124 Q120 222 146 124" stroke="#7a4a2c" stroke-width="2" fill="none" />
        <circle cx="120" cy="202" r="11" fill="none" stroke="#e3e7ee" stroke-width="3" />
        <path d="M120 191 L120 213 M120 202 L112.5 209.5 M120 202 L127.5 209.5" stroke="#e3e7ee" stroke-width="2.5" />`;
    // Disco: camisa con cuello gigante, pecho abierto con cadena de oro y lentejuelas
    if (pat === "disco") {
      const collar = "M104 120 L56 130 L86 172 L112 150 Z";
      s += `<path d="M96 120 L120 214 L144 120 Z" fill="${SKIN}" />
        <path d="${collar}" fill="#ffffff" /><path d="${mirrorX(collar)}" fill="#ffffff" />
        <path d="M100 150 Q120 210 140 150" stroke="#f2c14e" stroke-width="3" fill="none" />
        <circle cx="120" cy="198" r="8" fill="#f2c14e" stroke="#c99a2e" stroke-width="2" />${star(120, 198, 4.5, "#c99a2e")}
        <g class="sequins">${Array.from({ length: 22 }, (_, i) => `<circle cx="${40 + ((i * 53) % 160)}" cy="${150 + ((i * 37) % 120)}" r="2" fill="#fff" opacity="0.75" style="animation-delay:${-(i % 5) * 0.2}s" />`).join("")}</g>`;
    }
    if (t.frontStrip === "pompoms") s += ["#e01f3d", "#3a8ee6", "#2a8a5a"].map((c, i) => `<circle cx="120" cy="${200 + i * 26}" r="8" fill="${c}" />`).join("");
    return s;
  }

  // ---------- Temas ----------
  // coat: colores del traje (claro, medio, oscuro). hat: colores del gorro clásico (si no, usa coat).
  const RED = ["#f0455a", "#d4132f", "#980b21"];
  const GREEN_MITTEN = ["#2f9a63", "#15503a"];
  const WHITE = ["#ffffff", "#eef1f5", "#c9d0db"];
  const THEMES = {
    clasico: { name: "Clásico", coat: RED, mitten: GREEN_MITTEN, sleeve: "coat", cuffs: true, frontStrip: "fur", bottom: "fur", belt: "classic",
      feet: "boots", hat: "classic", eyes: "open", raised: "mitten", rest: "mitten" },
    rockero: { name: "Rockero", coat: ["#4a4a56", "#26262e", "#111114"], mitten: GREEN_MITTEN, sleeve: "coat", frontStrip: "tee", bottom: "hem", belt: "studs",
      feet: "boots", hat: "classic", eyes: "shades", raised: "rock", rest: "skin", prop: "guitar" },
    veraniego: { name: "Veraniego", coat: ["#f0455a", "#d4132f", "#a50d26"], mitten: GREEN_MITTEN, sleeve: "short", frontStrip: "buttons", bottom: "shorts", pattern: "hibiscus",
      feet: "sandals", hat: "straw", eyes: "round", raised: "coconut", rest: "skin", back: "surfboard" },
    andino: { name: "Andino", coat: ["#e5404f", "#c8102e", "#8f0b20"], mitten: ["#f2c14e", "#c99a2e"], sleeve: "coat", pattern: "poncho",
      feet: "boots", bootColor: "#4a2c1d", hat: "chullo", eyes: "open", raised: "mug", rest: "mitten" },
    futbolero: { name: "Futbolero", coat: WHITE, hatColors: RED, mitten: GREEN_MITTEN, sleeve: "short", pattern: "peru", bottom: "shorts", shortsColor: "#1f1f24",
      feet: "cleats", hat: "classic", eyes: "open", raised: "fist", rest: "skin", restProp: "ball" },
    dj: { name: "DJ", coat: ["#3fae74", "#1f6b45", "#124a33"], hatColors: RED, mitten: GREEN_MITTEN, sleeve: "coat", cuffs: true, frontStrip: "fur", bottom: "fur", belt: "classic",
      feet: "boots", hat: "classic", headExtra: "headphones", eyes: "open", raised: "finger", rest: "skin", prop: "deck" },
    mago: { name: "Mago", coat: RED, mitten: ["#f2c14e", "#c99a2e"], sleeve: "coat", cuffs: true, frontStrip: "fur", bottom: "fur", belt: "classic",
      feet: "boots", hat: "wizard", eyes: "open", raised: "wand", rest: "mitten", back: "cape" },
    pijama: { name: "En pijama", coat: RED, mitten: GREEN_MITTEN, sleeve: "coat", pattern: "plaid", frontStrip: "buttons",
      feet: "slippers", hat: "nightcap", headExtra: "zzz", eyes: "sleepy", raised: "candle", rest: "skin", restProp: "pillow" },
    chef: { name: "Chef", coat: WHITE, mitten: GREEN_MITTEN, sleeve: "coat", pattern: "apron",
      feet: "boots", hat: "toque", eyes: "open", raised: "spoon", rest: "skin", restProp: "panettone" },
    cuy: { name: "Cuy", coat: ["#b07a4f", "#7a4a2c", "#4f2d18"], mitten: ["#9a6440", "#5a341d"], sleeve: "coat", pattern: "cuy",
      feet: "paws", hat: "cuy", eyes: "open", raised: "paw", rest: "paw", restProp: "carrot" },
    agricultor: { name: "Agricultor", coat: RED, mitten: GREEN_MITTEN, sleeve: "coat", pattern: "plaid", overalls: true,
      feet: "boots", bootColor: "#5a3a22", hat: "farmhat", eyes: "open", raised: "pitchfork", rest: "skin", restProp: "crate" },
    vampiro: { name: "Vampiro", coat: ["#3a3a46", "#1f1f24", "#0b0b0e"], mitten: GREEN_MITTEN, sleeve: "coat", pattern: "vamp", bottom: "hem",
      face: ["#f4f5f9", "#cdd3e0"], skin: ["#e6e9f0", "#c9cfdc"], mouth: "fangs",
      feet: "boots", hat: "vamphair", eyes: "open", raised: "bat", rest: "skin", back: "vampcape" },
    vaquero: { name: "Vaquero", coat: ["#e5404f", "#b5182c", "#7a0d1d"], mitten: GREEN_MITTEN, sleeve: "coat", pattern: "vest", vestColor: "#8a5a34", vestTrim: false,
      badge: "sheriff", belt: "classic", bottom: "hem", hemColor: "#2a5a9a",
      feet: "spurs", bootColor: "#6b4226", hat: "cowboy", eyes: "open", raised: "lasso", rest: "skin" },
    detective: { name: "Detective", coat: ["#e3cc9c", "#c4a56b", "#8a6f3e"], mitten: GREEN_MITTEN, sleeve: "coat", pattern: "trench", belt: "classic", beltColor: "#8a6f3e",
      feet: "boots", bootColor: "#4a2c1d", hat: "deerstalker", eyes: "open", raised: "magnifier", rest: "skin" },
    vikingo: { name: "Vikingo", coat: ["#b07a4f", "#7a4a2c", "#4f2d18"], mitten: ["#8a5a3b", "#4f2d18"], sleeve: "coat", pattern: "viking", belt: "classic", bottom: "hem", hemColor: "#3a2a22",
      feet: "boots", bootColor: "#4a2c1d", hat: "viking", eyes: "open", raised: "axe", rest: "mitten", back: "shield" },
    payaso: { name: "Payaso", coat: ["#fff1a8", "#f2c14e", "#c99a2e"], mitten: ["#ffffff", "#d7dbe3"], sleeve: "coat", pattern: "dots", frontStrip: "pompoms",
      hair: ["#ff4f7b", "#3a8ee6", "#f2c14e", "#3fd47f", "#ff9a3c", "#ff4f7b"], nose: "#e01f3d",
      feet: "clown", hat: "clownhat", eyes: "open", raised: "balloons", rest: "mitten", restProp: "horn" },
    pirata: { name: "Pirata", coat: WHITE, mitten: GREEN_MITTEN, sleeve: "coat", pattern: "stripes", belt: "classic", bottom: "hem", hemColor: "#1f1f24",
      feet: "boots", hat: "tricorn", eyes: "patch", raised: "hook", rest: "skin", headExtra: "parrot" },
    motociclista: { name: "Motociclista", coat: ["#7a5644", "#4a2f22", "#2a1a12"], hatColors: RED, mitten: ["#3a3a46", "#111114"], sleeve: "coat", pattern: "biker", belt: "studs", bottom: "hem",
      feet: "boots", hat: "moto", eyes: "open", raised: "thumb", rest: "mitten", prop: "handlebar" },
    bombero: { name: "Bombero", coat: ["#4a505c", "#2c313b", "#15171c"], hatColors: RED, mitten: ["#f2c14e", "#c99a2e"], sleeve: "coat", pattern: "reflective",
      feet: "boots", hat: "firehelmet", eyes: "open", raised: "nozzle", rest: "mitten" },
    doctor: { name: "Doctor", coat: WHITE, mitten: GREEN_MITTEN, sleeve: "coat", pattern: "labcoat",
      feet: "boots", hat: "doctor", eyes: "open", raised: "thermometer", rest: "skin" },
    comunista: { name: "Comunista", coat: RED, mitten: ["#8a5a3b", "#4f2d18"], sleeve: "coat", cuffs: true, pattern: "tunic", belt: "classic", beltColor: "#4a2f1c", bottom: "hem", hemColor: "#3a2a22",
      feet: "boots", bootColor: "#3a2a22", hat: "ushanka", eyes: "open", raised: "flag", rest: "mitten" },
    grinch: { name: "Gruñón verde", coat: RED, mitten: GREEN_MITTEN, sleeve: "coat", cuffs: true, frontStrip: "fur", bottom: "fur", belt: "classic",
      faceStyle: "grump", face: ["#b8d96a", "#86ad40"], skin: ["#9cc450", "#6d9332"],
      feet: "boots", hat: "classic", eyes: "grump", raised: "bauble", rest: "skin", restProp: "sack" },
    boxeador: { name: "Boxeador", coat: RED, mitten: GREEN_MITTEN, sleeve: "short", pattern: "boxer",
      feet: "boxboots", hat: "classic", headExtra: "bandaid", eyes: "open", raised: "boxglove", rest: "boxglove" },
    hippie: { name: "Hippie", coat: ["#a77de6", "#7b4fc4", "#4f2d8a"], mitten: GREEN_MITTEN, sleeve: "coat", pattern: "tiedye", bottom: "hem", hemColor: "#3a6fb0",
      feet: "sandals", hat: "flowers", eyes: "round", raised: "peace", rest: "skin", restProp: "daisy" },
    disco: { name: "Disco", coat: ["#d07ef0", "#9a2fc8", "#5a1678"], mitten: GREEN_MITTEN, sleeve: "coat", pattern: "disco",
      feet: "platforms", hat: "afro", eyes: "disco", raised: "finger", rest: "skin", back: "discoball" },
  };

  function santaSVG(id, opts = {}) {
    if (!THEMES[id]) id = "clasico";
    const t = THEMES[id];
    const p = `${opts.prefix || "s"}-${id}`; // prefijo para que los ids no choquen si hay varios Santas en la página
    const head = !!opts.head;
    const hat = t.hatColors || t.coat;
    const sleeve = `url(#${p}-coat)`;
    // Manga corta: tramo inicial exacto del brazo (curva cortada al 40 %), con borde recto y dobladillo;
    // lleva el mismo estampado de la camisa. El hombro derecho se redondea porque queda encima del cuerpo.
    const SHORT = {
      left: { d: "M62 168 C53.2 160.8 46.6 152 42.5 142.5", hem: "M44.1 146.2 L42.5 142.5" },
      right: { d: "M186 160 C193.2 169.6 196.2 179.2 195.5 187.8", hem: "M195.8 183.8 L195.5 187.8", shoulder: [186, 160] },
    };
    const sleevePattern = t.pattern === "hibiscus" ? `url(#${p}-hib)` : t.pattern === "plaid" ? `url(#${p}-plaid)` : null;
    const arm = (d, which) => {
      if (t.sleeve !== "short") return `<path d="${d}" stroke="${sleeve}" stroke-width="30" stroke-linecap="round" fill="none" />`;
      const s = SHORT[which];
      const tube = (stroke) => `<path d="${s.d}" stroke="${stroke}" stroke-width="34" fill="none" />` +
        (s.shoulder ? `<circle cx="${s.shoulder[0]}" cy="${s.shoulder[1]}" r="17" fill="${stroke}" />` : "");
      return `<path d="${d}" stroke="${SKIN}" stroke-width="26" stroke-linecap="round" fill="none" />` +
        tube(t.coat[1]) + (sleevePattern ? tube(sleevePattern) : "") +
        `<path d="${s.hem}" stroke="${t.coat[2]}" stroke-width="34" fill="none" opacity="0.7" />`;
    };
    const grad = (name, c) => `<radialGradient id="${p}-${name}" cx="0.38" cy="0.3" r="0.8"><stop offset="0" stop-color="${c[0]}" /><stop offset="0.55" stop-color="${c[1]}" /><stop offset="1" stop-color="${c[2]}" /></radialGradient>`;

    const defs = `<defs>
      ${grad("coat", t.coat)}${grad("hat", hat)}
      <radialGradient id="${p}-face" cx="0.45" cy="0.4" r="0.7"><stop offset="0" stop-color="${(t.face || [])[0] || "#fde0c8"}" /><stop offset="1" stop-color="${(t.face || [])[1] || "#efb994"}" /></radialGradient>
      <linearGradient id="${p}-fur" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff" /><stop offset="1" stop-color="#e3e9f1" /></linearGradient>
      <radialGradient id="${p}-mitten" cx="0.35" cy="0.35" r="0.7"><stop offset="0" stop-color="${t.mitten[0]}" /><stop offset="1" stop-color="${t.mitten[1]}" /></radialGradient>
      <clipPath id="${p}-body"><ellipse cx="120" cy="198" rx="80" ry="70" /></clipPath>
      ${t.pattern === "hibiscus" ? `<pattern id="${p}-hib" width="46" height="46" patternUnits="userSpaceOnUse"><g transform="translate(23 23)">
        <ellipse cx="-9" cy="9" rx="8" ry="3.5" fill="#1f6b45" transform="rotate(35 -9 9)" />
        ${[0, 72, 144, 216, 288].map((a) => `<ellipse cx="0" cy="-6" rx="4.5" ry="7" fill="#fff" transform="rotate(${a})" />`).join("")}
        <circle r="3" fill="#f2c14e" /></g><circle cx="2" cy="4" r="2.5" fill="#ffd27a" opacity="0.8" /></pattern>` : ""}
      ${t.pattern === "plaid" ? `<pattern id="${p}-plaid" width="26" height="26" patternUnits="userSpaceOnUse">
        <rect width="26" height="26" fill="#c8102e" /><rect y="8" width="26" height="8" fill="#15503a" opacity="0.55" />
        <rect x="8" width="8" height="26" fill="#15503a" opacity="0.55" />
        <rect y="20" width="26" height="1.5" fill="#fff" opacity="0.45" /><rect x="20" width="1.5" height="26" fill="#fff" opacity="0.45" /></pattern>` : ""}
    </defs>`;

    const beard = (fill, dy) => `<g fill="${fill}" transform="translate(0 ${dy})">
      <circle cx="87" cy="133" r="14" /><circle cx="90" cy="148" r="15.5" /><circle cx="101" cy="160" r="16.5" />
      <circle cx="120" cy="166" r="18" /><circle cx="139" cy="160" r="16.5" /><circle cx="150" cy="148" r="15.5" /><circle cx="153" cy="133" r="14" />
      ${dy ? "" : `<ellipse cx="120" cy="147" rx="34" ry="18" />`}</g>`;
    const mustache = (fill, dy) => `<g fill="${fill}" transform="translate(0 ${dy})">
      <path d="M120 133 C112 125 97 125 90 132 C86 138 91 143 98 141 C105 139 112 140 120 137 Z" />
      <path d="M120 133 C128 125 143 125 150 132 C154 138 149 143 142 141 C135 139 128 140 120 137 Z" /></g>`;
    const restProp = t.restProp ? REST_PROPS[t.restProp] : null;
    const buckle = t.belt ?`<rect x="103" y="193" width="34" height="32" rx="6" fill="none" stroke="${t.belt === "studs" ? "#c9ced8" : "#f2c14e"}" stroke-width="6" />
      <rect x="106" y="196" width="10" height="3" rx="1.5" fill="#fff3c4" opacity="0.8" />` : "";

    const viewBox = head ? "44 -12 196 204" : "0 0 240 285";
    const svg = `<svg class="santa-svg santa--${id} ${opts.cls || ""}" viewBox="${viewBox}" role="img" aria-label="Santa ${t.name}">
      ${defs}
      ${head ? "" : `<ellipse class="shadow" cx="120" cy="278" rx="84" ry="7" fill="rgba(40,0,8,0.28)" />`}
      <g class="figure">
      ${head ? "" : `${t.back ? `<g class="back">${BACKS[t.back](p)}</g>` : ""}
      <g class="feet">${FEET[t.feet](t)}</g>
      <g class="arm arm--left">${arm("M62 168 C40 150 32 122 40 98", "left")}${RAISED[t.raised](p, t)}</g>`}
      <g class="belly">
        <ellipse cx="120" cy="198" rx="80" ry="70" fill="url(#${p}-coat)" />
        <g clip-path="url(#${p}-body)">${clothes(p, t)}</g>
        <ellipse cx="90" cy="168" rx="26" ry="15" fill="#fff" opacity="0.13" transform="rotate(-20 90 168)" />
        ${buckle}
      </g>
      ${head ? "" : `${t.prop ? `<g class="prop">${PROPS[t.prop]()}</g>` : ""}
      <g class="arm arm--right">${arm("M186 160 C204 184 196 208 168 216", "right")}
        ${t.cuffs ? `<ellipse cx="172" cy="214" rx="9" ry="15" fill="url(#${p}-fur)" transform="rotate(-70 172 214)" />` : ""}
        ${restProp && restProp.under ? `<g class="rest-prop">${restProp.svg()}</g>` : ""}${REST_HANDS[t.rest](p, t)}${restProp && !restProp.under ? `<g class="rest-prop">${restProp.svg()}</g>` : ""}</g>`}
      <g class="head">
        ${t.faceStyle === "grump" ? `
        <path d="M84 96 L62 92 L78 106 L58 114 L78 120 L60 134 L84 132 Z" fill="#6d9332" />
        <path d="${mirrorX("M84 96 L62 92 L78 106 L58 114 L78 120 L60 134 L84 132 Z")}" fill="#6d9332" />
        <circle cx="120" cy="112" r="42" fill="url(#${p}-face)" />
        <path d="M84 140 L92 150 L98 142 L106 154 L112 146 L120 158 L128 146 L134 154 L142 142 L148 150 L156 140 C150 152 136 160 120 160 C104 160 90 152 84 140 Z" fill="#7da33a" />
        ${EYES[t.eyes](p)}
        <ellipse cx="120" cy="122" rx="6" ry="4" fill="#4f6f22" />
        <path d="M90 128 Q120 154 152 126 Q122 142 90 128 Z" fill="#3a1a12" />
        <path d="M100 133 L104 138 L108 135 M132 134 L136 137 L140 132" stroke="#f4f0e0" stroke-width="2" fill="none" />
        <path d="M88 126 Q86 122 90 120 M152 124 Q156 120 152 118" stroke="#3f5a1a" stroke-width="2.5" fill="none" stroke-linecap="round" />` : `
        <g>${[[80, 110, 14], [75, 126, 13], [81, 140, 12], [160, 110, 14], [165, 126, 13], [159, 140, 12]].map(([x, y, r], i) =>
          `<circle cx="${x}" cy="${y}" r="${r}" fill="${t.hair ? t.hair[i % t.hair.length] : "#ffffff"}" />`).join("")}</g>
        <circle cx="120" cy="112" r="42" fill="url(#${p}-face)" />
        <ellipse cx="95" cy="124" rx="10" ry="7" fill="#f2797f" opacity="0.45" />
        <ellipse cx="145" cy="124" rx="10" ry="7" fill="#f2797f" opacity="0.45" />
        <ellipse cx="104" cy="95" rx="10" ry="4.5" fill="#fff" transform="rotate(-10 104 95)" />
        <ellipse cx="136" cy="95" rx="10" ry="4.5" fill="#fff" transform="rotate(10 136 95)" />
        ${EYES[t.eyes](p)}
        ${beard("#d9e0ea", 3)}${beard("#ffffff", 0)}
        <path d="M109 142 Q120 156 131 142 Z" fill="#8a2430" /><ellipse cx="120" cy="148" rx="5" ry="2.6" fill="#ec6f80" />
        ${t.mouth === "fangs" ? `<path d="M111 142 L114 151 L117 142 Z M123 142 L126 151 L129 142 Z" fill="#ffffff" />` : ""}
        ${mustache("#d9e0ea", 2)}${mustache("#ffffff", 0)}
        <circle cx="120" cy="126" r="9" fill="${t.nose || "#ec9580"}" /><circle cx="117" cy="123" r="3" fill="#fff" opacity="0.55" />`}
        <g class="hat">${HATS[t.hat](p)}</g>
        ${t.headExtra ? HEAD_EXTRAS[t.headExtra](p) : ""}
      </g>
      </g>
    </svg>`;
    // Piel de otro color (manos y brazos): se cambian los tonos de piel por defecto
    return t.skin ? svg.split(SKIN).join(t.skin[0]).split(SKIN_DARK).join(t.skin[1]) : svg;
  }

  window.SANTA_THEMES = THEMES;
  window.santaSVG = santaSVG;
})();
