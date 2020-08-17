import React, {useState} from 'react'
import {addProduct} from '../../actions/productActions'
import { useSelector } from 'react-redux'

const AddProductForm = () => {

    const user = useSelector(store => store.userLogged)

    const initialState = {
        name:'',
        stock: '',
        imagen: '',
        precio: '',
        idTienda: '',
    }

    const [producto, setProduct] = useState(initialState)

    const handlerInputChange = (e) => {
        const {name, value} = e.target;
        setProduct({...producto, [name]:value})
    }

    const handlerSubmit = (e) => {
        e.preventDefault()
        addProduct(producto)
        setProduct(initialState)

    }


    return (
        <>
            <form onSubmit={(e)=>handlerSubmit(e)} >
                <input type="text" name= 'name' placeholder= 'nombre' value={producto.name} onChange={handlerInputChange}/>
                <input type="text" name= 'stock' value={producto.stock} placeholder='stock' onChange={handlerInputChange}/>
                <input type="text" name= 'imagen' value={producto.imagen} placeholder='imagen' onChange={handlerInputChange}/>
                <input type="text" name= 'precio' value={producto.precio} placeholder='precio' onChange={handlerInputChange}/>
                <button> submit</button>

            </form>
        </>
    )

}

export default AddProductForm