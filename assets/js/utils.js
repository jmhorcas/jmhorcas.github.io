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

document.addEventListener("DOMContentLoaded", function() {
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.getElementById('navigation-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            // Alterna la clase 'active' que definimos en el CSS
            navMenu.classList.toggle('active');
            
            // Opcional: Cambiar el icono de barras a una 'X' al abrir
            const icon = menuToggle.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.replace('fa-bars', 'fa-xmark');
            } else {
                icon.classList.replace('fa-xmark', 'fa-bars');
            }
        });
    }
});