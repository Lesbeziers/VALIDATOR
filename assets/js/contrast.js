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
        <button type="button" class="contrast-tab is-active" data-step="fg">SELECCIONA TEXTO</button>
        <button type="button" class="contrast-tab" data-step="bg">SELECCIONA FONDO</button>
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
          <div class="contrast-ratio">—</div>
          <div class="contrast-badges"></div>

          <div class="contrast-hint">Selecciona el color del <b>texto</b> y del <b>fondo</b> sobre la imagen.</div>

          <div class="contrast-actions">
            <button type="button" class="contrast-btn" data-act="add">Añadir a Comentarios</button>
            <button type="button" class="contrast-btn" data-act="export">Exportar</button>
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
     ENTRAR / SALIR DEL MODO CONTRASTE
     ---------------------------------------------------------------------- */
  function enter() {
    const src = window.__v19_getMainPreviewImg?.();
    if (!src || !src.src) return;

    build();

    /* Canvas a resolución NATURAL (la clave de la precisión):
       el muestreo siempre se hace sobre este bitmap, nunca sobre
       la imagen escalada en pantalla. */
    natW = src.naturalWidth  || src.width;
    natH = src.naturalHeight || src.height;
    natCanvas = document.createElement("canvas");
    natCanvas.width = natW;
    natCanvas.height = natH;
    natCtx = natCanvas.getContext("2d", { willReadFrequently: true });
    try {
      natCtx.drawImage(src, 0, 0, natW, natH);
    } catch (e) {
      console.warn("[Contraste] No se pudo preparar el muestreo:", e);
      return;
    }

    imgEl.src = src.src;

    /* Reset de estado */
    fg = null; bg = null;
    swFgBox.style.background = "transparent"; swFgHex.textContent = "—";
    swBgBox.style.background = "transparent"; swBgHex.textContent = "—";
    ratioEl.textContent = "—";
    ratioEl.className = "contrast-ratio";
    badgesEl.innerHTML = "";
    hintEl.style.display = "";
    markersLayer.innerHTML = "";
    loupe.style.display = "none";
    setStep("fg");

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
    if (!fg || !bg) {
      ratioEl.textContent = "—";
      ratioEl.className = "contrast-ratio";
      badgesEl.innerHTML = "";
      hintEl.style.display = "";
      return;
    }
    hintEl.style.display = "none";

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
  function onAddComment() {
    if (!fg || !bg) return;
    const ratio = contrastRatio(fg.rgb, bg.rgb);
    const text =
      "Revisar el contraste entre texto e imagen. El valor es " +
      fmtRatio(ratio) + " y debería ser " + fmtMin(BASE_MIN) + " (mínimo AA).";
    const added = window.__v19_addComment?.(text);
    btnAdd.textContent = added === false ? "Ya añadido" : "✓ Añadido";
    setTimeout(() => { btnAdd.textContent = "Añadir a Comentarios"; }, 1600);
  }

  function onExport() {
    /* Etapa siguiente: imagen del informe con los círculos ①②.
       De momento avisamos para no dar una exportación a medias. */
    btnExport.textContent = "Próximamente";
    setTimeout(() => { btnExport.textContent = "Exportar"; }, 1600);
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
