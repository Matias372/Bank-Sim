//================================================
// 1) IMPORT
//================================================
import {
    hideSim,
    showSim,
    showOptions,
    actualizarCliente,
    handleOptionChange,
} from "./interfaz.js"; // Ajusta la ruta según tu estructura de carpetas
import { Cliente } from "./client.js"; // Asegúrate de que la ruta sea correcta
import { Banco } from "./bank.js"; // Asegúrate de que la ruta sea correcta
// Importar la función de validación

//================================================
// 2) VARIABLES GLOBALES
//================================================
let P_type = ""; // Tipo de operación
let P_operation = ""; // Operación seleccionada
let P_value = 0; // Valor para las transacciones
let cliente = null; // Variable para el cliente
let bank = new Banco(); // Instancia de la clase Banco
let score = 0; // Puntaje inicial

//================================================
// 3) AGREGAR LISTENERS PARA LOS BOTONES
//================================================
document.getElementById("nuevo").addEventListener("click", () => {
    showSim(); // Muestra la simulación

    // Generar un nuevo cliente y asignar a la variable 'cliente'
    cliente = Cliente.generarCliente();
    if (cliente && cliente.reqbank === true) {
        bank.generarRegistroBanco(cliente); // Genera el registro bancario para un solo cliente
    }
    actualizarCliente(cliente);
    console.log(cliente);
    console.log(bank.registroBanco);
});

// Agregar listener para el cambio en el tipo de operación
document
    .getElementById("type")
    .addEventListener("change", () => showOptions(bank, cliente)); // Cambiado a función de flecha

// Agregar listener para el cambio de opción seleccionada
document
    .getElementById("option")
    .addEventListener("change", () => handleOptionChange(bank, cliente)); // Cambiado a función de flecha

// Inicializar ocultando la interfaz al cargar
document.addEventListener("DOMContentLoaded", hideSim);
