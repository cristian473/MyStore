import React, { useEffect } from 'react'
import ListaProductos from '../catalogo/listaProductos'
import AddProductForm from '../gestion/addProductForm'
import AddStoreForm from '../gestion/addStoreForm'
import { useSelector, useDispatch } from 'react-redux'
import {getStores} from '../../actions/userActions'

const Home = () => {
    const dispatch = useDispatch();
    const userLogged = useSelector(store => store.userLogged)
    const stores = useSelector(store => store.user.stores)

    useEffect(() => {
        dispatch(getStores(userLogged.id));
    }, [])

    console.log(stores)

    return (
        <div>
            <ListaProductos/>
            <AddProductForm/>
            <AddStoreForm/>
        </div>
    )
}

export default Home