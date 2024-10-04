// ===============================================
// 1) IMPORTS
// ===============================================
import { generarClientesPorDia } from "./workDayHandler.js";
import { Banco } from "./bank.js";
import {
    showsimulador,
    hideSimulador,
    updateClientData,
    updateResult,
} from "./interfaz.js";

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
    clientes = generarClientesPorDia(clientsPerDay);
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
    clientsPerDay = 5 + (currentDay - 1); // Por ejemplo, añade uno más por cada día
    console.log(`Clientes por día actualizados a: ${clientsPerDay}`);
}
