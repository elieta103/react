// Operaciones en los arreglos
const tecnologias = ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js']

// Añadir elementos al array
// tecnologias.push('GraphQL') // Añade al final del array
// tecnologias.unshift('GraphQL') // Añade al inicio del array

// ES MEJOR PRACTICA USAR Spread Operator, RECOMENDADOS
// const nuevoArreglo = [...tecnologias, 'GraphQL']  //Agrega al final
// const nuevoArreglo = ['GraphQL', ...tecnologias]  //Agrega al inicio

// Eliminar elementos del array
// tecnologias.pop() // Elimina del final
// tecnologias.shift() // Elimina del inicio
// tecnologias.splice(2, 3) // Elimina de una posición en especifica, posicion y cantidad a eliminar

// MEJOR PRACTICA, DEVUELVE UN NUEVO ARR, NO MODIFICA EL ORIGINAL
// const nuevoArray = tecnologias.filter( function(tech) {
//     return tech === 'React'
// })
 
//LO MISMO PERO MAS COMPACTO
// const nuevoArray1 = tecnologias.filter( tech => tech === 'React');
// console.log(nuevoArray1);


// Reemplazar del array
// tecnologias[0] = 'GraphQL'

// MEJOR PRACTICA
const nuevoArray = tecnologias.map( function(tech) {
    if(tech === 'HTML') {
        return 'GraphQL'
    } else {
        return tech
    }
})

//LO MISMO PERO MAS COMPACTO, NO MODIFICA EL ORIGINAL
// const nuevoArray2 = tecnologias.map( tech => tech==='HTML'?'GrapQL':tech);
// console.log(nuevoArray2);


console.table(tecnologias)
console.table(nuevoArray)