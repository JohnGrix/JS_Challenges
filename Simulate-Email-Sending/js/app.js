// Variables
const email = document.getElementById("email");
const asunto = document.getElementById("asunto");
const mensaje = document.getElementById("mensaje");
const enviarBtn = document.getElementById("enviar");
// Opcion B para enviar el formulario con enviarBtn 
const formularioEnviar = document.getElementById("enviar-email");

const resetBtn = document.getElementById("resetBtn");

// Event Listeners
eventListeners();

function eventListeners() {
    // Valido campos del formulario al remover el focus de un campo del formulario
    email.addEventListener("keyup", validarCampo);
    asunto.addEventListener("keyup", validarCampo);
    mensaje.addEventListener("keyup", validarCampo);

    // Boton de enviar en el submit
    // enviarBtn.addEventListener("click", enviarEmail);

    // Opcion B para enviar el formulario con enviarBtn 
    formularioEnviar.addEventListener("submit", enviarMail);

    resetBtn.addEventListener("click", resetFormulario);

    // Al utilizar el EventListener por la accion "submit", la URL cambia, haciendo que la función HTMLElement.reset() funcione
}



// Funciones

// Funcion que valida que el campo tenga algo escrito
function validarCampo() {
    // console.log("Dentro del INPUT"); - Cheaqueando que el EventListener funcione

    // Validar la longitud del texto y que este no este vacio
    validarLongitud(this);

    // Validar la direccion de email
    // console.log(this.type); - Ver que campo es el que llama a la funcion
    // Si la funcion es llamada por el campo email, validar que contenga un @ en su texto
    if (this.type === "email") {
        validarEmail(this);
    }

    // Reviso el documento buscando por algun elemento que tenga la clase .error. Si no encuentro ninguno, el Array permanece vacio
    let errores = document.querySelectorAll(".error");

    // Si ninguno de los campos del formulario esta vacio
    if (email.value != "" && asunto.value != "" && mensaje.value != "") {
        // Si no hay ningun campo que contenga .error  
        if (errores.length === 0) {
            // Habilitar el boton de Enviar
            enviarBtn.disabled = false;
        } else {
            // Deshabilitar el boton de Enviar
            enviarBtn.disabled = true;
        }
    } else {
        // Deshabilitar el boton de Enviar
        enviarBtn.disabled = true;
    }
}

// Enviar el correo electrónico al presionar el boton Enviar
function enviarEmail(e) {
    // Spinner GIF al presionar Enviar
    const spinnerGIF = document.querySelector("#spinner");
    // Hacer visible el elemento que se encontraba con display = none;
    spinnerGIF.style.display = "block";

    // Email enviado GIF
    // Crear elemento img
    const enviado = document.createElement("img");
    // Asignar el atributo source al elemento img enviado
    enviado.src = "img/mail.gif"
    // Hacer visible el elemento img enviado  
    enviado.style.display = "block";

    // Ocultar Spinner GIF y mostrar GIF Email enviado despues de un tiempo
    // Funcion que define una pausa de 3000 ms en la ejecucion y una accion a realizar despues de la pausa
    setTimeout(function () {
        spinnerGIF.style.display = "none";
        // Insertar en el DOM el elemento Email enviado GIF
        document.querySelector("#loaders").appendChild(enviado);
        // Mostrar el GIF Email enviado por 5000 ms
        setTimeout(function () {
            // Remover elemento Email enviado GIF del DOM
            enviado.remove();
            // Resetear formulario
            formularioEnviar.reset();
        }, 5000);
    }, 3000);

    e.preventDefault();
    // console.log("Mail enviado");
}

// Resetear el formulario
function resetFormulario(e) {
    formularioEnviar.reset();
    e.preventDefault();
}

// Validar que los campos del formulario no esten vacios
function validarLongitud(campo) {
    // console.log(campo); - Chequeando que campo invoca la funcion
    // console.log(campo.value.length); - Chequeo si el campo tiene algo escrito

    // Si la cantidad de caracteres en el campo del formulario es mayor a 0 (no esta vacio)
    if (campo.value.length > 0) {
        aprobarCampo(true, campo);
    } else {
        aprobarCampo(false, campo);
    }
}

// Validar la direccion email ingresada en el formulario
function validarEmail(campo) {
    const email = campo.value;
    // mailformat = Char set <aA-zZ-0-9>@<aA-zZ-0-9>.<aA-zZ-0-9>.<aA-zZ-0-9> (domain infinite ammount of subdomains ".")
    // Regex taken from (http://regexlib.com/REDetails.aspx?regexp_id=5011)
    const mailformat = /^[A-Z0-9._-]+@[A-Z0-9.-]+\.[A-Z0-9.-]+$/i;
    // console.log(email.indexOf("@")); - Donde se encuentra el @ 
    // Si no hay un @ en el campo del email, la validacion devolverá -1. Si hay un @ en el texto, devuelve su posición en el input
    // console.log(email.indexOf("."));
    if (email.match(mailformat)) {
        aprobarCampo(true, campo);
    } else {
        aprobarCampo(false, campo);
    }
}

// Modificar los atributos del campo segun la orden enviada
function aprobarCampo(orden, campo) {
    // Si la orden es true
    if (orden) {
        // Cambiar el color del borde inferior a verde
        campo.style.borderBottomColor = "green";
        // Remover la clase "error" del elemento
        campo.classList.remove("error");
    } else {
        // Cambiar el color del borde inferior a rojo
        campo.style.borderBottomColor = "red";
        // Remover la clase "error" del elemento
        campo.classList.add("error");
    }
}