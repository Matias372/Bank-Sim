// bank.js
class Banco {
    constructor() {
        this.registroBanco = []; // Array para almacenar el registro bancario
    }

    // Método para crear un registro bancario a partir de un cliente
    generarRegistroBanco(cliente) {
        const registroCliente = {
            nombre: cliente.nombre,
            genero: cliente.genero,
            edad: cliente.edad,
            dni: cliente.dni,
            value: cliente.value || 0, // Asegura que el cliente tenga un saldo inicial
            tarjetaActivada: false, // Inicializa el estado de la tarjeta
        };

        // Agregar el registro del cliente al registro bancario
        this.registroBanco.push(registroCliente);
        console.log("Registro bancario generado:", registroCliente);
    }

    // Método para buscar un cliente por DNI
    buscarCliente(dni) {
        return this.registroBanco.find((cliente) => cliente.dni === dni);
    }

    // Método para crear una cuenta
    crearCuenta(cliente) {
        // Aquí podrías agregar la lógica necesaria para crear la cuenta
        console.log(`Cuenta creada para ${cliente.nombre}.`);
    }

    // Método para cerrar una cuenta
    cerrarCuenta(cliente) {
        // Aquí podrías agregar la lógica necesaria para cerrar la cuenta
        console.log(`Cuenta cerrada para ${cliente.nombre}.`);
    }

    // Método para extraer efectivo
    extraerEfectivo(dni, monto) {
        const cliente = this.buscarCliente(dni);
        if (cliente) {
            if (monto <= cliente.value) {
                cliente.value -= monto;
                console.log(
                    `Se han extraído $${monto} para ${cliente.nombre}.`
                );
            } else {
                console.log(
                    "Fondos insuficientes para realizar esta operación."
                );
            }
        } else {
            console.log("Cliente no encontrado.");
        }
    }

    // Método para ingresar efectivo
    ingresarEfectivo(dni, monto) {
        const cliente = this.buscarCliente(dni);
        if (cliente) {
            cliente.value += monto;
            console.log(`Se han ingresado $${monto} para ${cliente.nombre}.`);
        } else {
            console.log("Cliente no encontrado.");
        }
    }

    // Método para transferir dinero
    transferirDinero(dni, monto) {
        const cliente = this.buscarCliente(dni);
        if (cliente) {
            // Lógica para transferir dinero (podrías agregar lógica adicional)
            console.log(`Se han transferido $${monto} para ${cliente.nombre}.`);
        } else {
            console.log("Cliente no encontrado.");
        }
    }

    // Método para activar una tarjeta
    activarTarjeta(dni) {
        const cliente = this.buscarCliente(dni);
        if (cliente) {
            cliente.tarjetaActivada = true;
            console.log(`Tarjeta activada para ${cliente.nombre}.`);
        } else {
            console.log("Cliente no encontrado.");
        }
    }

    // Método para desactivar una tarjeta
    desactivarTarjeta(dni) {
        const cliente = this.buscarCliente(dni);
        if (cliente) {
            cliente.tarjetaActivada = false;
            console.log(`Tarjeta desactivada para ${cliente.nombre}.`);
        } else {
            console.log("Cliente no encontrado.");
        }
    }

    // Método para rechazar una petición
    rechazarPeticion(cliente, razon) {
        const opcionesRechazo = [
            "Datos incorrectos",
            "Cliente sospechoso",
            "Falta de documentos",
            "No se puede procesar en este momento",
        ];

        const mensajeRechazo = {
            cliente: cliente.nombre,
            dni: cliente.dni,
            razon:
                razon ||
                opcionesRechazo[
                    Math.floor(Math.random() * opcionesRechazo.length)
                ],
        };

        console.log("Petición rechazada:", mensajeRechazo);
        return mensajeRechazo;
    }
}

// Exportar la clase para usarla en otros archivos
export { Banco };
