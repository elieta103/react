export async function obtenerClientes(){
  const data = await fetch(import.meta.env.VITE_API_URL)
  const resultado = await data.json();
  return resultado;
}

export async function obtenerCliente(id){
  const data = await fetch(`${import.meta.env.VITE_API_URL}/${id}`)
  const resultado = await data.json();
  return resultado;
} 


export async function agregarCliente(datos){
 
  try{
    const data = await fetch(import.meta.env.VITE_API_URL, {
      method: 'POST',
      body : JSON.stringify(datos),
      headers : {
        'Content-Type': 'application/json'
      }
    })
    const resultado = await data.json();
  }catch(error){
    console.log(error)
  }
}


export async function actualizarCliente(id, datos){
  try{
    const data = await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
      method: 'PUT',
      body : JSON.stringify(datos),
      headers : {
        'Content-Type': 'application/json'
      }
    })
    const resultado = await data.json();
  }catch(error){
    console.log(error)
  }
}

export async function eliminarCliente(id){
  console.log('eliminando ',id)

  try{
    const data = await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
      method: 'DELETE'
      })
    const resultado = await data.json();
  }catch(error){
    console.log(error)
  }
}