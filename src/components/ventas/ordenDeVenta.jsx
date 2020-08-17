import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const OrdenVenta = () => {

    const productsOrden = useSelector(store => store.orden.productsOrden)

    
    return (
        <div className='ordenes'>
            {productsOrden.length > 0 ? (
                <div className='hola'>
                    {productsOrden.map(e => (
                        <div>
                            <h2>{e.name}</h2>
                            <h3>unidades: {e.cantidad}</h3>
                        </div>
                    ))}
                </div>
                
            ):(
                
                <div >
                    <h2>no se cargo ninguna orden!</h2>
                </div>
            )}
        </div>
    )
   
}

export default OrdenVenta