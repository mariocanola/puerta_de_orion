export function cargarFormularioDeportista() {
  const contenedorFormulario = document.getElementById("contenedor-formulario");

  fetch("Componentes/formulario-deportista.html")
    .then(res => res.text())
    .then(html => {
      contenedorFormulario.innerHTML = html;

      // Esperar a que el HTML se inserte antes de cargar el comportamiento del formulario
      const script = document.createElement("script");
      script.src = "../JS/formulario-deportista.js";
      script.defer = true;
      document.body.appendChild(script);
    })
    .catch(err => {
      console.error("Error cargando el formulario del deportista:", err);
    });
}
