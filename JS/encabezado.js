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
          { texto: 'Inicio', link: '#' },
          { texto: 'Inscribirse', link: '#' },
        ],
        Entrenador: [
          { texto: 'Inicio', link: '#' },
          { texto: 'Deportistas', link: '#' },
        ],
        Acudiente: [
          { texto: 'Inicio', link: '#' },
          { texto: 'Mensualidades', link: '#' }
        ],
        Deportista: [
          { texto: 'Inicio', link: '#' },
          { texto: 'Mensualidades', link: '#' }
        ],
        Admin: [
          { texto: 'Inicio', link: '#' },
          { texto: 'Deportistas', link: '#' },
          { texto: 'Mensualidades', link: '#' }
        ]
      };

      const opciones = opcionesPorRol[rol] || [{ texto: 'Inicio', link: '#' }];
      opciones.forEach(op => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = op.link;
        a.textContent = op.texto;
        li.appendChild(a);
        menuOpciones.appendChild(li);
      });
    })
    .catch(error => console.error('Error al cargar encabezado:', error));
});
