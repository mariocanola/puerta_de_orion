document.addEventListener('DOMContentLoaded', function() {
	const calendarDays = document.getElementById('calendar-days');
	const calendarHeader = document.getElementById('calendar-title');
	const prevBtn = document.getElementById('prev-month');
	const nextBtn = document.getElementById('next-month');

	let currentDate = new Date();
	// Estructura para guardar eventos: { 'YYYY-MM-DD': 'evento' }
	let eventos = {};

	function renderCalendar(date) {
		calendarDays.innerHTML = '';
		const year = date.getFullYear();
		const month = date.getMonth();
		const firstDay = new Date(year, month, 1);
		const lastDay = new Date(year, month + 1, 0);
		const startDay = firstDay.getDay();
		const daysInMonth = lastDay.getDate();

		// Actualizar encabezado
		const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
		calendarHeader.textContent = `${meses[month]} ${year}`;

		// Espacios en blanco antes del primer día
		for (let i = 0; i < startDay; i++) {
			const empty = document.createElement('div');
			calendarDays.appendChild(empty);
		}

		// Días del mes
		for (let d = 1; d <= daysInMonth; d++) {
			const dayDiv = document.createElement('div');
			dayDiv.textContent = d;

			// Resaltar hoy
			const today = new Date();
			if (
				d === today.getDate() &&
				month === today.getMonth() &&
				year === today.getFullYear()
			) {
				dayDiv.classList.add('hoy');
			}

			// Formato clave para eventos
			const key = `${year}-${String(month+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;

			// Mostrar evento si existe
			if (eventos[key]) {
				dayDiv.classList.add('evento');
				const eventText = document.createElement('div');
				eventText.textContent = eventos[key];
				eventText.style.fontSize = '0.8rem';
				eventText.style.marginTop = '0.3rem';
				eventText.style.color = '#b45309';
				dayDiv.appendChild(eventText);
			}

			// Click para agregar evento
			dayDiv.addEventListener('click', function(e) {
				e.stopPropagation();
				const nombreEvento = prompt('Agregar evento para el día ' + d + ':');
				if (nombreEvento) {
					eventos[key] = nombreEvento;
					renderCalendar(currentDate);
				}
			});

			calendarDays.appendChild(dayDiv);
		}
	}

	prevBtn.addEventListener('click', function() {
		currentDate.setMonth(currentDate.getMonth() - 1);
		renderCalendar(currentDate);
	});

	nextBtn.addEventListener('click', function() {
		currentDate.setMonth(currentDate.getMonth() + 1);
		renderCalendar(currentDate);
	});

	renderCalendar(currentDate);
}); 