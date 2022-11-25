import React, { useEffect, useState } from 'react'
import CerrarBtn from '../img/cerrar.svg'
import Mensaje from './Mensaje';


const Modal = ({setModal, animarModal, setAnimarModal, guardarGasto, gastoEditar, setGastoEditar}) => {
  const [nombre, setNombre]=useState('');
  const [cantidad, setCantidad]=useState('');
  const [categoria, setCategoria]=useState('');
  const [fecha, setFecha]= useState('');
  const [id, setId]=useState('');  
  
  const [mensaje, setMensaje] = useState('');


  //Para cargar datos en la modal, useEffect cuando el componente este listo
  useEffect(
      ()=>{
        if(Object.keys(gastoEditar).length > 0){  //Cuando traiga datos, Edicion
          console.log('Modal Editar...')
          setNombre(gastoEditar.nombre);
          setCantidad(gastoEditar.cantidad);
          setCategoria(gastoEditar.categoria);
          setFecha(gastoEditar.fecha);
          setId(gastoEditar.id);
        }else{  //Sin datos, Alta
          console.log('Modal Alta...')
        }
      },[]);

 

  const ocultarModal = () => {
    setAnimarModal(false);  // Controla los estilos, la opacidad

    setTimeout(()=>{      
      setModal(false); // Quita el componente
    }, 500);

    setGastoEditar({})
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if ([nombre, cantidad, categoria].includes('')){
      setMensaje('Todos los campos son obligatorios') //Muestra mensaje

      setTimeout ( ()=>{  //Oculta mensaje despues de 3 segundos
        setMensaje('');
      } , 3000);
      return;
    }

    //Si todo OK, crea gasto y lo envia a App.jsx por medio de la funcion
    //id se envio cuando es edicion
    const gasto ={nombre, cantidad, categoria, id, fecha}
    guardarGasto(gasto);
    
  }

  return (   
    <div className='modal'>
        <div className='cerrar-modal'>
            <img src={CerrarBtn} alt ="Cerrar Modal" onClick={ocultarModal} />
        </div> 
        <form onSubmit={handleSubmit} 
              className={`formulario ${animarModal?"animar": "cerrar"}`}  >
          <legend>{ (Object.keys(gastoEditar).length > 0)?'Editar gasto':'Nuevo gasto'}</legend>
   
          {
          mensaje && <Mensaje tipo="error" mensaje={mensaje} />
          }
   
          <div className='campo'>
            <label htmlFor='nombre'>Nombre Gasto</label>
            <input id="nombre" 
                   type="text" 
                   placeholder='Añade el nombre del gasto' 
                   value={nombre}
                   onChange={ e => setNombre(e.target.value)} />
          </div>
          <div className='campo'>
            <label htmlFor='cantidad'>Cantidad</label>
            <input id="cantidad" 
                   type="number" 
                   placeholder='Añade la cantidad del gasto. Ej 300' 
                   value={cantidad}
                   onChange={ e=> setCantidad(Number(e.target.value)) }/>
          </div>

          <div className='campo'>
            <label htmlFor='categoria'>Categoria</label>
            <select id="categoria"
                    value={categoria}
                    onChange={ e => setCategoria(e.target.value) }>
              <option value="">-- Seleccione --</option>
              <option value="ahorro">Ahorro</option>
              <option value="comida">Comida</option>
              <option value="casa">Casa</option>
              <option value="gastos">Gastos Varios</option>
              <option value="ocio">Ocio</option>
              <option value="salud">Salud</option>
              <option value="suscripciones">Suscripciones</option>
            </select>
          </div>

          <input type="submit" value={(Object.keys(gastoEditar).length > 0)?'Editar gasto':'Nuevo gasto'} />

        </form>   
    </div>
  )
}

export default Modal