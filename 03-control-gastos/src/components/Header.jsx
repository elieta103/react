import React from 'react'
import ControlPresupuesto from './ControlPresupuesto'
import NuevoPresupuesto from './NuevoPresupuesto'

const Header = ({presupuesto, setPresupuesto, validPresupuesto, setValidPresupuesto, gastos, setGastos}) => {
  return (
   <header>
        <h1>Planificador de Gastos</h1>
        {validPresupuesto         ? 
            <ControlPresupuesto setPresupuesto={setPresupuesto}
                                presupuesto={presupuesto}
                                gastos={gastos}
                                setGastos={setGastos}
                                setValidPresupuesto={setValidPresupuesto}/> :
            <NuevoPresupuesto 
                         presupuesto={presupuesto}
                         setPresupuesto={setPresupuesto}  
                         setValidPresupuesto={setValidPresupuesto}      
            />
        }
   </header>
  )
}

export default Header