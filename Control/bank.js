// bank.js
class Banco {
    constructor() {
        this.registroBanco = []; // Array para almacenar el registro bancario
    }

    // Método para crear un registro bancario a partir de un array de clientes
    generarRegistroBanco(clientes) {
        // Recorremos cada cliente y guardamos la información en el registro
        this.registroBanco = clientes.map((cliente) => ({
            nombre: cliente.nombre,
            genero: cliente.genero,
            edad: cliente.edad,
            dni: cliente.dni,
        }));

        // Opciónal: imprimir el registro generado para verificar
        console.log("Registro bancario generado:", this.registroBanco);
    }

    // Método para crear una cuenta
    crearCuenta(cliente) {
        // Lógica para crear una cuenta
        console.log(`Cuenta creada para ${cliente.nombre}.`);
        // Agregar lógica adicional según sea necesario, como guardar la cuenta en una base de datos
    }

    // Método para cerrar una cuenta
    cerrarCuenta(cliente) {
        // Lógica para cerrar una cuenta
        console.log(`Cuenta cerrada para ${cliente.nombre}.`);
        // Agregar lógica adicional según sea necesario
    }

    // Método para extraer efectivo
    extraerEfectivo(cliente) {
        // Lógica para extraer efectivo
        console.log(`Se han extraído ${cliente.value} para ${cliente.nombre}.`);
        // Verificar saldo y realizar la operación de extracción
    }

    // Método para ingresar efectivo
    ingresarEfectivo(cliente) {
        // Lógica para ingresar efectivo
        console.log(
            `Se han ingresado ${cliente.value} para ${cliente.nombre}.`
        );
        // Agregar lógica adicional según sea necesario
    }

    // Método para transferir dinero
    transferirDinero(cliente) {
        // Lógica para transferir dinero
        console.log(
            `Se han transferido ${cliente.value} para ${cliente.nombre}.`
        );
        // Agregar lógica adicional para manejar la transferencia
    }

    // Método para activar una tarjeta
    activarTarjeta(cliente) {
        // Lógica para activar una tarjeta
        console.log(`Tarjeta activada para ${cliente.nombre}.`);
        // Agregar lógica adicional según sea necesario
    }

    // Método para desactivar una tarjeta
    desactivarTarjeta(cliente) {
        // Lógica para desactivar una tarjeta
        console.log(`Tarjeta desactivada para ${cliente.nombre}.`);
        // Agregar lógica adicional según sea necesario
    }

    rechazarPeticion(cliente, razon) {
        const opcionesRechazo = [
            "Datos incorrectos",
            "Cliente sospechoso",
            "Falta de documentos",
            "No se puede procesar en este momento",
        ];

        // Generar un mensaje de rechazo
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
