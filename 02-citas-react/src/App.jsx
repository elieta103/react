import { Header } from "./components/Header"
import { Formulario} from './components/Formulario'
import { ListadoPacientes } from "./components/ListadoPacientes"
import { useState, useEffect } from "react"


function App() {

  const [pacientes, setPacientes ] = useState([]);  // Listado paciente
  const [paciente , setPaciente] = useState({});    // Paciente unico

  //Pasar datos PADRE->HIJO  CON LOS PROPS
  //Pasar datos HIJO ->PADRE CON LAS FUNCIONES
  //Cuando se pasan por mas niveles, es uno a uno  App -> ListadoPacientes -> Paciente

  // ES IMPORTANTE EL ORDEN
  // Cuando no hay dependencias en el array, se carga una sola vez al inicio
  /* Se cambia en el main.jsx, porque se pierden los datos en el localStorage 
      ReactDOM.render(
      <>
        <App />
      </>,
      document.getElementById('root')
      )
  */
  useEffect(()=>{
    const obtenerLS = ()=>{
      const pacientesLS = JSON.parse(localStorage.getItem('pacientes'))??[];
      setPacientes(pacientesLS);
    }

    obtenerLS();
  }, []);

  //useEffect, se dispara cuando haya cambios en el listado de pacientes y guarda en localStorage
  useEffect(()=>{
    localStorage.setItem('pacientes', JSON.stringify(pacientes));
  },[pacientes]);




const eliminarPaciente = (id) =>{
  console.log('Eliminando paciente : ', id);
  const pacientesActualizados = pacientes.filter(item => item.id !== id);
  setPacientes(pacientesActualizados);
}


  return (
   <div className="container mx-auto mt-10">
     <Header/>
     <div className="mt-12 md:flex">
        <Formulario
            pacientes={pacientes}       // Mantiene los guardados previamente
            setPacientes={setPacientes} // Recupera el ultimo, devolver el paciente del componente hijo al padre
            paciente={paciente}         // Paciente que se va editar/ELIMINAR
            setPaciente={setPaciente}   // Modificar paciente seleccionado
            />
        <ListadoPacientes
            pacientes={pacientes}
            setPaciente={setPaciente}  //Devuelve el paciente seleccionado
            eliminarPaciente={eliminarPaciente}  //eliminar paciente
        />
     </div>
   </div>
  )

}

export default App
