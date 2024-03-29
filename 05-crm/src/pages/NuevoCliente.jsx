
import React from 'react'
import { useNavigate, Form, useActionData, redirect } from 'react-router-dom'
import Error from '../components/Error';
import Formulario from '../components/Formulario'
import { agregarCliente } from '../data/clientes';


export async function action({request}){
  console.log('Action...')

  const formData = await request.formData();
  const datos = Object.fromEntries(formData)
  const email = formData.get('email')

  //Validaciones
  const errores = []
  if(Object.values(datos).includes('')){
      errores.push('Todos los campos son requeridos.')
  }

  let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
  if(!regex.test(email)){
    errores.push('El email no es válido')
  }

  if(Object.keys(errores).length > 0){
    return errores;
  }

  await agregarCliente(Object.fromEntries(formData))

  return redirect('/')

   //Opciones para el formData
  /*console.log(formData)
  console.log('Spread Op', [...formData]);
  console.log('get : '+ formData.get('nombre'))
  console.log('Object : ', Object.fromEntries(formData))*/ 
}


const NuevoCliente = () => {

  //Redirect dentro de botones
  const navigate = useNavigate()

  //Regresar datos del action
  const errores = useActionData()


  return (
    <>
       <h1 className='font-black text-4xl text-blue-900'>Nuevo Cliente</h1>
      <p className='mt-3'>Llena todos los campos para registrar un nuevo cliente</p>

      <div className='flex justify-end'>
        <button className='bg-blue-800 text-white px-3 py-1 font-bold uppercase' 
                type='button'
                onClick={ () => navigate('/')}>Volver</button>
      </div>

      <div className='bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20'>
        {errores?.length && errores.map((error, index)=> (<Error key={index}>{error}</Error>)) }
        <Form method='post' noValidate>
          <Formulario />
          <input type="submit"
                  className='mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg'
                  value="Registrar Nuevo Cliente"
                  />
        </Form>
      </div>
    </>
  )
}

export default NuevoCliente