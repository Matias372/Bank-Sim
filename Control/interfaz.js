// interfaz.js
import { validarOperacion } from "./InputHandler.js";

//================================================
// 1) FUNCIONES DE INTERFAZ
//================================================

export function hideSim() {
    document.querySelector(".Menu").style.display = "block";
    document.querySelector(".bank-interface").style.display = "none";
    document.querySelector(".main").style.display = "none";
}

export function showSim() {
    document.querySelector(".Menu").style.display = "none";
    document.querySelector(".bank-interface").style.display = "block";
    document.querySelector(".main").style.display = "block";
}

export function showOptions(bank, cliente) {
    const typeSelect = document.getElementById("type");
    const optionSelect = document.getElementById("option");
    const selectedValue = typeSelect.value;

    optionSelect.innerHTML = ""; // Limpia las opciones previas

    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Seleccionar tipo de consulta";
    defaultOption.disabled = true;
    defaultOption.selected = true;
    optionSelect.appendChild(defaultOption);

    let options = [];

    switch (selectedValue) {
        case "Registro":
            options = ["Buscar cliente", "Crear Cuenta", "Eliminar Cuenta"];
            break;
        case "Operacion":
            options = [
                "Extraer Efectivo",
                "Ingresar Efectivo",
                "Transferir Dinero",
                "Activar Tarjeta",
                "Desactivar Tarjeta",
            ];
            break;
        case "Rechazar":
            options = ["Datos invalidos", "Monto insuficiente"];
            break;
        default:
            break;
    }

    options.forEach((option) => {
        const opt = document.createElement("option");
        opt.value = option;
        opt.textContent = option;
        optionSelect.appendChild(opt);
    });

    document.querySelector(".bank-interface__options").style.display = "block";
    document.querySelector(".bank-interface__input").style.display = "block";

    optionSelect.addEventListener("change", () =>
        handleOptionChange(bank, cliente)
    );
}

//================================================
// 2) MANEJO DE OPCIONES
//================================================

export function handleOptionChange(bank, cliente) {
    const optionSelect = document.getElementById("option");
    const selectedOption = optionSelect.value;

    const inputDiv = document.querySelector(".bank-interface__input");
    inputDiv.innerHTML = ""; // Limpiar contenido previo

    switch (selectedOption) {
        case "Buscar cliente":
            mostrarBuscarCliente(inputDiv, bank, cliente);
            break;
        case "Crear Cuenta":
            mostrarCrearCuenta(inputDiv, bank, cliente);
            break;
        case "Eliminar Cuenta":
            mostrarEliminarCuenta(inputDiv, bank, cliente);
            break;
        case "Extraer Efectivo":
            mostrarExtraerEfectivo(inputDiv, bank, cliente);
            break;
        case "Ingresar Efectivo":
            mostrarIngresarEfectivo(inputDiv, bank, cliente);
            break;
        case "Transferir Dinero":
            mostrarTransferirDinero(inputDiv, bank, cliente);
            break;
        case "Activar Tarjeta":
            mostrarActivarTarjeta(inputDiv, bank, cliente);
            break;
        case "Desactivar Tarjeta":
            mostrarDesactivarTarjeta(inputDiv, bank, cliente);
            break;
        case "Datos invalidos":
            mostrarDatosInvalidos(inputDiv, bank, cliente);
            break;
        case "Monto insuficiente":
            mostrarMontoInsuficiente(inputDiv, bank, cliente);
            break;
        default:
            console.log("Opción no válida seleccionada.");
            break;
    }
}

//================================================
// 3) FUNCIÓN DE BUSQUEDA DE CLIENTE
//================================================

function mostrarBuscarCliente(inputDiv, bank, cliente) {
    inputDiv.innerHTML = `
        <input type="text" placeholder="DNI del cliente" id="dniBuscar" />
        <button id="buscarBtn">Buscar</button>
    `;
    document.getElementById("buscarBtn").addEventListener("click", () => {
        validarOperacion(bank, cliente); // Pasar bank y cliente
    });
}

//================================================
// 4) OTRAS FUNCIONES PARA MANEJAR ENTRADAS
//================================================

function mostrarCrearCuenta(inputDiv, bank, cliente) {
    inputDiv.innerHTML = `
        <input type="text" placeholder="Nombre" id="nombreCrear" required />
        <input type="text" placeholder="DNI" id="dniCrear" required />
        <select id="generoCrear" required>
            <option value="" disabled selected>Seleccionar género</option>
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
            <option value="Otro">Otro</option>
        </select>
        <input type="number" placeholder="Edad" id="edadCrear" required />
        <button id="crearBtn">Crear Cuenta</button>
    `;
    document.getElementById("crearBtn").addEventListener("click", () => {
        validarOperacion(bank, cliente);
    });
}

