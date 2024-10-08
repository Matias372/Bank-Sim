// ===============================================
// 1) IMPORTS
// ===============================================
import { generarClientesPorDia } from "./workDayHandler.js";
import { Banco } from "./bank.js";
import { showsimulador, hideSimulador, updateClientData } from "./interfaz.js";

// ===============================================
// 2) VARIABLES
// ===============================================
const banco = new Banco();
let clientes = [];
let currentDay;
let quality;
let clientsPerDay;

// Detectar elementos del DOM
const nuevoJuegoBtn = document.getElementById("nuevo");
const cargarPartidaBtn = document.getElementById("cargar");

// ===============================================
// 3) FUNCION NEW GAME
// ===============================================
function nuevoJuego() {
    currentDay = 1;
    quality = 5;
    clientsPerDay;
    console.log("Nuevo juego iniciado.");

    showsimulador();
    clientsPerDay = actualizarClientsPerDay();
    console.log(`Clientes por día actualizados a: ${clientsPerDay}`);

    // Intentar generar los clientes
    clientes = generarClientesPorDia(clientsPerDay);
    console.log(`Clientes generados: ${JSON.stringify(clientes)}`);

    if (clientes.length > 0) {
        updateClientData(clientes[0]);
    } else {
        console.error("No se han generado clientes.");
    }
}

// Cargar el nuevo juego
nuevoJuegoBtn.addEventListener("click", nuevoJuego);

// ===============================================
// 4) FUNCION CARGAR PARTIDA
// ===============================================
function cargarPartida() {
    console.log("Cargar partida");
}

// Cargar el juego guardado
cargarPartidaBtn.addEventListener("click", cargarPartida);

// ===============================================
// 5) FUNCION PARA ACTUALIZAR CLIENTS PER DAY
// ===============================================
function actualizarClientsPerDay() {
    // Incrementar en función del día actual
    let clientsPerDay = 5 + (currentDay - 1); // Por ejemplo, añade uno más por cada día
    console.log(`Clientes por día actualizados a: ${clientsPerDay}`);
    return clientsPerDay; // Asegúrate de devolver el valor
}
