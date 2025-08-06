var podiunm = [];
let fondoPosicion = 0;
let tortugaMasRapidaIndex = -1;
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
  // console.log(ganador);
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
      dos.hidden = false;
      break;
    case "tortu3":
      tres.hidden = false;
      break;
    case "tortu4":
      cuatro.hidden = false;
      break;
    default:
  }
  again.hidden = false;
}
async function carrera(tortuga, velocidad, penalizacion, moverFondoExtra) {
  let posicionTortu = 0;
  const pasosTotales = 20;
  const incrementoPorPaso = 80 / pasosTotales;

  return new Promise((resolver) => {
    setTimeout(() => {
      let intervalo = setInterval(() => {
        if (posicionTortu < 80) {
          posicionTortu += incrementoPorPaso;
          tortuga.style.marginLeft = posicionTortu + "%";

          if (moverFondoExtra && fondoPosicion < 70) {
            fondoPosicion += 15;
            document.body.style.backgroundPosition = `${fondoPosicion}% center`;
          }
        } else {
          podiunm.push(tortuga);
          clearInterval(intervalo);
          resolver();
        }

        if (podiunm.length === 3 && posicionTortu >= 70) {
          ganador(podiunm[0].id);
        }
      }, velocidad);
    }, penalizacion * 1000);
  });
}

function obtenerIds() {
  let tortuga1 = document.getElementById("tortu1");
  let tortuga2 = document.getElementById("tortu2");
  let tortuga3 = document.getElementById("tortu3");
  let tortuga4 = document.getElementById("tortu4");
  return [tortuga1, tortuga2, tortuga3, tortuga4];
}

async function ejecutar() {
  fondoPosicion = 0;
  document.body.style.backgroundPosition = `${fondoPosicion}% center`;
  podiunm = [];

  let ids = obtenerIds();
  let velocidades = obtenerVelocidad();
  let penalizaciones = obtenerPenalizacion();

  tortugaMasRapidaIndex = encontrarTortugaMasRapida(
    velocidades,
    penalizaciones
  );
  let carreras = [];
  for (let i = 0; i < 4; i++) {
    const velocidadMs = 1000 - (velocidades[i] - 1) * (800 / 9);
    const esMasRapida = i === tortugaMasRapidaIndex;
    carreras.push(carrera(ids[i], velocidadMs, penalizaciones[i], esMasRapida));
  }

  await Promise.all(carreras);
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
  return penalizacion;
}
window.onload = function () {
  document.getElementById("pressStart").addEventListener("click", start);
};

function encontrarTortugaMasRapida(velocidades, penalizaciones) {
  let minTiempo = Infinity;
  let indexMasRapida = 0;

  for (let i = 0; i < velocidades.length; i++) {
    const tiempoTotal = velocidades[i] + penalizaciones[i];
    if (tiempoTotal < minTiempo) {
      minTiempo = tiempoTotal;
      indexMasRapida = i;
    }
  }
  // console.log("Índice tortuga más rápida:", indexMasRapida);
  return indexMasRapida;
}
