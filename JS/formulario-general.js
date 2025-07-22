document.addEventListener("DOMContentLoaded", async () => {
    const contenedor = document.getElementById("contenedor-formulario");
    if (contenedor) {
        const respuesta = await fetch("../Componentes/formulario-general.html");
        const html = await respuesta.text();
        contenedor.innerHTML = html;
    }
});