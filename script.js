var podiunm = [];
let fondoPosicion = 0;
let tortugaMasRapidaIndex = -1;
var hacomenzado = 0;
var numJugadoresTotal =1;

function start() {
  let strart = document.getElementById("imagenStart");
  let pressStart = document.getElementById("pressStart");
  strart.style.display = "none";
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
  console.log(podiunm);
  
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
async function carrera(tortuga, velocidad, penalizacion, moverFondoExtra,nombres) {
  let posicionTortu = 0;
  const pasosTotales = 20;
  const incrementoPorPaso = 80 / pasosTotales;

  return new Promise((resolver) => {
    setTimeout(() => {
      let intervalo = setInterval(() => {
        if (posicionTortu < 80) {
          posicionTortu += incrementoPorPaso;
          tortuga.style.marginLeft = posicionTortu + "%";
          nombres.style.marginLeft = posicionTortu + "%";
          if (moverFondoExtra && fondoPosicion < 70) {
            fondoPosicion += 8;
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
function obtenerNombres() {
  let playerName1 = document.getElementById("playerName1");
  let playerName2 = document.getElementById("playerName2");
  let playerName3 = document.getElementById("playerName3");
  let playerName4 = document.getElementById("playerName4");
  return [playerName1, playerName2, playerName3, playerName4];
}

async function ejecutar() {
  fondoPosicion = 0;
  document.body.style.backgroundPosition = `${fondoPosicion}% center`;
  podiunm = [];
  let ids = obtenerIds();
  let nombres = obtenerNombres();
  let velocidades = obtenerVelocidad();
  let penalizaciones = obtenerPenalizacion();
  tortugaMasRapidaIndex = encontrarTortugaMasRapida(
    velocidades,
    penalizaciones
  );
  let carreras = [];
  hacomenzado++;

  for (let i = 0; i < 4; i++) {
    const velocidadMs = 1000 - (velocidades[i] - 1) * (800 / 9);
    const esMasRapida = i === tortugaMasRapidaIndex;
    carreras.push(carrera(ids[i], velocidadMs, penalizaciones[i], esMasRapida,nombres[i]));
  }
  await Promise.all(carreras);
}
obtenerIds();
obtenerNombres();
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
  return indexMasRapida;
}

window.onload = function () {
  const botonStart = document.getElementById("pressStart");
  const listenerStart = () => {
    botonStart.removeEventListener("click", listenerStart);
    start();
  };
  botonStart.addEventListener("click", listenerStart);
 
  const botonJugar = document.getElementById("jugar");
  const listenerJugar = () => {
    botonJugar.removeEventListener("click", listenerJugar);
    inciarCarrera();
  };
  botonJugar.addEventListener("click", listenerJugar);

  const listenerAnyClick = (event) => {
    elegirJugadores();
    document.removeEventListener("click", listenerAnyClick);
  };
  document.addEventListener("click", listenerAnyClick);
  document.getElementById("configGame").addEventListener("click", function () {
    let menuRetro = document.getElementById("menuRetro");
    menuRetro.style.display = "none";
    let menuConfigGame = document.getElementById("configuracionJuego");
    menuConfigGame.hidden = false;
  });
  actualizarJugadores();
};

function elegirJugadores() {
  let logo = document.getElementById("logoGame");
  logo.style.display = "none";
  let menu = document.getElementById("menuRetro");
  menu.hidden = false;
}
function inciarCarrera() {
  let error = 0;
  let nombreJugadores = [];
  for (let i = 1; i <= numJugadoresTotal; i++) {
     let jugador = document.getElementById("jugador"+i);
     if(jugador.value.trim()!=""){
      nombreJugadores.push(jugador.value);
     }else{
      error++;
     }
  }
  if(error==0){
    if (nombreJugadores.length<4) {
      let restantes = 4-nombreJugadores.length;
      let totalActual = nombreJugadores.length;
      for (let j = 1; j <= restantes; j++) {
        nombreJugadores.push("Bot"+(totalActual+j))
      }
    }
    nombreJugadores = mezclarArray(nombreJugadores);
    for (let i = 1; i <= nombreJugadores.length; i++) {
      let player = document.getElementById("playerName" + i);
      if (player) {
        console.log(player);
        
        player.textContent  = nombreJugadores[i - 1];
        console.log(nombreJugadores[i - 1]);
      }
    }

    let menu = document.getElementById("configuracionJuego");
    menu.style.display = "none";
    let pressStart = document.getElementById("pressStart");
    pressStart.style.display = "";
    const tortugas = document.getElementsByClassName("tortuga");
    for (let i = 0; i < tortugas.length; i++) {
      tortugas[i].classList.remove("oculta"); // Elimina la clase que las oculta
    }
  }else{
    alert("Todos los nombres deben estar completos");
  }
}
function mezclarArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // intercambio
  }
  return array;
}

function actualizarJugadores() {
  let numJugadores = parseInt(document.getElementById("numJugadores").value);
  let container = document.getElementById("jugadoresContainer");
  let nombresAlmacenados = [];
  let inputsActuales = container.querySelectorAll("input[type='text']");
  inputsActuales.forEach(input => {
    nombresAlmacenados.push(input.value.trim());
  });
  container.innerHTML = "";
  for (let i = 1; i <= numJugadores; i++) {
    let divJugador = document.createElement("div");
    divJugador.classList.add("jugador");

    let label = document.createElement("label");
    label.setAttribute("for", "jugador" + i);
    label.textContent = "Nombre del Jugador " + i + ":";

    let input = document.createElement("input");
    input.type = "text";
    input.id = "jugador" + i;
    input.name = "jugador" + i;
    input.placeholder = "Jugador " + i;
    input.value = nombresAlmacenados[i - 1] || "";

    divJugador.appendChild(label);
    divJugador.appendChild(input);

    container.appendChild(divJugador);
  }
  window.numJugadoresTotal = numJugadores;
}

