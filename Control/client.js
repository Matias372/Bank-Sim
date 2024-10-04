// client.js
import { gameData } from "./clientData.js"; // Importar los datos del archivo clientData.js

// Clase Cliente
class Cliente {
    constructor(
        nombre,
        genero,
        edad,
        dni,
        peticion,
        reqbank = false,
        text = "",
        value = 0,
        sus = false
    ) {
        this.nombre = nombre;
        this.genero = genero;
        this.edad = edad;
        this.dni = dni;
        this.peticion = peticion;
        this.reqbank = reqbank; // Si la petición requiere acceso al banco
        this.sus = false; // Inicialmente no es sospechoso
        this.text = text; // Texto relacionado con la petición
        this.value = value; // Valor para las transacciones de efectivo
    }

    // Método para hacer que un cliente se vuelva sospechoso
    volverseSospechoso() {
        // Generar un número aleatorio entre 0 y 1
        const aleatorio = Math.random();

        // Comprobar si el número aleatorio es menor que la probabilidad especificada
        if (aleatorio < 0.2) {
            this.sus = true; // Cambiar la variable sus a true

            // Modificación mínima de uno de los datos
            const datosPosibles = ["nombre", "edad", "dni"];
            const datoModificado =
                datosPosibles[Math.floor(Math.random() * datosPosibles.length)];

            switch (datoModificado) {
                case "nombre":
                    this.nombre =
                        this.nombre.slice(0, -1) +
                        String.fromCharCode(
                            this.nombre.charCodeAt(this.nombre.length - 1) + 1
                        ); // Cambia la última letra
                    break;
                case "edad":
                    this.edad = Math.max(
                        18,
                        this.edad + (Math.random() < 0.5 ? -1 : 1)
                    ); // Suma o resta 1 año, con mínimo 18
                    break;
                case "dni":
                    this.dni =
                        this.dni.slice(0, -1) +
                        Math.floor(Math.random() * 9).toString(); // Cambia un dígito del DNI
                    break;
            }
        }
    }

    // Función para generar un cliente aleatorio
    static generarCliente() {
        // Seleccionar género y nombre aleatorio
        const generos = ["masculino", "femenino"];
        const genero = generos[Math.floor(Math.random() * generos.length)];
        const nombre =
            genero === "masculino"
                ? gameData.nombres.masculino[
                      Math.floor(
                          Math.random() * gameData.nombres.masculino.length
                      )
                  ]
                : gameData.nombres.femeninos[
                      Math.floor(
                          Math.random() * gameData.nombres.femenino.length
                      )
                  ];

        const edad = Math.floor(Math.random() * 50) + 18; // Edad entre 18 y 67 años
        const dni = Math.random().toString().slice(2, 10); // Genera un DNI completamente aleatorio

        // Peticiones posibles y si requieren cuenta bancaria
        const peticiones = [
            { tipo: "crear cuenta", reqbank: false },
            { tipo: "cerrar cuenta", reqbank: true },
            { tipo: "extraer efectivo", reqbank: true },
            { tipo: "ingresar efectivo", reqbank: true },
            { tipo: "transferir dinero", reqbank: true },
            { tipo: "activar tarjeta", reqbank: false },
            { tipo: "desactivar tarjeta", reqbank: false },
        ];

        const peticion =
            peticiones[Math.floor(Math.random() * peticiones.length)];

        // Seleccionar texto relacionado con la petición
        const textosRelacionados = gameData.textosPeticion[peticion.tipo];
        let textoSeleccionado =
            textosRelacionados[
                Math.floor(Math.random() * textosRelacionados.length)
            ];
        textoSeleccionado = textoSeleccionado.replace(/{nombre}/g, nombre); // Reemplazar {nombre} en el texto

        // Generar valor si la petición requiere efectivo
        let value = 0;
        if (peticion.reqbank) {
            value = Math.floor(Math.random() * 10 + 1) * 500; // Valor entre 500 y 5000
        }

        // Crear cliente con datos generados
        return new Cliente(
            nombre,
            genero,
            edad,
            dni,
            peticion.tipo,
            peticion.reqbank,
            textoSeleccionado,
            value
        );
    }
}

// Exportamos la clase para usarla en otros archivos
export { Cliente };
