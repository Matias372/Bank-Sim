let balance = 1000; // Saldo inicial

function mostrarLog(mensaje) {
    let logDiv = document.getElementById("log");
    let p = document.createElement("p");
    p.textContent = mensaje;
    logDiv.appendChild(p);
}

function iniciarCajero() {
    let opcion = 0;
    while (true) {
        opcion = prompt(
            "Elija una opción: \n1. Consultar saldo \n2. Ingresar dinero \n3. Extraer dinero \n4. Salir"
        );

        if (opcion === null) {
            alert("Operación cancelada.");
            break;
        }

        opcion = parseInt(opcion);

        if (isNaN(opcion) || opcion < 1 || opcion > 4) {
            alert("Por favor, ingrese una opción válida (1-4).");
            continue;
        }

        switch (opcion) {
            case 1:
                consultarSaldo();
                break;
            case 2:
                ingresarDinero();
                break;
            case 3:
                extraerDinero();
                break;
            case 4:
                alert("Gracias por usar el cajero. ¡Hasta luego!");
                mostrarLog("Sesión finalizada.");
                return; // Finaliza el bucle y el programa
        }
    }
}

function consultarSaldo() {
    alert(`Tu saldo actual es: $${balance}`);
    mostrarLog(`Consulta de saldo: $${balance}`);
}

function ingresarDinero() {
    let cantidad = prompt("Ingrese la cantidad a depositar:");
    cantidad = parseFloat(cantidad);

    if (isNaN(cantidad) || cantidad <= 0) {
        alert("Por favor, ingrese una cantidad válida.");
        return;
    }

    balance += cantidad;
    alert(`Has ingresado $${cantidad}. Tu nuevo saldo es: $${balance}`);
    mostrarLog(`Ingreso de dinero: $${cantidad}. Nuevo saldo: $${balance}`);
}

function extraerDinero() {
    let cantidad = prompt("Ingrese la cantidad a extraer:");
    cantidad = parseFloat(cantidad);

    if (isNaN(cantidad) || cantidad <= 0) {
        alert("Por favor, ingrese una cantidad válida.");
        return;
    }

    if (cantidad > balance) {
        alert("No tienes suficiente saldo para esta operación.");
        mostrarLog("Intento fallido de extracción: saldo insuficiente.");
        return;
    }

    balance -= cantidad;
    alert(`Has retirado $${cantidad}. Tu nuevo saldo es: $${balance}`);
    mostrarLog(`Extracción de dinero: $${cantidad}. Nuevo saldo: $${balance}`);
}

iniciarCajero();
