document.addEventListener('DOMContentLoaded', () => {
  fetch('../Componentes/roles-usuarios.html')
    .then(response => response.text())
    .then(html => {
      document.body.insertAdjacentHTML('beforeend', html);

      // Lista de roles con iconos Font Awesome
      const roles = [
        { nombre: 'Deportista', icono: 'fas fa-running' },
        { nombre: 'Acudiente', icono: 'fa-solid fa-user-group' },
        { nombre: 'Entrenador', icono: 'fa-solid fa-chalkboard-user' },
        { nombre: 'Administrador', icono: 'fa-solid fa-user-gear' }
      ];

      const contenedorTarjetas = document.querySelector('.tarjetas');
      contenedorTarjetas.innerHTML = '';

      roles.forEach(rol => {
        const tarjeta = document.createElement('div');
        tarjeta.classList.add('sub-contenedor');

        tarjeta.innerHTML = `
          <div class="icono-rol">
            <i class="${rol.icono}"></i>
          </div>
          <h1 class="sub-titulo">${rol.nombre}</h1>
        `;

        contenedorTarjetas.appendChild(tarjeta);
      });
    })
    .catch(error => console.error('Error al cargar roles:', error));
});
