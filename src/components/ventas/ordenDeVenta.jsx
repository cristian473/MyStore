import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {EndOrden} from '../../actions/ventasActions'
import '../../styles/orderDiv.scss'
const OrdenVenta = ({idStore}) => {
    const dispatch = useDispatch();
    const productsOrden = useSelector(store => store.orden.productsOrden)
    
    const handlerClickEndOrden = () => {
        dispatch(EndOrden(idStore,productsOrden, subTotal, descuentoMayorista, details));
    }
    let subTotal = 0;
    let descuentoMayorista = 0;
    let details = null;
    return (
        <>
            {productsOrden.length > 0 ? (
                <div className='ordenesContainerDiv'>
                    <div className="ordenesDiv">
                        {productsOrden.map(e => {
                            subTotal += e.cantidad * e.precio;
                            if (e.precioMayorista) descuentoMayorista += subTotal - e.precioMayorista;

                            return (
                                <div className='ordenDiv'>
                                    <h4>{e.cantidad} | {e.name}</h4>
                                    
                                </div>
                            )
                        }
                        )}
                    </div>
                    
                    <div className="buttonsContainer">
                        <Link
                            to={{
                                pathname: '/' + idStore + '/finalizar-venta',
                                state: { productos: productsOrden }
                            }}

                        >
                            <div>Agregar Detalles</div>
                        </Link>
                        <div onClick={handlerClickEndOrden} >Finalizar venta</div>
                    </div>
                    
                </div>
                
            ):(
                
                <>
                </>
            )}
        </>
    )
   
}

export default OrdenVenta