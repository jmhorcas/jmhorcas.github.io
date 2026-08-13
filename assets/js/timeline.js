/* ==========================================================================
   TIMELINE.JS - Unificado (Filtros, Swiper, Fechas, Modales y BibTeX)
   ========================================================================== */

/* --------------------------------------------------------------------------
   1. Cálculo de fechas y duración
   -------------------------------------------------------------------------- */
const ProjectUtils = (function() {
    const formatDate = (dateStr, lang, options = {}) => {
        if (!dateStr) return "";
        const date = dateStr === 'now' ? new Date() : new Date(dateStr);
        
        const defaultOptions = {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        };

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

            // Formatear las fechas visibles
            container.querySelectorAll('.format-date').forEach(el => {
                const dateToFormat = el.getAttribute('data-date');
                const formatType = el.getAttribute('data-format');
                let options = {};
                if (formatType === 'month-year') {
                    options = { day: undefined, month: 'short', year: 'numeric' };
                }
                el.innerText = formatDate(dateToFormat, lang, options);
            });

            // Calcular y mostrar duración
            const display = container.querySelector('.duration-display');
            const durationText = calculateDuration(startStr, endStr, lang);
            if (display) display.innerText = durationText;
        });
    };

    return { init };
})();

/* --------------------------------------------------------------------------
   2. Sistema Genérico de Filtros Jerárquicos
   -------------------------------------------------------------------------- */
function filterTimeline(targetCategory) {
    const items = document.querySelectorAll('.timeline-item');
    const groups = document.querySelectorAll('.timeline-year-group');
    const targetCategories = targetCategory.split(',').map(c => c.trim().toLowerCase());

    // 1. Filtrar los elementos del timeline
    items.forEach(item => {
        const itemCat = (item.getAttribute('data-category') || '').toLowerCase();
        const itemTokens = itemCat.split(/\s+/);

        if (targetCategory === 'all') {
            item.style.display = '';
        } else {
            const isMatch = targetCategories.some(cat => itemTokens.includes(cat));
            item.style.display = isMatch ? '' : 'none';
        }
    });

    // 2. Gestionar la visibilidad de los subfiltros en cascada estricta
    const subContainers = document.querySelectorAll('.sub-container[data-show-on]');

    // Empezamos únicamente con la selección activa del Nivel 1 (Principal) y la categoría pulsada
    const mainLevelChecked = document.querySelector('.filter-container:not(.sub-container) input[type="radio"]:checked');
    const mainValue = mainLevelChecked ? mainLevelChecked.value.toLowerCase() : 'all';

    let activeCategories = [targetCategory.toLowerCase(), mainValue];

    subContainers.forEach(container => {
        const triggers = container.getAttribute('data-show-on').split(',').map(c => c.trim().toLowerCase());

        // Comprobamos si las categorías activas hasta este punto autorizan mostrar el panel
        const shouldShow = activeCategories.some(cat => triggers.includes(cat));

        if (shouldShow) {
            container.style.display = '';

            // Como este panel ES VISIBLE, añadimos su radio marcado al contexto para los siguientes niveles inferiores
            const activeRadio = container.querySelector('input[type="radio"]:checked');
            if (activeRadio) {
                activeCategories.push(activeRadio.value.toLowerCase());
            }
        } else {
            container.style.display = 'none';

            // Como este panel SE OCULTA, reseteamos sus radios al valor por defecto del HTML
            const defaultRadio = container.querySelector('input[type="radio"][checked]') || container.querySelector('input[type="radio"]');
            if (defaultRadio) {
                const radiosInContainer = container.querySelectorAll('input[type="radio"]');
                radiosInContainer.forEach(r => r.checked = false);
                defaultRadio.checked = true;
            }
        }
    });

    // 3. Ocultar contenedores de años vacíos
    groups.forEach(group => {
        const hasVisible = Array.from(
            group.querySelectorAll('.timeline-item')
        ).some(item => item.style.display !== 'none');

        group.style.display = hasVisible ? '' : 'none';
    });

    // 4. Actualizar contadores
    updateTimelineCounts();
}

/* --------------------------------------------------------------------------
   3. Actualización Contextual de Contadores (Badges)
   -------------------------------------------------------------------------- */
