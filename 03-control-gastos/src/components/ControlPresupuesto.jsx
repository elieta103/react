import React, { useEffect, useState } from 'react'
import  { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css"

const ControlPresupuesto = ({presupuesto, setPresupuesto, gastos, setGastos, setValidPresupuesto}) => {

  const [disponible, setDisponible] = useState(0);
  const [gastado, setGastado] = useState(0);
  const [porcentaje, setPorcentaje] = useState(0);
  

  //Escucha los cambios que ocurren en gastos
  useEffect(()=>{
      // ? Para evitar la excepcion de undefined
      const totalGastado = gastos?.reduce((acumulado, actual)=> acumulado+actual.cantidad, 0);
      setDisponible(presupuesto-totalGastado)
      setGastado(totalGastado);  

      setTimeout( ()=>{
        totalGastado===0 ? setPorcentaje(0) : setPorcentaje(100 - (((presupuesto-totalGastado)/presupuesto)*100).toFixed(2) )
      },1000);

      
  },[gastos]);

  const formatearCantidad = (cantidad) =>{
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      });
    return formatter.format(cantidad)
  }


  const handleResetApp = () =>{
      const resp = confirm('¿ Deseas reiniciar presupuesto y gastos?')
      if(resp){
        setGastos([])
        setPresupuesto(0)
        setValidPresupuesto(false)
      }
    
  }

  return (
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
        <div>
            <CircularProgressbar text={`${porcentaje} % Gastado`}
                                  value={porcentaje}
                                 styles={buildStyles({
                                    pathColor: porcentaje > 100 ? '#DC2626' : '#3B82F6',
                                    trailColor: '#F5F5F5',
                                    textColor: porcentaje > 100 ? '#DC2626' : '#3B82F6'
                                 })}/>
        </div>

        <div className='contenido-presupuesto'>
            <button className='reset-app' type='button' onClick={handleResetApp}>
              Resetar App
            </button>
            <p>
                <span>Presupuesto: </span> {formatearCantidad(presupuesto)}               
            </p>
            <p className={`${disponible < 0 ? 'negativo': ''}`}>
                <span>Disponible : </span> {formatearCantidad(disponible)}
            </p>
            <p>
                <span>Gastado    : </span> {formatearCantidad(gastado)}
            </p>
        </div>
    </div>
  )
}

export default ControlPresupuesto