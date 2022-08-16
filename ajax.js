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

//API Fetch + Async-Await
(() =>{
    const $fetchAsync = document.getElementById("fetch-async"),
        $fragment = document.createDocumentFragment();

    async function getData(){
        try {
            let res = await fetch("https://jsonplaceholder.typicode.com/users"), //con await no necesito varios then()
                json = await res.json(); //convierte json a objeto
            
            if (!res.ok) throw {status: res.status, statusText: res.statusText} //si me da error, "throw" me manda al catch, acá le mando un objeto con la info del status 

            json.forEach(el => { //por cada elemento que tenga el objeto con la info, creame un li con el nombre, email y tel.
                const $li = document.createElement("li");
                $li.innerHTML = `${el.name} -- ${el.email} -- ${el.phone} `;
                $fragment.appendChild($li);  
            });
        
            $fetchAsync.appendChild($fragment);
            
        } catch (err) {
            let message = err.statusText || "Ocurrio un error";
            $fetchAsync.innerHTML = `Error ${err.status}: ${message} `;


        } finally {
            //esto se ejecuta independientemente del try y catch
        }
    }

    getData();

})();

//Axios
(() =>{
    const $axios = document.getElementById("axios"),
        $fragment = document.createDocumentFragment();
    
    axios.get("https://jsonplaceholder.typicode.com/users")
    .then(res => {
        let json = res.data;  //con axios NO necesito validar ni usar parse o json para convertir a objeto: ya viene parseado en .data
        
        json.forEach(el => { //por cada elemento que tenga el objeto con la info, creame un li con el nombre, email y tel.
            const $li = document.createElement("li");
            $li.innerHTML = `${el.name} -- ${el.email} -- ${el.phone} `;
            $fragment.appendChild($li);  
        });  //solo necesito un solo then 

        $axios.appendChild($fragment);
    })
    .catch(err =>{
        console.log(err.response)
        let message = err.response.statusText || "Ocurrio un error";  //el status y statusText se encuentra en .response
        $axios.innerHTML = `Error ${err.response.status}: ${message} `;
    })
    .finally(
        //esto se ejecutara indep. del resultado del axios
    );
})();

//Axios + Async-Await
(() =>{
    const $axiosAsync = document.getElementById("axios-async"),
        $fragment = document.createDocumentFragment();
    
    async function getData(){
        try {
            let res = await axios.get("https://jsonplaceholder.typicode.com/users"),
                json = await res.data; //de nuevo, no necesito validar ni parsear, directamente paso el obj a la variable
                
                json.forEach(el => { //por cada elemento que tenga el objeto con la info, creame un li con el nombre, email y tel.
                    const $li = document.createElement("li");
                    $li.innerHTML = `${el.name} -- ${el.email} -- ${el.phone} `;
                    $fragment.appendChild($li);  
                });  
        
                $axiosAsync.appendChild($fragment);
        } catch (err){
            let message = err.response.statusText || "Ocurrio un error";
            $axiosAsync.innerHTML = `Error ${err.response.status}: ${message} `; 
        } finally {
            //esto se ejecutara indep. del resultado del axios
        }
    }

    getData();

})();