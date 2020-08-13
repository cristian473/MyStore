import React, {useState} from 'react'


const AddProductForm = () => {

    const initialState = {
        name:'',
        stock: '',
        imagen: '',
        precio: ''
    }

    const [producto, setProduct] = useState(initialState)

    const handlerInputChange = (e) => {
        const {name, value} = e.target;
        setProduct({...producto, [name]:value})
    }

    const handlerSubmit = (e) => {
        e.preventDefault()



        setProduct(initialState)

    }


    return (
        <>
            <form onSubmit={handlerSubmit} >
                <input type="text" name= 'name' value={producto.name} onChange={handlerInputChange}/>
                <input type="text" name= 'stock' value={producto.stock} onChange={handlerInputChange}/>
                <input type="text" name= 'imagen' value={producto.imagen} onChange={handlerInputChange}/>
                <input type="text" name= 'precio' value={producto.precio} onChange={handlerInputChange}/>
                <button> submit</button>

            </form>
        </>
    )

}

export default AddProductForm