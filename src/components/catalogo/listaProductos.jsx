import React, { useEffect } from 'react'
// import productos from '../../productos.json'
import Producto from './producto'
import { getProducts } from '../../actions/productActions'
import { useDispatch, useSelector } from 'react-redux'
import '../../styles/productList.scss'

const ListaProductos = ({ idStore }) => {
    const dispatch = useDispatch();
    const products = useSelector(store => store.products.products)

    useEffect(() => {
        dispatch(getProducts(idStore));
    }, [])
    return (
        <div className='proContainer'>
            <div className='listaDiv'>
                {products.length > 0 ? (
                    products.map((pro, i) => (
                        <Producto
                            key={i}
                            datos={pro}
                        />
                    ))
                ) : (
                        <h2>No hay productos.</h2>
                    )}
            </div>
        </div>
    )
}

export default ListaProductos