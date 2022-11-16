// Fetch API  - Async Await

const url = "https://jsonplaceholder.typicode.com/users"

const consultarAPI = async () => {
    const respuesta = await fetch(url)
    const resultado = await respuesta.json()
    resultado.forEach(element => {
        console.log(element);
    });
}
consultarAPI();