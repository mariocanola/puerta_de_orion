// Variables globales para el mapa
let map;
let marker;
let geocoder;
let directionsService;
let directionsRenderer;

document.addEventListener('DOMContentLoaded', function() {
    const calendarDays = document.getElementById('calendar-days');
    const calendarHeader = document.getElementById('calendar-title');
    const prevBtn = document.getElementById('prev-month');
    const nextBtn = document.getElementById('next-month');
    const locationPanel = document.getElementById('location-panel');
    const selectedDateSpan = document.getElementById('selected-date');
    const trainingLocationSpan = document.getElementById('training-location');
    const locationAddress = document.getElementById('location-address');
    const trainingTime = document.getElementById('training-time');
    const trainingDescription = document.getElementById('training-description');
    const locationInfo = document.getElementById('location-info');
    const scheduleForm = document.getElementById('schedule-form');
    const scheduleButtonContainer = document.getElementById('schedule-button-container');
    const scheduleTrainingBtn = document.getElementById('schedule-training');
    const trainingForm = document.getElementById('training-form');
    const cancelScheduleBtn = document.getElementById('cancel-schedule');
    const updateTrainingBtn = document.getElementById('update-training');
    const updateButtonContainer = document.getElementById('update-button-container');
    
    // Verificar si el usuario es administrador (esto debería venir de la sesión)
    const isAdmin = document.body.getAttribute('data-rol') === 'Admin';
    let selectedDateKey = '';
    let currentDate = new Date();
    let isUpdate = false;
    
    // Estructura para guardar eventos y ubicaciones
    let eventos = {};
    let ubicaciones = {
        '2025-07-15': {
            nombre: 'Sede Principal - SENA',
            direccion: 'Carrera 48 #26-85, Bogotá',
            horario: '8:00 AM - 12:00 PM',
            descripcion: 'Entrenamiento de fútbol en cancha principal'
        },
        '2025-07-20': {
            nombre: 'Cancha Alterna - Parque El Salitre',
            direccion: 'Av. Calle 63 #68-95, Bogotá',
            horario: '2:00 PM - 5:00 PM',
            descripcion: 'Entrenamiento técnico en cancha sintética'
        },
        '2025-07-25': {
            nombre: 'Estadio Metropolitano',
            direccion: 'Calle 10 #70-09, Bogotá',
            horario: '9:00 AM - 11:00 AM',
            descripcion: 'Partido amistoso - Equipo local vs Visitante'
        }
    };

    // Mostrar/ocultar formulario de programación
    function toggleScheduleForm(show, isUpdate = false) {
        if (show) {
            locationInfo.classList.add('hidden');
            scheduleForm.classList.remove('hidden');
            scheduleButtonContainer.classList.add('hidden');
            updateButtonContainer.classList.add('hidden');
            
            // Limpiar formulario si no es una actualización
            if (!isUpdate) {
                document.getElementById('training-form').reset();
                document.getElementById('location-other').classList.add('hidden');
                document.getElementById('training-other-text').classList.add('hidden');
            }
        } else {
            locationInfo.classList.remove('hidden');
            scheduleForm.classList.add('hidden');
        }
        
        isUpdate = false;
    }

    // Manejar envío del formulario
    trainingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const locationSelect = document.getElementById('location-select');
        const otherLocation = document.getElementById('location-other');
        const nombre = locationSelect.value === 'Otro' ? otherLocation.value : locationSelect.value;
        const direccion = document.getElementById('location-address-input').value;
        const horaInicio = document.getElementById('start-time').value;
        const horaFin = document.getElementById('end-time').value;
        const tipoEntrenamiento = document.querySelector('input[name="training-type"]:checked').value;
        const descripcion = document.getElementById('training-description-input')?.value || '';
        
        // Formatear el horario
        const horario = `${horaInicio} - ${horaFin}`;
        
        // Guardar la nueva ubicación
        ubicaciones[selectedDateKey] = {
            nombre: nombre,
            direccion: direccion,
            horario: horario,
            tipo: tipoEntrenamiento,
            descripcion: descripcion
        };
        
        // Actualizar la vista
        renderCalendar(currentDate);
        showLocationInfo(selectedDateKey);
        toggleScheduleForm(false);
        
        // Aquí deberías hacer una llamada al servidor para guardar los cambios
        // saveTraining(selectedDateKey, ubicaciones[selectedDateKey]);
        
        console.log('Evento guardado:', ubicaciones[selectedDateKey]);
    });
    
    // Manejar clic en el botón de modificar entrenamiento
    updateTrainingBtn.addEventListener('click', function() {
        const ubicacion = ubicaciones[selectedDateKey];
        if (!ubicacion) return;

        // Mostrar el formulario con los datos actuales
        toggleScheduleForm(true, true);
        isUpdate = true;

        // Rellenar el formulario
        const locationSelect = document.getElementById('location-select');
        const otherLocationInput = document.getElementById('location-other');
        // Comprobar si el nombre del lugar está en las opciones del select
        const optionExists = [...locationSelect.options].some(opt => opt.value === ubicacion.nombre);
        if (optionExists) {
            locationSelect.value = ubicacion.nombre;
            otherLocationInput.classList.add('hidden');
        } else {
            locationSelect.value = 'Otro';
            otherLocationInput.value = ubicacion.nombre;
            otherLocationInput.classList.remove('hidden');
        }

        document.getElementById('location-address-input').value = ubicacion.direccion;
        
        // Separar horario
        const [horaInicio, horaFin] = ubicacion.horario.split(' - ');
        document.getElementById('start-time').value = horaInicio.trim();
        document.getElementById('end-time').value = horaFin.trim();

        // Seleccionar tipo de entrenamiento
        const trainingTypeRadio = document.querySelector(`input[name="training-type"][value="${ubicacion.tipo}"]`);
        if (trainingTypeRadio) {
            trainingTypeRadio.checked = true;
        }

        // No hay descripción en el formulario actual, pero si la hubiera, se rellenaría aquí
        // document.getElementById('training-description-input').value = ubicacion.descripcion;
    });

    // Manejar cancelación del formulario
    cancelScheduleBtn.addEventListener('click', function() {
        toggleScheduleForm(false);
    });

    // Manejar clic en el botón de programar entrenamiento
    scheduleTrainingBtn.addEventListener('click', function() {
        toggleScheduleForm(true);
    });

    // Mostrar información de la ubicación
    function showLocationInfo(key) {
        selectedDateKey = key;
        const fecha = new Date(key);
        const opcionesFecha = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const fechaFormateada = fecha.toLocaleDateString('es-ES', opcionesFecha);
        
        selectedDateSpan.textContent = fechaFormateada.charAt(0).toUpperCase() + fechaFormateada.slice(1);
        
        const ubicacion = ubicaciones[key];
        if (ubicacion) {
            trainingLocationSpan.textContent = ubicacion.nombre;
            locationAddress.textContent = ubicacion.direccion;
            trainingTime.textContent = `Horario: ${ubicacion.horario}`;
            trainingDescription.textContent = ubicacion.descripcion;
            
            locationInfo.classList.remove('hidden');
            scheduleForm.classList.add('hidden');
            scheduleButtonContainer.classList.add('hidden');
            
            if (isAdmin) {
                updateButtonContainer.classList.remove('hidden');
            }
        } else {
            trainingLocationSpan.textContent = 'No hay entrenamiento programado';
            locationAddress.textContent = '';
            trainingTime.textContent = '';
            trainingDescription.textContent = '';
            
            locationInfo.classList.remove('hidden');
            scheduleForm.classList.add('hidden');
            updateButtonContainer.classList.add('hidden');
            
            if (isAdmin) {
                scheduleButtonContainer.classList.remove('hidden');
            } else {
                scheduleButtonContainer.classList.add('hidden');
            }
        }
        
        // Mostrar panel de ubicación
        locationPanel.classList.remove('hidden');
    }

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

        // Ajustar para que la semana empiece en lunes
        const startOffset = (startDay + 6) % 7;

        // Espacios en blanco antes del primer día
        for (let i = 0; i < startOffset; i++) {
            const empty = document.createElement('div');
            empty.className = 'invisible';
            calendarDays.appendChild(empty);
        }

        // Días del mes
        for (let d = 1; d <= daysInMonth; d++) {
            const dayDiv = document.createElement('div');
            dayDiv.className = 'day-cell';
            
            // Formato clave para eventos
            const key = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
            
            // Crear contenedor para el número del día
            const dayNumber = document.createElement('div');
            dayNumber.className = 'day-number';
            dayNumber.textContent = d;
            dayDiv.appendChild(dayNumber);
            
            // Resaltar hoy
            const today = new Date();
            if (d === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
                dayDiv.classList.add('today');
            }

            // Mostrar evento si existe
            if (ubicaciones[key]) {
                const eventContent = document.createElement('div');
                eventContent.className = 'event-content';
                eventContent.textContent = ubicaciones[key].nombre;
                dayDiv.appendChild(eventContent);
                
                // Agregar punto indicador de evento
                const eventDot = document.createElement('div');
                eventDot.className = 'event-dot';
                dayDiv.appendChild(eventDot);
            }

            // Manejar clic en el día
            dayDiv.addEventListener('click', () => showLocationInfo(key));
            
            calendarDays.appendChild(dayDiv);
        }
        
        // Asegurar que siempre haya 6 filas para mantener la consistencia
        const totalCells = startOffset + daysInMonth;
        const remainingCells = 42 - totalCells; // 6 filas x 7 columnas = 42 celdas
        
        for (let i = 0; i < remainingCells; i++) {
            const empty = document.createElement('div');
            empty.className = 'invisible';
            calendarDays.appendChild(empty);
        }
    }

    // Navegación del calendario
    prevBtn.addEventListener('click', function() {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar(currentDate);
        locationPanel.classList.add('hidden');
    });

    nextBtn.addEventListener('click', function() {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar(currentDate);
        locationPanel.classList.add('hidden');
    });

    // Inicializar calendario
    renderCalendar(currentDate);
    
    // Ocultar el panel de ubicación al inicio
    locationPanel.classList.add('hidden');
});