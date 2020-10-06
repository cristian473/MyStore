import React, { useEffect } from 'react'
import ListaProductos from '../catalogo/listaProductos'
import { useSelector, useDispatch } from 'react-redux'
import BottonOptions from './bottonOptions'
import OrdenVenta from '../ventas/ordenDeVenta'
const Home = (props) => {
    const productsOrden = useSelector(store => store.orden.productsOrden)
    return (
        <>
            <ListaProductos />
            <div className='bottonContainer'>
                {productsOrden.length > 0 ? (
                    <div className='ordenVentaContainer'>
                        <OrdenVenta />
                    </div>
                ) : (
                        <BottonOptions />
                    )}

            </div>

        </>
    )
}

export default Home