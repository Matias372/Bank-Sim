//================================================
// 1) IMPORT
//================================================
import {
    hideSim,
    showSim,
    showOptions,
    actualizarCliente,
    handleOptionChange,
} from "./interfaz.js";
import { Cliente } from "./client.js";
import { Banco } from "./bank.js";

//================================================
// 2) VARIABLES GLOBALES
//================================================
let P_type = "";
let P_operation = "";
let P_value = 0;
let cliente = null;
let bank = new Banco();
let score = 0;

//================================================
// 3) AGREGAR LISTENERS PARA LOS BOTONES
//================================================
document.getElementById("nuevo").addEventListener("click", () => {
    showSim();

    cliente = Cliente.generarCliente();
    if (cliente && cliente.reqbank === true) {
        bank.generarRegistroBanco(cliente);
    }
    actualizarCliente(cliente);
    console.log(cliente);
    console.log(bank.registroBanco);
});

document
    .getElementById("type")
    .addEventListener("change", () => showOptions(bank, cliente));

document
    .getElementById("option")
    .addEventListener("change", () => handleOptionChange(bank, cliente));

document.addEventListener("DOMContentLoaded", hideSim);
