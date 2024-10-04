const headerContent = document.querySelector("header");
const mainContent = document.querySelector("main");
const footerContent = document.querySelector("footer");

// Muestra la interfaz del simulador
function showsimulador() {
    headerContent.style.display = "none";
    mainContent.style.display = "block";
    footerContent.style.display = "block";
}

// Oculta la interfaz del simulador y muestra el encabezado
function hideSimulador() {
    mainContent.style.display = "none";
    footerContent.style.display = "none";
    headerContent.style.display = "block";
}

// Actualiza los datos del cliente en la interfaz
function updateClientData(cliente) {
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
    ).textContent = `Petición: ${cliente.peticion}`;
}

// Actualiza el resultado de la petición
function updateResult(result) {
    document.getElementById(
        "resultado-peticion"
    ).textContent = `Resultado: ${result}`;
}

// Exporta las funciones para su uso en otros archivos
export { showsimulador, hideSimulador, updateClientData, updateResult };
