import React, {useEffect} from 'react'
import productos from '../../productos.json'
import Producto from './producto'
import {getProducts} from '../../actions/productActions'
import {useDispatch, useSelector} from 'react-redux'


const ListaProductos = () => {
    const dispatch = useDispatch();
    const products = useSelector (store => store.products)
    
    useEffect(()=> {
        dispatch(getProducts());
    }, [])

    return (
        <div className='proContainer'>
           {products.length > 0 ? (
                products.map(pro => (
                    <div>
                        <div>nombre ---- stock ---- precio</div>
                        <Producto 
                            id = {pro.id}
                            name = {pro.name}
                            stock = {pro.stock}
                            precio = {pro.precio}
                            imagen = {pro.imagen}
                        />
                    </div>
                                
                                
                ))

           ) : (
            <h2>cargando...</h2>
           )}
            
        </div>
    )

}

export default ListaProductos