function updateTimelineCounts() {
    const items = document.querySelectorAll('.timeline-item');
    const countBadges = document.querySelectorAll('[data-count]');

    // Obtenemos qué categorías están activas en los botones radio seleccionados
    const activeCheckedValues = Array.from(document.querySelectorAll('input[type="radio"]:checked'))
                                     .map(r => r.value.toLowerCase())
                                     .filter(v => v !== 'all');

    countBadges.forEach(badge => {
        const categories = badge.getAttribute('data-count').split(',').map(c => c.trim().toLowerCase());

        if (categories.includes('all')) {
            badge.textContent = items.length;
            return;
        }

        let matchCount = 0;

        items.forEach(item => {
            const itemCat = (item.getAttribute('data-category') || '').toLowerCase();
            const itemTokens = itemCat.split(/\s+/);

            // 1. ¿El item tiene la categoría que indica este badge?
            const matchesBadge = categories.some(cat => itemTokens.includes(cat));
            if (!matchesBadge) return;

            // 2. Comprobamos el contenedor al que pertenece este badge
            const parentContainer = badge.closest('.filter-container');
            const isSubContainer = parentContainer && parentContainer.classList.contains('sub-container');

            if (isSubContainer) {
                // Obtenemos los desencadenantes (padres) de este panel
                const triggers = parentContainer.getAttribute('data-show-on')
                    ? parentContainer.getAttribute('data-show-on').split(',').map(c => c.trim().toLowerCase())
                    : [];

                // Verificamos si hay un filtro superior activo aplicable a este panel
                const activeParentFilter = activeCheckedValues.find(val => triggers.includes(val));

                // Si hay un filtro padre activo (ej. 'international-conference'), el item debe tenerlo también
                if (activeParentFilter && !itemTokens.includes(activeParentFilter)) {
                    return;
                }
            }

            matchCount++;
        });

        badge.textContent = matchCount;
    });
}


/* --------------------------------------------------------------------------
   4. Inicialización de Swiper (Galería de Imágenes)
   -------------------------------------------------------------------------- */
function initTimelineSwiper() {
    document.querySelectorAll(".award-swiper").forEach(function (swiperEl) {
        const slideCount = swiperEl.querySelectorAll('.swiper-slide').length;

        new Swiper(swiperEl, {
            loop: slideCount > 1,
            slidesPerView: 1,
            // Permite a Swiper re-calcular el layout automáticamente cuando CSS termina de cargar
            observer: true,
            observeParents: true,
            navigation: {
                nextEl: swiperEl.querySelector(".swiper-button-next"),
                prevEl: swiperEl.querySelector(".swiper-button-prev"),
            },
        });
    });
}
/* --------------------------------------------------------------------------
   5. Diálogos de Imágenes y Toast Notifications
   -------------------------------------------------------------------------- */
function showImage(src) {
    const dialogImg = document.getElementById("dialog-image");
    const dialog = document.getElementById("image-dialog");
    if (dialogImg && dialog) {
        dialogImg.src = src;
        dialog.showModal();
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

/* --------------------------------------------------------------------------
   6. Acciones de Copiado (Reference y BibTeX)
   -------------------------------------------------------------------------- */
function copyReference(id) {
    const refElem = document.getElementById("reference-" + id);
    if (!refElem) return;
    
    const text = refElem.innerText.trim();
    navigator.clipboard.writeText(text)
        .then(() => showToast("✓ Reference copied"))
        .catch(console.error);
}

let bibDatabase = null;

async function loadBib() {
    if (bibDatabase !== null) return bibDatabase;
    const response = await fetch("/assets/bib/publications.bib");
    bibDatabase = await response.text();
    return bibDatabase;
}

async function copyBibtex(id) {
    try {
        const bib = await loadBib();
        const escaped = id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const regex = new RegExp("@\\w+\\s*\\{\\s*" + escaped + "\\s*,([\\s\\S]*?)\\n\\}", "m");
        const match = bib.match(regex);

        if (!match) {
            alert("BibTeX entry not found.");
            return;
        }

        await navigator.clipboard.writeText(match[0]);
        showToast("✓ BibTeX copied");
    } catch (err) {
        console.error(err);
    }
}

/* --------------------------------------------------------------------------
   7. Disparador Global DOMContentLoaded
   -------------------------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
    ProjectUtils.init();
    initTimelineSwiper();
    updateTimelineCounts();
});