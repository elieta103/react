import React, { useState } from 'react'
import Mensaje from './Mensaje'

const NuevoPresupuesto = ({presupuesto, setPresupuesto,  setValidPresupuesto}) => {

  const [mensaje, setMensaje] = useState('');   //Mensaje de validacion

  const handlePresupuesto = (evt) =>{
    evt.preventDefault();
    
    if(! presupuesto || presupuesto < 0 ){
      setMensaje("No es un presupuesto válido");
      return;
    }

    
    
    setMensaje('')
    setValidPresupuesto(true);
  }

  return (
    <div className='contenedor-presupuesto contenedor sombra'>
      <form className='formulario' onSubmit={handlePresupuesto}>
        <div className='campo'>
          <label>Definir Presupuesto</label>
          <input
                className='nuevo-presupuesto'
                type="number"
                placeholder='Añade tu presupuesto'
                value={presupuesto}
                onChange={(e) => setPresupuesto(Number(e.target.value)) }
          />
        </div>
        <input type="submit" value="Añadir" />
        {mensaje && <Mensaje mensaje={mensaje}  tipo="error"/>}
        
        
      </form>
    </div>
  )
}

export default NuevoPresupuesto