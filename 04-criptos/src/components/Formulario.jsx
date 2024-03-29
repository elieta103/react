import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import useSelectMonedas from '../hooks/useSelectMonedas'
import { monedas } from '../data/monedas'
import Error from './Error'


const InputSubmit = styled.input`
    background-color: #9497FF;
    border: none;
    width: 100%;
    padding: 10px;
    color: #FFF;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    transition: background-color .3s ease;
    margin-top: 30px;
    
    &:hover {
        background-color: #7A7DFE;
        cursor: pointer;
    }
`

const Formulario = ({setMonedas}) => {

    const [moneda, SelectMonedas] = useSelectMonedas('Elige tu moneda', monedas)
    const [criptos, setCriptos] = useState([])
    const [criptomoneda, SelectCriptoMonedas] = useSelectMonedas('Elige tu Criptomoneda', criptos)

    const [error, setError] = useState(false)

    /* Algunos usos de useEffect : 
       - Consulta de API's 
       - Guardado de informacion en LocalStorage
       - Vacio, se ejecuta una sola vez. */

    useEffect(()=>{
        const consultarAPI = async () => {
            const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";
            const respuesta = await fetch(url)
            const resultado = await respuesta.json()
            console.log(resultado.Data);

            const arrayCriptos = resultado.Data.map(cripto => {
                const objeto ={
                    id : cripto.CoinInfo.Name,
                    nombre : cripto.CoinInfo.FullName
                }

                return objeto;
            });

            setCriptos(arrayCriptos);
        }

        consultarAPI();

    }, [])

    const handleSubmit = e => {
        e.preventDefault();

        if([moneda, criptomoneda].includes('')){
            setError(true)
            return 
        }
        setError(false)
        setMonedas({moneda, criptomoneda})
    }

    return (
        <>
            {error && <Error>Todos los campos son obligatorios.</Error>}
            <form onSubmit={handleSubmit}>
                <SelectMonedas />
                <SelectCriptoMonedas />
                <InputSubmit type="submit" value="Cotizar" />
            </form>
        </>
    )
}

export default Formulario