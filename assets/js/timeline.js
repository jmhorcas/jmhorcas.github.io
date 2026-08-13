/* Generic Timeline Filter Engine */
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

/* Dynamic Counter Update Contextual */
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

// Inicializar al cargar la página
document.addEventListener("DOMContentLoaded", updateTimelineCounts);