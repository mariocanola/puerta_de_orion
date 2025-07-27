document.addEventListener("DOMContentLoaded", async () => {
  const contenedor = document.getElementById("formulario-general");

  if (!contenedor) {
    console.error("No se encontró el contenedor con id formulario-general.");
    return;
  }

  const urlFormulario = contenedor.dataset.url;

  if (!urlFormulario) {
    console.error("No se encontró el atributo data-url en el contenedor.");
    return;
  }

  try {
    const respuesta = await fetch(urlFormulario);
    if (!respuesta.ok) throw new Error("No se pudo cargar el formulario.");

    const html = await respuesta.text();
    contenedor.innerHTML = html;
  } catch (error) {
    console.error("Error al cargar el formulario:", error);
    contenedor.innerHTML = "<p>Error al cargar el formulario.</p>";
  }
});