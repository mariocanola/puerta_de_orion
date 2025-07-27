document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("formulario-deportista");

  if (!contenedor || !contenedor.dataset.url) {
    console.error("No se encontró el contenedor o el atributo data-url.");
    return;
  }

  const urlFormulario = contenedor.dataset.url;

  fetch(urlFormulario)
    .then(response => {
      if (!response.ok) {
        throw new Error("No se pudo cargar el formulario del deportista.");
      }
      return response.text();
    })
    .then(html => {
      contenedor.innerHTML = html;

      const secciones = contenedor.querySelectorAll(".seccion-formulario");
      if (secciones.length > 0) {
        let indiceActual = 0;

        function mostrarSeccion(index) {
          secciones.forEach((seccion, i) => {
            seccion.classList.toggle("activa", i === index);
          });
        }

        contenedor.querySelectorAll(".siguiente").forEach(boton => {
          boton.addEventListener("click", () => {
            if (indiceActual < secciones.length - 1) {
              indiceActual++;
              mostrarSeccion(indiceActual);
            }
          });
        });

        contenedor.querySelectorAll(".anterior").forEach(boton => {
          boton.addEventListener("click", () => {
            if (indiceActual > 0) {
              indiceActual--;
              mostrarSeccion(indiceActual);
            }
          });
        });

        mostrarSeccion(indiceActual);
      }

      // Mostrar u ocultar campos condicionales
      function setupToggle(radioName, campoId) {
        const radios = contenedor.querySelectorAll(`input[name="${radioName}"]`);
        const campo = contenedor.querySelector(`#${campoId}`);
        if (!campo) return;

        radios.forEach(radio => {
          radio.addEventListener("change", () => {
            campo.style.display = (radio.value === "si" && radio.checked) ? "block" : "none";
          });
        });
      }

      setupToggle("recomendacion-medica", "campo-recomendacion-medica");
      setupToggle("deporte", "campo-deporte");
      setupToggle("escuela-formacion", "campo-escuela-formacion");
    })
    .catch(error => {
      console.error("Error al cargar el formulario del deportista:", error);
      contenedor.innerHTML = "<p>Error al cargar el formulario del deportista.</p>";
    });
});
