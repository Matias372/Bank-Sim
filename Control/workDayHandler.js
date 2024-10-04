// workDayHandler.js
import { Cliente } from "./client.js"; // Asegúrate de que la ruta sea correcta

// Función para generar un array de clientes
function generarClientesPorDia(clientsPerDay) {
    const clientes = []; // Inicializar el array para almacenar los clientes

    // Generar la cantidad de clientes especificada
    for (let i = 0; i < clientsPerDay; i++) {
        const cliente = Cliente.generarCliente(); // Generar un cliente aleatorio
        clientes.push(cliente); // Añadir el cliente al array
    }

    return clientes; // Retornar el array de clientes
}

/* NOTA: generar funcion donde termine el turno de cliente, para que 
    updateClientData llame a client[0] para mostrar sus datos, asi que 
    necesitamos funcion que borre el client[0] y lo organice para que [1]
    pase a ser client[0] tambien necesitamos funcion detecto si client[0] es null
    significa que se termino el dia, se puede usar while para que se repita...*/

/* NOTA: generar funcion para trabajar la peticion, la parte de interfaz banco:
    -debe Consultar cliente (ver los datos de cliente registrado, solicita dni)
    -debe Rechazar o aceptar solicitud (solicita option para select motivo)
    -boton de operacion: 
        .crear cuenta 
        .extraer efectivo 
        .transferir dinero
        .desactivar tarjeta
        .etc  */

/* NOTA: generar funcion para verificar operacion.
 */

// Exportar la función para usarla en otros archivos
export { generarClientesPorDia };
