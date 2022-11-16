import React from 'react'



const Paciente = ({paciente, setPaciente, eliminarPaciente}) => {
  const {nombre, propietario, email, fecha, sintomas,id} = paciente;

  const handleEliminar = () =>{
    const resp = confirm('¿Deseas eliminar registro?');
    if(resp){
      eliminarPaciente(id);
    }
  }
  

  return (
    <div className='text-2xs m-3 bg-white shadow-md px-5 py-10 rounded-xl'>
    <p className='font-bold mb-3  text-gray-700 uppercase'>Nombre: {' '}
      <span className='font-normal normal-case'>{nombre}</span>
    </p>
    <p className='font-bold mb-3  text-gray-700 uppercase'>Propietario: {' '}
      <span className='font-normal normal-case'>{propietario}</span>
    </p>
    <p className='font-bold mb-3  text-gray-700 uppercase'>Email: {' '}
      <span className='font-normal normal-case'>{email}</span>
    </p>
    <p className='font-bold mb-3  text-gray-700 uppercase'>Fecha alta: {' '}
      <span className='font-normal normal-case'>{fecha}</span>
    </p>
    <p className='font-bold mb-3  text-gray-700 uppercase'>Sintomas: {' '}
      <span className='font-normal normal-case'>{sintomas}</span>
    </p>

    <div className='flex justify-between'>
      <button className='py-2 px-10 bg-indigo-500 hover:bg-indigo-600 text-white font-bold uppercase, rounded-lg' 
            type='button'
            onClick={ () => setPaciente(paciente)}>Editar</button>
      <button className='py-2 px-10 bg-red-500 hover:bg-red-600 text-white font-bold uppercase, rounded-lg' 
            type='button'
            onClick={ handleEliminar }>Eliminar</button>
      
    </div>
  </div>

  )
}

export default Paciente