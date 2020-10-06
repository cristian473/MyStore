import React, { useState } from 'react'
import { addProduct } from '../../actions/productActions'
import { useSelector } from 'react-redux'
import '../../styles/addProductForm.scss'
import FileBase64 from 'react-file-base64';
import Swal from 'sweetalert2';

const AddProductForm = () => {
    const user = useSelector(store => store.userLogged)
    const idStore = useSelector((store) => store.user.storeSelected)
    const initialState = {
        name: '',
        stock: 0,
        imagen: '',
        precio: '',
        precioMayorista: '',
        costoMaterial: '',
        idTienda: idStore
    }
    const [nameImage, setNameImage] = useState('')
    const [producto, setProduct] = useState(initialState)

    const handlerInputChange = (e) => {
        let { name, value } = e.target;
        value = value.replace(/,/g, '.')
        console.log(value);
        setProduct({ ...producto, [name]: value })
    }

    const handlerImageUpload = (files) => {
        setNameImage(files.name)
        setProduct({ ...producto, imagen: files.base64 })
    }

    const handlerSubmit = async (e) => {
        e.preventDefault()
        if (!producto.imagen) {
            Swal.fire(
                'Error!',
                `Asegurese de cargar una imagen`,
                'error'
            )
        } else {
            await addProduct(producto)
            setProduct(initialState)
        }
    }


    return (
        <div className='formContainer'>
            <div className='form'>
                <h2>Carga de productos</h2>
                <form onSubmit={(e) => handlerSubmit(e)} >
                    <input required type="text" name='productName' placeholder='Nombre' value={producto.productName} onChange={handlerInputChange} />
                    <input required type="number" min={0} step="any" name='precio' value={producto.precio} placeholder='Precio' onChange={handlerInputChange} />
                    <input type="number" min={0} step="any" name='precioMayorista' value={producto.precioMayorista} placeholder='Precio Mayorista' onChange={handlerInputChange} />
                    <input required type="number" min={0} step="any" name='costoMaterial' value={producto.costoMaterial} placeholder='Costo del material' onChange={handlerInputChange} />
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