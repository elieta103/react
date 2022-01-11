// rfce Function declaration
// rafce Function expresion  function arrow
import Formulario from './components/Formulario'
import Header from './components/Header'
import ListadoPacientes from './components/ListadoPacientes'
import { useState, useEffect } from 'react'

const App = () => {

  const [pacientes, setPacientes] = useState([]);  //Arreglo de pacientes
  const [paciente, setPaciente] = useState({});    //Paciente individual

  const eliminarPaciente = (id) =>{
      console.log('Elimianar', id)
      const pacientesEliminados = pacientes.filter(pacienteItem => pacienteItem.id !== id)
      setPacientes(pacientesEliminados)
  }

    //Solo se ejecuta una sola vez , porque recibe un array vacio
    //Obtiene lo que haya en localStorage y guarda en el state
    useEffect(() => { 
      const obtenerLocalStorage = () =>{
        const pacientesLocalStorage = JSON.parse(localStorage.getItem('pacientes'))?? [];
        setPacientes(pacientesLocalStorage)
      }

      obtenerLocalStorage();
    }, [])
  
  //Cada que haya un cambio en pacientes, se ejecuta 
  useEffect(() => {
    console.log('Cambios de pacientes en localStorage')
    localStorage.setItem('pacientes', JSON.stringify(pacientes))
  }, [pacientes])



  return (
    <div className="container mx-auto mt-20">
      <Header/>
      <div className='mt-12 md:flex'>  
        <Formulario
            setPacientes = {setPacientes}
            pacientes = {pacientes}
            paciente = {paciente}
            setPaciente = {setPaciente}

          />
        <ListadoPacientes
            pacientes={pacientes}
            setPaciente={setPaciente}
            eliminarPaciente={eliminarPaciente}
        />
      </div>
    </div>
  )
}

export default App
