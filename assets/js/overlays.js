    (function () {
      const OVERLAY_BASE = "assets/img/checkers";

        const TRUTH = [
        { title: "APPLETV", overlay: "APPLETV_Check.png" },
        { title: "199", overlay: "199_PUBLI_Check.png" },
        { title: "FANART_DESTACADO", overlay: "FANART_DESTACADO_PUBLI_Check.png" },
        { title: "FANART", overlay: "FANART_NIVEL1_Check.png" },
        { title: "FANART_MOVIL", overlay: "FANART_MOVIL_Check.png" },
        { title: "IPLUS", overlay: "IPLUS_PUBLI_Check.png" },

        { title: "MOD_DESTACADOS1", overlay: "MOD_DESTACADO1_Check.png" },
        { title: "MOD_DESTACADOS1_SIL", overlay: "MOD_DESTACADO1_SIL_Check.png" },
        { title: "MOD_DESTACADOS2", overlay: "MOD_DESTACADO2_Check.png" },
        { title: "MOD_DESTACADOS2_SIL", overlay: "MOD_DESTACADO2_SIL_Check.png" },
        { title: "MOD_DESTACADOS3", overlay: "MOD_DESTACADO3_Check.png" },
        { title: "MOD_DESTACADOS3_SIL", overlay: "MOD_DESTACADO3_SIL_Check.png" },
        { title: "MOD_N_SIL", overlay: "MOD_N_SIL_Checker.png" },
        { title: "MOD_N", overlay: "MOD_N_Checker.png" },
        { title: "MUX4_FONDO", overlay: "MUX4_FONDO_TXT_PUBLI.png" },
        { title: "MUX4_TXT", overlay: "MUX4_TXT_Check.png" },
        { title: "SMARTPHONE_MUX_FONDO", overlay: "SMARTPHONE_MUX_FONDO_TXT_Check.png"},
        {title: "SMARTPHONE_MUX_TXT", overlay: "SMARTPHONE_MUX_TXT_Check.png"},
        { title: "TITULO_FICHA", overlay: "TITULO_FICHA_Checker.png" },
        { title: "CARTEL_COM_H", overlay: "CC_H_Checker.png" },
        { title: "CARTEL_COM_V", overlay: "CC_V_Checker.png" },
        { title: "AD_PAUSE", overlay: "fondo_ad.jpg" },
        { title: "CARATULA_V", overlay: "MARCA_CARATULA_V.png" },
        { title: "CARATULA_V_TXT", overlay: "CARATULA_V_Checker.png" },
        { title: "CARATULA_H", overlay: "MARCA_CARATULA_H.png" },
        { title: "CARATULA_H_TXT", overlay: "Caratula_H_Checker.png" },
        { title: "WEB", overlay: "WEBPLAYER_PUBLI_Check.png" },
        { title: "WOW", overlay: "WOW_PUBLI_Check.png" },
        { title: "AMAZON_BG",        overlay: "AMAZON_MOCKUP_Check.png" },
        { title: "AMAZON_SEGURIDAD", overlay: "AMAZON_SEGURIDAD_Check.png" },
        { title: "AMAZON_LOGO",      overlay: "AMAZON_LOGO_Checker.png" },
        { title: "_PERFIL", overlay: "perfil_checker.png" },
        { title: "_SONY", overlay: "SONY_Checker.png" },
        { title: "DESTACADO_DOBLE1", overlay: "MOD_DES_DOBLE_1_Checker.png" },
        { title: "DESTACADO_DOBLE1_SIL", overlay: "MOD_DES_DOBLE_SIL_1_Checker.png" },
        { title: "DESTACADO_DOBLE2", overlay: "MOD_DES_DOBLE_2_Checker.png" },
        { title: "DESTACADO_DOBLE2_SIL", overlay: "MOD_DES_DOBLE_SIL_2_Checker.png" },
        { title: "DESTACADO_DOBLE4", overlay: "MOD_DES_DOBLE_4_Checker.png" },
        { title: "DESTACADO_DOBLE4_SIL", overlay: "MOD_DES_DOBLE_SIL_4_Checker.png" }
      ];

      const KEY_TO_OVERLAY = new Map(
        TRUTH.map(it => [it.title.toUpperCase(), it.overlay])
      );

      const KEY_ALIASES = new Map([
		["_MUX4_TXT", "MUX4_TXT"],

		// Alias sin "S" → versión oficial con "S"
		["MOD_DESTACADO1", "MOD_DESTACADOS1"],
		["MOD_DESTACADO2", "MOD_DESTACADOS2"],
		["MOD_DESTACADO3", "MOD_DESTACADOS3"],
		["MOD_DESTACADO4", "MOD_DESTACADOS4"],

		// Alias para carteles de comunicación
		["CC_H", "CARTEL_COM_H"],
		["CC_V", "CARTEL_COM_V"],
		["SONY", "_SONY"],
                ["DESTACADO_DOBLE_SIL_1", "DESTACADO_DOBLE1_SIL"],
                ["DESTACADO_DOBLE_SIL_2", "DESTACADO_DOBLE2_SIL"],
                ["DESTACADO2_DOBLE_SIL", "DESTACADO_DOBLE2_SIL"],
                ["DESTACADO_DOBLE_4", "DESTACADO_DOBLE4"],
                ["DESTACADO_DOBLE_SIL_4", "DESTACADO_DOBLE4_SIL"]
        ]);

      const TITLE_ALIASES = new Map([
        ["SPH. MUX FONDO", "SMARTPHONE_MUX_FONDO"],
        ["SPH MUX FONDO", "SMARTPHONE_MUX_FONDO"],
        ["SPH. MUX TXT", "SMARTPHONE_MUX_TXT"],
        ["SPH MUX TXT", "SMARTPHONE_MUX_TXT"],
        ["_MUX4_TXT", "MUX4_TXT"]
      ]);

      const PLACE_MUX4 = {
        OFF: {
          ref: { w: 1920, h: 1080 },
          pos: { x: 108, y: 185 }
        },
        FOCO: {
          ref: { w: 1920, h: 1080 },
          pos: { x: 105, y: 456 }
        }
      };

      const PLACE_SMARTPHONE = {
        SMARTPHONE_MUX_FONDO: {
          ref: { w: 1440, h: 2986 },
          pos: { x: SMARTPHONE_MUX_TXT_OVERLAY.posX, y: SMARTPHONE_MUX_TXT_OVERLAY.posY },
          escala: SMARTPHONE_MUX_TXT_OVERLAY.escala,
          centrar: true  // Centrar horizontalmente el overlay
        }
      };

	  const PLACE_CARATULA = {
        CARATULA_V: {
          ref: { w: 1200, h: 1800 },   // tamaño original del arte
          pos: { x: 0, y: 0 }          // ← PROVISIONAL, para probar
        }
      };

	  const PLACE_CARATULA_H = {
        CARATULA_H: {
          ref: { w: 1920, h: 1080 },   // tamaño original horizontal
          pos: { x: 0, y: 0 }          // ← PROVISIONAL: cubre todo el arte
        }
      };

      const isLive = el => !!(el && el.isConnected);

      const normTitle = s =>
        String(s || "").replace(/\s+/g, " ").trim().toUpperCase();

      function boundaryMatch(h, k) {
        const i = h.indexOf(k);
        if (i === -1) return false;

        const b = i === 0 ? "" : h[i - 1];
        const a = i + k.length >= h.length ? "" : h[i + k.length];

        return (!b || /[_\-\s.\/]/.test(b)) &&
               (!a || /[_\-\s.\/]/.test(a));
      }

      function keyFromTitle(modal) {
        const el = modal.querySelector(
          "h1,h2,.title,.cabecera,strong,[data-role='title']"
        );
        let t = normTitle(el ? el.textContent : "");

        if (TITLE_ALIASES.has(t)) t = TITLE_ALIASES.get(t);
        return KEY_TO_OVERLAY.has(t) ? t : null;
      }

       function keyFromFilename(img) {
        const parts = [];
        if (img?.alt) parts.push(img.alt);
        if (img?.src) parts.push(img.src);

        const partsUp = parts.map(p => String(p || "").toUpperCase());
        const H = partsUp.join(" | ");

        // 0) PERFIL: si aparece _PERFIL en cualquier parte del nombre,
        //    forzamos siempre este formato (igual que hace checkName)
        if (H.includes("_PERFIL")) {
          return "_PERFIL";
        }

        // 1) CASO ESPECIAL _SIL CON BASURA EN MEDIO
        //    Ej.: MOD_DESTACADOS1_V1_IZQ_SIL, _MOD_DESTACADO3_PRE_SIL, etc.
               const silSource = partsUp.find(p => p.includes("_SIL"));
               if (silSource) {
          if (!endsWithSil(silSource)) return null;

          const SIL_BASES = [
  { key: "MOD_DESTACADOS1_SIL", bases: ["MOD_DESTACADOS1", "MOD_DESTACADO1"] },
  { key: "MOD_DESTACADOS2_SIL", bases: ["MOD_DESTACADOS2", "MOD_DESTACADO2"] },
  { key: "MOD_DESTACADOS3_SIL", bases: ["MOD_DESTACADOS3", "MOD_DESTACADO3"] },
  { key: "MOD_DESTACADOS4_SIL", bases: ["MOD_DESTACADOS4", "MOD_DESTACADO4"] },
  { key: "DESTACADO_DOBLE1_SIL", bases: ["DESTACADO_DOBLE1", "DESTACADO_DOBLE_1"] },
  { key: "DESTACADO_DOBLE2_SIL", bases: ["DESTACADO_DOBLE2", "DESTACADO_DOBLE_2"] },
  { key: "DESTACADO_DOBLE4_SIL", bases: ["DESTACADO_DOBLE4", "DESTACADO_DOBLE_4"] }
];

          for (const item of SIL_BASES) {
            for (const b of item.bases) {
              if (H.includes(b)) {
                // Forzamos clave SIL para que use el overlay *_SIL_Check.png
                return item.key;
              }
            }
          }
        }

        // 2) LÓGICA GENERAL
        const ALL_KEYS = TRUTH.map(it => it.title.toUpperCase());

        const KEYS_FOR_FILENAME = [
          "SMARTPHONE_MUX_FONDO",
          "SMARTPHONE_MUX_TXT",
          "MUX4_TXT",
          "_MUX4_TXT",
          "CC_H",
          "CC_V",

          // Variantes sin "S" que queremos reconocer en los filenames
          "MOD_DESTACADO1",
          "MOD_DESTACADO2",
          "MOD_DESTACADO3",
          "MOD_DESTACADO4",
          // SONY sin guion bajo en el nombre de archivo
          "SONY",

          ...ALL_KEYS
            .filter(k => !k.startsWith("SMARTPHONE_") && k !== "MUX4_TXT")
            .sort((a, b) => b.length - a.length)
        ];

        for (const k of KEYS_FOR_FILENAME) {
          if (boundaryMatch(H, k))
            return KEY_ALIASES.get(k) || k;
        }

        return null;
      }

      function ensureOverlayRole(img, role) {
        if (!isLive(img)) return null;

        const p = img.parentElement;
        if (!isLive(p)) return null;

        if (getComputedStyle(p).position === "static")
          p.style.position = "relative";

        let ov = p.querySelector(`img.v19-overlay.role-${role}`);

        if (!ov) {
          ov = document.createElement("img");
          ov.className = `v19-overlay role-${role}`;
          ov.alt = "";
          Object.assign(ov.style, {
            position: "absolute",
            left: "0",
            top: "0",
            width: "100%",
            height: "100%",
            objectFit: "fill",
            objectPosition: "center",
            pointerEvents: "none",
            zIndex: role === "base" ? "3" : "4",
            border: "0",
            background: "transparent"
          });
          p.appendChild(ov);
        }

        return ov;
      }

      function fitOverlayFill(ov, img) {
        if (!isLive(ov) || !isLive(img) || !isLive(img.parentElement)) return;

        const pr = img.parentElement.getBoundingClientRect();
        const ir = img.getBoundingClientRect();

        ov.style.left = ir.left - pr.left + "px";
        ov.style.top = ir.top - pr.top + "px";
        ov.style.width = ir.width + "px";
        ov.style.height = ir.height + "px";
      }

      function fitAdPause(mainImg, baseOv) {
        if (!isLive(mainImg) || !isLive(baseOv)) return;

        const parent = mainImg.parentElement;
        if (!isLive(parent)) return;

        const pr = parent.getBoundingClientRect();
        const bgW = baseOv.naturalWidth || 0;
        const bgH = baseOv.naturalHeight || 0;

        if (pr.width <= 0 || pr.height <= 0 || !bgW || !bgH) return;

        const factor = Math.min(pr.width / bgW, pr.height / bgH);

        const scaledBgW = bgW * factor;
        const scaledBgH = bgH * factor;
        const leftBg = (pr.width - scaledBgW) / 2;
        const topBg = (pr.height - scaledBgH) / 2;

        Object.assign(baseOv.style, {
          width: `${scaledBgW}px`,
          height: `${scaledBgH}px`,
          left: `${leftBg}px`,
          top: `${topBg}px`,
          objectFit: "fill",
          objectPosition: "center"
        });

        // Posición del rectángulo naranja dentro del fondo (1920x1080)
        const orangeX = 322;  // px desde la izquierda
        const orangeY = 98;   // px desde arriba
        const orangeW = 1280; // ancho del área (imagen del coche)
        const orangeH = 720;  // alto del área (imagen del coche)

        // Escalar posición y tamaño al factor actual
        const scaledOrangeX = orangeX * factor;
        const scaledOrangeY = orangeY * factor;
        const scaledOrangeW = orangeW * factor;
        const scaledOrangeH = orangeH * factor;

        // Posicionar la imagen del coche sobre el rectángulo naranja
        const leftC = leftBg + scaledOrangeX;
        const topC = topBg + scaledOrangeY;

        Object.assign(mainImg.style, {
          position: "absolute",
          width: `${scaledOrangeW}px`,
          height: `${scaledOrangeH}px`,
          left: `${leftC}px`,
          top: `${topC}px`,
          objectFit: "fill",
          zIndex: "2"
        });
      }

      // AD_PAUSE Checker – overlay que se posiciona exactamente igual que la imagen del coche
      function fitAdPauseChecker(checkerOv, mainImg, baseOv) {
        if (!isLive(checkerOv) || !isLive(mainImg) || !isLive(baseOv)) return;

        const parent = mainImg.parentElement;
        if (!isLive(parent)) return;

        const pr = parent.getBoundingClientRect();
        const bgW = baseOv.naturalWidth || 0;
        const bgH = baseOv.naturalHeight || 0;

        if (pr.width <= 0 || pr.height <= 0 || !bgW || !bgH) return;

        const factor = Math.min(pr.width / bgW, pr.height / bgH);

        const scaledBgW = bgW * factor;
        const scaledBgH = bgH * factor;
        const leftBg = (pr.width - scaledBgW) / 2;
        const topBg = (pr.height - scaledBgH) / 2;

        // Posición del rectángulo naranja dentro del fondo (1920x1080)
        const orangeX = 322;  // px desde la izquierda
        const orangeY = 98;   // px desde arriba
        const orangeW = 1280; // ancho del área
        const orangeH = 720;  // alto del área

        // Escalar posición y tamaño al factor actual
        const scaledOrangeX = orangeX * factor;
        const scaledOrangeY = orangeY * factor;
        const scaledOrangeW = orangeW * factor;
        const scaledOrangeH = orangeH * factor;

        // Posicionar el checker exactamente igual que la imagen del coche
        const leftC = leftBg + scaledOrangeX;
        const topC = topBg + scaledOrangeY;

        Object.assign(checkerOv.style, {
          position: "absolute",
          width: `${scaledOrangeW}px`,
          height: `${scaledOrangeH}px`,
          left: `${leftC}px`,
          top: `${topC}px`,
          objectFit: "fill"
        });
      }

      // AD_PAUSE Pastilla Publi – overlay posicionado a 875px, 77px del fondo 1920x1080
      function fitAdPausePastilla(pastillaOv, mainImg, baseOv) {
        if (!isLive(pastillaOv) || !isLive(mainImg) || !isLive(baseOv)) return;

        const parent = mainImg.parentElement;
        if (!isLive(parent)) return;

        const pr = parent.getBoundingClientRect();
        const bgW = baseOv.naturalWidth || 1920;
        const bgH = baseOv.naturalHeight || 1080;

        if (pr.width <= 0 || pr.height <= 0) return;

        const factor = Math.min(pr.width / bgW, pr.height / bgH);

        const scaledBgW = bgW * factor;
        const scaledBgH = bgH * factor;
        const leftBg = (pr.width - scaledBgW) / 2;
        const topBg = (pr.height - scaledBgH) / 2;

        // Posición de la pastilla dentro del fondo (1920x1080)
        const pastillaX = 875;  // px desde la izquierda
        const pastillaY = 77;   // px desde arriba

        // Escalar posición al factor actual
        const scaledPastillaX = pastillaX * factor;
        const scaledPastillaY = pastillaY * factor;

        // Posicionar la pastilla
        const leftP = leftBg + scaledPastillaX;
        const topP = topBg + scaledPastillaY;

        // Obtener dimensiones naturales de la pastilla y escalarlas
        const pastillaW = pastillaOv.naturalWidth || 0;
        const pastillaH = pastillaOv.naturalHeight || 0;

        if (pastillaW && pastillaH) {
          const scaledPastillaW = pastillaW * factor;
          const scaledPastillaH = pastillaH * factor;

          Object.assign(pastillaOv.style, {
            position: "absolute",
            width: `${scaledPastillaW}px`,
            height: `${scaledPastillaH}px`,
            left: `${leftP}px`,
            top: `${topP}px`,
            objectFit: "fill"
          });
        }
      }

// FANART_MOVIL – overlay más alto que la imagen (1440x3117 sobre 1440x2986)
function fitOverlayFanartMovil(ov, img) {
  if (!isLive(ov) || !isLive(img) || !isLive(img.parentElement)) return;

  const pr = img.parentElement.getBoundingClientRect();
  const ir = img.getBoundingClientRect();

  // 1) El ancho del overlay = ancho visible de la imagen
  const overlayW = ir.width;
  // 2) Alto del overlay según su proporción real 1440x3117
  const overlayH = overlayW * (3117 / 1440);

  // 3) Alineamos top-left con la imagen
  const left = ir.left - pr.left;
  const top  = ir.top  - pr.top;

  ov.style.left   = left + "px";
  ov.style.top    = top  + "px";
  ov.style.width  = overlayW + "px";
  ov.style.height = overlayH + "px";
  ov.style.objectFit = "fill";
  ov.style.display   = "";
}

/* ==========================================
   WEB – Funciones de posicionamiento

   PARÁMETROS DE AJUSTE MANUAL:
   Modificar estos valores para ajustar la posición de la imagen WEB
   Los offsets son proporcionales al tamaño del mockup (0.01 = 1%)
========================================== */
const WEB_OFFSET_X_RATIO = 0;       // Ajuste horizontal (positivo = derecha) - proporción del ancho del mockup
const WEB_OFFSET_Y_RATIO = -0.11;  // Ajuste vertical (positivo = abajo) - proporción del alto del mockup

// Proporciones: mockup 1920x850, imagen WEB posicionada a 1868x434
const WEB_WIDTH_RATIO = 1868 / 1920;    // 0.9729
const WEB_HEIGHT_RATIO = 434 / 850;     // 0.5106 del alto del mockup
const WEB_X_RATIO = (1920 - 1868) / 2 / 1920;  // centrado horizontal
const WEB_Y_RATIO = 208 / 850;          // posición vertical

function fitOverlayWebMockup(mockupOv, mainImg, baseOv) {
  if (!isLive(mockupOv) || !isLive(mainImg) || !isLive(mainImg.parentElement)) return;

  const parent = mainImg.parentElement;
  const pr = parent.getBoundingClientRect();

  // El mockup manda: calculamos su tamaño en contain
  const mockupNatW = mockupOv.naturalWidth || 1920;
  const mockupNatH = mockupOv.naturalHeight || 850;

  const scale = Math.min(pr.width / mockupNatW, pr.height / mockupNatH);
  const mockupW = mockupNatW * scale;
  const mockupH = mockupNatH * scale;

  // Centrar mockup
  const mockupLeft = (pr.width - mockupW) / 2;
  const mockupTop = (pr.height - mockupH) / 2;

  // Posicionar mockup
  Object.assign(mockupOv.style, {
    position: "absolute",
    left: mockupLeft + "px",
    top: mockupTop + "px",
    width: mockupW + "px",
    height: mockupH + "px",
    objectFit: "fill",
    zIndex: "10"
  });

  // Calcular posición de la imagen WEB dentro del mockup
  const webW = mockupW * WEB_WIDTH_RATIO;
  const webH = mockupH * WEB_HEIGHT_RATIO;
  const webLeft = mockupLeft + (mockupW * WEB_X_RATIO) + (mockupW * WEB_OFFSET_X_RATIO);
  const webTop = mockupTop + (mockupH * WEB_Y_RATIO) + (mockupH * WEB_OFFSET_Y_RATIO);

  // Posicionar imagen WEB
  Object.assign(mainImg.style, {
    position: "absolute",
    left: webLeft + "px",
    top: webTop + "px",
    width: webW + "px",
    height: webH + "px",
    objectFit: "fill",
    maxWidth: "none",
    maxHeight: "none",
    zIndex: "1"
  });

  // El checker va exactamente igual que la imagen WEB
  if (isLive(baseOv)) {
    Object.assign(baseOv.style, {
      position: "absolute",
      left: webLeft + "px",
      top: webTop + "px",
      width: webW + "px",
      height: webH + "px",
      objectFit: "fill",
      zIndex: "5"
    });
  }
}

function fitOverlayRect(ov, img, placement, txtRuleKey) {
  if (!placement ||
      !isLive(ov) ||
      !isLive(img) ||
      !isLive(img.parentElement)) {
    if (isLive(ov)) ov.style.display = "none";
    return;
  }

  const { ref, pos, escala, centrar } = placement;
  if (!ref || !pos) {
    ov.style.display = "none";
    return;
  }

  const pr = img.parentElement.getBoundingClientRect();
  const ir = img.getBoundingClientRect();

  const sX = ir.width / ref.w;
  const sY = ir.height / ref.h;
  const s  = Math.min(sX, sY);

  // Escala adicional del overlay (por defecto 1)
  const extraEscala = escala ?? 1;

  const rule = typeof RU !== "undefined" && RU[txtRuleKey]
    ? RU[txtRuleKey]
    : null;

  const rW = rule?.w ?? 0;
  const rH = rule?.h ?? 0;

  // Tamaño final del overlay
  const finalW = rW * s * extraEscala;
  const finalH = rH * s * extraEscala;

  let ox, oy;

  if (centrar) {
    // Centrar horizontalmente: calcular offset para centrar el overlay en la imagen
    const centroX = (ir.width - finalW) / 2;
    ox = centroX + (pos.x * s);  // pos.x actúa como ajuste desde el centro
  } else {
    // Posición absoluta desde la izquierda
    ox = pos.x * s;
  }
  oy = pos.y * s;

  ov.style.left = (ir.left - pr.left + ox) + "px";
  ov.style.top  = (ir.top  - pr.top  + oy) + "px";

  if (rW > 0 && rH > 0) {
    ov.style.width  = finalW + "px";
    ov.style.height = finalH + "px";
  }

  ov.style.objectFit = "fill";
  ov.style.display   = "";
}

      function findSibling(byNeedle, baseName) {
        const U = String(baseName || "").toUpperCase();
        const ix = U.indexOf(byNeedle);
        if (ix < 0) return null;

        const stem = U.slice(0, ix);

        const cand = (window.LOADED_ITEMS || [])
          .filter(it => /\.PNG($|\?)/i.test(it.name))
          .map(it => ({
            it,
            UU: String(it.name).toUpperCase()
          }))
          .filter(o =>
            o.UU.startsWith(stem) &&
            o.UU.includes(byNeedle.replace("_FONDO", "_TXT"))
          )
          .sort((a, b) => b.UU.length - a.UU.length)[0];

        return cand ? cand.it : null;
      }

      function findAmazonLogo(baseName) {
        const U = String(baseName || "").toUpperCase();
        const idx = U.indexOf("AMAZON_BG");
        const stem = idx >= 0 ? U.slice(0, idx) : U;

        const cand = (window.LOADED_ITEMS || [])
          .filter(it => /\.PNG($|\?)/i.test(it.name))
          .map(it => ({ it, UU: String(it.name).toUpperCase() }))
          .filter(o =>
            o.UU.startsWith(stem) &&
            o.UU.includes("AMAZON_LOGO")
          )
          .sort((a, b) => b.UU.length - a.UU.length)[0];

        return cand ? cand.it : null;
      }

      let roBase = null;
      let roSib = null;
      let roLogo = null;   // ← nuevo observer para el logo

      let lastFailBase = "";
      let lastFailSib = "";

      const getMux4Placement = () =>
        window.focoOn ? PLACE_MUX4.FOCO : PLACE_MUX4.OFF;

      function getVisibleModal() {
        const c = [
          ...document.querySelectorAll(
            "[role='dialog'],[aria-modal='true']," +
            "[class*='modal' i],[class*='visor' i]," +
            "[class*='viewer' i],[class*='lightbox' i]"
          )
        ];

        let best = null;
        let area = 0;

        for (const el of c) {
          const cs = getComputedStyle(el);
          if (
            cs.display === "none" ||
            cs.visibility === "hidden" ||
            el.offsetWidth <= 0 ||
            el.offsetHeight <= 0
          )
            continue;

          const r = el.getBoundingClientRect();
          const a = r.width * r.height;

          if (a > area) {
            best = el;
            area = a;
          }
        }

        return best;
      }

      function getMainModalImg(modal) {
        const img =
          typeof window.__v19_getMainPreviewImg === "function"
            ? window.__v19_getMainPreviewImg()
            : null;

        if (img && isLive(img)) return img;

        const imgs = Array.from(modal.querySelectorAll("img")).filter(
          i => !i.classList.contains("v19-overlay")
        );

        let best = null;
        let area = 0;

        for (const i of imgs) {
          const r = i.getBoundingClientRect();
          const vis = r.width > 120 && r.height > 120;
          const a = r.width * r.height;

          if (vis && a > area) {
            best = i;
            area = a;
          }
        }
        return best;
      }

      function disconnectObservers() {
        if (roBase) {
          roBase.disconnect();
          roBase = null;
        }
        if (roSib) {
          roSib.disconnect();
          roSib = null;
        }
        if (roLogo) {
          roLogo.disconnect();
          roLogo = null;
        }
      }

// AMAZON — bloque centrado (1920x1080), BG arriba, overlays encima
function fitOverlayAmazon(mainImg, baseOv, sibOv) {
  if (!isLive(mainImg) || !isLive(mainImg.parentElement)) return;

  const parent = mainImg.parentElement;
  const pr = parent.getBoundingClientRect();
  if (pr.width <= 0 || pr.height <= 0) return;

  // Aspect ratio del bloque completo (mockup)
  const aspect = 1920 / 1080;

  // 1) CÁLCULO DEL BLOQUE CENTRADO (16:9)
  let W = pr.width;
  let H = W / aspect;

  if (H > pr.height) {
    H = pr.height;
    W = H * aspect;
  }

  const left = (pr.width - W) / 2;
  const top  = (pr.height - H) / 2;

  // 2) FONDO AMAZON_BG — pegado a la parte superior del bloque
  Object.assign(mainImg.style, {
    position: "absolute",
    left: left + "px",
    top: top + "px",
    width: W + "px",
    height: "auto",
    objectFit: "cover"
  });

  // 3) OVERLAY BASE (mockup)
  if (isLive(baseOv)) {
    Object.assign(baseOv.style, {
      position: "absolute",
      left: left + "px",
      top: top + "px",
      width: W + "px",
      height: H + "px",
      objectFit: "fill",
      display: ""
    });
  }

  // 4) OVERLAY SEGURIDAD
  if (isLive(sibOv)) {
    Object.assign(sibOv.style, {
      position: "absolute",
      left: left + "px",
      top: top + "px",
      width: W + "px",
      height: H + "px",
      objectFit: "fill",
      display: ""
    });
  }
}

      function fitAmazonLogo(mainImg, logoOv) {
        if (!isLive(mainImg) || !isLive(mainImg.parentElement) || !isLive(logoOv)) return;

        const parent = mainImg.parentElement;
        const pr = parent.getBoundingClientRect();
        if (pr.width <= 0 || pr.height <= 0) return;

        // mismo bloque 16:9 que en fitOverlayAmazon
        const aspect = 1920 / 1080;
        let W = pr.width;
        let H = W / aspect;

        if (H > pr.height) {
          H = pr.height;
          W = H * aspect;
        }

        const leftBlock = (pr.width - W) / 2;
        const topBlock  = (pr.height - H) / 2;

        // factor de escala respecto a 1920px de ancho
        const s = W / 1920;

// === AJUSTES DEL LOGO (coordenadas en la maqueta 1920x1080) ===
// Mueve estos valores para colocar el logo EXACTAMENTE donde quieras
const OFFSET_X = 104;   // derecha/izquierda
const OFFSET_Y = 65;    // arriba/abajo

        const nW = logoOv.naturalWidth  * s;
        const nH = logoOv.naturalHeight * s;

        // De momento: pegado arriba a la izquierda del bloque
        logoOv.style.position = "absolute";
        logoOv.style.left = (leftBlock + OFFSET_X * s) + "px";
        logoOv.style.top  = (topBlock + OFFSET_Y * s) + "px";
        logoOv.style.width  = nW + "px";
        logoOv.style.height = nH + "px";
        logoOv.style.objectFit = "contain";
        logoOv.style.display = "";
      }

      /* ==========================================
         MÁQUINA PRINCIPAL DE OVERLAYS
      ========================================== */
      function update() {
        const modal = getVisibleModal();
        if (!modal) return disconnectObservers();

        const mainImg = getMainModalImg(modal);
        if (!isLive(mainImg)) return disconnectObservers();

        let key = keyFromTitle(modal);
        if (!key) key = keyFromFilename(mainImg);

        if (key && KEY_ALIASES.has(key))
          key = KEY_ALIASES.get(key);

        const baseOv = ensureOverlayRole(mainImg, "base");
        const sibOv = ensureOverlayRole(mainImg, "sib");

        if (!baseOv || !sibOv) return disconnectObservers();

        baseOv.style.display = "none";
        sibOv.style.display = "none";

        // Limpiar overlay sph-zona si existe (solo usado en SMARTPHONE_MUX_FONDO)
        const existingSphZona = mainImg.parentElement?.querySelector(".v19-overlay.role-sph-zona");
        if (existingSphZona) {
          existingSphZona.style.display = "none";
        }

        // Ocultar switch sphZona por defecto (se mostrará solo en SMARTPHONE_MUX_FONDO)
        if (sphZonaSwitch) {
          sphZonaSwitch.style.display = "none";
        }

        // Ocultar switch webMockup por defecto (se mostrará solo en WEB)
        if (webMockupSwitch) {
          webMockupSwitch.style.display = "none";
        }

        baseOv.style.zIndex = "3";
        baseOv.style.objectFit = "fill";
        mainImg.style.position = "";
        mainImg.style.zIndex = "";
        mainImg.style.left = "";
        mainImg.style.top = "";
        mainImg.style.width = "";
        mainImg.style.height = "";
        mainImg.style.objectFit = "";

        if (!key) {
          disconnectObservers();
          return;
        }

        /* ==========================================
           CASO AD_PAUSE (mockup de fondo)
        ========================================== */
        if (key === "AD_PAUSE") {
          const baseFile = KEY_TO_OVERLAY.get("AD_PAUSE");

          baseOv.style.zIndex = "1";
          baseOv.style.objectFit = "contain";

          if (baseFile) {
            const srcB = `${OVERLAY_BASE}/${baseFile}`;

            baseOv.onerror = () => {
              lastFailBase = srcB;
              baseOv.style.display = "none";
            };

            baseOv.onload = () => {
              if (!isLive(mainImg)) return;
              if (lastFailBase === srcB) lastFailBase = "";
              fitAdPause(mainImg, baseOv);
            };

            if (baseOv.getAttribute("src") !== srcB)
              baseOv.setAttribute("src", srcB);

            fitAdPause(mainImg, baseOv);
            baseOv.style.display = "";
          } else {
            baseOv.removeAttribute("src");
            baseOv.style.display = "none";
          }

          // Checker overlay (ZONA DE SEGURIDAD)
          const checkerFile = "AD_PAUSE_Checker.png";
          const srcChecker = `${OVERLAY_BASE}/${checkerFile}`;

          sibOv.onerror = () => {
            lastFailSib = srcChecker;
            sibOv.style.display = "none";
          };

          sibOv.onload = () => {
            if (!isLive(mainImg)) return;
            if (lastFailSib === srcChecker) lastFailSib = "";
            fitAdPauseChecker(sibOv, mainImg, baseOv);
          };

          if (sibOv.getAttribute("src") !== srcChecker)
            sibOv.setAttribute("src", srcChecker);

          fitAdPauseChecker(sibOv, mainImg, baseOv);
          sibOv.style.zIndex = "3";
          sibOv.style.display = window.adPauseCheckerOn ? "" : "none";

          // Pastilla Publi overlay
          const pastillaOv = ensureOverlayRole(mainImg, "pastilla");
          const pastillaFile = "pasti_publi.png";
          const srcPastilla = `${OVERLAY_BASE}/${pastillaFile}`;

          pastillaOv.onerror = () => {
            pastillaOv.style.display = "none";
          };

          pastillaOv.onload = () => {
            if (!isLive(mainImg)) return;
            fitAdPausePastilla(pastillaOv, mainImg, baseOv);
          };

          if (pastillaOv.getAttribute("src") !== srcPastilla)
            pastillaOv.setAttribute("src", srcPastilla);

          fitAdPausePastilla(pastillaOv, mainImg, baseOv);
          pastillaOv.style.zIndex = "4";
          pastillaOv.style.display = window.pastillaPubliOn ? "" : "none";

          Object.assign(mainImg.style, {
            position: "absolute",
            zIndex: "2"
          });

          disconnectObservers();

          roBase = new ResizeObserver(() => {
            fitAdPause(mainImg, baseOv);
            fitAdPauseChecker(sibOv, mainImg, baseOv);
            fitAdPausePastilla(pastillaOv, mainImg, baseOv);
          });

          roBase.observe(mainImg.parentElement);

          if (baseOv) roBase.observe(baseOv);

          return;
        }
        /* ==========================================
           CASO MUX4_FONDO
        ========================================== */
        if (key === "MUX4_FONDO") {
          const baseFile = window.focoOn
            ? "MUX4_FONDO_TXT_PUBLI_FOCO.png"
            : KEY_TO_OVERLAY.get("MUX4_FONDO") ||
              "MUX4_FONDO_TXT_PUBLI.png";

          if (baseFile) {
            const srcB = `${OVERLAY_BASE}/${baseFile}`;

            baseOv.onerror = () => {
              lastFailBase = srcB;
              baseOv.style.display = "none";
            };

            baseOv.onload = () => {
              if (!isLive(mainImg)) return;
              if (lastFailBase === srcB) lastFailBase = "";
              fitOverlayFill(baseOv, mainImg);
            };

            if (baseOv.getAttribute("src") !== srcB)
              baseOv.setAttribute("src", srcB);

            fitOverlayFill(baseOv, mainImg);
            baseOv.style.display = "";
          }

          const sib = findSibling("MUX4_FONDO", mainImg.alt || "");
          let srcS = null;

          if (sib && sib.src) {
            srcS = sib.src;
          } else {
            const sibFile = KEY_TO_OVERLAY.get("MUX4_TXT");
            if (sibFile) srcS = `${OVERLAY_BASE}/${sibFile}`;
          }

          if (srcS) {
            const placement = getMux4Placement();

            sibOv.onerror = () => {
              lastFailSib = srcS;
              sibOv.style.display = "none";
            };

            sibOv.onload = () => {
              if (!isLive(mainImg)) return;
              if (lastFailSib === srcS) lastFailSib = "";
              fitOverlayRect(
                sibOv,
                mainImg,
                placement,
                "MUX4_TXT"
              );
            };

            if (sibOv.getAttribute("src") !== srcS)
              sibOv.setAttribute("src", srcS);

            fitOverlayRect(
              sibOv,
              mainImg,
              placement,
              "MUX4_TXT"
            );

            sibOv.style.display = "";
          }

          disconnectObservers();

          roBase = new ResizeObserver(() =>
            fitOverlayFill(baseOv, mainImg)
          );
          roSib = new ResizeObserver(() =>
            fitOverlayRect(
              sibOv,
              mainImg,
              getMux4Placement(),
              "MUX4_TXT"
            )
          );

          roBase.observe(mainImg);
          roBase.observe(mainImg.parentElement);

          roSib.observe(mainImg);
          roSib.observe(mainImg.parentElement);

          return;
        }


        /* ==========================================
           CASO SMARTPHONE_MUX_FONDO
        ========================================== */
        if (key === "SMARTPHONE_MUX_FONDO") {
          // --- Overlay ZONA DE SEGURIDAD (nuevo, entre imagen y mockup) ---
          const sphZonaOv = ensureOverlayRole(mainImg, "sph-zona");
          const zonaFile = "SMARTPHONE_MUX_ZONA_Checker.png";
          const srcZona = `${OVERLAY_BASE}/${zonaFile}`;

          if (sphZonaOv) {
            sphZonaOv.style.zIndex = "4"; // mockup (base=3), ZONA (4), TXT (sib=5 arriba)

            sphZonaOv.onerror = () => {
              sphZonaOv.style.display = "none";
            };

            sphZonaOv.onload = () => {
              if (!isLive(mainImg)) return;
              fitOverlayFill(sphZonaOv, mainImg);
            };

            if (sphZonaOv.getAttribute("src") !== srcZona)
              sphZonaOv.setAttribute("src", srcZona);

            fitOverlayRect(
              sphZonaOv,
              mainImg,
              PLACE_SMARTPHONE.SMARTPHONE_MUX_FONDO,
              "SMARTPHONE_MUX_TXT"
            );

            sphZonaOv.style.display = "";
          }

          // --- Overlay MOCKUP (baseOv) ---
          const smBaseFile = KEY_TO_OVERLAY.get("SMARTPHONE_MUX_FONDO");

          if (smBaseFile) {
            const srcB = `${OVERLAY_BASE}/${smBaseFile}`;

            baseOv.onerror = () => {
              lastFailBase = srcB;
              baseOv.style.display = "none";
            };

            baseOv.onload = () => {
              if (!isLive(mainImg)) return;
              if (lastFailBase === srcB) lastFailBase = "";
              fitOverlayFill(baseOv, mainImg);
            };

            if (baseOv.getAttribute("src") !== srcB)
              baseOv.setAttribute("src", srcB);

            fitOverlayFill(baseOv, mainImg);
            baseOv.style.display = "";
          }

          // --- Overlay TXT (sibOv) ---
          const smSib = findSibling(
            "SMARTPHONE_MUX_FONDO",
            mainImg.alt || ""
          );

          let srcS = null;

          if (smSib && smSib.src) {
            srcS = smSib.src;
          } else {
            const f = KEY_TO_OVERLAY.get("SMARTPHONE_MUX_TXT");
            if (f) srcS = `${OVERLAY_BASE}/${f}`;
          }

          if (srcS) {
            const placement =
              PLACE_SMARTPHONE.SMARTPHONE_MUX_FONDO;

            sibOv.onerror = () => {
              lastFailSib = srcS;
              sibOv.style.display = "none";
            };

            sibOv.onload = () => {
              if (!isLive(mainImg)) return;
              if (lastFailSib === srcS) lastFailSib = "";
              fitOverlayRect(
                sibOv,
                mainImg,
                placement,
                "SMARTPHONE_MUX_TXT"
              );
            };

            if (sibOv.getAttribute("src") !== srcS)
              sibOv.setAttribute("src", srcS);

            fitOverlayRect(
              sibOv,
              mainImg,
              placement,
              "SMARTPHONE_MUX_TXT"
            );

            sibOv.style.display = "";
            sibOv.style.zIndex = "5"; // TXT arriba del todo
          }

          // --- Mostrar switches: MOCKUP, ZONA DE SEGURIDAD, TXT ---
          if (mockupSwitch) {
            mockupSwitch.style.display = "inline-flex";
            mockupText.textContent = "MOCKUP";
          }
          if (sphZonaSwitch) {
            sphZonaSwitch.style.display = "inline-flex";
          }
          if (txtSwitch) {
            txtSwitch.style.display = "inline-flex";
            txtText.textContent = "TXT";
          }

          // --- Observers ---
          disconnectObservers();

          roBase = new ResizeObserver(() => {
            fitOverlayFill(baseOv, mainImg);
            if (sphZonaOv) {
              fitOverlayFill(sphZonaOv, mainImg);
            }
          });

          roSib = new ResizeObserver(() =>
            fitOverlayRect(
              sibOv,
              mainImg,
              PLACE_SMARTPHONE.SMARTPHONE_MUX_FONDO,
              "SMARTPHONE_MUX_TXT"
            )
          );

          roBase.observe(mainImg);
          roBase.observe(mainImg.parentElement);

          roSib.observe(mainImg);
          roSib.observe(mainImg.parentElement);

          return;
        }

		        /* ==========================================
           CASO CARATULA_V (doble overlay)
        ========================================== */
        if (key === "CARATULA_V") {
          const baseFile = KEY_TO_OVERLAY.get("CARATULA_V");
          const txtFile  = KEY_TO_OVERLAY.get("CARATULA_V_TXT");

          // --- Overlay base: MARCA_CARATULA_V.png a pantalla ---
          if (baseFile) {
            const srcB = `${OVERLAY_BASE}/${baseFile}`;

            baseOv.onerror = () => {
              lastFailBase = srcB;
              baseOv.style.display = "none";
            };

            baseOv.onload = () => {
              if (!isLive(mainImg)) return;
              if (lastFailBase === srcB) lastFailBase = "";
              fitOverlayFill(baseOv, mainImg);
            };

            if (baseOv.getAttribute("src") !== srcB)
              baseOv.setAttribute("src", srcB);

            fitOverlayFill(baseOv, mainImg);
            baseOv.style.display = "";
          }

          // --- Segundo overlay: CARATULA_V_TXT_Check.png en rectángulo ---
          if (txtFile) {
            const srcS = `${OVERLAY_BASE}/${txtFile}`;
            const placement = PLACE_CARATULA.CARATULA_V;

            sibOv.onerror = () => {
              lastFailSib = srcS;
              sibOv.style.display = "none";
            };

            sibOv.onload = () => {
              if (!isLive(mainImg)) return;
              if (lastFailSib === srcS) lastFailSib = "";
              fitOverlayRect(
                sibOv,
                mainImg,
                placement,
                "CARATULA_V_TXT"
              );
            };

            if (sibOv.getAttribute("src") !== srcS)
              sibOv.setAttribute("src", srcS);

            fitOverlayRect(
              sibOv,
              mainImg,
              placement,
              "CARATULA_V_TXT"
            );

            sibOv.style.display = "";
          } else {
            // Si no hay PNG de TXT, ocultamos el sib por seguridad
            sibOv.removeAttribute("src");
            sibOv.style.display = "none";
          }

          // --- Observers para que se reajusten al redimensionar ---
          disconnectObservers();

          roBase = new ResizeObserver(() =>
            fitOverlayFill(baseOv, mainImg)
          );

          roSib = new ResizeObserver(() =>
            fitOverlayRect(
              sibOv,
              mainImg,
              PLACE_CARATULA.CARATULA_V,
              "CARATULA_V_TXT"
            )
          );

          roBase.observe(mainImg);
          roBase.observe(mainImg.parentElement);

          roSib.observe(mainImg);
          roSib.observe(mainImg.parentElement);

          return;
        }

        /* ==========================================
           CASO CARATULA_H (doble overlay)
        ========================================== */
        if (key === "CARATULA_H") {
          const baseFile = KEY_TO_OVERLAY.get("CARATULA_H");
          const txtFile  = KEY_TO_OVERLAY.get("CARATULA_H_TXT");

          // --- Overlay base: MARCA_CARATULA_H.png a pantalla ---
          if (baseFile) {
            const srcB = `${OVERLAY_BASE}/${baseFile}`;

            baseOv.onerror = () => {
              lastFailBase = srcB;
              baseOv.style.display = "none";
            };

            baseOv.onload = () => {
              if (!isLive(mainImg)) return;
              if (lastFailBase === srcB) lastFailBase = "";
              fitOverlayFill(baseOv, mainImg);
            };

            if (baseOv.getAttribute("src") !== srcB)
              baseOv.setAttribute("src", srcB);

            fitOverlayFill(baseOv, mainImg);
            baseOv.style.display = "";
          }

          // --- Segundo overlay: Caratula_H_Checker.png en rectángulo ---
          if (txtFile) {
            const srcS = `${OVERLAY_BASE}/${txtFile}`;
            const placement = PLACE_CARATULA_H.CARATULA_H;

            sibOv.onerror = () => {
              lastFailSib = srcS;
              sibOv.style.display = "none";
            };

            sibOv.onload = () => {
              if (!isLive(mainImg)) return;
              if (lastFailSib === srcS) lastFailSib = "";
              fitOverlayRect(
                sibOv,
                mainImg,
                placement,
                "CARATULA_H_TXT"
              );
            };

            if (sibOv.getAttribute("src") !== srcS)
              sibOv.setAttribute("src", srcS);

            fitOverlayRect(
              sibOv,
              mainImg,
              placement,
              "CARATULA_H_TXT"
            );

            sibOv.style.display = "";
          } else {
            // Si no hay PNG de TXT, ocultamos el sib por seguridad
            sibOv.removeAttribute("src");
            sibOv.style.display = "none";
          }

          // --- Observers para que se reajusten al redimensionar ---
          disconnectObservers();

          roBase = new ResizeObserver(() =>
            fitOverlayFill(baseOv, mainImg)
          );

          roSib = new ResizeObserver(() =>
            fitOverlayRect(
              sibOv,
              mainImg,
              PLACE_CARATULA_H.CARATULA_H,
              "CARATULA_H_TXT"
            )
          );

          roBase.observe(mainImg);
          roBase.observe(mainImg.parentElement);

          roSib.observe(mainImg);
          roSib.observe(mainImg.parentElement);

          return;
        }
        /* ==========================================
           CASO AMAZON_BG (doble overlay + logo)
        ========================================== */
        if (key === "AMAZON_BG") {
          const mockFile = "AMAZON_MOCKUP_Check.png";
          const segFile  = "AMAZON_SEGURIDAD_Check.png";

          // --- BASE OVERLAY (MOCKUP) ---
          if (mockFile) {
            const srcB = `${OVERLAY_BASE}/${mockFile}`;

            baseOv.onerror = () => {
              lastFailBase = srcB;
              baseOv.style.display = "none";
            };

            baseOv.onload = () => {
              if (!isLive(mainImg)) return;
              if (lastFailBase === srcB) lastFailBase = "";
              fitOverlayAmazon(mainImg, baseOv, sibOv);
            };

            if (baseOv.getAttribute("src") !== srcB)
              baseOv.setAttribute("src", srcB);

            baseOv.style.display = "";
          }

          // --- OVERLAY SEGURIDAD ---
          if (segFile) {
            const srcS = `${OVERLAY_BASE}/${segFile}`;

            sibOv.onerror = () => {
              lastFailSib = srcS;
              sibOv.style.display = "none";
            };

            sibOv.onload = () => {
              if (!isLive(mainImg)) return;
              if (lastFailSib === srcS) lastFailSib = "";
              fitOverlayAmazon(mainImg, baseOv, sibOv);
            };

            if (sibOv.getAttribute("src") !== srcS)
              sibOv.setAttribute("src", srcS);

            sibOv.style.display = "";
          } else {
            sibOv.removeAttribute("src");
            sibOv.style.display = "none";
          }

          // --- LOGO AMAZON (archivo AMAZON_LOGO hermano) ---
          const logoItem = findAmazonLogo(mainImg.alt || "");
          let logoOv = null;

          if (logoItem) {
            logoOv = ensureOverlayRole(mainImg, "logo");

            const srcL = logoItem.src;

            logoOv.onerror = () => {
              logoOv.style.display = "none";
            };

            logoOv.onload = () => {
              if (!isLive(mainImg)) return;
              fitAmazonLogo(mainImg, logoOv);
            };

            if (logoOv.getAttribute("src") !== srcL)
              logoOv.setAttribute("src", srcL);
          } else if (baseOv && baseOv.parentElement) {
            // si no hay logo, lo ocultamos
            const tmp = baseOv.parentElement.querySelector("img.v19-overlay.role-logo");
            if (tmp) {
              tmp.removeAttribute("src");
              tmp.style.display = "none";
            }
          }

          // --- OBSERVERS ---
          disconnectObservers();

          roBase = new ResizeObserver(() =>
            fitOverlayAmazon(mainImg, baseOv, sibOv)
          );
          roSib = new ResizeObserver(() =>
            fitOverlayAmazon(mainImg, baseOv, sibOv)
          );

          if (logoItem && logoOv) {
            roLogo = new ResizeObserver(() =>
              fitAmazonLogo(mainImg, logoOv)
            );
          }

          roBase.observe(mainImg);
          roBase.observe(mainImg.parentElement);

          roSib.observe(mainImg);
          roSib.observe(mainImg.parentElement);

          if (roLogo && logoOv) {
            roLogo.observe(mainImg);
            roLogo.observe(mainImg.parentElement);
          }

          // Primer cálculo inmediato
          fitOverlayAmazon(mainImg, baseOv, sibOv);
          if (logoItem && logoOv) {
            fitAmazonLogo(mainImg, logoOv);
          }

          return;
        }

        /* ==========================================
           CASO AMAZON_LOGO (checker simple con botón TXT)
        ========================================== */
        if (key === "AMAZON_LOGO") {
          const file = KEY_TO_OVERLAY.get("AMAZON_LOGO");

          // No usamos overlay base en este formato
          baseOv.removeAttribute("src");
          baseOv.style.display = "none";

          if (file) {
            const srcS = `${OVERLAY_BASE}/${file}`;

            sibOv.onerror = () => {
              lastFailSib = srcS;
              sibOv.style.display = "none";
            };

            sibOv.onload = () => {
              if (!isLive(mainImg)) return;
              if (lastFailSib === srcS) lastFailSib = "";
              // El checker cubre exactamente el logo
              fitOverlayFill(sibOv, mainImg);
            };

            if (sibOv.getAttribute("src") !== srcS)
              sibOv.setAttribute("src", srcS);

            // Primera colocación inmediata
            fitOverlayFill(sibOv, mainImg);
            sibOv.style.display = "";
          } else {
            sibOv.removeAttribute("src");
            sibOv.style.display = "none";
          }

          // Observers solo para el checker del logo
          disconnectObservers();

          roSib = new ResizeObserver(() =>
            fitOverlayFill(sibOv, mainImg)
          );

          roSib.observe(mainImg);
          roSib.observe(mainImg.parentElement);

          return;
        }

/* ==========================================
   CASO _SONY (checker simple con botón ZONA DE SEGURIDAD / TXT)
========================================== */
if (key === "_SONY") {
  const file = KEY_TO_OVERLAY.get("_SONY");

  // No usamos overlay base en este formato
  baseOv.removeAttribute("src");
  baseOv.style.display = "none";

  if (file) {
    const srcS = `${OVERLAY_BASE}/${file}`;

    sibOv.onerror = () => {
      lastFailSib = srcS;
      sibOv.style.display = "none";
    };

    sibOv.onload = () => {
      if (!isLive(mainImg)) return;
      if (lastFailSib === srcS) lastFailSib = "";
      // El checker cubre exactamente el arte SONY
      fitOverlayFill(sibOv, mainImg);
    };

    if (sibOv.getAttribute("src") !== srcS)
      sibOv.setAttribute("src", srcS);

    // Primera colocación inmediata
    fitOverlayFill(sibOv, mainImg);
    sibOv.style.display = "";
  } else {
    sibOv.removeAttribute("src");
    sibOv.style.display = "none";
  }

  // Observers solo para el checker SONY
  disconnectObservers();

  roSib = new ResizeObserver(() =>
    fitOverlayFill(sibOv, mainImg)
  );

  roSib.observe(mainImg);
  roSib.observe(mainImg.parentElement);

  return;
}

/* ==========================================
   CASO DESTACADO_DOBLE1 (checker simple con botón ZONA DE SEGURIDAD / TXT)
========================================== */
if (key === "DESTACADO_DOBLE1") {
  const file = KEY_TO_OVERLAY.get("DESTACADO_DOBLE1");

  // No usamos overlay base en este formato
  baseOv.removeAttribute("src");
  baseOv.style.display = "none";

  if (file) {
    const srcS = `${OVERLAY_BASE}/${file}`;

    sibOv.onerror = () => {
      lastFailSib = srcS;
      sibOv.style.display = "none";
    };

    sibOv.onload = () => {
      if (!isLive(mainImg)) return;
      if (lastFailSib === srcS) lastFailSib = "";
      // El checker cubre exactamente el arte DESTACADO_DOBLE1
      fitOverlayFill(sibOv, mainImg);
    };

    if (sibOv.getAttribute("src") !== srcS)
      sibOv.setAttribute("src", srcS);

    // Primera colocación inmediata
    fitOverlayFill(sibOv, mainImg);
    sibOv.style.display = "";
  } else {
    sibOv.removeAttribute("src");
    sibOv.style.display = "none";
  }

  // Observers solo para el checker
  disconnectObservers();

  roSib = new ResizeObserver(() =>
    fitOverlayFill(sibOv, mainImg)
  );

  roSib.observe(mainImg);
  roSib.observe(mainImg.parentElement);

  return;
}

/* ==========================================
   CASO DESTACADO_DOBLE1_SIL (checker simple con botón ZONA DE SEGURIDAD / TXT)
========================================== */
if (key === "DESTACADO_DOBLE1_SIL") {
  const file = KEY_TO_OVERLAY.get("DESTACADO_DOBLE1_SIL");

  // No usamos overlay base en este formato
  baseOv.removeAttribute("src");
  baseOv.style.display = "none";

  if (file) {
    const srcS = `${OVERLAY_BASE}/${file}`;

    sibOv.onerror = () => {
      lastFailSib = srcS;
      sibOv.style.display = "none";
    };

    sibOv.onload = () => {
      if (!isLive(mainImg)) return;
      if (lastFailSib === srcS) lastFailSib = "";
      // El checker cubre exactamente el arte DESTACADO_DOBLE1_SIL
      fitOverlayFill(sibOv, mainImg);
    };

    if (sibOv.getAttribute("src") !== srcS)
      sibOv.setAttribute("src", srcS);

    // Primera colocación inmediata
    fitOverlayFill(sibOv, mainImg);
    sibOv.style.display = "";
  } else {
    sibOv.removeAttribute("src");
    sibOv.style.display = "none";
  }

  // Observers solo para el checker
  disconnectObservers();

  roSib = new ResizeObserver(() =>
    fitOverlayFill(sibOv, mainImg)
  );

  roSib.observe(mainImg);
  roSib.observe(mainImg.parentElement);

  return;
}

/* ==========================================
   CASO DESTACADO_DOBLE4_SIL (checker simple con botón ZONA DE SEGURIDAD / TXT)
========================================== */
if (key === "DESTACADO_DOBLE4_SIL") {
  const file = KEY_TO_OVERLAY.get("DESTACADO_DOBLE4_SIL");

  // No usamos overlay base en este formato
  baseOv.removeAttribute("src");
  baseOv.style.display = "none";

  if (file) {
    const srcS = `${OVERLAY_BASE}/${file}`;

    sibOv.onerror = () => {
      lastFailSib = srcS;
      sibOv.style.display = "none";
    };

    sibOv.onload = () => {
      if (!isLive(mainImg)) return;
      if (lastFailSib === srcS) lastFailSib = "";
      // El checker cubre exactamente el arte DESTACADO_DOBLE4_SIL
      fitOverlayFill(sibOv, mainImg);
    };

    if (sibOv.getAttribute("src") !== srcS)
      sibOv.setAttribute("src", srcS);

    // Primera colocación inmediata
    fitOverlayFill(sibOv, mainImg);
    sibOv.style.display = "";
  } else {
    sibOv.removeAttribute("src");
    sibOv.style.display = "none";
  }

  // Observers solo para el checker
  disconnectObservers();

  roSib = new ResizeObserver(() =>
    fitOverlayFill(sibOv, mainImg)
  );

  roSib.observe(mainImg);
  roSib.observe(mainImg.parentElement);

  return;
}

/* ==========================================
   CASO DESTACADO_DOBLE4 (checker simple con botón ZONA DE SEGURIDAD / TXT)
========================================== */
if (key === "DESTACADO_DOBLE4") {
  const file = KEY_TO_OVERLAY.get("DESTACADO_DOBLE4");

  // No usamos overlay base en este formato
  baseOv.removeAttribute("src");
  baseOv.style.display = "none";

  if (file) {
    const srcS = `${OVERLAY_BASE}/${file}`;

    sibOv.onerror = () => {
      lastFailSib = srcS;
      sibOv.style.display = "none";
    };

    sibOv.onload = () => {
      if (!isLive(mainImg)) return;
      if (lastFailSib === srcS) lastFailSib = "";
      // El checker cubre exactamente el arte DESTACADO_DOBLE4
      fitOverlayFill(sibOv, mainImg);
    };

    if (sibOv.getAttribute("src") !== srcS)
      sibOv.setAttribute("src", srcS);

    // Primera colocación inmediata
    fitOverlayFill(sibOv, mainImg);
    sibOv.style.display = "";
  } else {
    sibOv.removeAttribute("src");
    sibOv.style.display = "none";
  }

  // Observers solo para el checker
  disconnectObservers();

  roSib = new ResizeObserver(() =>
    fitOverlayFill(sibOv, mainImg)
  );

  roSib.observe(mainImg);
  roSib.observe(mainImg.parentElement);

  return;
}

/* ==========================================
   CASO DESTACADO_DOBLE2 (checker simple con botón ZONA DE SEGURIDAD / TXT)
========================================== */
if (key === "DESTACADO_DOBLE2") {
  const file = KEY_TO_OVERLAY.get("DESTACADO_DOBLE2");

  // No usamos overlay base en este formato
  baseOv.removeAttribute("src");
  baseOv.style.display = "none";

  if (file) {
    const srcS = `${OVERLAY_BASE}/${file}`;

    sibOv.onerror = () => {
      lastFailSib = srcS;
      sibOv.style.display = "none";
    };

    sibOv.onload = () => {
      if (!isLive(mainImg)) return;
      if (lastFailSib === srcS) lastFailSib = "";
      // El checker cubre exactamente el arte DESTACADO_DOBLE2
      fitOverlayFill(sibOv, mainImg);
    };

    if (sibOv.getAttribute("src") !== srcS)
      sibOv.setAttribute("src", srcS);

    // Primera colocación inmediata
    fitOverlayFill(sibOv, mainImg);
    sibOv.style.display = "";
  } else {
    sibOv.removeAttribute("src");
    sibOv.style.display = "none";
  }

  // Observers solo para el checker
  disconnectObservers();

  roSib = new ResizeObserver(() =>
    fitOverlayFill(sibOv, mainImg)
  );

  roSib.observe(mainImg);
  roSib.observe(mainImg.parentElement);

  return;
}

/* ==========================================
   CASO DESTACADO_DOBLE2_SIL (checker simple con botón ZONA DE SEGURIDAD / TXT)
========================================== */
if (key === "DESTACADO_DOBLE2_SIL") {
  const file = KEY_TO_OVERLAY.get("DESTACADO_DOBLE2_SIL");

  // No usamos overlay base en este formato
  baseOv.removeAttribute("src");
  baseOv.style.display = "none";

  if (file) {
    const srcS = `${OVERLAY_BASE}/${file}`;

    sibOv.onerror = () => {
      lastFailSib = srcS;
      sibOv.style.display = "none";
    };

    sibOv.onload = () => {
      if (!isLive(mainImg)) return;
      if (lastFailSib === srcS) lastFailSib = "";
      // El checker cubre exactamente el arte DESTACADO_DOBLE2_SIL
      fitOverlayFill(sibOv, mainImg);
    };

    if (sibOv.getAttribute("src") !== srcS)
      sibOv.setAttribute("src", srcS);

    // Primera colocación inmediata
    fitOverlayFill(sibOv, mainImg);
    sibOv.style.display = "";
  } else {
    sibOv.removeAttribute("src");
    sibOv.style.display = "none";
  }

  // Observers solo para el checker
  disconnectObservers();

  roSib = new ResizeObserver(() =>
    fitOverlayFill(sibOv, mainImg)
  );

  roSib.observe(mainImg);
  roSib.observe(mainImg.parentElement);

  return;
}

        /* ==========================================
           CASO FANART (doble nivel)
        ========================================== */
        if (key === "FANART") {
          const nivel = window.fanartNivel || 1;

          const file = nivel === 1
            ? "FANART_NIVEL1_Check.png"
            : "FANART_NIVEL2_Check.png";

          const srcB = `${OVERLAY_BASE}/${file}`;

          // --- Overlay base (actúa como checker principal)
          baseOv.onerror = () => {
            lastFailBase = srcB;
            baseOv.style.display = "none";
          };

          baseOv.onload = () => {
            if (!isLive(mainImg)) return;
            if (lastFailBase === srcB) lastFailBase = "";
            fitOverlayFill(baseOv, mainImg);
          };

          if (baseOv.getAttribute("src") !== srcB)
            baseOv.setAttribute("src", srcB);

          fitOverlayFill(baseOv, mainImg);
          baseOv.style.display = "";

          // --- FANART no usa segundo overlay
          sibOv.removeAttribute("src");
          sibOv.style.display = "none";

          // --- Observers solo para base
          disconnectObservers();

          roBase = new ResizeObserver(() =>
            fitOverlayFill(baseOv, mainImg)
          );

          roBase.observe(mainImg);
          roBase.observe(mainImg.parentElement);

          return;
        }

        /* ==========================================
           CASO FANART_MOVIL (overlay más alto)
        ========================================== */
        if (key === "FANART_MOVIL") {
          const file = KEY_TO_OVERLAY.get("FANART_MOVIL");

          if (file) {
            const srcB = `${OVERLAY_BASE}/${file}`;

            baseOv.onerror = () => {
              lastFailBase = srcB;
              baseOv.style.display = "none";
            };

            baseOv.onload = () => {
              if (!isLive(mainImg)) return;
              if (lastFailBase === srcB) lastFailBase = "";
              fitOverlayFanartMovil(baseOv, mainImg);
            };

            if (baseOv.getAttribute("src") !== srcB)
              baseOv.setAttribute("src", srcB);

            fitOverlayFanartMovil(baseOv, mainImg);
            baseOv.style.display = "";
          }

          // FANART_MOVIL no usa segundo overlay
          sibOv.removeAttribute("src");
          sibOv.style.display = "none";

          // Observers solo para el base, recalculando en resize
          disconnectObservers();

          roBase = new ResizeObserver(() =>
            fitOverlayFanartMovil(baseOv, mainImg)
          );

          roBase.observe(mainImg);
          roBase.observe(mainImg.parentElement);

          return;
        }

        /* ==========================================
           CASO WEB (mockup + imagen escalada + checker)
        ========================================== */
        if (key === "WEB") {
          const checkerFile = KEY_TO_OVERLAY.get("WEB");
          const mockupFile = "WEB_MOCKUP.png";

          // Crear overlay para el mockup WEB
          const webMockupOv = ensureOverlayRole(mainImg, "web-mockup");

          // --- Cargar mockup WEB ---
          const mockupSrc = `${OVERLAY_BASE}/${mockupFile}`;

          webMockupOv.onerror = () => {
            webMockupOv.style.display = "none";
          };

          webMockupOv.onload = () => {
            if (!isLive(mainImg)) return;
            fitOverlayWebMockup(webMockupOv, mainImg, baseOv);
          };

          if (webMockupOv.getAttribute("src") !== mockupSrc)
            webMockupOv.setAttribute("src", mockupSrc);

          webMockupOv.style.display = "";

          // --- Cargar checker WEB (baseOv) ---
          if (checkerFile) {
            const checkerSrc = `${OVERLAY_BASE}/${checkerFile}`;

            baseOv.onerror = () => {
              lastFailBase = checkerSrc;
              baseOv.style.display = "none";
            };

            baseOv.onload = () => {
              if (!isLive(mainImg)) return;
              if (lastFailBase === checkerSrc) lastFailBase = "";
              fitOverlayWebMockup(webMockupOv, mainImg, baseOv);
            };

            if (baseOv.getAttribute("src") !== checkerSrc)
              baseOv.setAttribute("src", checkerSrc);

            baseOv.style.display = "";
          }

          // No usamos sibOv en WEB
          sibOv.removeAttribute("src");
          sibOv.style.display = "none";

          // Primera colocación
          fitOverlayWebMockup(webMockupOv, mainImg, baseOv);

          // Observers
          disconnectObservers();

          roBase = new ResizeObserver(() =>
            fitOverlayWebMockup(webMockupOv, mainImg, baseOv)
          );

          roBase.observe(mainImg);
          roBase.observe(mainImg.parentElement);

          // Mostrar switches: MOCKUP (webMockupSwitch) y ZONA DE SEGURIDAD (mockupSwitch)
          if (webMockupSwitch) {
            webMockupSwitch.style.display = "inline-flex";
          }
          if (mockupSwitch) {
            mockupSwitch.style.display = "inline-flex";
            mockupText.textContent = "ZONA DE SEGURIDAD";
          }
          if (txtSwitch) {
            txtSwitch.style.display = "none";
          }

          return;
        }

        /* ==========================================
           CASO GENERAL (overlays simples)
        ========================================== */
        const file = KEY_TO_OVERLAY.get(key);

        if (file) {
          const src = `${OVERLAY_BASE}/${file}`;

          baseOv.onerror = () => {
            lastFailBase = src;
            baseOv.style.display = "none";
          };

          baseOv.onload = () => {
            if (!isLive(mainImg)) return;
            if (lastFailBase === src) lastFailBase = "";
            fitOverlayFill(baseOv, mainImg);
          };

          if (baseOv.getAttribute("src") !== src)
            baseOv.setAttribute("src", src);

          fitOverlayFill(baseOv, mainImg);
          baseOv.style.display = "";
        }

        sibOv.removeAttribute("src");
        sibOv.style.display = "none";

        disconnectObservers();

        roBase = new ResizeObserver(() =>
          fitOverlayFill(baseOv, mainImg)
        );

        roBase.observe(mainImg);
        roBase.observe(mainImg.parentElement);

        if (typeof refreshSwitchVisibility === "function")
          refreshSwitchVisibility();
      }

      const deb = (fn, ms = 0) => {
        let t;
        return () => {
          clearTimeout(t);
          t = setTimeout(fn, ms);
        };
      };

      const safeUpdate = deb(update, 0);

      new MutationObserver(() => safeUpdate()).observe(
        document.body,
        {
          subtree: true,
          childList: true,
          attributes: true,
          attributeFilter: ["class", "style", "src", "aria-hidden", "aria-modal"]
        }
      );

      document.addEventListener("click", () => safeUpdate(), true);
      window.addEventListener("resize", () => safeUpdate());
      document.addEventListener("v19-refresh", () => safeUpdate(), true);

      safeUpdate();
    })();