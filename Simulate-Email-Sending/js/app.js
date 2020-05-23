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
}




// Funciones
// Funcion ejecutada al cargar la pagina > Deshabilita enviarBtn
function inicioApp(){
    // Deshabilitar boton Enviar (enviarBtn)
    enviarBtn.disabled = true;
}