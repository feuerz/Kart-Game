var podiunm = [];
function start() {
  let strart = document.getElementById("imagenStart");
  strart.setAttribute("hidden", true);
  function cuentaAtras() {
    let tres = document.getElementById("imagenStart3");
    let dos = document.getElementById("imagenStart2");
    let uno = document.getElementById("imagenStart1");
    let llamas = document.getElementById("imagenStartLlamas");
    llamas.hidden = false;
    tres.hidden = false;
    setTimeout(function () {
      tres.setAttribute("hidden", true);
      dos.hidden = false;
    }, 1000);

    setTimeout(function () {
      dos.setAttribute("hidden", true);
      uno.hidden = false;
    }, 2000);
    setTimeout(function () {
      uno.setAttribute("hidden", true);
      llamas.setAttribute("hidden", true);
      ejecutar();
    }, 3000);
  }
  intervalID = setInterval(cuentaAtras, 5000);
  cuentaAtras();
  clearInterval(intervalID);
}
function ganador(ganador) {
  console.log(ganador);
  let uno = document.getElementById("ganador1");
  let dos = document.getElementById("ganador2");
  let tres = document.getElementById("ganador3");
  let cuatro = document.getElementById("ganador4");
  let again = document.getElementById("again");
  switch (ganador) {
    case "tortu1":
      uno.hidden = false;

      break;
    case "tortu2":
      console.log("Seleccionaste la tortuga 2");
      dos.hidden = false;
      break;
    case "tortu3":
      tres.hidden = false;
      // Puedes agregar más acciones específicas para "tortu3" aquí
      break;
    case "tortu4":
      cuatro.hidden = false;
      // Puedes agregar más acciones específicas para "tortu4" aquí
      break;
    default:
      console.log("Tortuga no reconocida");
    // Puedes agregar acciones para el caso por defecto (si no coincide con ninguno de los casos anteriores)
  }
  again.hidden = false;
}
async function carrera(tortuga, velocidad, penalizacion) {
  let posicionTortu = 0;
  console.log(tortuga);
  console.log("Esto es la velocidad", velocidad);
  console.log("Esto es la penalizacion", penalizacion);
  return new Promise((resolver) => {
    setTimeout(() => {
      let intervalo = setInterval(() => {
        resolver("Resuelvo en 3s");
        if (posicionTortu < 80) {
          posicionTortu += 10;
          tortuga.style.marginLeft = posicionTortu + "%";
        } else {
          podiunm.push(tortuga);
          console.log(podiunm);
          clearInterval(intervalo);
        }
        if (podiunm.length == 3 && posicionTortu >=70) {
          ganador(podiunm[0].id);
        }
      }, 11000 - velocidad);
    }, penalizacion * 1000);
  });
}
function obtenerIds() {
  let tortuga1 = document.getElementById("tortu1");
  var tortuga2 = document.getElementById("tortu2");
  var tortuga3 = document.getElementById("tortu3");
  var tortuga4 = document.getElementById("tortu4");
  let ids = [];
  ids.push(tortuga1, tortuga2, tortuga3, tortuga4);
  console.log(tortuga1);
  console.log(ids);
  return ids;
}

async function ejecutar() {
  let ids = obtenerIds();
  console.log(ids);
  let velocidad = obtenerVelocidad();
  let penalizacion = obtenerPenalizacion();
  /*carrera(ids[0], 8000, penalizacion[0]);
  carrera(ids[1], 10000, penalizacion[1]);
  carrera(ids[2], 7000, penalizacion[2]);
  carrera(ids[3], 9000, penalizacion[3]);*/
  carrera(ids[0], velocidad[0] * 1000, penalizacion[0]);
  carrera(ids[1], velocidad[1] * 1000, penalizacion[1]);
  carrera(ids[2], velocidad[2] * 1000, penalizacion[2]);
  carrera(ids[3], velocidad[3] * 1000, penalizacion[3]);
}
obtenerIds();

function obtenerVelocidad() {
  let velocidades = [];
  let contadorVelocidades = 0;
  let numeroAleatorio1 = Math.floor(Math.random() * 10) + 1;
  velocidades.push(numeroAleatorio1);
  contadorVelocidades++;
  do {
    let numeroAleatorio = Math.floor(Math.random() * 10) + 1;
    if (!velocidades.includes(numeroAleatorio)) {
      velocidades.push(numeroAleatorio);
      contadorVelocidades++;
    }
  } while (contadorVelocidades != 4);

  console.log(velocidades);
  return velocidades;
}
function obtenerPenalizacion() {
  let penalizacion = [];
  let contadorPenalizacion = 0;
  do {
    let numeroAleatorio = Math.floor(Math.random() * 3) + 1;
    penalizacion.push(numeroAleatorio);
    contadorPenalizacion++;
  } while (contadorPenalizacion != 4);
  console.log(penalizacion);
  return penalizacion;
}
window.onload = function () {
  document.getElementById("pressStart").addEventListener("click", start);
};
