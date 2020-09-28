import React, { useState } from 'react'
import { addProduct } from '../../actions/productActions'
import { useSelector } from 'react-redux'
import '../../styles/addProductForm.scss'
import FileBase64 from 'react-file-base64';

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
    const [nameImage, setNameImage] = useState('')
    const [producto, setProduct] = useState(initialState)

    const handlerInputChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...producto, [name]: value })
    }

    const handlerImageUpload = (files) => {
        setNameImage(files.name)
        setProduct({ ...producto, imagen: files.base64 })
    }

    const handlerSubmit = async (e) => {
        e.preventDefault()
        await addProduct(producto)
        setProduct(initialState)

    }


    return (
        <div className='formContainer'>
            <div className='form'>
                <h2>Carga de productos</h2>
                <form onSubmit={(e) => handlerSubmit(e)} >
                    <input type="text" name='name' placeholder='Nombre' value={producto.name} onChange={handlerInputChange} />
                    <input type="text" name='stock' value={producto.stock} placeholder='Stock' onChange={handlerInputChange} />
                    <input type="text" name='precio' value={producto.precio} placeholder='Precio' onChange={handlerInputChange} />
                    <input type="text" name='precioMayorista' value={producto.precioMayorista} placeholder='Precio Mayorista' onChange={handlerInputChange} />
                    <input type="text" name='costoMaterial' value={producto.costoMaterial} placeholder='Costo del material' onChange={handlerInputChange} />
                    <label>{`${producto.imagen ? nameImage : 'Cargar una imagen'}`}</label>
                    <FileBase64
                        onDone={handlerImageUpload}
                    />
                    <button type='submit'>Cargar</button>
                </form>
            </div>
        </div>
    )

}

export default AddProductForm