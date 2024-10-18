let clienteEncontrado;
const inputDiv = document.querySelector(".bank-interface__input");
import { actualizarCliente } from "./interfaz.js";
import { Cliente } from "./client.js";

//================================================
// 1) VALIDAR OPERACION
//================================================
export function validarOperacion(bank, cliente) {
    const tipoOperacion = document.getElementById("option").value;

    switch (tipoOperacion) {
        case "Buscar cliente":
            const dniBuscar = document.getElementById("dniBuscar").value;
            clienteEncontrado = bank.registroBanco.find(
                (c) => c.dni === dniBuscar
            );

            const resultadoDiv = document.createElement("p");

            if (clienteEncontrado) {
                const registroCliente = {
                    nombre: clienteEncontrado.nombre,
                    genero: clienteEncontrado.genero,
                    edad: clienteEncontrado.edad,
                    dni: clienteEncontrado.dni,
                    value: clienteEncontrado.value || 0,
                    tarjetaActivada: false,
                };

                resultadoDiv.innerHTML = `Cliente encontrado: <br>
                    Nombre: ${registroCliente.nombre} <br>
                    Género: ${registroCliente.genero} <br>
                    Edad: ${registroCliente.edad} <br>
                    DNI: ${registroCliente.dni} <br>
                    Saldo: ${registroCliente.value} <br>
                    Tarjeta Activada: ${
                        registroCliente.tarjetaActivada ? "Sí" : "No"
                    }`;
            } else {
                resultadoDiv.innerHTML =
                    "No hay registro del cliente con el DNI proporcionado.";
            }

            inputDiv.innerHTML = "";
            inputDiv.appendChild(resultadoDiv);
            break;

        case "Crear Cuenta":
            const nombreCrear = document.getElementById("nombreCrear").value;
            const dniCrear = document.getElementById("dniCrear").value;
            const generoCrear = document.getElementById("generoCrear").value;
            const edadCrear = document.getElementById("edadCrear").value;

            const existeCliente = bank.registroBanco.some(
                (c) => c.dni === dniCrear
            );

            const crearResultadoDiv = document.createElement("p");

            if (cliente.peticion !== "Crear Cuenta") {
                crearResultadoDiv.innerHTML =
                    "Petición inválida. No se puede crear la cuenta.";
            } else if (existeCliente) {
                crearResultadoDiv.innerHTML =
                    "Ya existe un cliente con este DNI.";
            } else {
                const nuevoCliente = new Cliente(
                    nombreCrear,
                    dniCrear,
                    generoCrear,
                    edadCrear
                );
                bank.generarRegistroBanco(nuevoCliente);
                crearResultadoDiv.innerHTML =
                    "Cuenta creada exitosamente para " + nombreCrear;

                setTimeout(() => {
                    nextClient(bank, cliente);
                }, 1000);
            }

            inputDiv.innerHTML = "";
            inputDiv.appendChild(crearResultadoDiv);
            break;

        case "Eliminar Cuenta":
            const dniEliminar = document.getElementById("dniEliminar").value;
            clienteEncontrado = bank.registroBanco.find(
                (c) => c.dni === dniEliminar
            );
            const eliminarResultadoDiv = document.createElement("p");

            if (clienteEncontrado) {
                if (
                    cliente.nombre !== clienteEncontrado.nombre ||
                    cliente.dni !== clienteEncontrado.dni ||
                    cliente.edad !== clienteEncontrado.edad
                ) {
                    eliminarResultadoDiv.innerHTML =
                        "Los datos del cliente son inválidos.";
                } else {
                    const index = bank.registroBanco.findIndex(
                        (c) => c.dni === dniEliminar
                    );

                    if (index !== -1) {
                        bank.registroBanco.splice(index, 1);
                        eliminarResultadoDiv.innerHTML =
                            "Cuenta eliminada exitosamente.";
                        setTimeout(() => {
                            nextClient(bank, cliente);
                        }, 1000);
                    } else {
                        eliminarResultadoDiv.innerHTML =
                            "No se encontró un cliente con este DNI.";
                    }
                }
            } else {
                eliminarResultadoDiv.innerHTML =
                    "No se encontró un cliente con este DNI.";
            }

            inputDiv.innerHTML = "";
            inputDiv.appendChild(eliminarResultadoDiv);
            break;

        case "Extraer Efectivo":
            const dniExtraer = document.getElementById("dniExtraer").value;
            const montoExtraer = parseFloat(
                document.getElementById("montoExtraer").value
            );

            const clienteEncontradoExtraer = bank.registroBanco.find(
                (c) => c.dni === dniExtraer
            );
            const extraerResultadoDiv = document.createElement("p");

            if (clienteEncontradoExtraer) {
                if (
                    cliente.nombre !== clienteEncontradoExtraer.nombre ||
                    cliente.dni !== clienteEncontradoExtraer.dni ||
                    cliente.edad !== clienteEncontradoExtraer.edad
                ) {
                    extraerResultadoDiv.innerHTML =
                        "Los datos del cliente son inválidos.";
                } else {
                    if (montoExtraer <= 0) {
                        extraerResultadoDiv.innerHTML =
                            "El monto a extraer debe ser mayor a cero.";
                    } else if (montoExtraer > clienteEncontradoExtraer.value) {
                        extraerResultadoDiv.innerHTML =
                            "Saldo insuficiente para realizar la extracción.";
                    } else {
                        clienteEncontradoExtraer.value -= montoExtraer;
                        extraerResultadoDiv.innerHTML = `Se han extraído $${montoExtraer} exitosamente. Saldo restante: $${clienteEncontradoExtraer.value}.`;
                        setTimeout(() => {
                            nextClient(bank, cliente);
                        }, 1000);
                    }
                }
            } else {
                extraerResultadoDiv.innerHTML =
                    "No se encontró un cliente con este DNI.";
            }

            inputDiv.innerHTML = "";
            inputDiv.appendChild(extraerResultadoDiv);
            break;

        case "Ingresar Efectivo":
            const dniIngresar = document.getElementById("dniIngresar").value;
            const montoIngresar = parseFloat(
                document.getElementById("montoIngresar").value
            );

            const clienteEncontradoIngresar = bank.registroBanco.find(
                (c) => c.dni === dniIngresar
            );
            const ingresarResultadoDiv = document.createElement("p");

            if (clienteEncontradoIngresar) {
                if (
                    cliente.nombre !== clienteEncontradoIngresar.nombre ||
                    cliente.dni !== clienteEncontradoIngresar.dni ||
                    cliente.edad !== clienteEncontradoIngresar.edad
                ) {
                    ingresarResultadoDiv.innerHTML =
                        "Los datos del cliente son inválidos.";
                } else {
                    if (montoIngresar <= 0) {
                        ingresarResultadoDiv.innerHTML =
                            "El monto a ingresar debe ser mayor a cero.";
                    } else {
                        clienteEncontradoIngresar.value += montoIngresar;
                        ingresarResultadoDiv.innerHTML = `Ingreso realizado. Nuevo saldo: $${clienteEncontradoIngresar.value}`;
                        setTimeout(() => {
                            nextClient(bank, cliente);
                        }, 1000);
                    }
                }
            } else {
                ingresarResultadoDiv.innerHTML =
                    "No se encontró un cliente con este DNI.";
            }

            inputDiv.innerHTML = "";
            inputDiv.appendChild(ingresarResultadoDiv);
            break;

        case "Transferir Dinero":
            const dniTransferir =
                document.getElementById("dniTransferir").value;
            const dniDestinoTransferir = document.getElementById(
                "dniDestinoTransferir"
            ).value;
            const montoTransferir = parseFloat(
                document.getElementById("montoTransferir").value
            );

            const clienteTransferir = bank.registroBanco.find(
                (c) => c.dni === dniTransferir
            );
            const clienteDestino = bank.registroBanco.find(
                (c) => c.dni === dniDestinoTransferir
            );
            const transferirResultadoDiv = document.createElement("p");

            if (clienteTransferir && clienteDestino) {
                if (
                    cliente.nombre !== clienteTransferir.nombre ||
                    cliente.dni !== clienteTransferir.dni ||
                    cliente.edad !== clienteTransferir.edad
                ) {
                    transferirResultadoDiv.innerHTML =
                        "Los datos del cliente remitente son inválidos.";
                } else {
                    if (montoTransferir <= 0) {
                        transferirResultadoDiv.innerHTML =
                            "El monto a transferir debe ser mayor a cero.";
                    } else if (clienteTransferir.value >= montoTransferir) {
                        clienteTransferir.value -= montoTransferir;
                        clienteDestino.value += montoTransferir;
                        transferirResultadoDiv.innerHTML = `Transferencia realizada. Nuevo saldo del remitente: $${clienteTransferir.value}. Nuevo saldo del destinatario: $${clienteDestino.value}.`;
                        setTimeout(() => {
                            nextClient(bank, cliente);
                        }, 1000);
                    } else {
                        transferirResultadoDiv.innerHTML =
                            "Saldo insuficiente para la transferencia.";
                    }
                }
            } else {
                transferirResultadoDiv.innerHTML =
                    "No se encontró el cliente remitente o destinatario.";
            }

            inputDiv.innerHTML = "";
            inputDiv.appendChild(transferirResultadoDiv);
            break;
        case "Activar Tarjeta":
            const dniActivar = document.getElementById("dniActivar").value;

            const clienteActivar = bank.registroBanco.find(
                (c) => c.dni === dniActivar
            );
            const activarResultadoDiv = document.createElement("p");

            if (clienteActivar) {
                if (
                    cliente.nombre !== clienteActivar.nombre ||
                    cliente.dni !== clienteActivar.dni ||
                    cliente.edad !== clienteActivar.edad
                ) {
                    activarResultadoDiv.innerHTML =
                        "Los datos del cliente son inválidos.";
                } else {
                    clienteActivar.tarjetaActivada = true; // Activar tarjeta
                    activarResultadoDiv.innerHTML =
                        "Tarjeta activada para " + clienteActivar.nombre;
                    setTimeout(() => {
                        nextClient(bank, cliente);
                    }, 1000);
                }
            } else {
                activarResultadoDiv.innerHTML =
                    "No se encontró un cliente con este DNI.";
            }

            inputDiv.innerHTML = "";
            inputDiv.appendChild(activarResultadoDiv);
            break;

        case "Desactivar Tarjeta":
            const dniDesactivar =
                document.getElementById("dniDesactivar").value;

            const clienteDesactivar = bank.registroBanco.find(
                (c) => c.dni === dniDesactivar
            );
            const desactivarResultadoDiv = document.createElement("p");

            if (clienteDesactivar) {
                if (
                    cliente.nombre !== clienteDesactivar.nombre ||
                    cliente.dni !== clienteDesactivar.dni ||
                    cliente.edad !== clienteDesactivar.edad
                ) {
                    desactivarResultadoDiv.innerHTML =
                        "Los datos del cliente son inválidos.";
                } else {
                    clienteDesactivar.tarjetaActivada = false; // Desactivar tarjeta
                    desactivarResultadoDiv.innerHTML =
                        "Tarjeta desactivada para " + clienteDesactivar.nombre;
                    setTimeout(() => {
                        nextClient(bank, cliente);
                    }, 1000);
                }
            } else {
                desactivarResultadoDiv.innerHTML =
                    "No se encontró un cliente con este DNI.";
            }

            inputDiv.innerHTML = "";
            inputDiv.appendChild(desactivarResultadoDiv);
            break;

        case "Datos invalidos":
            const dniInvalidos = cliente.dni; // Usar el DNI del cliente actual
            const clienteInvalidos = bank.registroBanco.find(
                (c) => c.dni === dniInvalidos
            );
            const datosInvalidosResultadoDiv = document.createElement("p");

            if (clienteInvalidos) {
                if (
                    clienteInvalidos.nombre !== cliente.nombre ||
                    clienteInvalidos.edad !== cliente.edad
                ) {
                    datosInvalidosResultadoDiv.innerHTML =
                        "Se rechazó correctamente.";
                    setTimeout(() => {
                        nextClient(bank, cliente);
                    }, 1000);
                } else {
                    datosInvalidosResultadoDiv.innerHTML =
                        "Se rechazó incorrectamente.";
                }
            } else {
                datosInvalidosResultadoDiv.innerHTML =
                    "No se encontró un cliente con este DNI.";
            }

            inputDiv.innerHTML = "";
            inputDiv.appendChild(datosInvalidosResultadoDiv);
            break;

        case "Monto insuficiente":
            const dniMontoInsuficiente = document.getElementById(
                "dniMontoInsuficiente"
            ).value; // Obtener el DNI
            const clienteMontoInsuficiente = bank.registroBanco.find(
                (c) => c.dni === dniMontoInsuficiente
            );
            const montoInsuficienteResultadoDiv = document.createElement("p");

            if (clienteMontoInsuficiente) {
                // Verificar si el valor del cliente es mayor que el saldo del banco
                if (cliente.value > bank.registroBanco.value) {
                    // Asegúrate de que "value" es el atributo correcto
                    montoInsuficienteResultadoDiv.innerHTML =
                        "Se rechazó correctamente.";
                    nextClient(bank, cliente);
                } else {
                    montoInsuficienteResultadoDiv.innerHTML =
                        "Se rechazó incorrectamente.";
                }
            } else {
                montoInsuficienteResultadoDiv.innerHTML =
                    "No se encontró un cliente con este DNI.";
            }

            inputDiv.innerHTML = "";
            inputDiv.appendChild(montoInsuficienteResultadoDiv);
            break;

        default:
            console.log("Los datos de la validación no son correctos."); // Mensaje en la consola
            const defaultResultadoDiv = document.createElement("p");
            defaultResultadoDiv.innerHTML =
                "Los datos de la validación no son correctos.";
            inputDiv.innerHTML = ""; // Limpiar el div
            inputDiv.appendChild(defaultResultadoDiv); // Mostrar mensaje en la interfaz
            break;
    }
}
// Función para pasar al siguiente cliente
export function nextClient(bank, cliente) {
    cliente = Cliente.generarCliente();
    if (cliente && cliente.reqbank === true) {
        bank.generarRegistroBanco(cliente); // Genera el registro bancario para un solo cliente
    }
    actualizarCliente(cliente);
}
