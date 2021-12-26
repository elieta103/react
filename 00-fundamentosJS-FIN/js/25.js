// Eventos del DOM - Inputs

const inputNombre = document.querySelector(".nombre"); //Busca por class
inputNombre.addEventListener("input", function(e) {
    console.log(e.target.value);
});

const inputPassword = document.querySelector(".password"); //Busca por class
inputPassword.addEventListener("input", funcionPassword);

function funcionPassword() {
    inputPassword.type = "text";
    //Lo Muestra y lo oculta
    setTimeout(() => {
        inputPassword.type = "password";
    }, 500);
}