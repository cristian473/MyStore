import React, { useEffect } from 'react'
import ListaProductos from '../catalogo/listaProductos'
import { useSelector, useDispatch } from 'react-redux'
import BottonOptions from './bottonOptions'
const Home = props => {
    const dispatch = useDispatch();
    const idStore = props.match.params.idStore

    useEffect(() => {
        localStorage.setItem('idStore', idStore)
    }, [])

    return (
        <>
            <ListaProductos idStore={idStore} />
            <BottonOptions idStore={idStore} />
        </>
    )
}

export default Home