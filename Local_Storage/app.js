const listaTweets = document.getElementById("lista-tweets");

// Event Listeners
// ------------------------------------------
eventListeners();

// De esta forma los listeners solo estan disponibles a traves de la funcion y no son globales
function eventListeners(){
    // Agregar Tweet a la lista y al local Storage
    document.querySelector("#formulario").addEventListener('submit', agregarTweet);

    // Borrar tweet de la lista y del Local Storage
    listaTweets.addEventListener('click', borrarTweet);

    // Cuando el contenido del DOM (jQuery = Document Ready) sea cargado, cargar el contenido del Local Storage
    document.addEventListener('DOMContentLoaded', localStorageListo);

}


// Funciones
// ------------------------------------------
// Añadir tweet del formulario
function agregarTweet(e){
    e.preventDefault();
    // Leer el valor del textarea
    const tweet = document.getElementById("tweet").value;
    // Crear boton de eliminar
    const li = agregarBotonBorrar(tweet);
    // Añado el tweet a la lista, asignandolo como un hijo de la lista
    listaTweets.appendChild(li);

    // Añadir al Local Storage
    agregarTweetLocalStorage(tweet);
}

// Borrar tweet del formulario
function borrarTweet(e){
    e.preventDefault();
    // Si el elemento donde se ha hecho el click es "borrar-tweet" (LA X) -> DELEGATION APPLIED
    if (e.target.className === 'borrar-tweet'){
        // Imprimo en la consola que he tocado en el boton eliminar
        console.log("Diste click en eliminar");
        // Remuevo el tweet yendo al elemento <li> (padre del elemento X), 
        e.target.parentElement.remove();
        // Muestro una alerta en el navegador que el tweet se ha eliminado
        alert("Tweet eliminado");
        // Despues de eliminar el tweet de la lista, que se elimine del Local Storage
        borrarTweetLocalStorage(e.target.parentElement.innerText);
    } else {
        console.log("Diste click en algun otro lugar");
    }
}

// Cargar tweets del Local Storage cuando el DOM (la pagina) es cargado
function localStorageListo(){
    // Preparo una variable
    let tweets;
    // Convierto la variable a arreglo y lo cargo con todo lo que haya en el Local Storage
    tweets = obtenerTweetsLocalStorage();
    // Itero sobre los indices del arreglo y cargo en la variable tweet (singular) el texto de cada uno
    tweets.forEach(function (tweet){
        // Creo una variable para el elemento <li> que volverá de la función 
        let li = agregarBotonBorrar(tweet);
        // Añado el tweet (elemento <li> cargado con el texto y el boton de borrar) a la lista, asignandolo como un hijo de la listaTweets
        listaTweets.appendChild(li);
    });
}

// Unir el texto del tweet y un boton de borrar en un elemento <li>. Retorno un elemento <li>
function agregarBotonBorrar(tweet){
    // Crear boton de eliminar
    const btnBorrar = document.createElement("a");
    btnBorrar.classList = "borrar-tweet";
    btnBorrar.innerText = "X";

    const li = document.createElement("li");
    li.innerText = tweet;
    // Añade el boton de Borrar al tweet, asignandole de hijo el btnBorrar
    li.appendChild(btnBorrar);
    // Retorno el elemento li con el texto y el boton borrar como hijo
    return li;
}

// Agregar Tweets al Local Storage
function agregarTweetLocalStorage(tweet){
    // En caso de que sean muchos los tweets, creo una variable. Al volver de obtenerTweetsLocalStorage, ya no será más una variable, sino un arreglo
    let tweets = obtenerTweetsLocalStorage();
    // Añadir al arreglo el tweet que viene del formulario
    tweets.push(tweet);
    // Convertir de string a arreglo para local storage
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

// 
function borrarTweetLocalStorage(tweet){
    // Variable para el arreglo de tweets y el tweet que borraremos
    let tweets, tweetABorrar;
    // El tweet viene cargado con el texto que necesitamos, más la X al final del botón de borrar
    tweetABorrar = tweet.substring(0, tweet.length - 1);

    // Obtengo una copia del Local Storage y la inserto en la variable tweets
    tweets = obtenerTweetsLocalStorage();

    // Al pasarle el parametro index a la funcion, podremos tener acceso al indice en donde se encuentra el iterador
    tweets.forEach(function (tweet, index){
        // Si el texto del tweet a borrar es igual al texto del tweet sobre el que estamos iterando, ingresamos en el arreglo con la posicion index y borramos 1 solo elemento
        if(tweetABorrar === tweet){
            // Toma la posicion del arreglo que queremos eliminar y que tan lejos queremos ir en la supresion
            tweets.splice(index, 1);
        }    
    });
    // Inserto en el Local Storage la copia modificada (con el tweet eliminado) del arreglo "tweets"
    localStorage.setItem('tweets', JSON.stringify(tweets));    
}

// Comprobar que haya elementos en Local Storage. Retorna un array
function obtenerTweetsLocalStorage(){
    // Declaro una variable
    let tweets;
    // Si no hay tweets en Local Storage, inicializo la variable tweets como arreglo
    if(localStorage.getItem('tweets') === null){
        // Aqui, convierto mi variable tweets a un arreglo 
        tweets = [];
    } else {
        // Si hay tweets en Local Storage, normalizo segun JSON el contenido del arreglo "tweets" que se encuentra en Local Storage 
        tweets = JSON.parse(localStorage.getItem('tweets'));
    }
    // Retorno el array de tweets 
    return tweets;
}