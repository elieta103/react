// Fetch API

const url = "https://jsonplaceholder.typicode.com/users"

const consultarAPI = () => {
    fetch(url)
        .then( respuesta => {
            console.log('then 1')
            respuesta.json()
        })
        .then( resultado => {
            console.log('then 2')
            resultado.forEach( comentario => {
                console.log(comentario)
            })
        })
}
consultarAPI();