// InputHandler.js

// Función para validar la operación con respecto al cliente y el banco
function validarOperacion(cliente, tipoOperacion, dni, dni_destino) {
    // Verificar si el DNI ingresado coincide con el del cliente actual
    if (cliente.dni !== dni) {
        console.log("DNI incorrecto para el cliente actual.");
        return { valido: false, mensaje: "DNI no coincide con el cliente." };
    }

    // Validar según el tipo de operación seleccionado
    switch (tipoOperacion) {
        case "Crear Cuenta":
            // Verificar que la petición del cliente sea "Crear Cuenta"
            if (cliente.peticion !== "Crear Cuenta") {
                return {
                    valido: false,
                    mensaje: "La petición del cliente no es 'Crear Cuenta'.",
                };
            }

            // Obtener los datos ingresados del formulario
            const nombre = document.getElementById("nombreCrear").value;
            const dniCrear = document.getElementById("dniCrear").value;
            const genero = document.getElementById("generoCrear").value;
            const edad = document.getElementById("edadCrear").value;

            // Validar que todos los campos no estén vacíos
            if (!nombre || !dniCrear || !genero || !edad) {
                return {
                    valido: false,
                    mensaje: "Todos los campos son obligatorios.",
                };
            }

            // Validar que el DNI sea un número
            if (isNaN(dniCrear) || dniCrear.length < 7) {
                return {
                    valido: false,
                    mensaje:
                        "El DNI debe ser un número válido con al menos 7 dígitos.",
                };
            }

            // Validar que la edad sea un número y mayor de 18 años
            if (isNaN(edad) || edad < 18) {
                return {
                    valido: false,
                    mensaje: "La edad debe ser un número y mayor o igual a 18.",
                };
            }

            // Si todo está bien, devolver que la validación fue exitosa
            return {
                valido: true,
                mensaje: "Validación de creación de cuenta exitosa.",
            };
            break;
        case "Cerrar Cuenta":
            // Verificar que la petición del cliente sea "Cerrar Cuenta"
            if (cliente.peticion !== "Cerrar Cuenta") {
                return {
                    valido: false,
                    mensaje: "La petición del cliente no es 'Cerrar Cuenta'.",
                };
            }

            // Obtener los datos del formulario relacionados con el cierre de cuenta
            const dniCerrar = document.getElementById("dniCerrar").value;
            const confirmar =
                document.getElementById("confirmarCerrar").checked; // Suponiendo que hay una casilla de verificación para confirmar el cierre

            // Validar que el DNI esté ingresado y sea válido
            if (!dniCerrar || isNaN(dniCerrar) || dniCerrar.length < 7) {
                return {
                    valido: false,
                    mensaje:
                        "El DNI debe ser un número válido con al menos 7 dígitos.",
                };
            }

            // Validar que el cliente haya confirmado el cierre de cuenta
            if (!confirmar) {
                return {
                    valido: false,
                    mensaje: "Debes confirmar el cierre de la cuenta.",
                };
            }

            // Validar que el saldo del cliente esté en cero antes de cerrar la cuenta
            if (cliente.value > 0) {
                return {
                    valido: false,
                    mensaje:
                        "No se puede cerrar la cuenta con saldo pendiente.",
                };
            }

            // Validar si la cuenta está activa
            if (!cliente.cuentaActiva) {
                return {
                    valido: false,
                    mensaje: "La cuenta ya está inactiva.",
                };
            }

            // Si todo está bien, devolver que la validación fue exitosa
            return {
                valido: true,
                mensaje: "Validación de cierre de cuenta exitosa.",
            };

            break;
        case "Extraer Efectivo":
            // Verificar que la petición del cliente sea "Extraer Efectivo"
            if (cliente.peticion !== "Extraer Efectivo") {
                return {
                    valido: false,
                    mensaje:
                        "La petición del cliente no es 'Extraer Efectivo'.",
                };
            }

            // Obtener los datos del formulario relacionados con la extracción
            const montoExtraer = document.getElementById("montoExtraer").value;

            // Validar que el monto no esté vacío y sea un número
            if (!montoExtraer || isNaN(montoExtraer) || montoExtraer <= 0) {
                return {
                    valido: false,
                    mensaje: "Debes ingresar un monto válido para extraer.",
                };
            }

            // Convertir el monto ingresado a número
            const monto = parseFloat(montoExtraer);

            // Validar que el monto no sea mayor al saldo del cliente
            if (monto > cliente.value) {
                return {
                    valido: false,
                    mensaje: "El monto supera el saldo disponible del cliente.",
                };
            }

            // Validar que el monto no sea mayor al saldo del banco
            if (monto > bank.value) {
                return {
                    valido: false,
                    mensaje:
                        "Fondos insuficientes en el banco para realizar esta operación.",
                };
            }

            // Si todo está bien, devolver que la validación fue exitosa
            return {
                valido: true,
                mensaje: "Validación de extracción exitosa.",
            };
            break;

        case "Ingresar Efectivo":
            // Verificar que la petición del cliente sea "Ingresar Efectivo"
            if (cliente.peticion !== "Ingresar Efectivo") {
                return {
                    valido: false,
                    mensaje:
                        "La petición del cliente no es 'Ingresar Efectivo'.",
                };
            }

            // Obtener el monto de ingreso desde el formulario
            const montoIngresar =
                document.getElementById("montoIngresar").value;

            // Validar que el monto no esté vacío y sea un número
            if (!montoIngresar || isNaN(montoIngresar) || montoIngresar <= 0) {
                return {
                    valido: false,
                    mensaje: "Debes ingresar un monto válido para ingresar.",
                };
            }

            // Si todo está bien, devolver que la validación fue exitosa
            return {
                valido: true,
                mensaje: "Validación de ingreso de efectivo exitosa.",
            };
            break;

        case "Transferir Dinero":
            // Verificar que la petición del cliente sea "Transferir Dinero"
            if (cliente.peticion !== "Transferir Dinero") {
                return {
                    valido: false,
                    mensaje:
                        "La petición del cliente no es 'Transferir Dinero'.",
                };
            }

            // Obtener el monto de transferencia desde el formulario
            const montoTransferir =
                document.getElementById("montoTransferir").value;

            // Validar que el monto no esté vacío y sea un número
            if (
                !montoTransferir ||
                isNaN(montoTransferir) ||
                montoTransferir <= 0
            ) {
                return {
                    valido: false,
                    mensaje: "Debes ingresar un monto válido para transferir.",
                };
            }

            // Verificar que el monto no exceda el saldo disponible del cliente
            if (montoTransferir > cliente.value) {
                return {
                    valido: false,
                    mensaje:
                        "Fondos insuficientes para realizar la transferencia.",
                };
            }

            // Validar que se haya proporcionado el DNI destino
            if (!dni_destino) {
                return { valido: false, mensaje: "DNI destino faltante." };
            }

            // Si todo está bien, devolver que la validación fue exitosa
            return {
                valido: true,
                mensaje: "Validación de transferencia de dinero exitosa.",
            };
            break;

        case "Activar Tarjeta":
            // Verificar que la petición del cliente sea "Activar Tarjeta"
            if (cliente.peticion !== "Activar Tarjeta") {
                return {
                    valido: false,
                    mensaje: "La petición del cliente no es 'Activar Tarjeta'.",
                };
            }

            // Verificar que la tarjeta no esté ya activada
            if (cliente.tarjetaActivada) {
                return {
                    valido: false,
                    mensaje: "La tarjeta ya está activada.",
                };
            }

            // Si todo está bien, devolver que la validación fue exitosa
            return {
                valido: true,
                mensaje: "Validación para activar tarjeta exitosa.",
            };
            break;

        case "Desactivar Tarjeta":
            // Verificar que la petición del cliente sea "Desactivar Tarjeta"
            if (cliente.peticion !== "Desactivar Tarjeta") {
                return {
                    valido: false,
                    mensaje:
                        "La petición del cliente no es 'Desactivar Tarjeta'.",
                };
            }

            // Verificar que la tarjeta esté actualmente activada
            if (!cliente.tarjetaActivada) {
                return {
                    valido: false,
                    mensaje: "La tarjeta ya está desactivada.",
                };
            }

            // Si todo está bien, devolver que la validación fue exitosa
            return {
                valido: true,
                mensaje: "Validación para desactivar tarjeta exitosa.",
            };

            break;

        case "Rechazar Petición":
            // Obtener el motivo del input
            const motivoRechazo =
                document.getElementById("motivoRechazo").value;

            // Validar según el motivo de rechazo
            switch (motivoRechazo) {
                case "Datos invalidos":
                    // Verificar que cliente.sus sea igual a true
                    if (!cliente.sus) {
                        return {
                            valido: false,
                            mensaje:
                                "El cliente no es sospechoso (cliente.sus = false).",
                        };
                    }
                    break;

                case "Monto insuficiente":
                    // Verificar que cliente.value sea mayor que bank.value
                    if (cliente.value > bank.value) {
                        return {
                            valido: false,
                            mensaje:
                                "El monto del cliente no excede el del banco.",
                        };
                    }
                    break;

                default:
                    return {
                        valido: false,
                        mensaje: "Motivo de rechazo no válido.",
                    };
            }

            // Si todo está bien, devolver que la validación fue exitosa
            return {
                valido: true,
                mensaje: "Validación de rechazo de petición exitosa.",
            };

            break;

        default:
            return { valido: false, mensaje: "Operación no válida." };
    }

    // Si la validación es exitosa
    return { valido: true, mensaje: "Validación exitosa." };
}
