// interfaz.js
import { validarOperacion } from "./InputHandler.js";

// Función para ocultar la interfaz del banco y el contenido principal
export function hideSim() {
    document.querySelector(".Menu").style.display = "block";
    document.querySelector(".bank-interface").style.display = "none";
    document.querySelector(".main").style.display = "none";
}

// Función para mostrar la interfaz del banco y el contenido principal
export function showSim() {
    document.querySelector(".Menu").style.display = "none";
    document.querySelector(".bank-interface").style.display = "block";
    document.querySelector(".main").style.display = "block";
}

// Función para mostrar las opciones correspondientes según el tipo seleccionado
export function showOptions(bank, cliente) {
    const typeSelect = document.getElementById("type");
    const optionSelect = document.getElementById("option");
    const selectedValue = typeSelect.value;

    // Limpia las opciones previas
    optionSelect.innerHTML = "";

    // Agregar opción deshabilitada y seleccionada por defecto
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Seleccionar tipo de consulta";
    defaultOption.disabled = true;
    defaultOption.selected = true;
    optionSelect.appendChild(defaultOption);

    // Lógica para mostrar opciones según el tipo seleccionado
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

    // Agrega las opciones al select
    options.forEach((option) => {
        const opt = document.createElement("option");
        opt.value = option;
        opt.textContent = option;
        optionSelect.appendChild(opt);
    });

    // Muestra los elementos relevantes
    document.querySelector(".bank-interface__options").style.display = "block";
    document.querySelector(".bank-interface__input").style.display = "block";

    // Agregar listener para el cambio de opción seleccionada
    optionSelect.addEventListener("change", () =>
        handleOptionChange(bank, cliente)
    );
}

// Función para manejar el cambio de opción seleccionada
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

function mostrarBuscarCliente(inputDiv, bank, cliente) {
    inputDiv.innerHTML = `
        <input type="text" placeholder="DNI del cliente" id="dniBuscar" />
        <button id="buscarBtn">Buscar</button>
    `;
    // Agregar el listener al botón buscarBtn
    document.getElementById("buscarBtn").addEventListener("click", () => {
        validarOperacion(bank, cliente); // Pasar bank y cliente
    });
}

// Implementa las demás funciones de manera similar
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

    // Agregar el listener al botón crearBtn
    document.getElementById("crearBtn").addEventListener("click", () => {
        validarOperacion(bank, cliente); // Llamar a la función validarOperacion
    });
}

function mostrarEliminarCuenta(inputDiv, bank, cliente) {
    inputDiv.innerHTML = `
        <input type="text" placeholder="DNI del cliente" id="dniEliminar" required />
        <button id="eliminarBtn">Eliminar Cuenta</button>
    `;

    // Agregar el listener al botón eliminarBtn
    document.getElementById("eliminarBtn").addEventListener("click", () => {
        validarOperacion(bank, cliente); // Llamar a la función validarOperacion
    });
}

function mostrarExtraerEfectivo(inputDiv, bank, cliente) {
    inputDiv.innerHTML = `
        <input type="text" placeholder="DNI del cliente" id="dniExtraer" required />
        <input type="number" placeholder="Monto a extraer" id="montoExtraer" required />
        <button id="extraerBtn">Extraer</button>
    `;

    // Agregar el listener al botón extraerBtn
    document.getElementById("extraerBtn").addEventListener("click", () => {
        validarOperacion(bank, cliente); // Llamar a la función validarOperacion
    });
}

function mostrarIngresarEfectivo(inputDiv, bank, cliente) {
    inputDiv.innerHTML = `
        <input type="text" placeholder="DNI del cliente" id="dniIngresar" required />
        <input type="number" placeholder="Monto a ingresar" id="montoIngresar" required />
        <button id="ingresarBtn">Ingresar</button>
    `;

    // Agregar el listener al botón ingresarBtn
    document.getElementById("ingresarBtn").addEventListener("click", () => {
        validarOperacion(bank, cliente); // Llamar a la función validarOperacion
    });
}

function mostrarTransferirDinero(inputDiv, bank, cliente) {
    inputDiv.innerHTML = `
        <input type="text" placeholder="DNI del cliente" id="dniTransferir" required />
        <input type="text" placeholder="DNI destinatario" id="dniDestinoTransferir" required />
        <input type="number" placeholder="Monto a transferir" id="montoTransferir" required />
        <button id="transferirBtn">Transferir</button>
    `;

    // Agregar el listener al botón transferirBtn
    document.getElementById("transferirBtn").addEventListener("click", () => {
        validarOperacion(bank, cliente); // Llamar a la función validarOperacion
    });
}

function mostrarActivarTarjeta(inputDiv, bank, cliente) {
    inputDiv.innerHTML = `
        <input type="text" placeholder="DNI del cliente" id="dniActivar" required />
        <button id="activarBtn">Activar Tarjeta</button>
    `;

    // Agregar el listener al botón activarBtn
    document.getElementById("activarBtn").addEventListener("click", () => {
        validarOperacion(bank, cliente); // Llamar a la función validarOperacion
    });
}

function mostrarDesactivarTarjeta(inputDiv, bank, cliente) {
    inputDiv.innerHTML = `
        <input type="text" placeholder="DNI del cliente" id="dniDesactivar" required />
        <button id="desactivarBtn">Desactivar Tarjeta</button>
    `;

    // Agregar el listener al botón desactivarBtn
    document.getElementById("desactivarBtn").addEventListener("click", () => {
        validarOperacion(bank, cliente); // Llamar a la función validarOperacion
    });
}

function mostrarDatosInvalidos(inputDiv, bank, cliente) {
    inputDiv.innerHTML = `
        <button id="rechazarDatosBtn">Rechazar Datos</button>
    `;

    // Agregar el listener al botón rechazarDatosBtn
    document
        .getElementById("rechazarDatosBtn")
        .addEventListener("click", () => {
            validarOperacion(bank, cliente); // Llamar a la función validarOperacion
        });
}

function mostrarMontoInsuficiente(inputDiv, bank, cliente) {
    inputDiv.innerHTML = `
        <input type="text" placeholder="DNI del cliente" id="dniMontoInsuficiente" required />
        <button id="rechazarMontoBtn">Rechazar Monto</button>
    `;

    // Agregar el listener al botón rechazarMontoBtn
    document
        .getElementById("rechazarMontoBtn")
        .addEventListener("click", () => {
            validarOperacion(bank, cliente); // Llamar a la función validarOperacion
        });
}

// Función para manejar la operación seleccionada

// Función para actualizar los datos de un cliente en la interfaz
export function actualizarCliente(cliente) {
    // Asegúrate de que el cliente no sea nulo
    if (!cliente) {
        console.error("No se ha proporcionado un cliente.");
        return;
    }

    // Actualizar los elementos del HTML con los datos del cliente
    document.getElementById(
        "nombre-cliente"
    ).textContent = `Nombre: ${cliente.nombre}`;
    document.getElementById(
        "genero-cliente"
    ).textContent = `Género: ${cliente.genero}`;
    document.getElementById(
        "edad-cliente"
    ).textContent = `Edad: ${cliente.edad}`;
    document.getElementById("dni-cliente").textContent = `DNI: ${cliente.dni}`;
    document.getElementById(
        "peticion-cliente"
    ).textContent = `Petición: ${cliente.text}`;
}
