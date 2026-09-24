/* ==========================================================================
   CONTRAST.JS — Herramienta de contraste WCAG 2.2 para VALIDATOR
   --------------------------------------------------------------------------
   Módulo autocontenido. No modifica la lógica existente: se apoya en los
   hooks globales expuestos por app.js:
     - window.__v19_getMainPreviewImg()  → <img> principal (resolución natural)
     - window.__v19_getCurrentKey()      → clave de formato actual
     - window.__v19_addComment(text)     → añade línea al bloque de comentarios

   Flujo (según diseño acordado):
     1. Botón CONTRASTE (sidebar) → entra en modo contraste (toggle).
     2. Pestaña "Selecciona texto" activa → clicas en la imagen → muestrea el
        color del texto y salta automáticamente a "Selecciona fondo".
     3. Clicas el fondo → se calcula el resultado WCAG 2.2.
     4. Puedes re-muestrear cualquiera de los dos pulsando su pestaña.
   ========================================================================== */
(function () {
  "use strict";

  /* ----------------------------------------------------------------------
     MATEMÁTICA WCAG 2.2 (ratio de contraste basado en luminancia relativa)
     ---------------------------------------------------------------------- */
  function srgbToLinear(c) {
    c /= 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  }

  function relLuminance(r, g, b) {
    return 0.2126 * srgbToLinear(r) + 0.7152 * srgbToLinear(g) + 0.0722 * srgbToLinear(b);
  }

  function contrastRatio(a, b) {
    const L1 = relLuminance(a[0], a[1], a[2]);
    const L2 = relLuminance(b[0], b[1], b[2]);
    const hi = Math.max(L1, L2);
    const lo = Math.min(L1, L2);
    return (hi + 0.05) / (lo + 0.05);
  }

  function rgbToHex(r, g, b) {
    const h = n => n.toString(16).padStart(2, "0").toUpperCase();
    return "#" + h(r) + h(g) + h(b);
  }

  /* Criterios WCAG 2.2 (etiquetas en español, umbrales oficiales) */
  const CRITERIA = [
    { label: "Texto normal AA",  min: 4.5 },
    { label: "Texto normal AAA", min: 7   },
    { label: "Texto largo AA",   min: 3   },
    { label: "Texto largo AAA",  min: 4.5 },
    { label: "Gráficos AA y UI", min: 3   }
  ];

  /* Umbral de referencia para el comentario y el color del número grande */
  const BASE_MIN = 4.5; // AA texto normal (base legal EAA / EN 301 549)

  const fmtRatio = r => r.toFixed(2).replace(".", ",") + ":1";
  const fmtMin   = m => (Number.isInteger(m) ? m : m.toFixed(1).replace(".", ",")) + ":1";

  /* ----------------------------------------------------------------------
     ESTADO
     ---------------------------------------------------------------------- */
  let active = false;
  let step = "fg";                 // "fg" (texto) | "bg" (fondo)
  let fg = null, bg = null;        // { rgb:[r,g,b], hex, nx, ny }
  let natCanvas = null, natCtx = null, natW = 0, natH = 0;

  /* Referencias DOM (se crean en build()) */
  let overlay, tabFg, tabBg, stage, imgEl, markersLayer, loupe, loupeCanvas, loupeLabel;
  let swFgBox, swFgHex, swBgBox, swBgHex, ratioEl, badgesEl, btnAdd, btnExport, hintEl;

  const qs = id => document.getElementById(id);

  /* ----------------------------------------------------------------------
     CONSTRUCCIÓN DE LA UI (una sola vez, perezosa)
     ---------------------------------------------------------------------- */
  function build() {
    if (overlay) return;

    overlay = document.createElement("div");
    overlay.className = "contrast-overlay";
    overlay.innerHTML = `
      <div class="contrast-top">
        <div class="contrast-tabs">
          <button type="button" class="contrast-tab is-active" data-step="fg">SELECCIONA TEXTO</button>
          <button type="button" class="contrast-tab" data-step="bg">SELECCIONA FONDO</button>
        </div>
      </div>

      <div class="contrast-body">
        <div class="contrast-stage">
          <img class="contrast-img" alt="" draggable="false" />
          <div class="contrast-markers"></div>
          <div class="contrast-loupe">
            <canvas width="150" height="150"></canvas>
            <div class="contrast-loupe-label">Pixel –, –</div>
          </div>
        </div>

        <aside class="contrast-panel">
          <div class="contrast-swatches">
            <div class="contrast-swatch">
              <span class="cs-title">TEXTO</span>
              <span class="cs-box" data-role="fg"></span>
              <span class="cs-hex" data-role="fg">—</span>
            </div>
            <div class="contrast-swatch">
              <span class="cs-title">FONDO</span>
              <span class="cs-box" data-role="bg"></span>
              <span class="cs-hex" data-role="bg">—</span>
            </div>
          </div>

          <div class="contrast-result-title">Resultado WCAG 2.2</div>
          <div class="contrast-hint">Selecciona el color del <b>texto</b> y del <b>fondo</b> sobre la imagen.</div>
          <div class="contrast-ratio" style="display:none">—</div>
          <div class="contrast-badges"></div>

          <div class="contrast-actions">
            <button type="button" class="contrast-btn" data-act="add">
              <span class="contrast-btn-label">Añadir a Comentarios</span>
            </button>
            <button type="button" class="contrast-btn" data-act="export">
              <span class="contrast-btn-label">Exportar</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                   viewBox="0 0 24 24" fill="none" stroke="currentColor"
                   stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                <circle cx="12" cy="13" r="4"/>
              </svg>
            </button>
          </div>
        </aside>
      </div>
    `;

    const viewer = qs("viewer");
    (viewer || document.body).appendChild(overlay);

    tabFg        = overlay.querySelector('.contrast-tab[data-step="fg"]');
    tabBg        = overlay.querySelector('.contrast-tab[data-step="bg"]');
    stage        = overlay.querySelector(".contrast-stage");
    imgEl        = overlay.querySelector(".contrast-img");
    markersLayer = overlay.querySelector(".contrast-markers");
    loupe        = overlay.querySelector(".contrast-loupe");
    loupeCanvas  = loupe.querySelector("canvas");
    loupeLabel   = loupe.querySelector(".contrast-loupe-label");
    ratioEl      = overlay.querySelector(".contrast-ratio");
    badgesEl     = overlay.querySelector(".contrast-badges");
    hintEl       = overlay.querySelector(".contrast-hint");
    swFgBox      = overlay.querySelector('.cs-box[data-role="fg"]');
    swFgHex      = overlay.querySelector('.cs-hex[data-role="fg"]');
    swBgBox      = overlay.querySelector('.cs-box[data-role="bg"]');
    swBgHex      = overlay.querySelector('.cs-hex[data-role="bg"]');
    btnAdd       = overlay.querySelector('.contrast-btn[data-act="add"]');
    btnExport    = overlay.querySelector('.contrast-btn[data-act="export"]');

    /* Pestañas: seleccionar manualmente qué se re-muestrea */
    tabFg.addEventListener("click", () => setStep("fg"));
    tabBg.addEventListener("click", () => setStep("bg"));

    /* Interacción sobre la imagen */
    stage.addEventListener("mousemove", onMove);
    stage.addEventListener("mouseleave", () => { loupe.style.display = "none"; });
    imgEl.addEventListener("click", onSample);

    /* Acciones */
    btnAdd.addEventListener("click", onAddComment);
    btnExport.addEventListener("click", onExport);

    window.addEventListener("resize", positionMarkers);
  }

  /* ----------------------------------------------------------------------
     COMPOSICIÓN A RESOLUCIÓN NATURAL
     Dibuja la imagen principal + sus overlays de CONTENIDO (mockup, TXT…)
     en su posición real, EXCLUYENDO los overlays de SEGURIDAD (zonas de
     seguridad). El muestreo y la imagen mostrada usan esta composición.
     ---------------------------------------------------------------------- */
  /* Overlays de CONTENIDO (mockup real + texto) que se conservan en modo
     contraste, por formato. Enfoque de LISTA BLANCA: solo los roles listados
     por formato se pintan; todo lo demás (márgenes/zonas de seguridad rosas,
     checkers) NO se pinta → la zona de seguridad desaparece SIEMPRE.

     - Se mantiene el mockup contextual donde existe (MUX4, SPH, AMAZON,
       FANART_DESTACADO), excluyendo su zona de seguridad interna.
     - AD_PAUSE y WEB llevan el mockup por fuera/por debajo (no aporta al
       contraste): NO se listan → se miden sobre el asset limpio.
     - El resto de formatos solo tienen checker de márgenes → asset limpio. */
  const CONTENT_OVERLAYS = {
    MUX4_FONDO:           ["role-base", "role-sib"],   // mockup UI + TXT
    SMARTPHONE_MUX_FONDO: ["role-base", "role-sib"],   // mockup + TXT (sph-zona excluida)
    AMAZON_BG:            ["role-base", "role-logo"],  // mockup Fire TV + logo (seguridad excluida)
    FANART_DESTACADO:     ["role-base", "role-fanart-mod-l", "role-fanart-mod-r"] // mockup + módulos
  };

  function drawComposition(mainImg) {
    natCtx.drawImage(mainImg, 0, 0, natW, natH);

    const key = (window.__v19_getCurrentKey?.() || "").toUpperCase();
    const allowed = CONTENT_OVERLAYS[key];
    // Sin overlays de contenido definidos → asset limpio (nunca zona de
    // seguridad). Cubre AD_PAUSE y todos los formatos de solo-checker.
    if (!allowed) return;

    const mr = mainImg.getBoundingClientRect();
    if (!mr.width || !mr.height) return;

    const sx = natW / mr.width, sy = natH / mr.height;
    const preview = mainImg.parentElement;
    const ovs = preview ? [...preview.querySelectorAll("img.v19-overlay")] : [];

    // Dibujar en orden de apilado (z-index ascendente) para respetar capas
    ovs
      .filter(ov =>
        ov.getAttribute("src") &&
        getComputedStyle(ov).display !== "none" &&
        allowed.some(role => ov.classList.contains(role))
      )
      .sort((a, b) =>
        (parseInt(getComputedStyle(a).zIndex, 10) || 0) -
        (parseInt(getComputedStyle(b).zIndex, 10) || 0)
      )
      .forEach(ov => {
        const r = ov.getBoundingClientRect();
        if (!r.width || !r.height) return;
        try {
          natCtx.drawImage(
            ov,
            (r.left - mr.left) * sx,
            (r.top  - mr.top)  * sy,
            r.width  * sx,
            r.height * sy
          );
        } catch (e) { /* overlay problemático: se ignora */ }
      });
  }

  function buildNaturalCanvas(mainImg) {
    natW = mainImg.naturalWidth  || mainImg.width;
    natH = mainImg.naturalHeight || mainImg.height;
    natCanvas = document.createElement("canvas");
    natCanvas.width = natW;
    natCanvas.height = natH;
    natCtx = natCanvas.getContext("2d", { willReadFrequently: true });

    drawComposition(mainImg);

    /* Comprobar que el canvas es legible (no "tainted"). Si algún overlay
       lo protege (p.ej. abierto por file://), recomponer con SOLO la imagen
       principal, que es un data URL y siempre se puede muestrear. */
    try {
      natCtx.getImageData(0, 0, 1, 1);
    } catch (e) {
      console.warn("[Contraste] Overlays no componibles; uso solo la imagen base.", e);
      natCanvas = document.createElement("canvas");
      natCanvas.width = natW;
      natCanvas.height = natH;
      natCtx = natCanvas.getContext("2d", { willReadFrequently: true });
      natCtx.drawImage(mainImg, 0, 0, natW, natH);
    }
  }

  /* ----------------------------------------------------------------------
     ENTRAR / SALIR DEL MODO CONTRASTE
     ---------------------------------------------------------------------- */
  function enter() {
    const src = window.__v19_getMainPreviewImg?.();
    if (!src || !src.src) return;

    build();

    /* Composición a resolución NATURAL (imagen + overlays de contenido).
       El muestreo se hace SIEMPRE sobre este bitmap, nunca sobre la
       imagen escalada en pantalla. */
    buildNaturalCanvas(src);
    if (!natCanvas) return;

    try {
      imgEl.src = natCanvas.toDataURL("image/png");
    } catch (e) {
      imgEl.src = src.src;   // fallback defensivo
    }

    /* Reset de estado */
    fg = null; bg = null;
    swFgBox.style.background = "transparent"; swFgHex.textContent = "—";
    swBgBox.style.background = "transparent"; swBgHex.textContent = "—";
    markersLayer.innerHTML = "";
    loupe.style.display = "none";
    setStep("fg");
    render();   // estado inicial: sin resultado, ayuda visible, botones atenuados

    active = true;
    document.getElementById("myModal")?.classList.add("contrast-active");
    overlay.classList.add("is-open");
    qs("btnContrast")?.classList.add("is-active");
  }

  function exit() {
    active = false;
    overlay?.classList.remove("is-open");
    document.getElementById("myModal")?.classList.remove("contrast-active");
    qs("btnContrast")?.classList.remove("is-active");
  }

  function toggle() {
    if (active) exit(); else enter();
  }

  /* ----------------------------------------------------------------------
     PESTAÑAS / PASO ACTUAL
     ---------------------------------------------------------------------- */
  function setStep(s) {
    step = s;
    tabFg.classList.toggle("is-active", s === "fg");
    tabBg.classList.toggle("is-active", s === "bg");
  }

  /* ----------------------------------------------------------------------
     MAPEO cursor → pixel natural + MUESTREO
     ---------------------------------------------------------------------- */
  function cursorToNatural(clientX, clientY) {
    const r = imgEl.getBoundingClientRect();
    if (!r.width || !r.height) return null;
    let nx = Math.floor((clientX - r.left) / r.width * natW);
    let ny = Math.floor((clientY - r.top) / r.height * natH);
    nx = Math.max(0, Math.min(natW - 1, nx));
    ny = Math.max(0, Math.min(natH - 1, ny));
    return { nx, ny, r };
  }

  function readPixel(nx, ny) {
    const d = natCtx.getImageData(nx, ny, 1, 1).data;
    return [d[0], d[1], d[2]];
  }

  function onMove(e) {
    if (!active) return;
    const p = cursorToNatural(e.clientX, e.clientY);
    if (!p) return;
    drawLoupe(p.nx, p.ny);
  }

  function onSample(e) {
    if (!active) return;
    const p = cursorToNatural(e.clientX, e.clientY);
    if (!p) return;
    const rgb = readPixel(p.nx, p.ny);
    const hex = rgbToHex(rgb[0], rgb[1], rgb[2]);
    const sample = { rgb, hex, nx: p.nx, ny: p.ny };

    if (step === "fg") {
      fg = sample;
      swFgBox.style.background = hex;
      swFgHex.textContent = hex;
      setStep("bg");                 // avance automático
    } else {
      bg = sample;
      swBgBox.style.background = hex;
      swBgHex.textContent = hex;
      setStep("fg");                 // vuelve a texto para nueva medición
    }

    positionMarkers();
    render();
  }

  /* ----------------------------------------------------------------------
     LUPA (zoom de píxeles con rejilla)
     ---------------------------------------------------------------------- */
  function drawLoupe(nx, ny) {
    loupe.style.display = "block";
    const cells = 15;                 // 15×15 píxeles naturales
    const half = (cells - 1) / 2;
    const size = loupeCanvas.width;   // 150
    const cell = size / cells;        // 10px por pixel
    const ctx = loupeCanvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, size, size);

    const sx = nx - half, sy = ny - half;
    ctx.drawImage(natCanvas, sx, sy, cells, cells, 0, 0, size, size);

    /* Rejilla */
    ctx.strokeStyle = "rgba(255,255,255,.25)";
    ctx.lineWidth = 1;
    for (let i = 0; i <= cells; i++) {
      const p = Math.round(i * cell) + 0.5;
      ctx.beginPath(); ctx.moveTo(p, 0); ctx.lineTo(p, size); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, p); ctx.lineTo(size, p); ctx.stroke();
    }
    /* Pixel central resaltado */
    ctx.strokeStyle = "#7b61ff";
    ctx.lineWidth = 2;
    ctx.strokeRect(half * cell, half * cell, cell, cell);

    loupeLabel.textContent = "Pixel " + nx + ", " + ny;
  }

  /* ----------------------------------------------------------------------
     MARCADORES ① / ②
     ---------------------------------------------------------------------- */
  function markerEl(n, sample, cls) {
    const el = document.createElement("div");
    el.className = "contrast-marker " + cls;
    el.textContent = n;
    el.dataset.nx = sample.nx;
    el.dataset.ny = sample.ny;
    return el;
  }

  function positionMarkers() {
    if (!overlay) return;
    markersLayer.innerHTML = "";
    const ir = imgEl.getBoundingClientRect();
    const sr = stage.getBoundingClientRect();
    if (!ir.width) return;

    const place = (sample, node) => {
      const left = (ir.left - sr.left) + (sample.nx / natW) * ir.width;
      const top  = (ir.top  - sr.top)  + (sample.ny / natH) * ir.height;
      node.style.left = left + "px";
      node.style.top  = top + "px";
      markersLayer.appendChild(node);
    };

    if (fg) place(fg, markerEl("1", fg, "is-fg"));
    if (bg) place(bg, markerEl("2", bg, "is-bg"));
  }

  /* ----------------------------------------------------------------------
     RENDER DEL RESULTADO
     ---------------------------------------------------------------------- */
  function render() {
    const ready = !!(fg && bg);

    /* Botones activos solo cuando hay resultado */
    btnAdd.disabled = !ready;
    btnExport.disabled = !ready;

    if (!ready) {
      /* Estado inicial: sin número, ayuda visible bajo el título */
      ratioEl.style.display = "none";
      ratioEl.className = "contrast-ratio";
      badgesEl.innerHTML = "";
      hintEl.style.display = "";
      return;
    }

    hintEl.style.display = "none";
    ratioEl.style.display = "";

    const ratio = contrastRatio(fg.rgb, bg.rgb);
    const pass = ratio >= BASE_MIN;

    ratioEl.textContent = fmtRatio(ratio);
    ratioEl.className = "contrast-ratio " + (pass ? "is-ok" : "is-fail");

    badgesEl.innerHTML = "";
    CRITERIA.forEach(c => {
      const ok = ratio >= c.min;
      const b = document.createElement("div");
      b.className = "contrast-badge " + (ok ? "is-ok" : "is-fail");
      b.innerHTML =
        '<div class="cb-label">' + c.label + '</div>' +
        '<div class="cb-verdict">' + (ok ? "CORRECTO" : "INCORRECTO") + '</div>' +
        '<div class="cb-min">Necesita ' + fmtMin(c.min) + '</div>';
      badgesEl.appendChild(b);
    });
  }

  /* ----------------------------------------------------------------------
     ACCIONES
     ---------------------------------------------------------------------- */
  function setBtnLabel(btn, text) {
    const l = btn.querySelector(".contrast-btn-label");
    if (l) l.textContent = text;
  }

  function onAddComment() {
    if (!fg || !bg) return;
    const ratio = contrastRatio(fg.rgb, bg.rgb);
    const text = ratio >= BASE_MIN
      ? "- El contraste es correcto."
      : "- Revisar el contraste entre texto e imagen. El valor es " +
        fmtRatio(ratio) + " y debería ser " + fmtMin(BASE_MIN) + " (mínimo AA).";
    const added = window.__v19_addComment?.(text);
    setBtnLabel(btnAdd, added === false ? "Ya añadido" : "✓ Añadido");
    setTimeout(() => { setBtnLabel(btnAdd, "Añadir a Comentarios"); }, 1600);
  }

  /* ----------------------------------------------------------------------
     EXPORTAR INFORME DE CONTRASTE
     Genera una imagen (JPG) con: composición + marcadores ①②, par de
     color y resultado WCAG 2.2. Sirve como "prueba" compartible que zanja
     la discusión: dato + normativa + los puntos exactos analizados.
     ---------------------------------------------------------------------- */
  function roundRect(ctx, x, y, w, h, r) {
    if (ctx.roundRect) { ctx.beginPath(); ctx.roundRect(x, y, w, h, r); return; }
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  function renderReport() {
    const PAD = 48, GAP = 40, PANEL_W = 480, HEADER_H = 92;
    const IMG_COL_W = 1040;

    const scale = Math.min(IMG_COL_W / natW, 820 / natH);
    const IMG_W = Math.round(natW * scale);
    const IMG_H = Math.round(natH * scale);

    const badgeH = 78, badgeGap = 14, badgeRows = 3;
    const badgesH = badgeRows * badgeH + (badgeRows - 1) * badgeGap;
    const panelH = 78 + 24 + 30 + 8 + 74 + 20 + badgesH;

    const bodyH = Math.max(IMG_H, panelH);
    const W = PAD + IMG_COL_W + GAP + PANEL_W + PAD;
    const H = HEADER_H + bodyH + PAD;

    const c = document.createElement("canvas");
    c.width = W; c.height = H;
    const x = c.getContext("2d");

    x.fillStyle = "#1a1a1a";
    x.fillRect(0, 0, W, H);

    /* Cabecera */
    const fname = window.__v19_getMainPreviewImg?.()?.alt || "";
    x.textAlign = "left"; x.textBaseline = "alphabetic";
    x.fillStyle = "#ffba00";
    x.font = '30px "Apercu Black"';
    x.fillText(fname, PAD, 46);
    x.fillStyle = "#9a9a9a";
    x.font = '18px "Apercu Regular"';
    x.fillText("Análisis de contraste · WCAG 2.2", PAD, 74);

    /* Imagen + marcadores */
    const imgX = PAD + (IMG_COL_W - IMG_W) / 2;
    const imgY = HEADER_H;
    x.drawImage(natCanvas, imgX, imgY, IMG_W, IMG_H);
    x.strokeStyle = "#333"; x.lineWidth = 1;
    x.strokeRect(imgX + .5, imgY + .5, IMG_W - 1, IMG_H - 1);

    const marker = (s, fill) => {
      const mx = imgX + s.nx * scale, my = imgY + s.ny * scale;
      x.beginPath(); x.arc(mx, my, 6, 0, Math.PI * 2);
      x.fillStyle = fill; x.fill();
    };
    marker(fg, "#2ecc71");   // texto (verde)
    marker(bg, "#ff5a5a");   // fondo (rojo)

    /* Panel */
    const px = PAD + IMG_COL_W + GAP;
    let py = HEADER_H;

    const swW = (PANEL_W - 20) / 2;
    const swatch = (sx, label, hex) => {
      x.fillStyle = "#9a9a9a"; x.font = '14px "Apercu Bold"';
      x.fillText(label, sx, py + 12);
      x.fillStyle = hex;
      roundRect(x, sx, py + 24, 34, 34, 6); x.fill();
      x.strokeStyle = "#444"; x.lineWidth = 1; x.stroke();
      x.fillStyle = "#fff"; x.font = '18px "Apercu Bold"';
      x.fillText(hex, sx + 46, py + 47);
    };
    swatch(px, "TEXTO", fg.hex);
    swatch(px + swW + 20, "FONDO", bg.hex);
    py += 78 + 24;

    x.fillStyle = "#ffba00"; x.font = '26px "Apercu Light"';
    x.fillText("Resultado WCAG 2.2", px, py + 24);
    py += 30 + 8;

    const ratio = contrastRatio(fg.rgb, bg.rgb);
    const pass = ratio >= BASE_MIN;
    x.fillStyle = pass ? "#7fe39a" : "#ff6b6b";
    x.font = '64px "Apercu Black"';
    x.fillText(fmtRatio(ratio), px, py + 58);
    py += 74 + 20;

    const bW = (PANEL_W - 14) / 2;
    CRITERIA.forEach((cr, i) => {
      const col = i % 2, row = Math.floor(i / 2);
      const isLast = (i === CRITERIA.length - 1) && (CRITERIA.length % 2 === 1);
      const bx = px + col * (bW + 14);
      const by = py + row * (badgeH + badgeGap);
      const w = isLast ? PANEL_W : bW;
      const ok = ratio >= cr.min;

      x.fillStyle = ok ? "#e7f6ec" : "#fbe7e7";
      roundRect(x, bx, by, w, badgeH, 10); x.fill();
      x.fillStyle = "#222"; x.font = '15px "Apercu Bold"';
      x.fillText(cr.label, bx + 14, by + 24);
      x.fillStyle = ok ? "#1f9d57" : "#e05252";
      x.font = '17px "Apercu Black"';
      x.fillText(ok ? "CORRECTO" : "INCORRECTO", bx + 14, by + 45);
      x.fillStyle = "#555"; x.font = '13px "Apercu Regular"';
      x.fillText("Necesita " + fmtMin(cr.min), bx + 14, by + 64);
    });

    return c;
  }

  async function onExport() {
    if (!fg || !bg) return;
    setBtnLabel(btnExport, "Generando…");
    btnExport.disabled = true;
    try {
      if (document.fonts && document.fonts.ready) {
        try { await document.fonts.ready; } catch (e) { /* seguimos */ }
      }
      const canvas = renderReport();
      const baseName = (window.__v19_getMainPreviewImg?.()?.alt || "contraste")
        .replace(/\.[^.]+$/, "")
        .replace(/[^\w\-]/g, "_");
      const filename = baseName + "_CONTRASTE.jpg";

      canvas.toBlob(blob => {
        if (!blob) return;
        if (typeof window.saveAs === "function") {
          window.saveAs(blob, filename);
        } else {
          const a = document.createElement("a");
          a.href = URL.createObjectURL(blob);
          a.download = filename;
          a.click();
          setTimeout(() => URL.revokeObjectURL(a.href), 2000);
        }
      }, "image/jpeg", 0.92);
    } catch (e) {
      console.error("[Contraste] Error exportando informe:", e);
    } finally {
      btnExport.disabled = false;
      setBtnLabel(btnExport, "Exportar");
    }
  }

  /* ----------------------------------------------------------------------
     ENGANCHES CON LA APP
     ---------------------------------------------------------------------- */
  function refreshTriggerState() {
    const btn = qs("btnContrast");
    if (!btn) return;
    const hasImg = !!window.__v19_getMainPreviewImg?.()?.src;
    btn.disabled = !hasImg;
    /* Si cambia la imagen mientras estamos en contraste, salimos (evita
       muestrear sobre un canvas obsoleto). */
    if (active && !hasImg) exit();
  }

  document.addEventListener("DOMContentLoaded", () => {
    const btn = qs("btnContrast");
    if (btn) btn.addEventListener("click", () => { if (!btn.disabled) toggle(); });

    /* La app dispara "v19-refresh" al seleccionar/cargar imagen */
    document.addEventListener("v19-refresh", () => {
      refreshTriggerState();
      if (active) exit();            // al cambiar de thumbnail, salir del modo
    }, true);

    /* Cerrar el modal principal también cierra el modo contraste */
    qs("closeBtn")?.addEventListener("click", exit);

    refreshTriggerState();
  });

  /* Exponer por si se necesita desde consola/otros módulos */
  window.__v19_contrast = { enter, exit, toggle, isActive: () => active };
})();
