import React, { useEffect } from 'react'
import ListaProductos from '../catalogo/listaProductos'
import { useSelector, useDispatch } from 'react-redux'
import BottonOptions from './bottonOptions'
const Home = (props) => {

    return (
        <>
            <ListaProductos />
            <BottonOptions />
        </>
    )
}

export default Home