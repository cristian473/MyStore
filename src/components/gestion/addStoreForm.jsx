import { addStore } from '../../actions/userActions'
import { useSelector } from 'react-redux'
import React, { useState } from 'react'
import '../../styles/AddStoreForm.scss'

const AddStoreForm = () => {

    const user = useSelector(store => store.userLogged.user)

    const initialState = {
        name: '',
        address: '',
        phone: '',
        idUser: user.id,
        items: [],
        ventas: []
    }

    const [store, setState] = useState(initialState)

    const handlerInputChange = (e) => {
        const { name, value } = e.target;
        setState({ ...store, [name]: value })
    }

    const handlerSubmit = (e) => {
        e.preventDefault()
        console.log(store)
        addStore(store)
        setState(initialState)

    }


    return (
        <div className="addStoreContainer">
            <form onSubmit={(e) => handlerSubmit(e)} >
                <input type="text" name='name' placeholder='Nombre de la tienda' value={store.name} onChange={handlerInputChange} />
                <input type="text" name='address' value={store.address} placeholder='Direccion' onChange={handlerInputChange} />
                <input type="text" name='phone' value={store.phone} placeholder='Nro de telefono' onChange={handlerInputChange} />
                <button type='submit' >Cargar tienda</button>
            </form>
        </div>
    )

}

export default AddStoreForm