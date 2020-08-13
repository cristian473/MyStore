import React from 'react'
import productos from '../../productos.json'
import Producto from './producto'


const ListaProductos = () => {

    return (
        <div>
            {productos.map(pro => (
                <Producto 
                    name = {pro.nombre}
                    stock = {pro.stock}
                    precio = {pro.precio}
                    imagen = {pro.imagen}
                />
            ))}
        </div>
    )

}

export default ListaProductos