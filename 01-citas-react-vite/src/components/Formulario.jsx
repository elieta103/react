// rfce Function declaration
// rafce Function expresion  function arrow


import {useState, useEffect} from 'react'
import Error from './Error';

const Formulario = ({setPacientes, pacientes, setPaciente, paciente}) => {
    //RELAS PARA LOS HOOKS
    //1.- No se ponen fuera del componente
    //2.- No se ponen en condicionales 
    //3.- Tampoco despues de return
    //4.- Se ponen como primer declaracion en el componente

    const [nombre, setNombre] = useState('');
    const [propietario, setPropietario] = useState('');
    const [email, setEmail] = useState('');
    const [fecha, setFecha] = useState('');
    const [sintomas, setSintomas] = useState('');

    const [error, setError] = useState(false);

    //Se ejecuta solo hasta que cambia paciente, hasta que se hace click en editar paciente
    // Escucha los cambios que suceden en alguna parte del state
    useEffect(()=>{
        if(Object.keys(paciente).length > 0){
            setNombre(paciente.nombre);
            setPropietario(paciente.propietario);
            setEmail(paciente.email);
            setFecha(paciente.fecha);
            setSintomas(paciente.sintomas);
        }
    },[paciente]);
    
    const generarId = ()=>{
        return Date.now().toString(36) + Math.random().toString(36).substring(2);
    }

    const handleSubmit = (e) =>{
        e.preventDefault();

        //Validacion del formulario
        if([nombre, propietario, email, fecha, sintomas].includes('')){
            setError(true);
            return;
        }
        setError(false);
        //Objeto Paciente, no es necesario nombre:nombre porque se llaman igual
        //Solo para el id porque se llaman diferente
        const objetoPaciente = {
            nombre,
            propietario,
            email,
            fecha,
            sintomas
        }

        //Determinar si es edicion o alta
        if(paciente.id){
            //Edicion
            objetoPaciente.id = paciente.id;
            const pacientesActualizados = pacientes.map(pacienteState => pacienteState.id === paciente.id ? objetoPaciente: pacienteState )
            setPacientes(pacientesActualizados)
            setPaciente({})
        }else{
            //Alta
            objetoPaciente.id = generarId()
            setPacientes([...pacientes, objetoPaciente]);
        }

        //Reiniciar formulario
        setNombre('');
        setPropietario('')
        setEmail('')
        setFecha('')
        setSintomas('')

    };
    

    return (
        <div className="md:w-1/2 lg:w-2/5">
            <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>
            <p className="text-lg mt-5 text-center mb-10">Añade pacientes y {''} <span className="text-indigo-600 font bold">Administralos</span></p>
            
            <form 
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded-lg py-10 px-5 mb-10 mx-5">
                { error &&  <Error>Todos los campos son obligatorios</Error> }
                <div className="mb-5">
                    <label 
                        htmlFor="mascota"
                        className="block text-gray-700 uppercase font-bold">Nombre Mascota</label>
                    <input 
                        id="mascota"
                        type="text"
                        value={nombre}
                        onChange={ (e)=> setNombre(e.target.value) }
                        placeholder="Nombre de la Mascota" 
                        className="border-2 w-full p-2 mt-2 placeholder:gray-400 rounded-md"/>
                </div>
                <div className="mb-5">
                    <label 
                        htmlFor="propietario"
                        className="block text-gray-700 uppercase font-bold">Nombre Propietario</label>
                    <input 
                        id="propietario"
                        type="text"
                        value={propietario}
                        onChange={ (e)=> setPropietario(e.target.value) }
                        placeholder="Nombre del Propietario" 
                        className="border-2 w-full p-2 mt-2 placeholder:gray-400 rounded-md"/>
                </div>
                <div className="mb-5">
                    <label 
                        htmlFor="email"
                        className="block text-gray-700 uppercase font-bold">Email</label>
                    <input 
                        id="email"
                        type="email"
                        value={email}
                        onChange={ (e)=> setEmail(e.target.value) }
                        placeholder="Email Contacto Propietario" 
                        className="border-2 w-full p-2 mt-2 placeholder:gray-400 rounded-md"/>
                </div>
                <div className="mb-5">
                    <label 
                        htmlFor="alta"
                        className="block text-gray-700 uppercase font-bold">Alta</label>
                    <input 
                        id="alta"
                        type="date"
                        value={fecha}
                        onChange={ (e)=> setFecha(e.target.value) }
                        className="border-2 w-full p-2 mt-2 placeholder:gray-400 rounded-md"/>
                </div>
                <div className="mb-5">
                    <label 
                        htmlFor="sintomas"
                        className="block text-gray-700 uppercase font-bold">Sintomas</label>
                    <textarea id="sintomas" 
                        value={sintomas}
                        onChange={ (e)=> setSintomas(e.target.value) }
                        placeholder="Describe los sintomas"
                        className="border-2 w-full p-2 mt-2"></textarea>
                </div>
                <input 
                    type="submit" 
                    className="cursor-pointer bg-indigo-700 w-full p-3 text-white uppercase font-bold hover:bg-indigo-600"
                    value={paciente.id ? 'Editar Paciente': 'Agregar Paciente'}/>
            </form>
        </div>
    )
}

export default Formulario;
