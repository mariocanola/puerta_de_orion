// Funcionalidad para la vista de inicio
document.addEventListener('DOMContentLoaded', () => {
	// Funcionalidad para los botones de categoría
	const botonesCategoria = document.querySelectorAll('.btn-categoria');
	botonesCategoria.forEach((boton, index) => {
		boton.addEventListener('click', () => {
			console.log(`Botón Categoria ${index + 1} clickeado`);
			// Aquí se puede agregar la funcionalidad específica para cada categoría
		});
	});

	// Funcionalidad para el icono de usuario
	const iconoUsuario = document.querySelector('.usuario-icono');
	if (iconoUsuario) {
		iconoUsuario.addEventListener('click', () => {
			console.log('Icono de usuario clickeado');
			// Aquí se puede agregar la funcionalidad del perfil de usuario
		});
	}

	// Funcionalidad para los botones principales
	const botonesPrincipales = document.querySelectorAll('.btn-principal');
	botonesPrincipales.forEach((boton, index) => {
		boton.addEventListener('click', () => {
			console.log(`Botón ${index + 1} clickeado`);
			// Aquí se puede agregar la funcionalidad específica para cada botón
		});
	});

	// Funcionalidad para las tarjetas
	const tarjetas = document.querySelectorAll('.tarjeta');
	tarjetas.forEach((tarjeta, index) => {
		tarjeta.addEventListener('click', () => {
			console.log(`Tarjeta ${index + 1} clickeada`);
			// Aquí se puede agregar la funcionalidad específica para cada tarjeta
		});
	});

	// Efecto de carga para las tarjetas
	setTimeout(() => {
		tarjetas.forEach((tarjeta, index) => {
			setTimeout(() => {
				tarjeta.style.opacity = '1';
				tarjeta.style.transform = 'translateY(0)';
			}, index * 100);
		});
	}, 500);
});

// Función para actualizar el contenido dinámicamente
function actualizarContenido() {
	// Aquí se puede agregar lógica para actualizar el contenido de las tarjetas
	console.log('Contenido actualizado');
}

// Función para manejar la navegación
function navegarA(seccion) {
	console.log(`Navegando a: ${seccion}`);
	// Aquí se puede agregar la lógica de navegación
} 