const menuContent = document.querySelector(".Menu");
const mainContent = document.querySelector("main");

// ===============================================
console.log("Interfaz cargada" + menuContent + mainContent);

// Muestra la interfaz del simulador
function showsimulador() {
    menuContent.style.display = "none";
    mainContent.style.display = "block";
}

// Oculta la interfaz del simulador y muestra el encabezado
function hideSimulador() {
    mainContent.style.display = "none";
    menuContent.style.display = "block";
}

// Actualiza los datos del cliente en la interfaz
function updateClientData(cliente) {
    if (!cliente) {
        console.error("Cliente no definido en updateClientData.");
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
    document.getElementById("dni-cliente").textContent = `DNI: ${cliente.dni}`;
    document.getElementById(
        "peticion-cliente"
    ).textContent = `Petición: ${cliente.text}`;
}

// Función para terminar el turno de cliente
function finalizarTurno(clientes) {
    if (clientes.length > 0) {
        clientes.shift(); // Elimina el primer cliente (client[0])
        if (clientes.length > 0) {
            updateClientData(clientes[0]); // Actualiza la interfaz con el siguiente cliente
        } else {
            console.log("El día ha terminado, no quedan más clientes.");
        }
    } else {
        console.log("No hay más clientes en la fila.");
    }
}

// Exporta las funciones para su uso en otros archivos
export { showsimulador, hideSimulador, updateClientData, finalizarTurno };
