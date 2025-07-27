document.addEventListener("DOMContentLoaded", async () => {
    const contenedor = document.getElementById("contenedor-tarjeta-acudiente");
    const rol = document.body.dataset.rol;

    if (!contenedor || !(rol === "Acudiente" || rol === "Deportista")) return;

    try {
        const respuesta = await fetch("../Componentes/tarjeta-acudientes-acudidos.html");
        const html = await respuesta.text();
        contenedor.innerHTML = html; // usar "=" no "+=" para evitar duplicados

        // Cambiar título dinámicamente
        const titulo = document.getElementById("titulo-acudiente");
        titulo.textContent = rol === "Deportista" ? "Acudientes" : "Acudidos";

        // Datos simulados
        const personas = rol === "Deportista"
            ? [
                { nombre: "Pedro Ramírez (Acudiente)" },
                { nombre: "Laura Torres (Acudiente)" }
              ]
            : [
                { nombre: "Kevin Santiago Prada Castellanos" },
                { nombre: "María Fernanda Ruiz Pérez" }
              ];

        const lista = document.getElementById("lista-acudidos");

        personas.forEach(persona => {
            const item = document.createElement("div");
            item.classList.add("contenido-acudiente");
            item.innerHTML = `
                <div class="imagen-acudiente">
                    <img src="../imgs/user.png" alt="user">
                </div>
                <input type="text" value="${persona.nombre}" readonly>
                <button class="boton-acudiente">Ver</button>
            `;
            lista.appendChild(item);
        });

    } catch (error) {
        console.error("❌ Error cargando tarjeta:", error);
    }
});