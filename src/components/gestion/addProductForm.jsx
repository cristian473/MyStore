import React, { useState } from 'react'
import { addProduct } from '../../actions/productActions'
import { useSelector } from 'react-redux'
import '../../styles/addProductForm.scss'

const AddProductForm = () => {
    const user = useSelector(store => store.userLogged)
    const idStore = localStorage.getItem('idStore')
    const initialState = {
        name: '',
        stock: '',
        imagen: '',
        precio: '',
        precioMayorista: '',
        costoMaterial: '',
        idTienda: idStore
    }

    const [producto, setProduct] = useState(initialState)

    const handlerInputChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...producto, [name]: value })
    }

    const handlerSubmit = (e) => {
        e.preventDefault()
        addProduct(producto)
        setProduct(initialState)

    }


    return (
        <div className='formContainer'>
            <div className='form'>
                <h2>Carga de productos</h2>
                <form onSubmit={(e) => handlerSubmit(e)} >
                    <input type="text" name='name' placeholder='Nombre' value={producto.name} onChange={handlerInputChange} />
                    <input type="text" name='stock' value={producto.stock} placeholder='Stock' onChange={handlerInputChange} />
                    <input type="text" name='imagen' value={producto.imagen} placeholder='Imagen' onChange={handlerInputChange} />
                    <input type="text" name='precio' value={producto.precio} placeholder='Precio' onChange={handlerInputChange} />
                    <input type="text" name='precioMayorista' value={producto.precioMayorista} placeholder='Precio Mayorista' onChange={handlerInputChange} />
                    <input type="text" name='costoMaterial' value={producto.costoMaterial} placeholder='Costo del material' onChange={handlerInputChange} />
                    <button> submit</button>
                </form>
            </div>
        </div>
    )

}

export default AddProductForm