function mostrarEliminarCuenta(inputDiv, bank, cliente) {
    inputDiv.innerHTML = `
        <input type="text" placeholder="DNI del cliente" id="dniEliminar" required />
        <button id="eliminarBtn">Eliminar Cuenta</button>
    `;
    document.getElementById("eliminarBtn").addEventListener("click", () => {
        validarOperacion(bank, cliente);
    });
}

function mostrarExtraerEfectivo(inputDiv, bank, cliente) {
    inputDiv.innerHTML = `
        <input type="text" placeholder="DNI del cliente" id="dniExtraer" required />
        <input type="number" placeholder="Monto a extraer" id="montoExtraer" required />
        <button id="extraerBtn">Extraer</button>
    `;
    document.getElementById("extraerBtn").addEventListener("click", () => {
        validarOperacion(bank, cliente);
    });
}

function mostrarIngresarEfectivo(inputDiv, bank, cliente) {
    inputDiv.innerHTML = `
        <input type="text" placeholder="DNI del cliente" id="dniIngresar" required />
        <input type="number" placeholder="Monto a ingresar" id="montoIngresar" required />
        <button id="ingresarBtn">Ingresar</button>
    `;
    document.getElementById("ingresarBtn").addEventListener("click", () => {
        validarOperacion(bank, cliente);
    });
}

function mostrarTransferirDinero(inputDiv, bank, cliente) {
    inputDiv.innerHTML = `
        <input type="text" placeholder="DNI del cliente" id="dniTransferir" required />
        <input type="text" placeholder="DNI destinatario" id="dniDestinoTransferir" required />
        <input type="number" placeholder="Monto a transferir" id="montoTransferir" required />
        <button id="transferirBtn">Transferir</button>
    `;
    document.getElementById("transferirBtn").addEventListener("click", () => {
        validarOperacion(bank, cliente);
    });
}

function mostrarActivarTarjeta(inputDiv, bank, cliente) {
    inputDiv.innerHTML = `
        <input type="text" placeholder="DNI del cliente" id="dniActivar" required />
        <button id="activarBtn">Activar Tarjeta</button>
    `;
    document.getElementById("activarBtn").addEventListener("click", () => {
        validarOperacion(bank, cliente);
    });
}

function mostrarDesactivarTarjeta(inputDiv, bank, cliente) {
    inputDiv.innerHTML = `
        <input type="text" placeholder="DNI del cliente" id="dniDesactivar" required />
        <button id="desactivarBtn">Desactivar Tarjeta</button>
    `;
    document.getElementById("desactivarBtn").addEventListener("click", () => {
        validarOperacion(bank, cliente);
    });
}

function mostrarDatosInvalidos(inputDiv, bank, cliente) {
    inputDiv.innerHTML = `
        <button id="rechazarDatosBtn">Rechazar Datos</button>
    `;
    document
        .getElementById("rechazarDatosBtn")
        .addEventListener("click", () => {
            validarOperacion(bank, cliente);
        });
}

function mostrarMontoInsuficiente(inputDiv, bank, cliente) {
    inputDiv.innerHTML = `
        <input type="text" placeholder="DNI del cliente" id="dniMontoInsuficiente" required />
        <button id="rechazarMontoBtn">Rechazar Monto</button>
    `;
    document
        .getElementById("rechazarMontoBtn")
        .addEventListener("click", () => {
            validarOperacion(bank, cliente);
        });
}

//================================================
// 5) ACTUALIZACIÓN DE CLIENTE
//================================================

export function actualizarCliente(cliente) {
    if (!cliente) {
        console.error("No se ha proporcionado un cliente.");
        return;
    }

    document.getElementById(
        "nombre-cliente"
    ).textContent = `Nombre: ${cliente.nombre}`;
    document.getElementById(
        "genero-cliente"
    ).textContent = `Género: ${cliente.genero}`;
    document.getElementById(
        "edad-cliente"
    ).textContent = `Edad: ${cliente.edad}`;
    document.getElementById("dni-cliente").textContent = `DNI:
 ${cliente.dni}`;
    document.getElementById(
        "peticion-cliente"
    ).textContent = `Petición: ${cliente.text}`;

    document.getElementById("type").value = ""; // Restablecer el select de tipo
    document.getElementById("option").innerHTML = ""; // Limpiar las opciones del select de opción

    document.querySelector(".bank-interface__options").style.display = "none";
    document.querySelector(".bank-interface__input").style.display = "none";

    const inputDiv = document.querySelector(".bank-interface__input");
    inputDiv.innerHTML = "";
}
