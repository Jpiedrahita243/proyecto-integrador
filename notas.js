// Se busca la sesion guardada.
const sesionGuardada = localStorage.getItem('usuarioActual');

// Si no hay sesion, se regresa al inicio.
if (sesionGuardada === null) {
  window.location.href = 'index.html';
} else {
  const sesion = JSON.parse(sesionGuardada);
  const listaCalificaciones = document.getElementById('listaNotas');
  const formulario = document.getElementById('formularioNota');

  document.getElementById('informacionUsuario').textContent =
    'Usuario: ' + sesion.usuario + ' | Rol: ' + sesion.rol;

  // Se guardan las calificaciones en un arreglo de objetos.
  let calificaciones = JSON.parse(localStorage.getItem('calificaciones')) || [
    { materia: 'Matemáticas', calificacion: 9.5 }
  ];
  let numeroEditando = -1; 

  // El formulario solo aparece para el profesor.
  if (sesion.rol === 'Profesor') {
    document.getElementById('seccionProfesor').classList.remove('oculto');
  }

  // Muestro todas las calificaciones usando un ciclo for.
  function mostrarCalificaciones() {
    listaCalificaciones.innerHTML = '';

    for (let i = 0; i < calificaciones.length; i++) {
      const calificacion = calificaciones[i];
      let texto = '<article class="nota">';
      texto += '<h3>' + calificacion.materia + '</h3>';
      texto += '<p>Calificación: ' + calificacion.calificacion + '</p>';

      if (sesion.rol === 'Profesor') {
        texto += '<button class="boton-editar" data-numero="' + i + '">Editar</button>';
        texto += '<button class="boton-borrar" data-numero="' + i + '">Borrar</button>';
      }

      texto += '</article>';
      listaCalificaciones.innerHTML += texto;
    }

    // Agrego la accion de borrar a cada boton.
    const botonesBorrar = document.querySelectorAll('.boton-borrar');
    for (let i = 0; i < botonesBorrar.length; i++) {
      botonesBorrar[i].addEventListener('click', function () {
        const numero = this.getAttribute('data-numero');
        calificaciones.splice(numero, 1);
        localStorage.setItem('calificaciones', JSON.stringify(calificaciones));
        mostrarCalificaciones();
      });
    }

    // Cargo una calificacion en el formulario para editarla.
    const botonesEditar = document.querySelectorAll('.boton-editar');
    for (let i = 0; i < botonesEditar.length; i++) {
      botonesEditar[i].addEventListener('click', function () {
        numeroEditando = this.getAttribute('data-numero');
        document.getElementById('materiaNota').value = calificaciones[numeroEditando].materia;
        document.getElementById('calificacionNota').value = calificaciones[numeroEditando].calificacion;
        document.querySelector('#formularioNota button').textContent = 'Actualizar calificación';
      });
    }
  }

  // El profesor puede agregar una calificacion.
  formulario.addEventListener('submit', function (event) {
    event.preventDefault();

    const nuevaCalificacion = {
      materia: document.getElementById('materiaNota').value,
      calificacion: document.getElementById('calificacionNota').value
    };

    if (numeroEditando === -1) {
      calificaciones.push(nuevaCalificacion);
    } else {
      calificaciones[numeroEditando] = nuevaCalificacion;
      numeroEditando = -1;
      document.querySelector('#formularioNota button').textContent = 'Guardar calificación';
    }

    localStorage.setItem('calificaciones', JSON.stringify(calificaciones));
    formulario.reset();
    mostrarCalificaciones();
  });

  // Se cierra la sesion y regresamos al inicio.
  document.getElementById('botonCerrarSesion').addEventListener('click', function () {
    localStorage.removeItem('usuarioActual');
    window.location.href = 'index.html';
  });

  mostrarCalificaciones();
}
