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
          Aspirante: '../imgs/user2.png',
          Entrenador: '../imgs/user2.png',
          Administrador: '../imgs/user2.png',
          Acudiente: '../imgs/user2.png',
          Deportista: '../imgs/user2.png'
        };

        img.src = imagenesPorRol[rol] || '../imgs/user2.png'; // default
      }
    });
});