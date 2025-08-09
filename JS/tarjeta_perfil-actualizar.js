document.addEventListener('DOMContentLoaded', () => {
  fetch('../Componentes/tarjeta-perfil-actualizar.html')
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
          Aspirante: '../imgs/perfil-actualizar.png',
          Entrenador: '../imgs/perfil-actualizar.png',
          Administrador: '../imgs/perfil-actualizar.png',
          Acudiente: '../imgs/perfil-actualizar.png',
          Deportista: '../imgs/perfil-actualizar.png'
        };

        img.src = imagenesPorRol[rol] || '../imgs/perfil-actualizar.png'; // default
      }
    });
});