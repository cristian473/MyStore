import React, { useEffect } from 'react'
import ListaProductos from '../catalogo/listaProductos'
import AddProductForm from '../gestion/addProductForm'
import AddStoreForm from '../gestion/addStoreForm'
import OrdenVenta from '../ventas/ordenDeVenta'
import { useSelector, useDispatch } from 'react-redux'
import {getStores} from '../../actions/userActions'
import { getProducts } from '../../actions/productActions'

const Home = props => {
    const dispatch = useDispatch();
    const userLogged = useSelector(store => store.userLogged)
    const stores = useSelector(store => store.user.stores)
    const idStore = props.match.params.idStore


    return (
        <div>
            <ListaProductos idStore= {idStore}/>
            <AddProductForm idStore= {idStore}/>
            <AddStoreForm/>
            <OrdenVenta/>
        </div>
    )
}

export default Home