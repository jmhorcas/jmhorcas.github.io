/**
 * Utils.js - Cálculo de duración simplificado
 */
const ProjectUtils = (function() {
    
    const formatDate = (dateStr, lang, options = {}) => {
        if (!dateStr) return "";
        const date = dateStr === 'now' ? new Date() : new Date(dateStr);
        
        // Configuración por defecto (la que ya usas)
        const defaultOptions = {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        };

        // Combinamos las opciones: si pasas unas nuevas, ganan las nuevas
        const finalOptions = Object.assign({}, defaultOptions, options);

        return new Intl.DateTimeFormat(lang, finalOptions).format(date);
    };

    const calculateDuration = (startStr, endStr, lang) => {
        const start = new Date(startStr);
        const end = new Date(endStr);
        
        let years = end.getFullYear() - start.getFullYear();
        let months = end.getMonth() - start.getMonth();

        if (months < 0) {
            years--;
            months += 12;
        }

        const labels = {
            es: { yr: "año", yrs: "años", mo: "mes", mos: "meses", and: " y ", less: "menos de 1 mes" },
            en: { yr: "year", yrs: "years", mo: "month", mos: "months", and: " and ", less: "less than 1 month" }
        };

        const t = labels[lang] || labels.en;
        let parts = [];

        if (years > 0) parts.push(years === 1 ? `1 ${t.yr}` : `${years} ${t.yrs}`);
        if (months > 0) parts.push(months === 1 ? `1 ${t.mo}` : `${months} ${t.mos}`);
        
        return parts.length > 0 ? parts.join(t.and) : t.less;
    };

    const init = () => {
        document.querySelectorAll('.duration-container').forEach(container => {
            const lang = container.getAttribute('data-lang') || 'en';
            const startStr = container.getAttribute('data-start');
            const endStr = container.getAttribute('data-end') || 'now';

            // 1. Formatear las fechas visibles (Traducción de meses)
            container.querySelectorAll('.format-date').forEach(el => {
                const dateToFormat = el.getAttribute('data-date');
                const formatType = el.getAttribute('data-format');
                let options = {};
                if (formatType === 'month-year') {
                    options = { day: undefined, month: 'short', year: 'numeric' };
                }
                el.innerText = formatDate(dateToFormat, lang, options);
            });

            // 2. Calcular y mostrar duración
            const display = container.querySelector('.duration-display');
            const durationText = calculateDuration(startStr, endStr, lang);
            if (display) display.innerText = durationText;
        });
    };

    return { init };
})();

document.addEventListener("DOMContentLoaded", ProjectUtils.init);

// Carga swiper para el slider de imágenes
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".award-swiper").forEach(function (swiperEl) {
    new Swiper(swiperEl, {
      loop: true,
      navigation: {
        nextEl: swiperEl.querySelector(".swiper-button-next"),
        prevEl: swiperEl.querySelector(".swiper-button-prev"),
      },
    });
  });
});

function showImage(src) {
    document.getElementById("dialog-image").src = src;
    document.getElementById("image-dialog").showModal();
}

function copyReference(id) {
  const text = document.getElementById("reference-" + id).innerText.trim();

   navigator.clipboard.writeText(text)
    .then(() => showToast("✓ Reference copied"))
    .catch(console.error);
}

let bibDatabase = null;

async function loadBib() {

    if (bibDatabase !== null)
        return bibDatabase;

    const response = await fetch("/assets/bib/publications.bib");

    bibDatabase = await response.text();

    return bibDatabase;
}

async function copyBibtex(id){

    const bib = await loadBib();

    const escaped = id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    const regex = new RegExp(
        "@\\w+\\s*\\{\\s*" + escaped + "\\s*,([\\s\\S]*?)\\n\\}",
        "m"
    );

    const match = bib.match(regex);

    if(!match){

        alert("BibTeX entry not found.");

        return;
    }

    const entry = match[0];

    try {
      await navigator.clipboard.writeText(entry);
      showToast("✓ BibTeX copied");
    }
    catch (err) {
        console.error(err);
    }
}

function showToast(message) {

    let toast = document.getElementById("toast");

    if (!toast) {
        toast = document.createElement("div");
        toast.id = "toast";
        toast.className = "toast";
        document.body.appendChild(toast);
    }

    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(toast.timer);

    toast.timer = setTimeout(() => {
        toast.classList.remove("show");
    }, 1800);
}

