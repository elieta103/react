import { useState, useEffect } from 'react'
import Filtros from './components/Filtros';
import Header from './components/Header'
import ListadoGastos from './components/ListadoGastos';
import Modal from './components/Modal'
import { generarId } from './helpers';
import IconoNuevoGasto from './img/nuevo-gasto.svg'

function App() {
  const [presupuesto, setPresupuesto] = useState( Number(localStorage.getItem('presupuesto' ?? 0)) );
  const [validPresupuesto, setValidPresupuesto] = useState(false);  //Controla si se muestra o no el otro componente
  
  const [modal, setModal]= useState(false);
  const [animarModal, setAnimarModal]= useState(false);
  const [gastos, setGastos] = useState(  localStorage.getItem('gastos')? JSON.parse(localStorage.getItem('gastos')) : []  )

  const [gastoEditar, setGastoEditar] = useState({})

  const [filtro, setFiltro] = useState('')
  const [gastosFiltrados, setGastosFiltrados] = useState([])

  //Escucha los cambios en el gastoEditar y muestra la modal para editar
  useEffect(()=>{
    if(Object.keys(gastoEditar).length > 0){  //Cuando traiga datos, muestra modal
      setModal(true);

      setTimeout(()=>{
        setAnimarModal(true);
      }, 500);
  
    }
    
  }, [gastoEditar])


  //Escuchar cambios en presupuesto, para el LocalStorage
  useEffect(()=>{
      localStorage.setItem('presupuesto', presupuesto ?? 0);
  },[presupuesto])

  //Escuchar cambios en gastos, para el LocalStorage
  useEffect(()=>{
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? [] );
  },[gastos])

  //Escuchar cambios en el filtro
  useEffect(()=>{
    if(filtro){
      const gastosFiltro = gastos.filter(item => item.categoria===filtro)
      setGastosFiltrados(gastosFiltro)
      console.log('Cambio en filtro : ', gastosFiltrados)
    }
    
  }, [filtro])



  //Se ejecuta una sola vez, al cargar el componente, si esta definido presupuesto ya no se pide capturarlo
  useEffect(()=>{
    const presupuestoLS = Number (localStorage.getItem('presupuesto') ?? 0)
      if (presupuestoLS  > 0){
        setValidPresupuesto(true)
      }
},[])


  const handleNuevoGasto = () => {
    console.log('Nuevo gasto')
    setGastoEditar({})  //limpiar seleccion previa
    setModal(true);

    setTimeout(()=>{
      setAnimarModal(true);
    }, 500);
  }

  //Recibe el gasto capturado de la modal
  const guardarGasto = gasto =>{
      if(gasto.id){ //Editar
        const gastosActualizados = gastos.map( gastoItem => gasto.id===gastoItem.id? gasto : gastoItem );
        setGastos(gastosActualizados);
        setGastoEditar({});

      }else{  //Alta
        gasto.id = generarId();
        gasto.fecha = Date.now();
        setGastos([...gastos, gasto]);  //Guarda previos y agrega uno nuevo  
      }

      //Animacion Ocultar Modal
      setAnimarModal(false);  // Controla los estilos, la opacidad
      setTimeout(()=>{      
        setModal(false); // Quita el componente
      }, 500);
  }

  const gastoEliminar = id =>{
    console.log("Eliminar : ", id);
    const gastosActualizados = gastos.filter( gastoItem => id !== gastoItem.id );
    setGastos(gastosActualizados);
  } 

  return (
    /*Estilo para la Modal, cuando haya muchos gastos, la  modal ocupe el 100% de la ventana */
    <div className={modal? 'fijar':''}>
      <Header
             presupuesto={presupuesto}
             setPresupuesto={setPresupuesto}
             validPresupuesto={validPresupuesto}
             setValidPresupuesto={setValidPresupuesto}
             gastos={gastos}
             setGastos={setGastos}
      />

      {validPresupuesto &&
        <>
          <main>
            <Filtros filtro={filtro}
                     setFiltro={setFiltro}/>
            <ListadoGastos  setGastoEditar={setGastoEditar}
                            gastoEliminar={gastoEliminar}
                            gastos={gastos}
                            filtro={filtro}
                            gastosFiltrados={gastosFiltrados}/>
          </main>
          <div className='nuevo-gasto'>
            <img src={IconoNuevoGasto} 
                 alt="Icono nuevo gastos"
                 onClick={handleNuevoGasto}/>
          </div>
        </>
      }

      { modal && <Modal 
                      setModal={setModal}
                      animarModal={animarModal}
                      setAnimarModal={setAnimarModal}
                      guardarGasto={guardarGasto}
                      gastoEditar={gastoEditar}
                      setGastoEditar={setGastoEditar}/>}
    </div>
  )
}

export default App
