document.addEventListener('DOMContentLoaded', () => {
  fetch('../Componentes/tarjeta-perfil.html')
    .then(res => res.text())
    .then(html => {
      document.getElementById('contenedor-tarjeta-perfil').innerHTML = html;

      // Obtener el rol desde el body
      const rol = document.body.getAttribute('data-rol') || 'Usuario';

      // Cambiar el texto <h2>
      const titulo = document.getElementById('titulo-rol');
      if (titulo) titulo.textContent = rol;

      // Cambiar la imagen según el rol (opcional)
      const img = document.querySelector('.imagen-usuario img');
      if (img) {
        const imagenesPorRol = {
          Aspirante: '../imgs/user.png',
          Entrenador: '../imgs/user.png',
          Administrador: '../imgs/user.png',
          Acudiente: '../imgs/user.png',
          Deportista: '../imgs/user.png'
        };

        img.src = imagenesPorRol[rol] || '../imgs/image.png'; // default
      }
    });
});