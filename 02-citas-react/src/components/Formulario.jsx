import React, { useEffect, useState } from 'react'
import Error from './Error';

export const Formulario = ({pacientes, setPacientes, paciente, setPaciente}) => {
  const [nombre, setNombre] = useState('');
  const [propietario, setPropietario] = useState('');
  const [email, setEmail] = useState('');
  const [fecha, setFecha] = useState('');
  const [sintomas, setSintomas] = useState('');
  
  const [error, setError] = useState(false);

  // [] En el array se le mandan los componentes a revisar por si hubo algun cambio
  // Escucha los cambios que suceden en algun parte del state
  // Revisa cambios en paciente, solo cuando tenga informacion
  // El evento del cambio se dispara en el boton de editar, 
  useEffect(()=>{
      if( Object.keys(paciente).length > 0){
        setNombre(paciente.nombre);
        setPropietario(paciente.propietario);
        setEmail(paciente.email);
        setFecha(paciente.fecha);
        setSintomas(paciente.sintomas);
      }
  }, [paciente]);

  const generarId = () =>{
    const random = Math.random().toString(36).substring(2);
    const fecha = Date.now().toString(36);
    return random + fecha;
  }

  const handleSubmit = (e) =>{
    e.preventDefault();

    //Validacion formulario
    if([nombre, propietario, email, fecha, sintomas].includes('')){
      console.log('Hay al menos un campo vacio');
      setError(true);
      return ;  //Termina flujo
    }else{
      console.log('Campos llenos');
      setError(false);
    }

    const objPaciente ={
      nombre, 
      propietario, 
      email, 
      fecha, 
      sintomas
    }

    // EDICION PACIENTE
    if (paciente.id){
      console.log('Edicion....');
      objPaciente.id = paciente.id;

      // objPaciente es el modificado.   Recorre todo el listado de Pacientes
      // Si lo encuentra devuelve el modificado, sino devuelve los originales de la lista
      const pacientesActualizados = pacientes.map( 
                  pacienteListado => pacienteListado.id === objPaciente.id ? objPaciente: pacienteListado );

      setPacientes(pacientesActualizados);
      setPaciente({});  //Limpiar el objeto previamente editado

    // ALTA PACIENTE
    }else{
      console.log('Alta....');
      objPaciente.id = generarId();   //Genera y agrega el id en la alta
      setPacientes([...pacientes, objPaciente]);  //Copia de lo ultimo y agrega el nuevo
    }

    //Reiniciar formulario
    setNombre('');
    setPropietario('');
    setEmail('');
    setFecha('');
    setSintomas('');

  }


  return (
    <div className='md:w-1/2 lg:w-2/5'>
      <h2 className='font-black text-3xl text-center'>Seguimiento a Pacientes</h2>
      <p className='text-lg mt-5 text-center mb-10'> Añade pacientes y {' '} 
          <span className='text-indigo-400 font-bold'>Administralos</span>
      </p>

      <form onSubmit={handleSubmit} className='bg-white shadow-md rounded py-10 px-5 mb-10'>

        {error && <Error mensaje="Todos los campos son obligatorios."/> }

        <div className='mb-5'>
          <label htmlFor='mascota' 
                 className='block text-gr-700 uppercase font-bold' >Nombre Mascota</label>
          <input  type="text"
                  id="mascota"
                  className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                  placeholder='Nombre de la mascota'
                  value={nombre}
                  onChange={(e)=>setNombre(e.target.value)}/>
        </div>
      
        <div className='mb-5'>
          <label htmlFor='propietario' 
                 className='block text-gr-700 uppercase font-bold' >Nombre Propietario</label>
          <input  type="text"
                  id="propietario"
                  className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                  placeholder='Nombre del propietario'
                  value={propietario}
                  onChange={(e)=>setPropietario(e.target.value)}/>

        </div>

        <div className='mb-5'>
          <label htmlFor='email' 
                 className='block text-gr-700 uppercase font-bold' >Email</label>
          <input  type="email"
                  id="email"
                  className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                  placeholder='Email Contacto Propietario'
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}/>

        </div>

        <div className='mb-5'>
          <label htmlFor='alta' 
                 className='block text-gr-700 uppercase font-bold' >Alta</label>
          <input  type="date"
                  id="alta"
                  className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                  value={fecha}
                  onChange={(e)=>setFecha(e.target.value)}/>

        </div>

        <div className='mb-5'>
          <label htmlFor='sintomas' 
                 className='block text-gr-700 uppercase font-bold' >Síntomas</label>
          <textarea  id='sintomas'
                      className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                      placeholder='Descripción de los síntomas'
                      value={sintomas}
                      onChange={(e)=>setSintomas(e.target.value)}/>
    
        </div>

        <input type="submit"  
              className='bg-indigo-400 w-full p-3 text-white uppercase font-bold hover:bg-indigo-500 cursor-pointer transition-all'
              value={paciente.id ? 'Editar Paciente': 'Guardar Paciente'}/>


      </form>

    </div>
  )
}
