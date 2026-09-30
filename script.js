// Creo una lista con los usuarios iniciales.
let usuarios = [
  { usuario: 'estudiante', password: '12345', rol: 'Estudiante' },
  { usuario: 'profesor', password: '12345', rol: 'Profesor' }
];

// Agrego a la lista los usuarios que se hayan registrado.
const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios')) || [];

for (let i = 0; i < usuariosGuardados.length; i++) {
  usuarios.push(usuariosGuardados[i]);
}

// Guardo el formulario y el mensaje en constantes.
const formulario = document.getElementById('formLogin');
const mensaje = document.getElementById('mensajeLogin');
const formularioRegistro = document.getElementById('formRegistro');
const mensajeRegistro = document.getElementById('mensajeRegistro');

// Cuando el usuario haga clic en Entrar, se ejecuta esto.
formulario.addEventListener('submit', function (event) {
  // Con esto evito que la página recargue.
  event.preventDefault();

  // Guardo lo que el usuario escribe en variables.
  const usuario = document.getElementById('usuario').value;
  const password = document.getElementById('contrasena').value;
  const rol = document.getElementById('rol').value;

  // Variable para guardar al usuario que coincida.
  let usuarioEncontrado = null;

  // Se recorre el arreglo de usuarios.
  for (let i = 0; i < usuarios.length; i++) {
    const usuarioActual = usuarios[i];

    // Comparo usuario, contraseña y rol.
    if (
      usuarioActual.usuario === usuario &&
      usuarioActual.password === password &&
      usuarioActual.rol === rol
    ) {
      usuarioEncontrado = usuarioActual;
      break;
    }
  }

  // Si existe el usuario, se muestra bienvenida.
  if (usuarioEncontrado !== null) {
    const sesion = {
      usuario: usuarioEncontrado.usuario,
      rol: usuarioEncontrado.rol
    };

    localStorage.setItem('usuarioActual', JSON.stringify(sesion));
    window.location.href = 'notas.html';
  } else {
    // Si no existe, se muestra error.
    mensaje.textContent = 'Usuario, contraseña o rol incorrectos';
    mensaje.style.color = 'red';
  }
});

// Se registra un usuario nuevo.
formularioRegistro.addEventListener('submit', function (event) {
  event.preventDefault();

  const nuevoUsuario = document.getElementById('nuevoUsuario').value;
  const nuevaContrasena = document.getElementById('nuevaContrasena').value;
  const nuevoRol = document.getElementById('nuevoRol').value;
  let usuarioRepetido = false;

  // Aca reviso si el nombre ya existe.
  for (let i = 0; i < usuarios.length; i++) {
    if (usuarios[i].usuario === nuevoUsuario) {
      usuarioRepetido = true;
    }
  }

  if (usuarioRepetido === true) {
    mensajeRegistro.textContent = 'Ese usuario ya existe';
    mensajeRegistro.style.color = 'red';
  } else {
    const usuarioNuevo = {
      usuario: nuevoUsuario,
      password: nuevaContrasena,
      rol: nuevoRol
    };

    usuarios.push(usuarioNuevo);
    usuariosGuardados.push(usuarioNuevo);
    localStorage.setItem('usuarios', JSON.stringify(usuariosGuardados));

    mensajeRegistro.textContent = 'Usuario registrado correctamente';
    mensajeRegistro.style.color = 'green';
    formularioRegistro.reset();
  }
});
