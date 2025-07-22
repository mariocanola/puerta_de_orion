document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("contenedor-formulario");

  // Cargar el HTML del formulario
  fetch("../Componentes/formulario-deportista.html")
    .then(response => {
      if (!response.ok) {
        throw new Error("No se pudo cargar el formulario del deportista.");
      }
      return response.text();
    })
    .then(html => {
      contenedor.innerHTML = html;

      const secciones = document.querySelectorAll(".seccion-formulario");
      let indiceActual = 0;

      function mostrarSeccion(index) {
        secciones.forEach((seccion, i) => {
          seccion.classList.toggle("activa", i === index);
        });
      }

      // Botones siguiente
      document.querySelectorAll(".siguiente").forEach(boton => {
        boton.addEventListener("click", () => {
          if (indiceActual < secciones.length - 1) {
            indiceActual++;
            mostrarSeccion(indiceActual);
          }
        });
      });

      // Botones anterior
      document.querySelectorAll(".anterior").forEach(boton => {
        boton.addEventListener("click", () => {
          if (indiceActual > 0) {
            indiceActual--;
            mostrarSeccion(indiceActual);
          }
        });
      });

      // Mostrar la primera sección al cargar
      mostrarSeccion(indiceActual);
    })
    .catch(error => {
      console.error("Error al cargar el formulario:", error);
      contenedor.innerHTML = "<p>Error al cargar el formulario.</p>";
    });
});
