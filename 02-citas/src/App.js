import React, { Fragment, useState } from "react";
import Formulario from "./components/Formulario";
import Cita from "./components/Cita";

function App() {

  // Arreglo de citas, useState para citas
  const [citas, guardarCitas] = useState([]);

  //Funcion que tome las citas actuales y guarde una nueva, useState
  const crearCita = (cita) =>{
    guardarCitas([
        ...citas,
        cita
    ]);
  };

  return (
    <Fragment>
      <h1>Administrador de Pacientes</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario
                crearCita={crearCita}
            />
          </div>
          <div className="one-half column">
            <h2>Administra tus citas</h2>
             {citas.map( cita =>(
               <Cita
                  key={cita.id}
                  cita={cita}
               />
             ) )}
          </div>
        </div>
      </div>
    </Fragment>
   

  );
}

export default App;
