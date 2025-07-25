// Este es tu archivo encabezado.js completo, corregido:

document.addEventListener('DOMContentLoaded', () => {
  fetch('../Componentes/encabezado.html')
    .then(response => response.text())
    .then(html => {
      document.body.insertAdjacentHTML('afterbegin', html);

      const iconoMenu = document.querySelector('.menu-toggle');
      const menu = document.getElementById('menu');

      const sinMenu = document.body.hasAttribute('data-sin-menu');
      if (sinMenu) {
        if (iconoMenu) iconoMenu.style.display = 'none';
        if (menu) menu.style.display = 'none';
        return;
      }


      if (iconoMenu && menu) {
        iconoMenu.addEventListener('click', () => {

          if (menu.style.display === 'block') {
            menu.style.display = 'none';
          } else {
            menu.style.display = 'block';
          }
        });
      }

      // Rol dinámico
      const rol = document.body.getAttribute('data-rol');
      const menuOpciones = document.querySelector('#menu ul');
      if (!menuOpciones) return;

      menuOpciones.innerHTML = '';

      const opcionesPorRol = {
        Aspirante: [
          { texto: 'Inicio', link: '#', icono: 'fas fa-home' },
          { texto: 'Inscribirse', link: '#', icono: 'fas fa-file-signature' },
        ],
        Entrenador: [
          { texto: 'Inicio', link: '#', icono: 'fas fa-home' },
          { texto: 'Deportistas', link: '#', icono: 'fas fa-users' },
        ],
        Acudiente: [
          { texto: 'Inicio', link: '#', icono: 'fas fa-home' },
          { texto: 'Mensualidades', link: '#', icono: 'fas fa-wallet' },
        ],
        Deportista: [
          { texto: 'Inicio', link: '#', icono: 'fas fa-home' },
          { texto: 'Mensualidades', link: '#', icono: 'fas fa-wallet' },
        ],
        Admin: [
          { texto: 'Inicio', link: '#', icono: 'fas fa-home' },
          { texto: 'Deportistas', link: '#', icono: 'fas fa-users' },
          { texto: 'Mensualidades', link: '#', icono: 'fas fa-wallet' },
        ]
      };


      const opciones = opcionesPorRol[rol] || [{ texto: 'Inicio', link: '#' }];
      opciones.forEach(op => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = op.link;

        const icono = document.createElement('i');
        icono.className = op.icono + ' icono-menu'; // Puedes agregar una clase adicional si quieres estilo

        a.appendChild(icono);
        a.append(' ' + op.texto); // Espacio entre el ícono y el texto

        li.appendChild(a);
        menuOpciones.appendChild(li);
      });
    })
    .catch(error => console.error('Error al cargar encabezado:', error));
});
