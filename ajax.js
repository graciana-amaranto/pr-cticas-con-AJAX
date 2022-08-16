//funcion anonima autoejecutable (()=>{})();, forma de encapsulamiento sin necesidad de recurrir a los módulos.

//Objeto XMLHttpRequest
//Quiero agregar una lista ordenada de usuarios dinámicamente al html usando ajax:
(() =>{
    const xhr = new XMLHttpRequest(),    
        $xhr = document.getElementById("xhr"),
        $fragment = document.createDocumentFragment(); //como voy a hacer demasiadas inserciones al DOM, creo un fragmento. Una vez que cargo todo, hago UNA SOLA insercion. 

    xhr.addEventListener("readystatechange", e => {
        if (xhr.readyState !== 4) return;  //me interesa que el código se ejecute cuando el readystate sea 4 (complete), si no es 4, no retornes nada.

        if (xhr.status >= 200 && xhr.status < 300){
            console.log("éxito");
            let json = JSON.parse(xhr.responseText); //parse me pasa el json a un objeto.
            
            json.forEach(el => { //por cada elemento que tenga el objeto con la info, creame un li con el nombre, email y tel.
                const $li = document.createElement("li");
                $li.innerHTML = `${el.name} -- ${el.email} -- ${el.phone} `;
                $fragment.appendChild($li);  
            });

            $xhr.appendChild($fragment);
        }else{
            console.log("error");
            let message = xhr.statusText || "Ocurrio un error";  //a veces statusText viene vacio
            $xhr.innerHTML = `Error ${xhr.status}: ${message}  `
        }
    });  //este evento se activa cuando detecta algun cambio de estado (aborto, error, completado ))       

    xhr.open("GET", "https://jsonplaceholder.typicode.com/users" )

    xhr.send();


    /*
    1) Instancio un nuevo objeto XMLHttpRequest
    2) Asigno los eventos que quiera manipular de la petición
    3) Abrir la peticiom, estalecer el recurso o método (GET, POST) y la url a la que quiero acceder-
    4) Enviar la peticion con send().
    */ 
})();

//Objeto API Fetch
(() =>{
    const $fetch = document.getElementById("fetch"),
        $fragment = document.createDocumentFragment();
    
    fetch("https://jsonplaceholder.typicode.com/users")
    .then((res) =>{return res.ok ? res.json() : Promise.reject(res);})  //si res.ok es true, entonces que convierta. si no, reject me manda directamente al catch.
        //res.json() me trae lo que hay en la pag y lo convierte en objeto (como parse)
    
    .then((json) =>{
        json.forEach(el => { //por cada elemento que tenga el objeto con la info, creame un li con el nombre, email y tel.
            const $li = document.createElement("li");
            $li.innerHTML = `${el.name} -- ${el.email} -- ${el.phone} `;
            $fragment.appendChild($li);  
        });

        $fetch.appendChild($fragment);
    })
    .catch((err) =>{
        let message = err.statusText || "Ocurrio un error";  //a veces statusText viene vacio
        $fetch.innerHTML = `Error ${err.status}: ${message}  `
    })
    .finally(); //el finally es opcional

    /*
    El primer then valida si existe la pagina, y es true, convierte el json a objeto (podria ser json a texto)
    El segundo then hace toda la logica*/
})();