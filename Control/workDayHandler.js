import { Cliente } from "./client.js"; // Importar la clase Cliente

// Función para generar clientes por día
function generarClientesPorDia(clientsPerDay) {
    const clientes = [];
    for (let i = 0; i < clientsPerDay; i++) {
        const cliente = Cliente.generarCliente();
        console.log(`Cliente generado: ${JSON.stringify(cliente)}`);
        clientes.push(cliente);
    }
    return clientes; // Retorna la lista de clientes generada
}

// Función para consultar cliente por DNI
function consultarCliente(clientes, dni) {
    const cliente = clientes.find((c) => c.dni === dni);
    if (cliente) {
        return cliente; // Devuelve los datos del cliente encontrado
    } else {
        return "Cliente no encontrado.";
    }
}

// Función para rechazar solicitud del cliente
function rechazarSolicitud(cliente, motivo) {
    cliente.solicitudRechazada = true;
    cliente.motivoRechazo = motivo; // Asigna el motivo de rechazo
    return `La solicitud de ${cliente.nombre} ha sido rechazada por el motivo: ${motivo}`;
}

// Función para procesar operaciones
function procesarOperacion(cliente, tipoOperacion, monto = 0) {
    let resultado = "";

    switch (tipoOperacion) {
        case "crear cuenta":
            resultado = `Cuenta creada para ${cliente.nombre}.`;
            break;
        case "cerrar cuenta":
            resultado = `Cuenta de ${cliente.nombre} cerrada.`;
            break;
        case "extraer efectivo":
            if (monto <= cliente.value) {
                resultado = `${cliente.nombre} ha retirado $${monto}.`;
            } else {
                resultado =
                    "Fondos insuficientes para realizar esta operación.";
            }
            break;
        case "ingresar efectivo":
            cliente.value += monto;
            resultado = `${cliente.nombre} ha ingresado $${monto}.`;
            break;
        case "transferir dinero":
            resultado = `${cliente.nombre} ha transferido $${monto}.`;
            break;
        case "activar tarjeta":
            resultado = `Tarjeta de ${cliente.nombre} activada.`;
            break;
        case "desactivar tarjeta":
            resultado = `Tarjeta de ${cliente.nombre} desactivada.`;
            break;
        default:
            resultado = "Operación no válida.";
    }

    return resultado;
}

// Función para verificar la operación (identificación y valor)
function verificarOperacion(cliente, codigoOperacion, monto) {
    const operacionEsperada = cliente.peticion.split(" ")[0]; // Obtener el tipo de operación (como 'extraer' de 'extraer efectivo')
    const codigoEsperado = `${operacionEsperada.charAt(0).toUpperCase()}.E.${
        cliente.value
    }`;

    if (codigoOperacion === codigoEsperado && monto === cliente.value) {
        return "Operación verificada con éxito.";
    } else {
        return "Error en la verificación de la operación.";
    }
}

// Función para iniciar el ciclo del día con clientes generados
function iniciarDiaBanco(clientes) {
    let turnoActivo = true;

    while (turnoActivo && clientes.length > 0) {
        const clienteActual = clientes[0];
        console.log(`Atendiendo a ${clienteActual.nombre}`);

        // Aquí puedes integrar la lógica de interfaz de banco (opciones, botones, etc.)

        // Terminar el turno del cliente y pasar al siguiente
        finalizarTurno(clientes);

        if (clientes.length === 0) {
            turnoActivo = false;
            console.log("Se han atendido todos los clientes del día.");
        }
    }
}

// Exportar funciones
export {
    generarClientesPorDia,
    consultarCliente,
    rechazarSolicitud,
    procesarOperacion,
    verificarOperacion,
    iniciarDiaBanco,
};

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

/* NOTA: darle a las operaciones un codigo numerico, de forma que cuando 
se realiza una operacion se verifica si es la que se espera para completar
el cliente. que tenga un identificador de operacion y valor para que verifique el
estado de la operacion. "R.E.2500"==> Requerimiento, Extraer, $2500 asi se verifica
en la peticion de cliente que sea la misma y que el valor sea igual al value de cliente */

/*
Simulador de Banco
├── Menú Principal
│   ├── Consultar Cliente
│   │   ├── Ingresar DNI
│   │   ├── Botón "Buscar"
│   │   └── Resultado: Mostrar datos del cliente
│   ├── Crear Cuenta
│   │   ├── Ingresar datos del cliente (nombre, género, edad, dni)
│   │   ├── Botón "Crear Cuenta"
│   │   └── Resultado: Confirmación de creación
│   ├── Cerrar Cuenta
│   │   ├── Ingresar DNI
│   │   ├── Botón "Cerrar Cuenta"
│   │   └── Resultado: Confirmación de cierre
│   ├── Realizar Operaciones
│   │   ├── Extraer Efectivo
│   │   │   ├── Ingresar DNI
│   │   │   ├── Ingresar Monto
│   │   │   └── Botón "Extraer"
│   │   ├── Ingresar Efectivo
│   │   │   ├── Ingresar DNI
│   │   │   ├── Ingresar Monto
│   │   │   └── Botón "Ingresar"
│   │   ├── Transferir Dinero
│   │   │   ├── Ingresar DNI de origen
│   │   │   ├── Ingresar DNI de destino
│   │   │   ├── Ingresar Monto
│   │   │   └── Botón "Transferir"
│   │   ├── Activar Tarjeta
│   │   │   ├── Ingresar DNI
│   │   │   └── Botón "Activar"
│   │   └── Desactivar Tarjeta
│   │       ├── Ingresar DNI
│   │       └── Botón "Desactivar"
│   ├── Rechazar Petición
│   │   ├── Ingresar DNI
│   │   ├── Seleccionar Motivo (con <select>)
│   │   ├── Botón "Rechazar"
│   │   └── Resultado: Confirmación de rechazo
│   └── Salir
└── Base de Datos
    ├── Buscar Cliente
    ├── Agregar Cliente
    ├── Modificar Cliente
    └── Eliminar Cliente
    
    la Base de datos seria la clase Banco que tiene generarRegistroBanco donde 
    genera la lista de los clientes del dia.*/
