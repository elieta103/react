import React from "react";

const Cita = ({cita}) => {

    const {mascota, propietario, fecha, hora, sintomas} = cita;

  return (
    <div className="cita">
      <p>Mascota: <span>{mascota}</span></p>
      <p>Propietario: <span>{propietario}</span></p>
      <p>Fecha: <span>{fecha}</span></p>
      <p>Hora: <span>{hora}</span></p>
      <p>Sintomas: <span>{sintomas}</span></p>
    </div>
  );
};

export default Cita;
