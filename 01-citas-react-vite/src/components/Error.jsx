// Opcion 1
/*const Error = ({ mensaje }) => {
    return (
        <div className='bg-red-700 text-white text-center p-3 uppercase font-bold mb-3 rounded-md'>
            <p>{ mensaje }</p>
        </div>
    )
}*/

// Opcion 2
const Error = ({ children }) => {
    return (
        <div className='bg-red-700 text-white text-center p-3 uppercase font-bold mb-3 rounded-md'>
            <p>{ children }</p>
        </div>
    )
}

export default Error
