    document.addEventListener("DOMContentLoaded", () => {
      /* ==========================================
         RESET LOCALSTORAGE
      ========================================== */
      localStorage.removeItem("v15_comments");
      localStorage.removeItem("v15_comments_injected");

      const ATTACH = Object.create(null);

      const qs = id => document.getElementById(id);

      const dropArea = qs("drop-area");
      const fileInput = qs("fileElem");
      const modal = qs("myModal");
      const layout = qs("layout");
      const sidebar = qs("sidebar");
      const viewer = qs("viewer");
      const viewerInner = qs("viewerInner");

      const thumbnailsDiv = qs("thumbnails");
      const filenameDisplay = qs("filename");
      const preview = qs("preview");
      const closeBtn = qs("closeBtn");
      const validationsEl = qs("validations");

      const mockupSwitch = qs("mockupSwitch");
      const mockupToggle = qs("mockupToggle");

      const webMockupSwitch = qs("webMockupSwitch");
      const webMockupToggle = qs("webMockupToggle");

      const adPauseCheckerSwitch = qs("adPauseCheckerSwitch");
      const adPauseCheckerToggle = qs("adPauseCheckerToggle");

      const pastillaPubliSwitch = qs("pastillaPubliSwitch");
      const pastillaPubliToggle = qs("pastillaPubliToggle");

      const txtSwitch = qs("txtSwitch");
      const txtToggle = qs("txtToggle");

      const sphZonaSwitch = qs("sphZonaSwitch");
      const sphZonaToggle = qs("sphZonaToggle");

const logoSwitch = qs("logoSwitch");
const logoToggle = qs("logoToggle");

      const focoSwitch = qs("focoSwitch");
      const focoToggle = qs("focoToggle");

      	// FANART – switch NIVEL
      const nivelSwitch = qs("nivelSwitch");
      const nivelToggle = qs("nivelToggle");

        const commentArea = qs("commentArea");
        const presetToggleBtn = qs("presetToggleBtn");
        const presetSearch = qs("presetSearch");
        const presetPanel = qs("presetPanel");
        const presetCategories = qs("presetCategories");
        const presetList = qs("presetList");
        const presetFeedback = qs("presetFeedback");

      const btnViewAll = qs("btnViewAll");
      const btnExport = qs("btnExport");
      const btnAttach = qs("btnAttach");
      const attachInput = qs("attachInput");

      const scrollCol = qs("scrollCol");
      const commentsBlock = qs("commentsBlock");
      const actionsBar = qs("commentsActions");

      const tooltipEl = qs("thumbTooltip");
      const btnTogglePanel = qs("btnTogglePanel");
      const collapsedHandle = qs("collapsedHandle");
      const btnSwapSide = qs("btnSwapSide");
      const btnViewerBg = qs("btnViewerBg");

            const mockupText = qs("mockupText");
      const txtText = qs("txtText");
      const amazonLogoNote = qs("amazonLogoNote");
      const btnCapture    = qs("btnCapture");
      window.focoOn = false;
      window.adPauseCheckerOn = true;
      window.pastillaPubliOn = true;
      window.sphZonaOn = true;
      window.LOADED_ITEMS = [];

      let totalToLoad = 0;
      // FANART – nivel actual (1 o 2)
      window.fanartNivel = 1;
      let validatedCount = 0;
      let firstThumbEl = null;
      let firstThumbFile = null;
	  let currentKey = "";

        /* ==========================================
           PRESETS
        ========================================== */
        const PRESET_CATEGORIES = {
          ADJUNTOS: [
            "Os adjuntamos un ejemplo.",
            "Os sugerimos que lo hagáis como en el ejemplo que os mandamos."
          ],
          "TAMAÑO/PESO": [
            "Supera el peso máximo.",
            "Las dimensiones de la adaptación no son correctas."
          ],
          DISEÑO: [
            "Está fuera de los márgenes de seguridad.",
            "Falta la etiqueta de publicidad.",
            "Falta información.",
            "No sigue la misma coherencia visual que el resto de adaptaciones."
          ],
          TEXTOS: [
            "El texto no cumple con el tamaño mínimo para que sea legible.",
            "El texto no es legible.",
            "Mux4_Fondo no puede llevar texto.",
            "SmartphoneMux_Fondo no puede llevar texto.",
            "Hay demasiada información.",
            "El orden de los textos es diferente al resto de adaptaciones.",
            "El texto se ve pixelado.",
            "Poner el texto en una líneas.",
            "Poner el texto en dos líneas.",
            "Poner el texto en tres líneas.",
            "Cambiar el color del texto.",
            "Añadir un degradado para que el texto se lea bien."
          ],
          NOMENCLATURAS: [
            "La adaptación no está bien nombrada."
          ],
          IMAGEN: [
            "La imagen se ve pixelada.",
            "La imagen no tienen suficiente calidad.",
            "La sombra es demasiado fuerte.",
            "La imagen está cortada.",
            "Mejorar el recorte de la imagen.",
            "Rellenar la imagen con imagen generativa.",
            "Hay un filete en el lado derecho.",
            "Hay un filete en el lado izquierdo.",
            "Hay un filete en el lado arriba.",
            "Hay un filete en el lado abajo."
          ]
        };

        const PRESET_ENTRIES = Object.entries(PRESET_CATEGORIES).flatMap(
          ([cat, items]) => items.map(text => ({ cat, text }))
        );

        let isPresetPanelOpen = false;
        let activeCategory = "";

      /* ==========================================
         LOCALSTORAGE HELPERS
      ========================================== */
      const LS_KEY = "v15_comments";
      const LS_INJECT = "v15_comments_injected";

      const getMap = k => {
        try {
          return JSON.parse(localStorage.getItem(k) || "{}");
        } catch {
          return {};
        }
      };

      const setMap = (k, m) => localStorage.setItem(k, JSON.stringify(m));

      const commentsMap = () => getMap(LS_KEY);
      const injectedMap = () => getMap(LS_INJECT);

      function getCurrentFileName() {
        const img = window.__v19_getMainPreviewImg?.();
        return img?.alt || filenameDisplay.textContent || "";
      }

      function loadCommentsFor(file) {
        const map = commentsMap();
        return map[file] || "";
      }

      function saveCommentsFor(file, text) {
        const map = commentsMap();
        map[file] = text;
        setMap(LS_KEY, map);

        const wrap = [...thumbnailsDiv.querySelectorAll(".thumbnail")]
          .find(el => el.alt === file)?.parentElement;

        if (wrap) wrap.classList.toggle("has-comment", !!(text || "").trim());
      }

      function markInjected(file) {
        const m = injectedMap();
        m[file] = true;
        setMap(LS_INJECT, m);
      }

      function wasInjected(file) {
        const m = injectedMap();
        return !!m[file];
      }

      /* ==========================================
         INYECTAR LÍNEAS DE ERROR AUTOMÁTICAMENTE
      ========================================== */
      function injectValidationLinesIfNeeded(file, res) {
        if (!file || !res || wasInjected(file)) return;

        const lines = [];
        if (!res.nameOk)
          lines.push("- Nomenclatura incorrecta.");
        if (res.dimsInfo?.status === "err")
          lines.push(`- Dimensiones incorrectas (${res.dimsInfo.msg}).`);
        if (res.weightInfo?.status === "err")
          lines.push(`- Peso excesivo (${res.weightInfo.msg}).`);

        if (!lines.length) return;

        const existing = loadCommentsFor(file);
        const final = existing
          ? existing.trimEnd() + "\n" + lines.join("\n")
          : lines.join("\n");

        saveCommentsFor(file, final);
        commentArea.value = final;

        markInjected(file);
      }

      /* ==========================================
         ICONO DE PUNTO AMARILLO EN THUMBS
      ========================================== */
      function applyHasCommentBadges() {
        const map = commentsMap();
        thumbnailsDiv.querySelectorAll(".thumbnail").forEach(t => {
          const wrap = t.parentElement;
          const tx = map[t.alt || ""] || "";
          wrap.classList.toggle("has-comment", !!tx.trim());
        });
      }

      /* ==========================================
         MOSTRAR ESTADO DE VALIDACIONES
      ========================================== */
      function renderValidations(r) {
        if (!r) return;

        validationsEl.innerHTML =
          `<span class="${r.nameOk ? "ok" : "err"}">
             ${r.nameOk ? "✔" : "✖"} Nomenclatura
           </span>
           <span class="sep"> | </span>
           <span class="${
             r.dimsInfo?.status === "ok"
               ? "ok"
               : r.dimsInfo?.status === "err"
               ? "err"
               : "warn"
           }">
              ${r.dimsInfo?.status === "ok" ? "✔" : "●"} Dimensiones: ${
            r.dimsInfo?.msg
          }
           </span>
           <span class="sep"> | </span>
           <span class="${
             r.weightInfo?.status === "ok"
               ? "ok"
               : r.weightInfo?.status === "err"
               ? "err"
               : "warn"
           }">
              ${r.weightInfo?.status === "ok" ? "✔" : "●"} Peso: ${
            r.weightInfo?.msg
          }
           </span>`;
      }

      /* ==========================================
         SWITCHES
      ========================================== */
      const setSwitchVisible = (el, v) =>
        (el.style.display = v ? "inline-flex" : "none");

      function setSwitchState(el, input, on) {
        input.checked = !!on;
        el.dataset.on = on ? "true" : "false";
        el.setAttribute("aria-checked", on ? "true" : "false");
      }

            const setOverlayMockupForced = on => {
  const keyUp = (currentKey || "").toUpperCase();
  const isCaratula = keyUp === "CARATULA_V" || keyUp === "CARATULA_H";

  if (isCaratula) {
    // En CARATULA_V / CARATULA_H el botón IZQUIERDO (ZONA DE SEGURIDAD)
    // controla el overlay del CHECKER (role-sib → txt-off)
    preview.classList.toggle("txt-off", !on);
  } else {
    // Resto de formatos: comportamiento normal (overlay base)
    preview.classList.toggle("mockup-off", !on);
  }
};

      const setOverlayTxtForced = on => {
  const keyUp = (currentKey || "").toUpperCase();
  const isCaratula = keyUp === "CARATULA_V" || keyUp === "CARATULA_H";
  const isWeb = keyUp === "WEB";

  if (isCaratula || isWeb) {
    // En CARATULA y WEB el botón ZONA DE SEGURIDAD
    // controla el overlay checker (role-base → mockup-off)
    preview.classList.toggle("mockup-off", !on);
  } else {
    // Resto de formatos: comportamiento normal (overlay sibling)
    preview.classList.toggle("txt-off", !on);
  }
};

      function setMockupState(on) {
        setSwitchState(mockupSwitch, mockupToggle, on);
        setOverlayMockupForced(on);
      }

      function setTxtState(on) {
        setSwitchState(txtSwitch, txtToggle, on);
        setOverlayTxtForced(on);
      }

function setLogoState(on) {
  setSwitchState(logoSwitch, logoToggle, on);
  preview.classList.toggle("logo-off", !on);
}

function setWebMockupState(on) {
  setSwitchState(webMockupSwitch, webMockupToggle, on);
  preview.classList.toggle("web-mockup-off", !on);
}

function setSphZonaState(on) {
  setSwitchState(sphZonaSwitch, sphZonaToggle, on);
  window.sphZonaOn = on;
  preview.classList.toggle("sph-zona-off", !on);
}

      // FANART – cambiar nivel 1/2
      function setNivelState(on) {
        // on = true  → NIVEL 2
        // on = false → NIVEL 1
        if (!nivelSwitch || !nivelToggle) return;

        // Actualizamos el estado visual del switch
        setSwitchState(nivelSwitch, nivelToggle, on);

        // Guardamos el nivel elegido
        window.fanartNivel = on ? 2 : 1;

        // Pedir refresco de overlays (overlay FANART)
        document.dispatchEvent(new CustomEvent("v19-refresh"));
      }

      function getOverlayBase() {
        return document.querySelector(
          "#preview .v19-overlay.role-base"
        );
      }

      function refreshSwitchVisibility() {
        const ov = getOverlayBase();
        const h = !!(ov && ov.getAttribute("src"));
        setSwitchVisible(mockupSwitch, h);
      }

       /* Cambio dinámico MOCKUP ↔ ZONA DE SEGURIDAD */
      function updateMockupLabel(key) {
        const ku = (key || "").toUpperCase();

        if (ku === "AD_PAUSE") {
          mockupText.textContent = "FONDO";
          return;
        }

        if (ku === "MOD_N" || ku === "MOD_N_SIL") {
          mockupText.textContent = "ZONA DE SEGURIDAD";
          return;
        }

        // Formatos que SÍ deben llamarse MOCKUP
        const mockupFormats = new Set([
          "FANART_DESTACADO",
          "FANART",
          "FANART_MOVIL",
          "MUX4_FONDO",
          "SMARTPHONE_MUX_FONDO",
          "AMAZON_BG"
        ]);

        mockupText.textContent = mockupFormats.has(ku)
          ? "MOCKUP"
          : "ZONA DE SEGURIDAD";
      }


      function updateTxtLabel(key) {
        const k = (key || "").toUpperCase();

        // MUX4_FONDO / SMARTPHONE_MUX_FONDO → TXT
        if (k === "MUX4_FONDO" || k === "SMARTPHONE_MUX_FONDO") {
          txtText.textContent = "TXT";
          return;
        }

        // AMAZON_BG / AMAZON_LOGO → ZONA DE SEGURIDAD
        if (k === "AMAZON_BG" || k === "AMAZON_LOGO") {
          txtText.textContent = "ZONA DE SEGURIDAD";
          return;
        }

        // _SONY → ZONA DE SEGURIDAD
        if (k === "_SONY") {
          txtText.textContent = "ZONA DE SEGURIDAD";
          return;
        }

        // DESTACADO_DOBLE1 → ZONA DE SEGURIDAD
        if (
  k === "DESTACADO_DOBLE1" ||
  k === "DESTACADO_DOBLE1_SIL" ||
  k === "DESTACADO_DOBLE2" ||
  k === "DESTACADO_DOBLE2_SIL" ||
  k === "DESTACADO_DOBLE4" ||
  k === "DESTACADO_DOBLE4_SIL"
) {
    txtText.textContent = "ZONA DE SEGURIDAD";
    return;
}

        // Resto de formatos → MARCAS DINÁMICAS
        txtText.textContent = "MARCAS DINÁMICAS";
      }

      /* ==========================================
         ABRIR / CERRAR MODAL
      ========================================== */
      function openModal() {
        modal.classList.add("open");
        modal.setAttribute("aria-hidden", "false");
      }

      function closeModal() {
        modal.classList.remove("open");
        modal.setAttribute("aria-hidden", "true");
        resetModalState();
      }

      function resetModalState() {
        thumbnailsDiv.innerHTML = "";
        preview.innerHTML = "";

        filenameDisplay.textContent = "Selecciona un thumbnail";
        validationsEl.innerHTML =
          `✔ Nomenclatura <span class="sep"> | </span> ✔ Dimensiones <span class="sep"> | </span> ✔ Peso`;

        layout.classList.remove("collapsed");
        fileInput.value = "";

        window.LOADED_ITEMS = [];

        setMockupState(true);
        setSwitchVisible(mockupSwitch, false);

        setTxtState(true);
        setSwitchVisible(txtSwitch, false);
setLogoState(true);
setSwitchVisible(logoSwitch, false);
preview.classList.remove("logo-off");

setWebMockupState(true);
setSwitchVisible(webMockupSwitch, false);
preview.classList.remove("web-mockup-off");

setSphZonaState(true);
setSwitchVisible(sphZonaSwitch, false);
preview.classList.remove("sph-zona-off");

        // FANART – resetear NIVEL a 1 y ocultar el switch
        setNivelState(false);
        setSwitchVisible(nivelSwitch, false);

        setSwitchState(focoSwitch, focoToggle, false);
        window.focoOn = false;
        window.fanartNivel = 1;
	currentKey = "";
        setSwitchVisible(focoSwitch, false);

        commentArea.value = "";
        applyHasCommentBadges();
        btnAttach.disabled = true;

        viewer.classList.remove("viewer-light");
        mockupText.textContent = "MOCKUP";

        if (viewerInner) {
          viewerInner.classList.remove("amazon-mode");
        }

 if (amazonLogoNote) {
          amazonLogoNote.style.display = "none";
        }

        requestAnimationFrame(recalcCommentsLayout);
      }

      /* ==========================================
         CAMBIO DE LADO DEL PANEL
      ========================================== */
      function applySide(s) {
        layout.classList.add("swapping");

        const f = document.createDocumentFragment();

        if (s === "right") {
          layout.classList.add("panel-right");
          f.appendChild(viewer);
          f.appendChild(sidebar);
        } else {
          layout.classList.remove("panel-right");
          f.appendChild(sidebar);
          f.appendChild(viewer);
        }

        layout.appendChild(f);
        localStorage.setItem("panelSide", s);

        setTimeout(() => {
          layout.classList.remove("swapping");
          recalcCommentsLayout();
        }, 120);
      }

      function toggleSide() {
        applySide(layout.classList.contains("panel-right") ? "left" : "right");
      }

      function initSideFromStorage() {
        applySide(localStorage.getItem("panelSide") || "left");
      }

      /* ==========================================
         TOOLTIP DE ERRORES
      ========================================== */
      function buildErrorReason(n, r) {
        const m = [];

        if (!r.nameOk)
          m.push(`Nomenclatura: no válida para “${n}”.`);
        if (r.dimsInfo?.status === "err")
          m.push(`Dimensiones: ${r.dimsInfo.msg}.`);
        if (r.weightInfo?.status === "err")
          m.push(`Peso: ${r.weightInfo.msg}.`);

        return m.join("\n");
      }

      function showTooltip(x, y, t) {
        tooltipEl.textContent = t;
        tooltipEl.style.left = Math.round(x + 12) + "px";
        tooltipEl.style.top = Math.round(y + 12) + "px";
        tooltipEl.classList.add("show");
        tooltipEl.setAttribute("aria-hidden", "false");
      }

      function hideTooltip() {
        tooltipEl.classList.remove("show");
        tooltipEl.setAttribute("aria-hidden", "true");
      }

      /* ==========================================
         DRAG & DROP
      ========================================== */
      ["dragenter", "dragover", "dragleave", "drop"].forEach(ev => {
        dropArea.addEventListener(ev, e => {
          e.preventDefault();
          e.stopPropagation();

          if (e.type === "dragover" && e.dataTransfer) {
            e.dataTransfer.dropEffect = "copy";
          }
        });
      });

      ["dragenter", "dragover"].forEach(ev => {
        dropArea.addEventListener(ev, () => dropArea.classList.add("highlight"));
      });

      ["dragleave", "drop"].forEach(ev => {
        dropArea.addEventListener(ev, () => dropArea.classList.remove("highlight"));
      });

      dropArea.addEventListener("drop", e => {
        if (e.dataTransfer) handleFiles(e.dataTransfer.files);
      });

      dropArea.addEventListener("click", () => fileInput.click());
      fileInput.addEventListener("change", () => handleFiles(fileInput.files));

      closeBtn.addEventListener("click", closeModal);

      window.addEventListener("keydown", e => {
        if (e.key === "Escape" && modal.classList.contains("open"))
          closeModal();
      });

      btnTogglePanel.addEventListener("click", () =>
        layout.classList.toggle("collapsed")
      );

      collapsedHandle?.addEventListener("click", () =>
        layout.classList.remove("collapsed")
      );

      btnSwapSide.addEventListener("click", toggleSide);

      btnViewerBg.addEventListener("click", () =>
        viewer.classList.toggle("viewer-light")
      );

      /* ==========================================
         SWITCHES MANUALES
      ========================================== */
      mockupSwitch.addEventListener("click", () =>
        setMockupState(!mockupToggle.checked)
      );

      mockupToggle.addEventListener("change", e =>
        setMockupState(e.target.checked)
      );

      txtSwitch.addEventListener("click", () =>
        setTxtState(!txtToggle.checked)
      );

      sphZonaSwitch.addEventListener("click", () =>
        setSphZonaState(!sphZonaToggle.checked)
      );

      sphZonaToggle.addEventListener("change", e =>
        setSphZonaState(e.target.checked)
      );

logoSwitch.addEventListener("click", () =>
  setLogoState(!logoToggle.checked)
);

logoToggle.addEventListener("change", e =>
  setLogoState(e.target.checked)
);

webMockupSwitch.addEventListener("click", () =>
  setWebMockupState(!webMockupToggle.checked)
);

webMockupToggle.addEventListener("change", e =>
  setWebMockupState(e.target.checked)
);

      txtToggle.addEventListener("change", e =>
        setTxtState(e.target.checked)
      );

      // FANART – cambio de NIVEL 1 / 2
      nivelSwitch.addEventListener("click", () =>
        setNivelState(!nivelToggle.checked)
      );

      nivelToggle.addEventListener("change", e =>
        setNivelState(e.target.checked)
      );

      focoSwitch.addEventListener("click", () => {
        const on = !focoToggle.checked;
        setSwitchState(focoSwitch, focoToggle, on);
        window.focoOn = on;
        document.dispatchEvent(new CustomEvent("v19-refresh"));
      });

      focoToggle.addEventListener("change", e => {
        const on = !!e.target.checked;
        setSwitchState(focoSwitch, focoToggle, on);
        window.focoOn = on;
        document.dispatchEvent(new CustomEvent("v19-refresh"));
      });

      // AD_PAUSE – switch ZONA DE SEGURIDAD
      adPauseCheckerSwitch.addEventListener("click", () => {
        const on = !adPauseCheckerToggle.checked;
        setSwitchState(adPauseCheckerSwitch, adPauseCheckerToggle, on);
        window.adPauseCheckerOn = on;
        document.dispatchEvent(new CustomEvent("v19-refresh"));
      });

      adPauseCheckerToggle.addEventListener("change", e => {
        const on = !!e.target.checked;
        setSwitchState(adPauseCheckerSwitch, adPauseCheckerToggle, on);
        window.adPauseCheckerOn = on;
        document.dispatchEvent(new CustomEvent("v19-refresh"));
      });

      // AD_PAUSE – switch PASTILLA PUBLI
      pastillaPubliSwitch.addEventListener("click", () => {
        const on = !pastillaPubliToggle.checked;
        setSwitchState(pastillaPubliSwitch, pastillaPubliToggle, on);
        window.pastillaPubliOn = on;
        document.dispatchEvent(new CustomEvent("v19-refresh"));
      });

      pastillaPubliToggle.addEventListener("change", e => {
        const on = !!e.target.checked;
        setSwitchState(pastillaPubliSwitch, pastillaPubliToggle, on);
        window.pastillaPubliOn = on;
        document.dispatchEvent(new CustomEvent("v19-refresh"));
      });

      new MutationObserver(() => refreshSwitchVisibility()).observe(
        document.getElementById("preview"),
        {
          subtree: true,
          attributes: true,
          childList: true,
          attributeFilter: ["src", "style", "class"]
        }
      );

      initSideFromStorage();

const shouldShowTxtSwitch = k => {
  const ku = (k || "").toUpperCase();
  return (
    ku === "MUX4_FONDO" ||
    ku === "SMARTPHONE_MUX_FONDO" ||
    ku === "CARATULA_V" ||
    ku === "CARATULA_H" ||
    ku === "AMAZON_BG" ||
    ku === "AMAZON_LOGO" ||
    ku === "_SONY" ||
    ku === "DESTACADO_DOBLE1" ||
    ku === "DESTACADO_DOBLE1_SIL" ||
    ku === "DESTACADO_DOBLE2" ||
    ku === "DESTACADO_DOBLE2_SIL" ||
    ku === "DESTACADO_DOBLE4" ||
    ku === "DESTACADO_DOBLE4_SIL"
  );
};

const shouldShowAdPauseCheckerSwitch = k => (k || "").toUpperCase() === "AD_PAUSE";

const shouldShowPastillaPubliSwitch = k => (k || "").toUpperCase() === "AD_PAUSE";

      const shouldShowFocoSwitch = k => k === "MUX4_FONDO";

      // FANART → único formato que enseña el switch NIVEL
      const shouldShowNivelSwitch = k => {
        const ku = (k || "").toUpperCase();
        return ku === "FANART";
      };

const shouldShowLogoSwitch = k =>
  (k || "").toUpperCase() === "AMAZON_BG";

      /* ==========================================
         VALIDAR METADATOS
      ========================================== */
      function validateFileMeta(file, dataUrl, cb) {
        const matched = checkName(file.name);
        const rule = matched ? RU[matched] : null;
        const nameOk = !!matched;

        const probe = new Image();
        probe.onload = () => {
          const dimsInfo = checkDims(
            probe.naturalWidth,
            probe.naturalHeight,
            rule
          );
          const weightInfo = checkWeight(file.size, rule);
          const hasError =
            !nameOk ||
            dimsInfo.status === "err" ||
            weightInfo.status === "err";

          cb({
            matched,
            nameOk,
            dimsInfo,
            weightInfo,
            hasError
          });
        };

        probe.src = dataUrl;
      }

      /* ==========================================
         SELECCIONAR THUMBNAIL
      ========================================== */
      function selectThumb(timg, res, dataUrl, file) {
        document
          .querySelectorAll(".thumbnail")
          .forEach(el => el.classList.remove("selected"));

        timg.classList.add("selected");

        const key =
          (res && res.matched) ||
          timg._earlyKey ||
          checkName(file?.name || "");
		  currentKey = key || "";
// AMAZON_BG: modo especial de alineación (imagen pegada arriba)
        const isAmazon = (key || "").toUpperCase() === "AMAZON_BG";
        if (viewerInner) {
          viewerInner.classList.toggle("amazon-mode", isAmazon);
        }

        filenameDisplay.textContent =
          file?.name || key || "";

// ➜ Mensaje solo en AMAZON_LOGO
if (amazonLogoNote) {
  if ((key || "").toUpperCase() === "AMAZON_LOGO") {
    amazonLogoNote.style.display = "block";
  } else {
    amazonLogoNote.style.display = "none";
  }
}

        preview.innerHTML = "";
        const big = new Image();
        big.src = dataUrl;
        big.alt = file?.name || "";
        preview.appendChild(big);

        if (res) renderValidations(res);

setMockupState(true);

// 1) Visibilidad normal del TXT según formato
setSwitchVisible(txtSwitch, shouldShowTxtSwitch(key || ""));

// 2) Seguridad extra: si es AMAZON_BG, forzamos que se vea sí o sí
if ((key || "").toUpperCase() === "AMAZON_BG") {
  txtSwitch.style.display = "inline-flex";
}

setTxtState(true);

// AD_PAUSE – switch ZONA DE SEGURIDAD
setSwitchVisible(adPauseCheckerSwitch, shouldShowAdPauseCheckerSwitch(key || ""));
if (shouldShowAdPauseCheckerSwitch(key || "")) {
  setSwitchState(adPauseCheckerSwitch, adPauseCheckerToggle, true);
  window.adPauseCheckerOn = true;
}

// AD_PAUSE – switch PASTILLA PUBLI
setSwitchVisible(pastillaPubliSwitch, shouldShowPastillaPubliSwitch(key || ""));
if (shouldShowPastillaPubliSwitch(key || "")) {
  setSwitchState(pastillaPubliSwitch, pastillaPubliToggle, true);
  window.pastillaPubliOn = true;
}

        setSwitchVisible(focoSwitch, shouldShowFocoSwitch(key || ""));
        setSwitchState(focoSwitch, focoToggle, false);
        window.focoOn = false;

        updateMockupLabel(key || "");
	updateTxtLabel(key || "");

// LOGO solo AMAZON_BG
if (shouldShowLogoSwitch(key || "")) {
  setSwitchVisible(logoSwitch, true);
  setLogoState(true);
} else {
  setSwitchVisible(logoSwitch, false);
  preview.classList.remove("logo-off");
}

        /* ===========================
           FANART – Gestión del switch NIVEL
        ============================ */

        if ((key || "").toUpperCase() === "FANART") {
          // Mostrar el switch
          setSwitchVisible(nivelSwitch, true);

          // Resetear a NIVEL 1
          setNivelState(false);   // ← nivelToggle.checked = false → NIVEL 1

        } else {
          // Ocultar switch
          setSwitchVisible(nivelSwitch, false);

          // Reset interno siempre a NIVEL 1
          window.fanartNivel = 1;
        }

        /* Botón captura: visible solo en formatos con EXPORT_CONFIG */
        if (btnCapture) {
          btnCapture.style.display = currentKey ? "inline-flex" : "none";
        }
        setTimeout(refreshSwitchVisibility, 0);
        document.dispatchEvent(new CustomEvent("v19-refresh"));

        const fname = file?.name || "";
        const existing = loadCommentsFor(fname);
        commentArea.value = existing;

        if (!existing) injectValidationLinesIfNeeded(fname, res);
        applyHasCommentBadges();
        btnAttach.disabled = !fname;

        recalcCommentsLayout();
      }

      /* ==========================================
         CARGAR ARCHIVOS
      ========================================== */
      function handleFiles(files) {
        const imgs = Array.from(files || [])
          .filter(f => f.type && f.type.startsWith("image/"))
          .sort((a, b) =>
            a.name.localeCompare(b.name, "es", { sensitivity: "base" })
          );

        if (!imgs.length) return;
        resetModalState();

        totalToLoad = imgs.length;
        validatedCount = 0;
        firstThumbEl = null;
        firstThumbFile = null;

        imgs.forEach(file => {
          const wrap = document.createElement("div");
          wrap.className = "thumbnail-wrapper";

          const timg = document.createElement("img");
          timg.className = "thumbnail";
          timg.alt = file.name;

          const lab = document.createElement("div");
          lab.className = "thumbnail-label";
          lab.textContent = "…";

          wrap.addEventListener("mouseenter", ev => {
            const r = timg._validation;
            if (r && r.hasError) {
              const txt = buildErrorReason(file.name, r);
              if (txt) showTooltip(ev.clientX, ev.clientY, txt);
            }
          });

          wrap.addEventListener("mousemove", ev => {
            if (tooltipEl.classList.contains("show")) {
              tooltipEl.style.left = Math.round(ev.clientX + 12) + "px";
              tooltipEl.style.top = Math.round(ev.clientY + 12) + "px";
            }
          });

          wrap.addEventListener("mouseleave", hideTooltip);

          timg.addEventListener("click", () => {
            const r = timg._validation;
            const d = timg.src;
            selectThumb(timg, r, d, file);
          });

          wrap.appendChild(timg);
          wrap.appendChild(lab);
          thumbnailsDiv.appendChild(wrap);

          if (!firstThumbEl) {
            firstThumbEl = timg;
            firstThumbFile = file;
          }

          const reader = new FileReader();
          reader.onload = e => {
            const d = e.target.result;
            timg.src = d;

            window.LOADED_ITEMS.push({
              name: file.name,
              src: d
            });

            const early = checkName(file.name);
            timg._earlyKey = early;

            lab.textContent = DL[early] || early || file.name;

            validateFileMeta(file, d, res => {
              timg._validation = res;

              if (res.hasError) {
                lab.textContent = "¡ERROR!";
                lab.classList.add("error");
                timg.classList.add("thumb-error");
              } else {
                lab.textContent =
                  DL[res.matched] || res.matched || file.name;

                lab.classList.remove("error");
                timg.classList.remove("thumb-error");
              }

              if (timg.classList.contains("selected"))
                renderValidations(res);

              validatedCount++;

              /* Selección automática del primero */
              if (validatedCount === totalToLoad) {
                if (
                  firstThumbEl &&
                  !document.querySelector(".thumbnail.selected")
                ) {
                  selectThumb(
                    firstThumbEl,
                    firstThumbEl._validation || null,
                    firstThumbEl.src,
                    firstThumbFile
                  );
                }
                recalcCommentsLayout();
              }
            });
          };

          reader.readAsDataURL(file);
        });

        openModal();
      }

      /* ==========================================
         RE-CALCULO ALTURA CAMPO COMENTARIOS
      ========================================== */
      function recalcCommentsLayout() {
        commentsBlock.style.marginTop = "20px";

        const scrollRect = scrollCol.getBoundingClientRect();
        const areaRect = commentArea.getBoundingClientRect();
        const actionsH = actionsBar.offsetHeight || 0;

        const topGap = areaRect.top - scrollRect.top;

        let available =
          scrollRect.height - topGap - actionsH - 20;

        available = Math.max(120, Math.floor(available));
        commentArea.style.height = available + "px";
      }

      scrollCol.addEventListener("scroll", recalcCommentsLayout, {
        passive: true
      });

      window.addEventListener("resize", recalcCommentsLayout);

      new ResizeObserver(recalcCommentsLayout).observe(scrollCol);
      new ResizeObserver(recalcCommentsLayout).observe(commentsBlock);

      /* ==========================================
         ESCRIBIR COMENTARIOS
      ========================================== */
      commentArea.addEventListener("input", () => {
        const fname = getCurrentFileName();
        if (!fname) return;
        saveCommentsFor(fname, commentArea.value);
      });

        /* ==========================================
           PRESETS
        ========================================== */
        let fbTimer = null;

        function showPresetFeedback(msg) {
          presetFeedback.textContent = msg || "";
          clearTimeout(fbTimer);

          if (msg) {
            fbTimer = setTimeout(() => {
              presetFeedback.textContent = "";
            }, 2000);
          }
        }
        function lineAlreadyExists(text, line) {
          const lines = (text || "")
            .split(/\r?\n/)
            .map(s => s.trim())
            .filter(Boolean);
          return lines.includes(line.trim());
        }

        function setPresetPanelVisibility(show) {
          isPresetPanelOpen = show;
          presetPanel.style.display = show ? "block" : "none";
          presetToggleBtn.classList.toggle("is-active", show);
          recalcCommentsLayout();
        }

        function resetPresetPanel() {
          // Ocultar panel
          isPresetPanelOpen = false;
          presetPanel.style.display = "none";
          presetToggleBtn.classList.remove("is-active");

          // Resetear categoría activa
          activeCategory = "";

          // Limpiar buscador
          presetSearch.value = "";

          // Limpiar lista de mensajes
          presetList.innerHTML = "";

          // Re-renderizar categorías sin ninguna activa
          renderPresetCategories();

          recalcCommentsLayout();
        }

        function renderPresetCategories() {
          presetCategories.innerHTML = "";
          Object.keys(PRESET_CATEGORIES).forEach(cat => {
            const btn = document.createElement("button");
            btn.type = "button";
            btn.className =
              "preset-cat-btn" + (cat === activeCategory ? " is-active" : "");
            btn.textContent = cat;
            btn.addEventListener("click", () => {
              activeCategory = cat;
              renderCategoryView();
            });
            presetCategories.appendChild(btn);
          });

        }

        function renderPresetList(items) {
          presetList.innerHTML = "";

          if (!items.length) {
            const empty = document.createElement("div");
            empty.className = "preset-feedback";
            empty.textContent = "Sin resultados";
            presetList.appendChild(empty);
            return;
          }

          items.forEach(text => {
            const btn = document.createElement("button");
            btn.type = "button";
            btn.className = "preset-item";
            btn.dataset.text = text;
            btn.textContent = text;
            presetList.appendChild(btn);
          });
        }

        function renderCategoryView() {
          presetCategories.style.display = "grid";
          renderPresetCategories();
          // Solo mostrar lista si hay categoría activa
          if (activeCategory) {
            const list = PRESET_CATEGORIES[activeCategory] || [];
            renderPresetList(list);
          } else {
            presetList.innerHTML = "";
          }
        }

        function renderSearchResults(term) {
          presetCategories.style.display = "none";
          const filtered = PRESET_ENTRIES
            .filter(o => o.text.toLowerCase().includes(term))
            .map(o => o.text);
          renderPresetList(filtered);
        }

        function handlePresetSelection(text) {
          if (!text) return;

          let txt = commentArea.value || "";
          if (lineAlreadyExists(txt, text)) {
            showPresetFeedback("Comentario ya registrado anteriormente.");
            return;
          }

          txt = txt ? txt.trimEnd() + "\n" + text : text;

          commentArea.value = txt;

          commentArea.focus();
          const end = commentArea.value.length;
          commentArea.setSelectionRange(end, end);

          const fname = getCurrentFileName();
          if (fname) saveCommentsFor(fname, txt);

          showPresetFeedback("");

          // Resetear todo el panel de presets al estado inicial
          resetPresetPanel();
        }

        presetToggleBtn.addEventListener("click", () => {
          if (isPresetPanelOpen) {
            // Si está abierto, resetear todo al estado inicial
            resetPresetPanel();
            return;
          }

          setPresetPanelVisibility(true);
          if (presetSearch.value.trim()) {
            renderSearchResults(presetSearch.value.trim().toLowerCase());
          } else {
            renderCategoryView();
          }
        });

        presetSearch.addEventListener("input", e => {
          const raw = e.target.value;
          const term = raw.trim().toLowerCase();

          if (raw.length) {
            if (!isPresetPanelOpen) setPresetPanelVisibility(true);
            renderSearchResults(term);
          } else {
            if (isPresetPanelOpen) {
              renderCategoryView();
            } else {
              setPresetPanelVisibility(false);
            }
          }
        });

        presetPanel.addEventListener("click", e => {
          const btn = e.target.closest(".preset-item");
          if (!btn) return;

          const text = btn.dataset.text || btn.textContent || "";
          handlePresetSelection(text);
        });

        renderCategoryView();

      /* ==========================================
         ADJUNTAR IMÁGENES
      ========================================== */
      btnAttach.addEventListener("click", () => {
        if (!btnAttach.disabled) attachInput.click();
      });

      attachInput.addEventListener("change", async e => {
        const files = Array.from(e.target.files || []);
        const fname = getCurrentFileName();

        if (!fname || !files.length) return;

        const arr = (ATTACH[fname] ||= []);
        let txt = commentArea.value || "";

        for (const f of files) {
          const blob = new Blob(
            [await f.arrayBuffer()],
            { type: f.type }
          );

          arr.push({ name: f.name, blob });

          txt = txt
            ? txt.trimEnd() + "\nAdjunto: " + f.name + "\n"
            : "Adjunto: " + f.name + "\n";
        }

        commentArea.value = txt;
        saveCommentsFor(fname, txt);
        attachInput.value = "";
        recalcCommentsLayout();
      });

      /* ==========================================
         EXPORTAR TXT o ZIP
      ========================================== */
      btnExport.addEventListener("click", async () => {
        const map = commentsMap();
        const thumbs = [...thumbnailsDiv.querySelectorAll(".thumbnail")];

        const items = thumbs
          .map(t => {
            const name = t.alt || "";
            return {
              name,
              text: (map[name] || "").trim(),
              attachments: ATTACH[name] || []
            };
          })
          .filter(i => i.name);

        let txt = "";
        const withText = items.filter(i => i.text);

        withText.forEach((o, idx) => {
          txt += o.name + "\n" + o.text +
            (idx < withText.length - 1 ? "\n\n" : "");
        });

        const anyAttach = items.some(i =>
          i.attachments && i.attachments.length
        );

        if (!anyAttach) {
          const blob = new Blob([txt], {
            type: "text/plain;charset=utf-8"
          });
          saveAs(blob, "Comentarios_Visor.txt");
          return;
        }

        const zip = new JSZip();
        zip.file("Comentarios_Visor.txt", txt);

        items.forEach(i => {
          (i.attachments || []).forEach(a => {
            zip.file(a.name, a.blob);
          });
        });

        const content = await zip.generateAsync({ type: "blob" });
        saveAs(content, "Paquete_Comentarios.zip");
      });

      /* ==========================================
         MODAL "VER TODOS"
      ========================================== */
      function centerCommentsModalPanel() {
        const my = document.getElementById("myModal");
        const panel = document.querySelector(".cm-panel");
        const r = my.getBoundingClientRect();
        const px = Math.round(r.left + r.width / 2);
        const py = Math.round(r.top + r.height / 2);
        panel.style.left = px + "px";
        panel.style.top = py + "px";
        panel.style.transform = "translate(-50%, -50%)";
      }

      function rebuildCommentsModal() {
        const map = commentsMap();
        const items = [...thumbnailsDiv.querySelectorAll(".thumbnail")]
          .map(t => ({
            name: t.alt || "",
            text: (map[t.alt || ""] || "").trim()
          }))
          .filter(o => o.name);

        const withText = items.filter(o => o.text);

        cmBody.innerHTML = "";

        if (!withText.length) {
          const p = document.createElement("div");
          p.className = "empty";
          p.textContent = "NO HAY COMENTARIOS REGISTRADOS";
          cmBody.appendChild(p);
        } else {
          withText.forEach(o => {
            const block = document.createElement("div");
            block.className = "cm-item";

            const fn = document.createElement("div");
            fn.className = "fn";
            fn.textContent = o.name;

            const txt = document.createElement("div");
            txt.className = "cm-text";
            txt.textContent = o.text;

            block.appendChild(fn);
            block.appendChild(txt);
            cmBody.appendChild(block);
          });
        }
      }

      btnViewAll.addEventListener("click", () => {
        rebuildCommentsModal();
        document.getElementById("commentsModal").classList.add("open");
        centerCommentsModalPanel();
      });

      document.getElementById("commentsModal").addEventListener("click", e => {
        if (
          e.target.classList.contains("cm-backdrop") ||
          e.target.id === "cmClose"
        ) {
          e.currentTarget.classList.remove("open");
        }
      });

      window.addEventListener("resize", () => {
        const el = document.getElementById("commentsModal");
        if (el.classList.contains("open")) centerCommentsModalPanel();
      });

      /* Captura */
      const shutterSound = new Audio("assets/sonido/rafaga_camara.mp3");
      btnCapture?.addEventListener("click", () => {
        shutterSound.currentTime = 0;
        shutterSound.play();
        exportComposition();
      });
		
      /* ==========================================
         EXPONER acceso al preview principal
      ========================================== */
/* ==========================================
         EXPORT CONFIG
         Escalable: añadir nuevos formatos aquí.
         Cada formato define dimensiones de salida y
         array de capas (de fondo a primer plano).
      ========================================== */
const EXPORT_CONFIG = {
        MUX4_FONDO: {
          w: 1920,
          h: 1080,
          filenameTag: "COMPOSICION",
          layers: [
            /* Capa 0 – imagen principal (siempre visible) */
            {
              id: "main",
              visible: () => true,
              getSrc: () =>
                window.__v19_getMainPreviewImg?.()?.src ?? null,
              draw(ctx, img, cfg) {
                ctx.drawImage(img, 0, 0, cfg.w, cfg.h);
              }
            },
            /* Capa 1 – overlay MOCKUP (role-base) */
            {
              id: "base",
              visible: () => !preview.classList.contains("mockup-off"),
              getSrc: () =>
                preview.querySelector(".v19-overlay.role-base")
                  ?.getAttribute("src") ?? null,
              draw(ctx, img, cfg) {
                ctx.drawImage(img, 0, 0, cfg.w, cfg.h);
              }
            },
            /* Capa 2 – overlay TXT/MUX4_TXT (role-sib) */
            {
              id: "sib",
              visible: () => {
                const el = preview.querySelector(".v19-overlay.role-sib");
                return (
                  !preview.classList.contains("txt-off") &&
                  !!el &&
                  el.style.display !== "none"
                );
              },
              getSrc: () =>
                preview.querySelector(".v19-overlay.role-sib")
                  ?.getAttribute("src") ?? null,
              draw(ctx, img, cfg) {
                const x = window.focoOn ? 105 : 108;
                const y = window.focoOn ? 456 : 185;
                ctx.drawImage(img, x, y, 784, 318);
              }
            }
          ]
        },
        AD_PAUSE: {
          w: 1920,
          h: 1080,
          filenameTag: "COMPOSICION",
          layers: [
            /* Capa 0 – fondo fondo_ad.jpg (role-base) */
            {
              id: "base",
              visible: () => true,
              getSrc: () =>
                preview.querySelector(".v19-overlay.role-base")
                  ?.getAttribute("src") ?? null,
              draw(ctx, img, cfg) {
                ctx.drawImage(img, 0, 0, cfg.w, cfg.h);
              }
            },
            /* Capa 1 – imagen principal (el anuncio) en el rectángulo */
            {
              id: "main",
              visible: () => true,
              getSrc: () =>
                window.__v19_getMainPreviewImg?.()?.src ?? null,
              draw(ctx, img) {
                ctx.drawImage(img, 322, 98, 1280, 720);
              }
            },
            /* Capa 2 – checker ZONA DE SEGURIDAD (role-sib) */
            {
              id: "checker",
              visible: () => window.adPauseCheckerOn !== false,
              getSrc: () =>
                preview.querySelector(".v19-overlay.role-sib")
                  ?.getAttribute("src") ?? null,
              draw(ctx, img) {
                ctx.drawImage(img, 322, 98, 1280, 720);
              }
            },
            /* Capa 3 – pastilla publi (role-pastilla) */
            {
              id: "pastilla",
              visible: () => window.pastillaPubliOn !== false,
              getSrc: () =>
                preview.querySelector(".v19-overlay.role-pastilla")
                  ?.getAttribute("src") ?? null,
              draw(ctx, img) {
                ctx.drawImage(img, 875, 77, img.naturalWidth, img.naturalHeight);
              }
            }
          ]
        },
SMARTPHONE_MUX_FONDO: {
          w: 1440,
          h: 2986,
          filenameTag: "COMPOSICION",
          layers: [
            /* Capa 0 – imagen principal (fondo) */
            {
              id: "main",
              visible: () => true,
              getSrc: () =>
                window.__v19_getMainPreviewImg?.()?.src ?? null,
              draw(ctx, img, cfg) {
                ctx.drawImage(img, 0, 0, cfg.w, cfg.h);
              }
            },
            /* Capa 1 – overlay MOCKUP (role-base) */
            {
              id: "base",
              visible: () => !preview.classList.contains("mockup-off"),
              getSrc: () =>
                preview.querySelector(".v19-overlay.role-base")
                  ?.getAttribute("src") ?? null,
              draw(ctx, img, cfg) {
                ctx.drawImage(img, 0, 0, cfg.w, cfg.h);
              }
            },
            /* Capa 2 – overlay TXT (role-sib) posicionado en 1440x2986 */
            {
              id: "sib",
              visible: () => {
                const el = preview.querySelector(".v19-overlay.role-sib");
                return (
                  !preview.classList.contains("txt-off") &&
                  !!el &&
                  el.style.display !== "none"
                );
              },
              getSrc: () =>
                preview.querySelector(".v19-overlay.role-sib")
                  ?.getAttribute("src") ?? null,
              draw(ctx, img, cfg) {
                // Tamaño natural del TXT escalado al canvas 1440x2986
                const w = img.naturalWidth;
                const h = img.naturalHeight;
                const x = 0;        // posX = 0, centrado
                const y = 1217;     // posY del SMARTPHONE_MUX_TXT_OVERLAY
                ctx.drawImage(img, x, y, w, h);
              }
            }
          ]
        }
        /* Añadir nuevos formatos aquí con la misma estructura */
      };

      /* ==========================================
         RESOLVE TO DATA URL
         Convierte cualquier src (ruta relativa o
         data URL) a data URL para el canvas.
         Usa caché para no repetir fetch.
      ========================================== */
      const _dataUrlCache = new Map();

      async function resolveToDataURL(src) {
        if (!src) return null;
        if (src.startsWith("data:")) return src;
        if (_dataUrlCache.has(src)) return _dataUrlCache.get(src);

        try {
          const resp = await fetch(src);
          if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
          const blob = await resp.blob();
          return new Promise(resolve => {
            const fr = new FileReader();
            fr.onload  = () => { _dataUrlCache.set(src, fr.result); resolve(fr.result); };
            fr.onerror = () => resolve(null);
            fr.readAsDataURL(blob);
          });
        } catch (e) {
          console.warn("[Capture] No se pudo resolver:", src, e);
          return null;
        }
      }

      /* ==========================================
         LOAD IMAGE FROM DATA URL
      ========================================== */
      function loadImgFromDataURL(dataUrl) {
        return new Promise((resolve, reject) => {
          if (!dataUrl) return reject(new Error("src vacío"));
          const img = new Image();
          img.onload  = () => resolve(img);
          img.onerror = () => reject(new Error("Error cargando imagen"));
          img.src = dataUrl;
        });
      }

      /* ==========================================
         EXPORT COMPOSITION
         Lee EXPORT_CONFIG[currentKey], compone el
         canvas capa a capa y descarga como JPG.
      ========================================== */
      async function exportComposition() {
      const cfg = EXPORT_CONFIG[currentKey] ?? {
          w: window.__v19_getMainPreviewImg?.()?.naturalWidth  || 1920,
          h: window.__v19_getMainPreviewImg?.()?.naturalHeight || 1080,
          filenameTag: "COMPOSICION",
          layers: [
            {
              id: "main",
              visible: () => true,
              getSrc: () => window.__v19_getMainPreviewImg?.()?.src ?? null,
              draw(ctx, img, cfg) { ctx.drawImage(img, 0, 0, cfg.w, cfg.h); }
            },
            {
              id: "base",
              visible: () => !preview.classList.contains("mockup-off"),
              getSrc: () => preview.querySelector(".v19-overlay.role-base")?.getAttribute("src") ?? null,
              draw(ctx, img, cfg) { ctx.drawImage(img, 0, 0, cfg.w, cfg.h); }
            },
            {
              id: "sib",
              visible: () => {
                const el = preview.querySelector(".v19-overlay.role-sib");
                return !preview.classList.contains("txt-off") && !!el && el.style.display !== "none";
              },
              getSrc: () => preview.querySelector(".v19-overlay.role-sib")?.getAttribute("src") ?? null,
              draw(ctx, img, cfg) { ctx.drawImage(img, 0, 0, cfg.w, cfg.h); }
            }
          ]
        };
        if (!cfg) return;

        btnCapture.classList.add("is-loading");

        try {
          const canvas = document.createElement("canvas");
          canvas.width  = cfg.w;
          canvas.height = cfg.h;
          const ctx = canvas.getContext("2d");

          for (const layer of cfg.layers) {
            if (!layer.visible()) continue;

            const dataUrl = await resolveToDataURL(layer.getSrc());
            if (!dataUrl) {
              console.warn("[Capture] Capa omitida (sin src o CORS):", layer.id);
              continue;
            }

            try {
              const img = await loadImgFromDataURL(dataUrl);
              layer.draw(ctx, img, cfg);
            } catch (e) {
              console.warn("[Capture] Error dibujando capa:", layer.id, e);
            }
          }

          const baseName = getCurrentFileName()
            .replace(/\.[^.]+$/, "")
            .replace(/[^\w\-]/g, "_");
          const filename = `${baseName}_${cfg.filenameTag}.jpg`;

          canvas.toBlob(
            blob => {
              if (blob) saveAs(blob, filename);
              else console.error("[Capture] canvas.toBlob devolvió null");
            },
            "image/jpeg",
            0.92
          );

        } catch (e) {
          console.error("[Capture] Error en exportComposition:", e);
          alert(
            "No se pudo exportar la composición.\n\n" +
            "Si usas file://, abre el proyecto desde un servidor local " +
            "(ej. Live Server en VS Code).\n\nDetalle: " + e.message
          );
        } finally {
          btnCapture.classList.remove("is-loading");
        }
      }
      window.__v19_getMainPreviewImg = function () {
        const imgs = [...preview.querySelectorAll("img")].filter(
          i => !i.classList.contains("v19-overlay")
        );
        return imgs.length ? imgs[0] : null;
      };
    });
