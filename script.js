//Se muestra un formulario de inicio de sesión para que el maestro ingrese su nombre de usuario y contraseña.
//Cuando el maestro hace clic en el botón de inicio de sesión, se verifica la validez de las credenciales ingresadas.
//Si las credenciales son válidas, se muestra un mensaje de bienvenida al maestro y se muestran los estudiantes en la página.
//El maestro puede ver una lista de estudiantes asignados a su comisión.
//Para cada estudiante, se muestra una tarjeta con su nombre, curso y un espacio para ingresar las notas y el promedio.
//El maestro puede ingresar las notas para cada estudiante y hacer clic en un botón para calcular el promedio final.
//Al hacer clic en el botón de calcular promedio, se calcula el promedio final del estudiante y se muestra en pantalla.
//Los datos de los estudiantes, incluyendo las notas y los promedios finales, se guardan en el LS
//Docentes y pass:  Juan pass:123456   María pass:abcdef

class Docente {
  constructor(id, nombre, comisiones, pass) {
    this.id = id;
    this.nombre = nombre;
    this.comisiones = comisiones;
    this.pass = pass;
  }
}

const DOCENTES = [
  new Docente(1, 'Juan', ['Primer Grado', 'Segundo Grado'], '123456'),
  new Docente(2, 'María', ['Tercer Grado', 'Cuarto Grado'], 'abcdef'),
];

class Estudiante {
  constructor(id, nombre, curso) {
    this.id = id;
    this.nombre = nombre;
    this.curso = curso;
    this.notas = [0, 0, 0]; // Inicializa las notas con cero
    this.promedioFinal = 0;
  }

  calcularPromedioFinal() {
    const sum = this.notas.reduce((total, nota) => total + nota, 0);
    return sum / this.notas.length;
  }
  static updatePromedios() {
    for (const estudiante of ESTUDIANTES) {
      estudiante.promedioFinal = estudiante.calcularPromedioFinal();
    }
  }
}

const ESTUDIANTES = [
  new Estudiante(1, 'Carlos', 'Primer Grado'),
  new Estudiante(2, 'Ana', 'Primer Grado'),
  new Estudiante(3, 'Pedro', 'Segundo Grado'),
  new Estudiante(4, 'Laura', 'Segundo Grado'),
  new Estudiante(5, 'Marta', 'Segundo Grado'),
  new Estudiante(6, 'Jorge', 'Segundo Grado'),
  new Estudiante(7, 'Luis', 'Tercer Grado'),
  new Estudiante(8, 'Paola', 'Tercer Grado'),
  new Estudiante(9, 'Miguel', 'Cuarto Grado'),
  new Estudiante(10, 'Valeria', 'Cuarto Grado'),
];

let currentTeacher = null;
const loginForm = document.getElementById('loginForm');
const welcomeSection = document.getElementById('welcomeSection');
const welcomeMessage = document.getElementById('welcomeMessage');
const studentsContainer = document.getElementById('studentsContainer');
const teacherNameInput = document.getElementById('teacherName');
const passwordInput = document.getElementById('password');
const loginBtn = document.getElementById('loginBtn');

function showLoginForm() {
  loginForm.style.display = 'block';
  welcomeSection.style.display = 'none';
}

loginBtn.addEventListener('click', () => {
  const teacherName = teacherNameInput.value.trim();
  const password = passwordInput.value;

  if (teacherName === '' || password === '') {
    alert('Por favor, ingrese su nombre y contraseña.');
    return;
  }

  const teacher = DOCENTES.find(
    (docente) => docente.nombre === teacherName && docente.pass === password
  );

  if (teacher) {
    currentTeacher = teacher;
    welcomeMessage.textContent = `Bienvenido(a), ${currentTeacher.nombre}!`;

    renderStudents();
    saveDataToLocalStorage();
    showWelcomeSection();
  } else {
    alert('Credenciales inválidas. Por favor, inténtelo de nuevo.');
  }
});

function showWelcomeSection() {
  loginForm.style.display = 'none';
  welcomeSection.style.display = 'block';
}

