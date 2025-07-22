document.addEventListener("DOMContentLoaded", async () => {
    const contenedor = document.getElementById("contenedor-tarjeta-perfil");
    const rol = document.body.dataset.rol;

    if (rol === "Acudiente" || rol === "Deportista") {
        const respuesta = await fetch("../Componentes/tarjeta-acudiente.html");
        const html = await respuesta.text();
        contenedor.innerHTML += html;

        // Simulación de datos (en producción, vendría de un backend o archivo JSON)
        const acudidos = [
            { nombre: "Kevin Santiago Prada Castellanos" },
            { nombre: "María Fernanda Ruiz Pérez" }
        ];

        const lista = document.getElementById("lista-acudidos");

        acudidos.forEach(acudido => {
            const item = document.createElement("div");
            item.classList.add("contenido-acudiente");
            item.innerHTML = `
                <div class="imagen-acudiente">
                    <img src="../imgs/user.png" alt="">
                </div>
                <input type="text" value="${acudido.nombre}" readonly>
                <button class="boton-acudiente">Ver</button>
            `;
            lista.appendChild(item);
        });
    }
});
