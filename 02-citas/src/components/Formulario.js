import React, {Fragment, useState} from 'react';
import { v4 as uuidv4 } from 'uuid';


const Formulario = ({crearCita}) => {
    //Crear el state de citas
    const [cita, actualizarCita] = useState({
        mascota:'',
        propietario:'',
        fecha:'',
        hora:'',
        sintomas:''
    });

    //Crear state del error
    const [error, actualizarError]= useState(false);

    //Funcion que se ejecuta cada que el usuario escribe en un input
    const actualizarState = (e) =>{
        actualizarCita({
            ...cita,
            [e.target.name]: e.target.value
        });
    };

    //Extraer los valores del formulario, evitar el cita.mascota
    const {mascota, propietario, fecha, hora, sintomas} = cita;

    //Enviar el formulario
    const submitCita = (e) =>{
        e.preventDefault();  // Evitar que se muestre el QueryString de los param en la URL
        
        // 1.- Validar
        if(mascota.trim()==='' || propietario.trim()==='' || fecha.trim()==='' || 
            hora.trim()==='' || sintomas.trim()===''){
            actualizarError(true);  //Actualiza state del error, NO es objeto, solo un boolean
            return ;
        }
        //Elimina el mensaje previo, cuando encontro un error y se corrigio
        actualizarError(false);

        // 2.- Asignar un ID, en una nueva propiedad, no es parte del state
        cita.idCita = uuidv4();
        
        console.log(cita);
        // 3.- Crear la cita
        crearCita(cita);

        // 4.- Limpiar la forma, useState
        actualizarCita({
            mascota:'',
            propietario:'',
            fecha:'',
            hora:'',
            sintomas:''
        });



    };

    return (
        <Fragment>
            <h2>Crear Cita</h2>
            <form onSubmit={submitCita}>
                {error ? <p className="alerta-error">Todos los campos son requeridos</p>:null}

                <label>Nombre Mascota</label>
                <input 
                    type="text"
                    name="mascota"
                    className="u-full-width"
                    placeholder="Nombre Mascota"
                    onChange={actualizarState}
                    value={mascota}
                />
                <label>Nombre Dueño</label>
                <input 
                    type="text"
                    name="propietario"
                    className="u-full-width"
                    placeholder="Nombre Dueño"
                    onChange={actualizarState}
                    value={propietario}
                />
                <label>Fecha</label>
                <input 
                    type="date"
                    name="fecha"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={fecha}
                />
                <label>Hora</label>
                <input 
                    type="time"
                    name="hora"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={hora}
                />
                <label>Síntomas</label>
                <textarea
                    name="sintomas"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={sintomas}
                ></textarea>
                <button type="submit" 
                        className="u-full-width button-primary"
                >Agregar cita</button>


            </form>
        </Fragment>
    );
}
 
export default Formulario;