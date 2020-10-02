import React, { useEffect, } from 'react'
// import productos from '../../productos.json'
import Producto from './producto'
import { getProducts } from '../../actions/productActions'
import { useDispatch, useSelector } from 'react-redux'
import '../../styles/productList.scss'

const ListaProductos = () => {
    const dispatch = useDispatch();
    const products = useSelector(store => store.products.products)
    const productsInOrden = useSelector(store => store.orden.productsInOrden)
    const idStore = useSelector((store) => store.user.storeSelected)
    useEffect(() => {
        dispatch(getProducts(idStore));
    }, [])

    const changeProductsAmountRest = (id) => {
        if (productsInOrden[id] && productsInOrden[id] !== 0) {
            let temp = parseInt(productsInOrden[id]) - 1
            dispatch({ type: 'CLEAN_AMOUNT', payload: { ...productsInOrden, [id]: temp } })
        }
    }

    const changeProductsAmountSum = (id) => {
        if (!productsInOrden[id]) dispatch({ type: 'CLEAN_AMOUNT', payload: { ...productsInOrden, [id]: 1 } })
        else if (productsInOrden[id] > 0) {
            let temp = parseInt(productsInOrden[id]) + 1
            dispatch({ type: 'CLEAN_AMOUNT', payload: { ...productsInOrden, [id]: temp } })
        }
    }

    return (
        <div className='proContainer'>
            <div className='listaDiv'>
                {products.length > 0 ? (
                    products.map((pro, i) => (
                        <Producto
                            key={i}
                            datos={pro}
                            changeProductsAmountSum={changeProductsAmountSum}
                            changeProductsAmountRest={changeProductsAmountRest}
                            productsInOrden={productsInOrden}
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