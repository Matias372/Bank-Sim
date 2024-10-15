let clienteEncontrado;
const inputDiv = document.querySelector(".bank-interface__input");
import { actualizarCliente } from "./interfaz.js";

export function validarOperacion(bank, cliente) {
    const tipoOperacion = document.getElementById("option").value;

    switch (tipoOperacion) {
        case "Buscar cliente":
            const dniBuscar = document.getElementById("dniBuscar").value; // Obtener el DNI ingresado
            clienteEncontrado = bank.registroBanco.find(
                (c) => c.dni === dniBuscar // Usar 'c' para representar cada cliente en el registro
            ); // Buscar cliente en el registro

            const resultadoDiv = document.createElement("p"); // Crear un elemento <p> para mostrar el resultado
            // Obtener el div donde se mostrará el resultado

            if (clienteEncontrado) {
                // Si se encuentra al cliente
                const registroCliente = {
                    nombre: clienteEncontrado.nombre,
                    genero: clienteEncontrado.genero,
                    edad: clienteEncontrado.edad,
                    dni: clienteEncontrado.dni,
                    value: clienteEncontrado.value || 0, // Asegura que el cliente tenga un saldo inicial
                    tarjetaActivada: false, // Inicializa el estado de la tarjeta
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
                // Si no se encuentra al cliente
                resultadoDiv.innerHTML =
                    "No hay registro del cliente con el DNI proporcionado.";
            }

            // Limpiar contenido previo y agregar el resultado
            inputDiv.innerHTML = ""; // Limpiar el div donde se ingresan los datos
            inputDiv.appendChild(resultadoDiv); // Agregar el resultado al div
            break;
        case "Crear Cuenta":
            const nombreCrear = document.getElementById("nombreCrear").value;
            const dniCrear = document.getElementById("dniCrear").value;
            const generoCrear = document.getElementById("generoCrear").value;
            const edadCrear = document.getElementById("edadCrear").value;

            // Validar que el DNI no esté ya registrado
            const existeCliente = bank.registroBanco.some(
                (c) => c.dni === dniCrear
            );

            const crearResultadoDiv = document.createElement("p");

            // Verificar que la petición del cliente sea la correcta
            if (cliente.peticion !== "Crear Cuenta") {
                crearResultadoDiv.innerHTML =
                    "Petición inválida. No se puede crear la cuenta.";
            } else if (existeCliente) {
                crearResultadoDiv.innerHTML =
                    "Ya existe un cliente con este DNI.";
            } else {
                // Crear el nuevo cliente
                const nuevoCliente = new Cliente(
                    nombreCrear,
                    dniCrear,
                    generoCrear,
                    edadCrear
                );
                bank.generarRegistroBanco(nuevoCliente); // Agregar cliente al banco
                crearResultadoDiv.innerHTML =
                    "Cuenta creada exitosamente para " + nombreCrear;

                setInterval(() => {
                    nextClient(bank, cliente);
                }, 1000);
            }

            inputDiv.innerHTML = "";
            inputDiv.appendChild(crearResultadoDiv);
            break;

        case "Eliminar Cuenta":
            const dniEliminar = document.getElementById("dniEliminar").value;

            // Buscar el cliente en el registro
            clienteEncontrado = bank.registroBanco.find(
                (c) => c.dni === dniEliminar
            );
            const eliminarResultadoDiv = document.createElement("p");

            // Validar que se haya encontrado el cliente
            if (clienteEncontrado) {
                // Verificar que los datos del cliente coincidan
                if (
                    cliente.nombre !== clienteEncontrado.nombre ||
                    cliente.dni !== clienteEncontrado.dni ||
                    cliente.edad !== clienteEncontrado.edad
                ) {
                    eliminarResultadoDiv.innerHTML =
                        "Los datos del cliente son inválidos.";
                } else {
                    // Si los datos son válidos, proceder a eliminar
                    const index = bank.registroBanco.findIndex(
                        (c) => c.dni === dniEliminar
                    );

                    if (index !== -1) {
                        bank.registroBanco.splice(index, 1); // Eliminar cliente
                        eliminarResultadoDiv.innerHTML =
                            "Cuenta eliminada exitosamente.";
                        setInterval(() => {
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

            // Buscar el cliente en el registro
            const clienteEncontradoExtraer = bank.registroBanco.find(
                (c) => c.dni === dniExtraer
            );
            const extraerResultadoDiv = document.createElement("p");

            // Validar que se haya encontrado el cliente
            if (clienteEncontradoExtraer) {
                // Verificar que los datos del cliente coincidan
                if (
                    cliente.nombre !== clienteEncontradoExtraer.nombre ||
                    cliente.dni !== clienteEncontradoExtraer.dni ||
                    cliente.edad !== clienteEncontradoExtraer.edad
                ) {
                    extraerResultadoDiv.innerHTML =
                        "Los datos del cliente son inválidos.";
                } else {
                    // Verificar que el monto a extraer sea válido
                    if (montoExtraer <= 0) {
                        extraerResultadoDiv.innerHTML =
                            "El monto a extraer debe ser mayor a cero.";
                    } else if (montoExtraer > clienteEncontradoExtraer.value) {
                        // Verificar si el saldo es suficiente
                        extraerResultadoDiv.innerHTML =
                            "Saldo insuficiente para realizar la extracción.";
                    } else {
                        // Si todo es válido, proceder a realizar la extracción
                        clienteEncontradoExtraer.value -= montoExtraer; // Reducir el saldo del cliente
                        extraerResultadoDiv.innerHTML = `Se han extraído $${montoExtraer} exitosamente. Saldo restante: $${clienteEncontradoExtraer.value}.`;
                        setInterval(() => {
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

            // Buscar el cliente en el registro
            const clienteEncontradoIngresar = bank.registroBanco.find(
                (c) => c.dni === dniIngresar
            );
            const ingresarResultadoDiv = document.createElement("p");

            // Validar que se haya encontrado el cliente
            if (clienteEncontradoIngresar) {
                // Verificar que los datos del cliente coincidan
                if (
                    cliente.nombre !== clienteEncontradoIngresar.nombre ||
                    cliente.dni !== clienteEncontradoIngresar.dni ||
                    cliente.edad !== clienteEncontradoIngresar.edad
                ) {
                    ingresarResultadoDiv.innerHTML =
                        "Los datos del cliente son inválidos.";
                } else {
                    // Verificar que el monto a ingresar sea válido
                    if (montoIngresar <= 0) {
                        ingresarResultadoDiv.innerHTML =
                            "El monto a ingresar debe ser mayor a cero.";
                    } else {
                        // Si todo es válido, proceder a realizar el ingreso
                        clienteEncontradoIngresar.value += montoIngresar; // Actualizar saldo
                        ingresarResultadoDiv.innerHTML = `Ingreso realizado. Nuevo saldo: $${clienteEncontradoIngresar.value}`;
                        setInterval(() => {
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

            // Buscar los clientes en el registro
            const clienteTransferir = bank.registroBanco.find(
                (c) => c.dni === dniTransferir
            );
            const clienteDestino = bank.registroBanco.find(
                (c) => c.dni === dniDestinoTransferir
            );
            const transferirResultadoDiv = document.createElement("p");

            // Validar que se haya encontrado ambos clientes
            if (clienteTransferir && clienteDestino) {
                // Verificar que los datos del cliente remitente coincidan
                if (
                    cliente.nombre !== clienteTransferir.nombre ||
                    cliente.dni !== clienteTransferir.dni ||
                    cliente.edad !== clienteTransferir.edad
                ) {
                    transferirResultadoDiv.innerHTML =
                        "Los datos del cliente remitente son inválidos.";
                } else {
                    // Verificar que el monto a transferir sea válido
                    if (montoTransferir <= 0) {
                        transferirResultadoDiv.innerHTML =
                            "El monto a transferir debe ser mayor a cero.";
                    } else if (clienteTransferir.value >= montoTransferir) {
                        // Realizar la transferencia
                        clienteTransferir.value -= montoTransferir; // Restar del saldo del remitente
                        clienteDestino.value += montoTransferir; // Sumar al saldo del destinatario
                        transferirResultadoDiv.innerHTML = `Transferencia realizada. Nuevo saldo del remitente: $${clienteTransferir.value}. Nuevo saldo del destinatario: $${clienteDestino.value}.`;
                        setInterval(() => {
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

            // Validar que se haya encontrado el cliente
            if (clienteActivar) {
                // Verificar que los datos del cliente coincidan
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
                    setInterval(() => {
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

            // Validar que se haya encontrado el cliente
            if (clienteDesactivar) {
                // Verificar que los datos del cliente coincidan
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
                    setInterval(() => {
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
            const dniInvalidos = document.getElementById(
                "dniMontoInsuficiente"
            ).value; // Suponiendo que estás utilizando este campo para verificar
            const clienteInvalidos = bank.registroBanco.find(
                (c) => c.dni === dniInvalidos
            );
            const datosInvalidosResultadoDiv = document.createElement("p");

            if (clienteInvalidos) {
                // Aquí podrías comparar otros datos del cliente como nombre, edad, etc.
                const nombreInvalidos =
                    document.getElementById("nombreInvalidos").value; // Asegúrate de tener este input en tu HTML
                const edadInvalidos = parseInt(
                    document.getElementById("edadInvalidos").value
                ); // Asegúrate de tener este input en tu HTML

                // Verificar si los datos son diferentes
                if (
                    clienteInvalidos.nombre !== nombreInvalidos ||
                    clienteInvalidos.edad !== edadInvalidos
                ) {
                    datosInvalidosResultadoDiv.innerHTML =
                        "Se rechazó correctamente.";
                    setInterval(() => {
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
                // Comparar el saldo del cliente con el valor en el registro del banco
                if (clienteMontoInsuficiente.value < 0) {
                    // Si el saldo del cliente es negativo, consideramos que es un rechazo correcto
                    montoInsuficienteResultadoDiv.innerHTML =
                        "Se rechazó correctamente.";
                    nextClient(bank, cliente);
                } else {
                    // Si el saldo del cliente es cero o positivo, consideramos que es un rechazo incorrecto
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

export function nextClient(bank, cliente) {
    cliente = Cliente.generarCliente();
    if (cliente && cliente.reqbank === true) {
        bank.generarRegistroBanco(cliente); // Genera el registro bancario para un solo cliente
    }
    actualizarCliente(cliente);
}
