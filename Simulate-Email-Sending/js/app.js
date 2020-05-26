// Variables
const email = document.getElementById("email");
const asunto = document.getElementById("asunto");
const mensaje = document.getElementById("mensaje");
const enviarBtn = document.getElementById("enviar");



// Event Listeners
eventListeners();

function eventListeners(){
    // Ejecutado al cargar el contenido del DOM > Deshabilita enviarBtn
    document.addEventListener("DOMContentLoaded", inicioApp);

    // Valido campos del formulario al remover el focus de un campo del formulario
    email.addEventListener("blur", validarCampo);
    asunto.addEventListener("blur", validarCampo);
    mensaje.addEventListener("blur", validarCampo);
}



// Funciones
// Funcion ejecutada al cargar la pagina > Deshabilita enviarBtn
function inicioApp(){
    // Deshabilitar boton Enviar (enviarBtn)
    enviarBtn.disabled = true;
}

// Funcion que valida que el campo tenga algo escrito
function validarCampo(){
    // console.log("Dentro del INPUT"); - Cheaqueando que el EventListener funcione
    
    // Validar la longitud del texto y que este no este vacio
    validarLongitud(this);

    // Validar la direccion de email
    // console.log(this.type); - Ver que campo es el que llama a la funcion
    // Si la funcion es llamada por el campo email, validar que contenga un @ en su texto
    if(this.type === "email"){
        validarEmail(this);
    }

    // Reviso el documento buscando por algun elemento que tenga la clase .error. Si no encuentro ninguno, el Array permanece vacio
    let errores = document.querySelectorAll("error");

    // Si ninguno de los campos del formulario esta vacio
    if(email.value != "" && asunto.value != "" && mensaje.value != "") {
        // Si no hay ningun campo que contenga .error  
        if(errores.length === 0){
            // Habilitar el boton de Enviar
            enviarBtn.disabled = false;
        }
    }
}

// Validar que los campos del formulario no esten vacios
function validarLongitud(campo){
    // console.log(campo); - Chequeando que campo invoca la funcion
    // console.log(campo.value.length); - Chequeo si el campo tiene algo escrito

    // Si la cantidad de caracteres en el campo del formulario es mayor a 0 (no esta vacio)
    if(campo.value.length > 0){
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

// Validar la direccion email ingresada en el formulario
function validarEmail(campo){
    const email = campo.value;
    // console.log(email.indexOf("@")); - Donde se encuentra el @ 
    // Si no hay un @ en el campo del email, la validacion devolverá -1. Si hay un @ en el texto, devuelve su posición en el input
    if(email.indexOf("@") != -1){
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