// Eventos del DOM - Inputs

const inputNombre = document.querySelector('.nombre')
//Captura todos los eventos
inputNombre.addEventListener('input', function(e) {
    console.log(e.target.value)
})
inputNombre.addEventListener('keypress', (event) =>  {
    inputNombre.value = String(event.target.value).toUpperCase();
    
}) 

const inputPassword = document.querySelector('.password')
inputPassword.addEventListener('input', funcionPassword)



function funcionPassword() {
    inputPassword.type = 'text'

    setTimeout(() => {
        inputPassword.type = 'password'
    }, 500);
}