// Variables
const carrito = document.getElementById("carrito");
const cursos = document.getElementById("lista-cursos");



// Event Listeners
cargarEventListeners();

function cargarEventListeners() {
    // Se ejecuta cuando se presiona "Agregar Carrito"
    cursos.addEventListener("click", comprarCurso);

}



// Funciones 
// Funcion que añade el curso al carrito
function comprarCurso(e){
    e.preventDefault();
    // console.log(e.target.classList);
    // Delegation para agregar-carrito
    if (e.target.classList.contains("agregar-carrito")){
        // Escalo en el DOM hasta llegar al div que contiene la .card (1er padre: .info-card (sin img) - 2do padre: .card (con img))
        const curso = e.target.parentElement.parentElement;
        // Le pasamos a la función el curso (div .card) seleccionado para tomar sus datos
        leerDatosCurso(curso)
        
    };
    
}

// Funcion que lee la informacion del curso
function leerDatosCurso(curso){
    console.log(curso);
    
}