function renderStudents() {
  studentsContainer.innerHTML = '';

  for (const estudiante of ESTUDIANTES) {
    if (currentTeacher.comisiones.includes(estudiante.curso)) {
      const card = document.createElement('div');
      card.classList.add('card', 'mb-3');

      const cardBody = document.createElement('div');
      cardBody.classList.add('card-body');

      const studentName = document.createElement('h5');
      studentName.classList.add('card-title');
      studentName.textContent = estudiante.nombre;

      const studentCourse = document.createElement('p');
      studentCourse.classList.add('card-text');
      studentCourse.textContent = `Curso: ${estudiante.curso}`;

      const noteInputs = document.createElement('div');
      noteInputs.classList.add('note-inputs');

      for (let i = 0; i < 3; i++) {
        const noteInput = document.createElement('input');
        noteInput.type = 'number';
        noteInput.classList.add('form-control', 'mb-2');
        noteInput.placeholder = `Nota ${i + 1}`;
        noteInput.value = estudiante.notas[i];

        noteInput.addEventListener('input', () => {
          estudiante.notas[i] = parseFloat(noteInput.value) || 0;
          saveDataToLocalStorage();
        });

        noteInputs.appendChild(noteInput);
      }

      const calculateBtn = document.createElement('button');
      calculateBtn.textContent = 'Calcular Promedio';
      calculateBtn.classList.add('btn', 'btn-primary', 'mt-2');
      calculateBtn.addEventListener('click', () => {
        const average = estudiante.calcularPromedioFinal();
        averageValue.textContent = average.toFixed(2);
        saveDataToLocalStorage(); // Guardar los datos actualizados en el LocalStorage
      });

    

      const averageText = document.createElement('p');
      averageText.classList.add('card-text', 'mt-2', 'mb-0');
      averageText.textContent = 'Promedio:';

      const averageValue = document.createElement('span');
      averageValue.classList.add('fw-bold');
      averageValue.textContent = estudiante.promedioFinal ? estudiante.promedioFinal.toFixed(2) : 'N/A';


      averageText.appendChild(averageValue);

      cardBody.appendChild(studentName);
      cardBody.appendChild(studentCourse);
      cardBody.appendChild(noteInputs);
      cardBody.appendChild(calculateBtn);
      cardBody.appendChild(averageText);
      card.appendChild(cardBody);

      studentsContainer.appendChild(card);
    }
  }
}

function saveDataToLocalStorage() {
  localStorage.setItem('currentTeacher', JSON.stringify(currentTeacher));
  localStorage.setItem('ESTUDIANTES', JSON.stringify(ESTUDIANTES));
  
  // Guardar promedios actualizados
  for (const estudiante of ESTUDIANTES) {
    estudiante.promedioFinal = estudiante.calcularPromedioFinal();
  }
  localStorage.setItem('ESTUDIANTES_PROMEDIOS', JSON.stringify(ESTUDIANTES.map(estudiante => ({
    id: estudiante.id,
    promedioFinal: estudiante.promedioFinal
  }))));
}


function retrieveDataFromLocalStorage() {
  const storedTeacher = localStorage.getItem('currentTeacher');
  const storedStudents = localStorage.getItem('ESTUDIANTES');
  const storedStudentAverages = localStorage.getItem('ESTUDIANTES_PROMEDIOS');

  if (storedTeacher) {
    currentTeacher = JSON.parse(storedTeacher);
    welcomeMessage.textContent = `Bienvenido(a), ${currentTeacher.nombre}!`;
    renderStudents();
    showWelcomeSection();
  }

  if (storedStudents) {
    const parsedStudents = JSON.parse(storedStudents);
    for (let i = 0; i < ESTUDIANTES.length; i++) {
      ESTUDIANTES[i].notas = parsedStudents[i].notas;
      ESTUDIANTES[i].promedioFinal = parsedStudents[i].promedioFinal;
    }
  }

  if (storedStudentAverages) {
    const parsedAverages = JSON.parse(storedStudentAverages);
    for (let i = 0; i < ESTUDIANTES.length; i++) {
      const student = ESTUDIANTES.find(estudiante => estudiante.id === parsedAverages[i].id);
      if (student) {
        student.promedioFinal = parsedAverages[i].promedioFinal;
      }
    }
  }
}

retrieveDataFromLocalStorage();
showLoginForm();