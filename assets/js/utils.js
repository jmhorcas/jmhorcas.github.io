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
    const header = document.getElementById('main-header');
    const menuBtn = document.getElementById('toggle-navigation-menu');

    if (menuBtn && header) {
        menuBtn.addEventListener('click', function() {
            const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
            
            // 1. Cambiamos el estado del botón
            menuBtn.setAttribute('aria-expanded', !isExpanded);
            
            // 2. Añadimos la clase al header para que el CSS muestre el menú
            header.classList.toggle('menu-open');
            
            // 3. Bloqueamos el scroll del cuerpo (tienes soporte para esto en tu CSS)
            document.body.classList.toggle('menu-open');
        });
    }
});


function updateCounts() {
  // 1. Contamos elementos del Nivel 1 (Generales)
  const total = document.querySelectorAll('.timeline-item').length;
  const journals = document.querySelectorAll('.timeline-item.journal').length;
  const others = document.querySelectorAll('.timeline-item.other').length;
  
  // 2. Contamos elementos del Nivel 2 (Conferencias)
  const internationalConferences = document.querySelectorAll('.timeline-item.international-conference').length;
  const nationalConferences = document.querySelectorAll('.timeline-item.national-conference').length;
  const workshop = document.querySelectorAll('.timeline-item.workshop').length;
  const totalConferences = internationalConferences + nationalConferences + workshop;

  // 3. Contamos elementos del Nivel 3 (Tracks de Internacionales)
  // Usamos selectores combinados para asegurar que solo contamos tracks internacionales
  const main = document.querySelectorAll('.timeline-item.international-conference.main').length;
  const short = document.querySelectorAll('.timeline-item.international-conference.short').length;
  const tutorial = document.querySelectorAll('.timeline-item.international-conference.tutorial').length;
  const industrial = document.querySelectorAll('.timeline-item.international-conference.industrial').length;
  const tool = document.querySelectorAll('.timeline-item.international-conference.tool').length;
  const phdSymposium = document.querySelectorAll('.timeline-item.international-conference.phd-symposium').length;
  // Si tienes symposium, añádelo igual: .international-conference.symposium

  // 4. Actualizamos los spans en el HTML
  // Nivel 1
  document.getElementById('count-all').textContent = total;
  document.getElementById('count-journal').textContent = journals;
  document.getElementById('count-conference').textContent = totalConferences;
  document.getElementById('count-other').textContent = others;

  // Nivel 2
  document.getElementById('count-international-conference').textContent = internationalConferences;
  document.getElementById('count-national-conference').textContent = nationalConferences;

  // Nivel 3
  document.getElementById('count-main').textContent = main;
  document.getElementById('count-workshop').textContent = workshop;
  document.getElementById('count-short').textContent = short;
  document.getElementById('count-tutorial').textContent = tutorial;
  document.getElementById('count-industrial').textContent = industrial;
  document.getElementById('count-tool').textContent = tool;
  document.getElementById('count-phd-symposium').textContent = phdSymposium;
}


function filterPubs(type) {
  const items = document.querySelectorAll('.timeline-item');
  const groups = document.querySelectorAll('.timeline-year-group');
  const subConfs = document.getElementById('subfilter-confs');
  const subTracks = document.getElementById('subfilter-tracks');

  // 1. CONTROL DE VISIBILIDAD DE PANELES (Cascada)
  const isAConferenceAction = (type === 'conference' || type === 'international-conference' || type === 'national-conference' || type === 'workshop' || isTrack(type));
  const isAnInternationalAction = (type === 'international-conference' || isTrack(type));

  subConfs.style.display = isAConferenceAction ? 'flex' : 'none';
  subTracks.style.display = isAnInternationalAction ? 'flex' : 'none';

  // 2. LÓGICA DE FILTRADO DE PUBLICACIONES
  items.forEach(item => {
    if (type === 'all') {
      item.style.display = 'flex';
    } 
    else if (type === 'conference') {
      // Mostrar cualquier conferencia (nacional o internacional)
      const isAnyConf = item.classList.contains('international-conference') || item.classList.contains('national-conference') || item.classList.contains('workshop');
      item.style.display = isAnyConf ? 'flex' : 'none';
    } 
    else if (type === 'international-conference') {
      // Mostrar TODAS las internacionales (resetea el filtro de tracks visualmente)
      item.style.display = item.classList.contains('international-conference') ? 'flex' : 'none';
    }
    else if (isTrack(type)) {
      // ESTA ES LA CLAVE: Para que el track solo afecte a las internacionales
      // El item debe tener la clase del track (ej. 'tool') Y 'international-conference'
      const matchesTrack = item.classList.contains(type);
      const isInternational = item.classList.contains('international-conference');
      
      item.style.display = (matchesTrack && isInternational) ? 'flex' : 'none';
    }
    else {
      // Otros filtros directos: 'journal', 'other', 'national-conference'
      item.style.display = item.classList.contains(type) ? 'flex' : 'none';
    }
  });

  // 3. OCULTAR AÑOS VACÍOS
  groups.forEach(group => {
    const hasVisible = Array.from(group.querySelectorAll('.timeline-item'))
                            .some(i => i.style.display !== 'none');
    group.style.display = hasVisible ? 'block' : 'none';
  });
}

// Función auxiliar para detectar si es un track
function isTrack(type) {
  const tracks = ['main', 'short', 'industrial', 'tool', 'tutorial', 'phd-symposium'];
  return tracks.includes(type);
}

// Ejecutar el conteo nada más cargar la página
document.addEventListener("DOMContentLoaded", updateCounts);