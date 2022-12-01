import React from 'react'
import { useLoaderData } from 'react-router-dom';
import Cliente from '../components/Cliente';
import { obtenerClientes } from '../data/clientes';

// Actua similar a un useEffect, se ejecuta cuando el componente esta listo
// Obligado el nombre y siempre debe retornar algo
export async  function loader(){
  return await obtenerClientes()
}

const Index = () => {

  //Recuperar lo que devuelve el loader que se asocia con el componente, con el hook
  const clientes = useLoaderData()
  console.log(clientes)

  return (
    <>
      <h1 className='font-black text-4xl text-blue-900'>Clientes</h1>
      <p className='mt-3'>Administra tus Clientes</p>

      {
        clientes.length > 0 ? 
                (<table className='w-full bg-white shadow mt-5 table-auto'>
                    <thead className='bg-blue-800 text-white'>
                      <tr>
                        <th className='p-2'>Cliente</th>
                        <th className='p-2'>Contacto</th>
                        <th className='p-2'>Acciones</th>                     
                      </tr>
                    </thead>
                    <tbody>
                      {
                        clientes.map(cliente =>( <Cliente key={cliente.id} cliente={cliente}/>))
                      }
                    </tbody>
                </table>)
                : 
                (<p className='text-center mt-10'>No hay clientes.</p>)
      }

    </>
  )
}

export default Index