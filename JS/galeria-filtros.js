document.addEventListener('DOMContentLoaded', () => {
    const filtroCategoria = document.getElementById('filtro-categoria');
    const filtroNombre = document.getElementById('filtro-nombre');
    const tarjetas = document.querySelectorAll('.tarjeta.evento');

    function filtrar() {
        const categoria = filtroCategoria.value.trim();
        const nombre = filtroNombre.value.trim().toLowerCase();

        tarjetas.forEach(tarjeta => {
            const cat = tarjeta.getAttribute('data-categoria');
            const nom = tarjeta.getAttribute('data-nombre').toLowerCase();

            const coincideCategoria = !categoria || cat === categoria;
            const coincideNombre = !nombre || nom.includes(nombre);

            if (coincideCategoria && coincideNombre) {
                tarjeta.style.display = '';
            } else {
                tarjeta.style.display = 'none';
            }
        });
    }

    // Initialize filters
    if (filtroCategoria && filtroNombre) {
        filtroCategoria.addEventListener('change', filtrar);
        filtroNombre.addEventListener('input', filtrar);
        
        // Trigger filter on page load in case there are URL parameters
        filtrar();
    } else {
        console.error('No se encontraron los elementos de filtrado');
    }
});