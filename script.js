/*Se trata de la pag interna de un colegio donde los profesores pueden ver los cursos que tienen a cargo,
elegir su curso, calificar a los alumnos y obtener una nota final.

La clase Estudiante tiene un constructor que recibe tres parámetros: id, nombre y curso. 
Estos parámetros se asignan a las propiedades correspondientes al estudiante.*/
class Estudiante {
    constructor(id, nombre, curso) {
      this.id = id;
      this.nombre = nombre;
      this.curso = curso;
      this.notas = [];   //inicializo la propiedad notas como un array vacío.
    }
//Métodos de la clase Estudiante
    agregarNota(nota) {
      this.notas.push(nota);
    } //Recibe un objeto nota y lo agrega al array de notas del estudiante.
  
    calcularPromedio() {
      const sum = this.notas.reduce((acumulador, nota) => acumulador + nota.calificacion, 0);
      return sum / this.notas.length;
    }//Calcula el promedio de las calificaciones de todas las notas del estudiante.
  
    calcularPromedioFinal() {
      const sum = this.notas.reduce((acumulador, nota) => acumulador + nota.calificacion, 0);
      return sum / this.notas.length;
    }//el método reduce() suma todas las calificaciones de las notas almacenadas en el array notas. 
    //Luego, se divide la suma obtenida por la cantidad de notas para obtener el promedio final.
  }
  
  
  //La clase Notas tiene un constructor que recibe un parámetro calificacion. 
  //Este parámetro se asigna a la propiedad calificacion, y se inicializa la propiedad fecha con la fecha actual
  class Notas {
    constructor(calificacion) {
      this.calificacion = calificacion;
      this.fecha = new Date();
    }
  }
  
  //recibe un número y un mensaje, y valida que el número sea un valor numérico. 
  //Si no es un número válido, solicita al usuario que ingrese un nuevo número hasta que sea válido.
  function validarNumero(numero, mensaje) {
    while (isNaN(numero)) {
      numero = parseInt(prompt(`El valor ingresado no es un número válido. ${mensaje}`));
    }
    return numero;
  }
  
  //Esta función muestra un mensaje en forma de alerta en el navegador.
  function mostrarMensaje(mensaje) {
    alert(mensaje);
  }
  
  //Esta función muestra un mensaje y solicita una entrada al usuario utilizando prompt, devolviendo el valor ingresado.
  function solicitarEntrada(mensaje) {
    return prompt(mensaje);
  }
  
  //
  function elegirEstudiante(curso) {
  //Se filtran los estudiantes según el curso seleccionado.  
    const estudiantesFiltrados = ESTUDIANTES.filter(estudiante => estudiante.curso === curso);
  //Se muestra al usuario la lista de estudiantes disponibles para el curso y se solicita que ingrese el ID del estudiante a evaluar.
    let mensajePresentacion = `Estos son tus alumnos de ${curso}. Ingresa el ID del estudiante a evaluar:\n`;
  
    estudiantesFiltrados.forEach(estudiante => {
      mensajePresentacion += `${estudiante.id} - ${estudiante.nombre} de ${estudiante.curso}\n`;
    });
  
    let respuestaUser = parseInt(prompt(mensajePresentacion));
    respuestaUser = validarNumero(respuestaUser, mensajePresentacion);
//Se valida que el ID ingresado sea válido y se devuelve el estudiante seleccionado.
    while (!estudiantesFiltrados.find(estudiante => estudiante.id === respuestaUser)) {
      mostrarMensaje("El ID del estudiante ingresado no es válido. Por favor, inténtalo nuevamente.");
      respuestaUser = parseInt(prompt(mensajePresentacion));
      respuestaUser = validarNumero(respuestaUser, mensajePresentacion);
    }
  
    return estudiantesFiltrados.find(estudiante => estudiante.id === respuestaUser);
  }
  
  
  function ingresarNotaEstudiante(estudiante) {
//Se solicita al usuario que ingrese la primera nota del estudiante seleccionado.
    let calificacionEstudiante = parseFloat(solicitarEntrada(`Ingresa la primera nota del estudiante ${estudiante.nombre}:`));
    calificacionEstudiante = validarNumero(calificacionEstudiante, `Ingresa la primera nota del estudiante ${estudiante.nombre}:`);
//Se valida que la nota ingresada sea válida y se crea un objeto Notas con la calificación.
    const nuevaNota = new Notas(calificacionEstudiante);
//Se agrega la primera nota al estudiante y se muestra un mensaje de confirmación.
    estudiante.agregarNota(nuevaNota);
    mostrarMensaje(`Se ha agregado la nota ${calificacionEstudiante} al estudiante ${estudiante.nombre}.`);
  }
  
  function ingresarNotaFinal(estudiante) {
//Se solicita al usuario que ingrese la segunda nota (prueba final) del estudiante seleccionado.
    let calificacionFinal = parseFloat(solicitarEntrada(`Ingresa la segunda nota del estudiante ${estudiante.nombre}:`));
    calificacionFinal = validarNumero(calificacionFinal, `Ingresa la nota de la segunda nota del estudiante ${estudiante.nombre}:`);
//Se valida que la nota ingresada sea válida y se crea un objeto Notas con la calificación final.
    const nuevaNotaFinal = new Notas(calificacionFinal);
//Se agrega la segunda nota (prueba final) al estudiante y se muestra un mensaje de confirmación junto con el promedio final del estudiante.
    estudiante.agregarNota(nuevaNotaFinal);
    mostrarMensaje(`Se ha agregado la nota del examen final ${calificacionFinal} al estudiante ${estudiante.nombre}.`);
    mostrarMensaje(`El promedio final del estudiante ${estudiante.nombre} es: ${estudiante.calcularPromedioFinal()}`);
  }
  
  const grados = [
    { curso: 'Primer Grado', profesor: 'Mabel' },
    { curso: 'Segundo Grado', profesor: 'Susana' },
    { curso: 'Tercer Grado', profesor: 'Mabel' },
    { curso: 'Cuarto Grado', profesor: 'Roberto' },
    { curso: 'Quinto Grado', profesor: 'Mabel' },
    { curso: 'Sexto Grado', profesor: 'Roberto' },
    { curso: 'Séptimo Grado', profesor: 'Susana' }
  ];
  
  const ESTUDIANTES = [
    new Estudiante(1, 'Juan', 'Primer Grado'),
    new Estudiante(2, 'María', 'Segundo Grado'),
    new Estudiante(3, 'Pedro', 'Tercer Grado'),
    new Estudiante(4, 'Luisa', 'Cuarto Grado'),
    new Estudiante(5, 'Ana', 'Quinto Grado'),
    new Estudiante(6, 'Carlos', 'Sexto Grado'),
    new Estudiante(7, 'Marta', 'Séptimo Grado'),
    new Estudiante(8, 'Javier', 'Primer Grado'),
    new Estudiante(9, 'Laura', 'Segundo Grado'),
    new Estudiante(10, 'Sergio', 'Tercer Grado'),
    new Estudiante(11, 'Paula', 'Cuarto Grado'),
    new Estudiante(12, 'Roberto', 'Quinto Grado'),
    new Estudiante(13, 'Lucía', 'Sexto Grado'),
    new Estudiante(14, 'Diego', 'Séptimo Grado')
  ];
  
  let cursoSeleccionado = null;
  let respuestaCurso = null;
  
  while (!cursoSeleccionado) {
    let mensajeCursos = "Hola Profesor! elige el ID del curso que quieras evaluar:\n";
    grados.forEach((grado, index) => {
      mensajeCursos += `${index + 1}. ${grado.curso} - Profesor(a): ${grado.profesor}\n`;
    });
  
    respuestaCurso = parseInt(solicitarEntrada(mensajeCursos));
    respuestaCurso = validarNumero(respuestaCurso, mensajeCursos);
  
    if (respuestaCurso >= 1 && respuestaCurso <= grados.length) {
      cursoSeleccionado = grados[respuestaCurso - 1].curso;
    } else {
      mostrarMensaje("¡El número de curso seleccionado es inválido! Por favor, elige una opción válida.");
    }
  }
  
  const estudianteSeleccionado = elegirEstudiante(cursoSeleccionado);
  ingresarNotaEstudiante(estudianteSeleccionado);
  ingresarNotaFinal(estudianteSeleccionado);