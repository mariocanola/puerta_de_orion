document.addEventListener("DOMContentLoaded", async () => {
    const contenedor = document.getElementById("contenedor-actualizar");
    if (contenedor) {
        const respuesta = await fetch("../Componentes/actualizar-perfil-general.html");
        const html = await respuesta.text();
        contenedor.innerHTML = html;
    }
});