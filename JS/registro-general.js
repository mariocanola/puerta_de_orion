document.addEventListener("DOMContentLoaded", async () => {
    const contenedor = document.getElementById("registro-general");
    if (contenedor) {
        const respuesta = await fetch("../Componentes/registro-general.html");
        const html = await respuesta.text();
        contenedor.innerHTML = html;
    }
});