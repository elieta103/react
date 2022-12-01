import React from 'react'
import { Form, redirect, useActionData, useLoaderData, useNavigate } from 'react-router-dom'
import Error from '../components/Error';
import Formulario from '../components/Formulario';
import { actualizarCliente, obtenerCliente } from '../data/clientes';


export async function loader({params}){
    console.log('Id de la Url: ',params)
    const cliente = await obtenerCliente(params.clienteId);
        if(Object.values(cliente).length === 0 ){
            throw new Response('',{
                status: 404,
                statusText: 'El cliente con el id '+params.clienteId+' no existe.'
            })
        }
    return cliente; 
}

export async function action({request, params}){
    console.log('Editar Action...')
  
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
  
    await actualizarCliente(params.clienteId, datos)
  
    return redirect('/')
  
     //Opciones para el formData
    /*console.log(formData)
    console.log('Spread Op', [...formData]);
    console.log('get : '+ formData.get('nombre'))
    console.log('Object : ', Object.fromEntries(formData))*/ 
  }



const EditarCliente = () => {
  const cliente = useLoaderData();
  const navigate = useNavigate();
  const errores = useActionData();
 

  console.log('Editar cliente : ', cliente)


  return (
    <>
        <h1 className='font-black text-4xl text-blue-900'>Editar Cliente</h1>
        <p className='mt-3'>Llena todos los campos para editar un cliente</p>

        <div className='flex justify-end'>
            <button className='bg-blue-800 text-white px-3 py-1 font-bold uppercase' 
                    type='button'
                    onClick={ () => navigate('/')}>Volver</button>
        </div>

        <div className='bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20'>
            {errores?.length && errores.map((error, index)=> (<Error key={index}>{error}</Error>)) }
            <Form method='post' noValidate>
            <Formulario  cliente={cliente}/>
            <input type="submit"
                    className='mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg'
                    value="Editar Nuevo Cliente"
                    />
            </Form>
        </div>
    </>
  )
}

export default EditarCliente