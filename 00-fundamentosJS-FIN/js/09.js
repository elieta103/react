// Operaciones en los arreglos
const tecnologias = ["HTML", "CSS", "JavaScript", "React", "Node.js"];

// Añadir elementos al array
// tecnologias.push('GraphQL') // Añade al final del array
// tecnologias.unshift('GraphQL') // Añade al final del array

// const nuevoArreglo = [...tecnologias, 'GraphQL']   //OK
// const nuevoArreglo = ['GraphQL', ...tecnologias]   //OK

// Eliminar elementos del array
// tecnologias.pop() // Elimina del final
// tecnologias.shift() // Elimina del inicio
// tecnologias.splice(2, 3); // Elimina de una posición en especifica, A partir de donde y cuantos quieres eliminar

// const nuevoArray = tecnologias.filter( function(tech) {
//     return tech === 'React'
// })

// Reemplazar del array
// tecnologias[0] = 'GraphQL'

const nuevoArray = tecnologias.map((tech) => {
    if (tech === "HTML") {
        return "GraphQL";
    } else {
        return tech;
    }
});

console.table(tecnologias);
console.table(nuevoArray);