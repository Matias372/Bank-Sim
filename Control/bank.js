// bank.js

//================================================
// 1) CLASE Banco
//================================================
class Banco {
    constructor() {
        this.registroBanco = []; // Array para almacenar el registro bancario
    }

    //================================================
    // 2) MÉTODOS DE LA CLASE Banco
    //================================================

    generarRegistroBanco(cliente) {
        const registroCliente = {
            nombre: cliente.nombre,
            genero: cliente.genero,
            edad: cliente.edad,
            dni: cliente.dni,
            value: cliente.value || 0,
            tarjetaActivada: false,
        };

        this.registroBanco.push(registroCliente);
        console.log("Registro bancario generado:", registroCliente);
    }

    buscarCliente(dni) {
        return this.registroBanco.find((cliente) => cliente.dni === dni);
    }

    crearCuenta(cliente) {
        console.log(`Cuenta creada para ${cliente.nombre}.`);
    }

    cerrarCuenta(cliente) {
        console.log(`Cuenta cerrada para ${cliente.nombre}.`);
    }

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

    ingresarEfectivo(dni, monto) {
        const cliente = this.buscarCliente(dni);
        if (cliente) {
            cliente.value += monto;
            console.log(`Se han ingresado $${monto} para ${cliente.nombre}.`);
        } else {
            console.log("Cliente no encontrado.");
        }
    }

    transferirDinero(dni, monto) {
        const cliente = this.buscarCliente(dni);
        if (cliente) {
            console.log(`Se han transferido $${monto} para ${cliente.nombre}.`);
        } else {
            console.log("Cliente no encontrado.");
        }
    }

    activarTarjeta(dni) {
        const cliente = this.buscarCliente(dni);
        if (cliente) {
            cliente.tarjetaActivada = true;
            console.log(`Tarjeta activada para ${cliente.nombre}.`);
        } else {
            console.log("Cliente no encontrado.");
        }
    }

    desactivarTarjeta(dni) {
        const cliente = this.buscarCliente(dni);
        if (cliente) {
            cliente.tarjetaActivada = false;
            console.log(`Tarjeta desactivada para ${cliente.nombre}.`);
        } else {
            console.log("Cliente no encontrado.");
        }
    }

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

//================================================
// 3) EXPORTACIÓN DE LA CLASE
//================================================
export { Banco };
