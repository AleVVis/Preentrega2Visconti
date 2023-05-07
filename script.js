// Función para calcular la nota final
function calcularNotaFinal(nota1, nota2, nota3) {
    // Calculamos el promedio de las tres notas
    let promedio = (nota1 + nota2 + nota3) / 3;
  
    // Si el promedio es mayor o igual a 6, el alumno aprobó
    if (promedio >= 6) {
      return "Aprobado con " + promedio;
    } else {
      return "Reprobado con " + promedio;
    }
  }
  
  // Con un prompt Pedimos la cantidad de alumnos, para ingresar sus notas
  let cantidadAlumnos = parseInt(prompt("¿Cuántos alumnos tenemos?"));
  
  // Variable para almacenar la nota final promedio de todos los alumnos
  let notaFinalPromedio = 0;
  
  // Ciclo para ingresar las notas de los alumnos
  for (let i = 1; i <= cantidadAlumnos; i++) {
    // Pedimos las tres notas de cada alumno. parseFlat:convertir la cadena de texto a n° con decimales
    let nota1 = parseFloat(prompt("Ingresa la nota 1 del alumno " + i));
    let nota2 = parseFloat(prompt("Ingresa la nota 2 del alumno " + i));
    let nota3 = parseFloat(prompt("Ingresa la nota 3 del alumno " + i));
  
    // Calculamos la nota final del alumno
    let notaFinal = calcularNotaFinal(nota1, nota2, nota3);
  
    // Mostramos la nota final del alumno
    alert(`El alumno ${i} tiene una nota final de ${notaFinal}`);
  
    // Sumamos la nota final del alumno a la nota final promedio de todos los alumnos
    notaFinalPromedio += (nota1 + nota2 + nota3) / 3;
  }
  
  // Calculamos la nota final promedio de todos los alumnos
  notaFinalPromedio = notaFinalPromedio / cantidadAlumnos;
  
  // Mostramos la nota final promedio de todos los alumnos
  alert(`La nota final promedio de todos los alumnos es: ${notaFinalPromedio}`);
  