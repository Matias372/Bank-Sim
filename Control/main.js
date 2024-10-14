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
import { validarOperacion } from "./InputHandler.js"; // Importar la función de validación

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
});

document.getElementById("cargar").addEventListener("click", () => {
    hideSim(); // Oculta la simulación
});

// Agregar listener para el cambio en el tipo de operación
document.getElementById("type").addEventListener("change", showOptions);

document
    .getElementById("option")
    .addEventListener("change", handleOptionChange);

// Agregar listener para el botón de enviar operación
document.getElementById("enviarOperacion").addEventListener("click", () => {
    const tipoOperacion = document.getElementById("option").value; // Obtener el tipo de operación
    const dni = document.getElementById("dni").value; // Obtener el DNI del cliente
    const dniDestino = document.getElementById("dniDestino")?.value; // Obtener el DNI destino, si aplica

    const resultadoValidacion = validarOperacion(
        cliente,
        tipoOperacion,
        dni,
        dniDestino
    );

    if (resultadoValidacion.valido) {
        // Si la validación es exitosa, proceder con la operación
        console.log("Operación válida:", tipoOperacion);
        // Aquí puedes agregar la lógica para realizar la operación
    } else {
        // Mostrar mensaje de error
        alert(resultadoValidacion.mensaje);
    }
});

// Inicializar ocultando la interfaz al cargar
document.addEventListener("DOMContentLoaded", hideSim);
