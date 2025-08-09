document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("tabla-mensualidades");
  const url = contenedor.dataset.url;

  fetch(url)
    .then(res => res.text())
    .then(html => {
      contenedor.innerHTML = html;
    })
    .catch(err => {
      console.error("❌ Error al cargar el logo:", err);
    });
});