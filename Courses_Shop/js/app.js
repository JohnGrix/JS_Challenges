// Variables
const carrito = document.getElementById("carrito");
const cursos = document.getElementById("lista-cursos");
const listaCursos = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.getElementById("vaciar-carrito");

// Event Listeners
cargarEventListeners();

function cargarEventListeners() {
    // Se ejecuta cuando se presiona "Agregar Carrito"
    cursos.addEventListener("click", comprarCurso);

    // Se ejecuta cuando se elimina un curso del carrito
    carrito.addEventListener("click", eliminarCurso);

    // Se ejecuta cuando se elimina un curso del carrito
    vaciarCarritoBtn.addEventListener("click", vaciarCarrito);
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
    // Objeto que contiene el id, img, precio y titulo del curso
    const infoCurso = {
        imagen: curso.querySelector("img").src,
        titulo: curso.querySelector("h4").textContent,
        precio: curso.querySelector(".precio span").textContent,
        id: curso.querySelector("a").getAttribute("data-id")
    };
    // console.log(infoCurso); - Cheaqueando la info que cargo en el objeto
    // Una vez capturada esta data, insertarla en el carrito
    insertarCarrito(infoCurso);  
    
    // Despues de insertar el curso en el carrito, lo almaceno en el Local Storage
    guardarCursoLocalStorage(infoCurso);
}

// Funcion que inserta el curso seleccionado en el carrito (agregando el HTML en la tabla del carrito)
function insertarCarrito(curso){
    // Crear elemento tr para ser insertado en el tbody del carrito
    const row = document.createElement("tr");
    // Rellenar tr (no es necesario envolverlo en un <tr></tr> porque ya fue creado ese elemento en la linea anterior)
    row.innerHTML = `
        <td>
            <img src="${curso.imagen}" alt="Course's image" width="100">
        </td>
        <td>${curso.titulo}</td>
        <td>${curso.precio}</td>
        <td>
            <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
        </td>
    `;
    // Agregarle el hijo que acabamos de crear a la listaCursos (.lista-carrito > tbody)
    listaCursos.appendChild(row);
}

// Funcion que elimina el curso indicado del carrito (del DOM)
function eliminarCurso(e){
    e.preventDefault();
    // console.log("Curso eliminado"); - Cheaqueando que las funciones se comuniquen 
    // Si el elemento clickeado, la X, contiene .borrar-curso, removemos la fila del carrito
    if(e.target.classList.contains("borrar-curso")){
        // 1er padre = <td> // 2do padre = <tr> (fila del carrito)
        e.target.parentElement.parentElement.remove(); 
    }
}

// Funcion que elimina los cursos del carrito del DOM (<tr> creados con la funcion insertarCarrito)
function vaciarCarrito(e){
    e.preventDefault();

    // Forma lenta de eliminar 
    // listaCursos.innerHTML = "";

    // Forma rapida de eliminar
    while(listaCursos.firstChild){
        // Mientras que siga habiendo cursos (<tr> children) en la listaCursos, seguirá removiendo el primer curso de la lista hasta que no hayan más
        listaCursos.removeChild(listaCursos.firstChild);
    }

    // Evita que el div del carrito (espacio blanco) se cierre automaticamente cuando se hace click en vaciarCarritoBtn (si la sumatoria de los height de los <tr> no supera el height dispuesto para el submenu carrito)
    return false;
}

// Funcion que almacena curso agregado al carrito en el Local Storage
function guardarCursoLocalStorage(curso){
    // console.log(curso); - Cheaqueando que el pasaje de variables funcione
    let cursos;

    // Asignamos a nuestra variable el array vacio o cargado generado del LS
    cursos = obtenerCursosLocalStorage();
    
    // console.log(cursos); - Cheaqueando lo que vuelve del LS
    
    // El curso seleccionado se agrega al Array 
    cursos.push(curso);

    // Una vez modificado el Array, lo convierto a String y actualizamos el objeto "cursos" del Local Storage
    localStorage.setItem("cursos", JSON.stringify(cursos));
}

// Funcion que se encarga de verificar si es que hay cursos previamente almacenados en el Local Storage
function obtenerCursosLocalStorage(){
    let cursosLS;

    // Comprobamos si es que existe algun curso en el objeto "cursos" del LS
    if(localStorage.getItem("cursos") === null){
        // Si no hay cursos, genero un Array vacio
        cursosLS = [];
    } else {
        // Si hay cursos, convierto el objeto String "cursos" en Array 
        cursosLS = JSON.parse(localStorage.getItem("cursos"));
    }
    // Devuelvo el Array generado
    return cursosLS;
}