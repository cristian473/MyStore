import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {EndOrden} from '../../actions/ventasActions'

const OrdenVenta = ({idStore}) => {
    const dispatch = useDispatch();
    const productsOrden = useSelector(store => store.orden.productsOrden)
    
    // const handlerClickEndOrden = () => {
    //     dispatch(EndOrden(productsOrden))
    // }
    let subTotal = 0;
    let descuentoMayorista = 0;
    let details = null;
    return (
        <div className='ordenes'>
            {productsOrden.length > 0 ? (
                <div className='hola'>
                    {productsOrden.map(e => {
                        subTotal += e.cantidad * e.precio;
                        if(e.precioMayorista) descuentoMayorista += subTotal - e.precioMayorista;
                        
                        return (
                            <div>
                                <h4>{e.name}</h4>
                                <h4>unidades: {e.cantidad}</h4>
                            </div>
                        )
                    }
                    )}
                
                    <Link
                        to={{
                            pathname: '/'+idStore+'/finalizar-venta',
                            state: {productos: productsOrden}
                        }}
                        
                    >
                        <button>Agregar Detalles</button> 
                    </Link>
                    <button onClick={()=>dispatch(EndOrden(idStore,productsOrden, subTotal, descuentoMayorista, details))} >Finalizar venta</button>
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