import React, { useState } from 'react'
import Gasto from './Gasto'

const ListadoGastos = ({gastos, setGastoEditar, gastoEliminar, filtro, gastosFiltrados}) => {

  console.log('Filtro : ', filtro)
  console.log('Gastos : ', gastos)
  console.log('Gastos filtrados : ', gastosFiltrados)


  return (
   
    <div className='listado-gastos contenedor'>
        {
          filtro !=='' ? 
            (
              <>
                <h2>{ (gastosFiltrados.length===0) ? 'No hay gastos para esa categoria' : 'Gastos Filtrados'}</h2>
                {
                  gastosFiltrados.map(gasto =>
                    <Gasto key={gasto.id} 
                            gastoEliminar={gastoEliminar}
                            setGastoEditar={setGastoEditar}
                            gasto={gasto} />)
                }
              </>
            ):(
              <>
              <h2>{ (gastos.length===0) ? 'No hay gastos': 'Gastos' }</h2>
              {
                gastos.map(gasto =>
                  <Gasto key={gasto.id} 
                          gastoEliminar={gastoEliminar}
                          setGastoEditar={setGastoEditar}
                          gasto={gasto} />)  
              }
              </>
            )
        }



         
         
    </div>
  )
}

export default ListadoGastos