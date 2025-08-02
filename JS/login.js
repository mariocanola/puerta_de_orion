document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');
    const errorMessage = document.getElementById('error-message');

    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Credenciales de prueba
            const adminCredentials = {
                email: 'admin@orion.com',
                password: 'admin123'
            };

            const deportistaCredentials = {
                email: 'deportista@orion.com',
                password: 'deportista123'
            };

            // Lógica de autenticación
            if (email === adminCredentials.email && password === adminCredentials.password) {
                // Redirigir al inicio del administrador
                window.location.href = 'inicio_administrador.html';
            } else if (email === deportistaCredentials.email && password === deportistaCredentials.password) {
                // Redirigir al inicio del deportista
                window.location.href = 'inicio_deportista.html';
            } else {
                // Mostrar mensaje de error
                errorMessage.textContent = 'Correo o contraseña incorrectos.';
                errorMessage.classList.remove('d-none');
            }
        });
    }
});
