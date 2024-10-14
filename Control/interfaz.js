// interfaz.js

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
export function showOptions() {
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
}

// Función para manejar el cambio de opción seleccionada
export function handleOptionChange() {
    const optionSelect = document.getElementById("option");
    const selectedOption = optionSelect.value;

    const inputDiv = document.querySelector(".bank-interface__input");
    inputDiv.innerHTML = ""; // Limpiar contenido previo

    switch (selectedOption) {
        case "Buscar cliente":
            inputDiv.innerHTML =
                '<input type="text" placeholder="DNI del cliente" id="dniBuscar" /><button id="buscarBtn">Buscar</button>';
            break;
        case "Crear Cuenta":
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
            break;

        case "Eliminar Cuenta":
            inputDiv.innerHTML =
                '<input type="text" placeholder="DNI del cliente" id="dniEliminar" /><button id="eliminarBtn">Eliminar Cuenta</button>';
            break;
        case "Extraer Efectivo":
            inputDiv.innerHTML = `
                    <input type="text" placeholder="DNI del cliente" id="dniExtraer" required />
                    <input type="number" placeholder="Monto a extraer" id="montoExtraer" required />
                    <button id="extraerBtn">Extraer</button>
                `;
            // Agregar listener para el botón de extracción
            document
                .getElementById("extraerBtn")
                .addEventListener("click", () => {
                    // Aquí se llamaría a la función de validación y lógica correspondiente
                    manejarOperacion("Extraer", "dniExtraer", "montoExtraer");
                });
            break;
        case "Ingresar Efectivo":
            inputDiv.innerHTML = `
                    <input type="text" placeholder="DNI del cliente" id="dniIngresar" required />
                    <input type="number" placeholder="Monto a ingresar" id="montoIngresar" required />
                    <button id="ingresarBtn">Ingresar</button>
                `;
            // Agregar listener para el botón de ingreso
            document
                .getElementById("ingresarBtn")
                .addEventListener("click", () => {
                    manejarOperacion(
                        "Ingresar",
                        "dniIngresar",
                        "montoIngresar"
                    );
                });
            break;
        case "Transferir Dinero":
            inputDiv.innerHTML = `
                    <input type="text" placeholder="DNI del cliente" id="dniTransferir" required />
                    <input type="text" placeholder="DNI destinatario" id="dniDestinoTransferir" required />
                    <input type="number" placeholder="Monto a transferir" id="montoTransferir" required />
                    <button id="transferirBtn">Transferir</button>
                `;
            // Agregar listener para el botón de transferencia
            document
                .getElementById("transferirBtn")
                .addEventListener("click", () => {
                    manejarOperacion(
                        "Transferir",
                        "dniTransferir",
                        "montoTransferir",
                        "dniDestinoTransferir"
                    );
                });
            break;
        case "Activar Tarjeta":
            inputDiv.innerHTML =
                '<input type="text" placeholder="DNI del cliente" id="dniActivar" /><button id="activarBtn">Activar Tarjeta</button>';
            break;
        case "Desactivar Tarjeta":
            inputDiv.innerHTML =
                '<input type="text" placeholder="DNI del cliente" id="dniDesactivar" /><button id="desactivarBtn">Desactivar Tarjeta</button>';
            break;
        case "Datos invalidos":
            inputDiv.innerHTML =
                "<p>La petición será rechazada por datos invalidos.</p>";
            break;
        case "Monto insuficiente":
            inputDiv.innerHTML =
                "<p>La petición será rechazada por monto insuficiente.</p>";
            break;
        default:
            break;
    }
}

// Función para manejar la operación
function manejarOperacion(
    tipoOperacion,
    dniInputId,
    montoInputId,
    dniDestinoInputId
) {
    const dni = document.getElementById(dniInputId).value; // Obtener el DNI del cliente
    const monto = document.getElementById(montoInputId).value; // Obtener el monto
    const dniDestino = dniDestinoInputId
        ? document.getElementById(dniDestinoInputId).value
        : null; // Obtener el DNI destino, si aplica

    const resultadoValidacion = validarOperacion(
        cliente,
        tipoOperacion,
        dni,
        dniDestino
    );

    if (resultadoValidacion.valido) {
        // Aquí puedes realizar la operación
        console.log(`Operación válida: ${tipoOperacion}`);
        // Lógica para realizar la operación aquí...
    } else {
        alert(resultadoValidacion.mensaje);
    }
}

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
