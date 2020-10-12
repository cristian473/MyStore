import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logUot } from '../actions/userActions'
import { Drawer, Toolbar, Button, AppBar, MenuItem } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu'
import '../styles/navBarMobile.scss'

const NavMobile = () => {
    const [drawelMenu, setDrawelButton] = useState(false)
    const [storeName, setStoreName] = useState('')
    const dispatch = useDispatch()
    const handlerClick = () => {
        logUot()
    }

    const closeStore = () => {
        dispatch({ type: 'SET_STORE', payload: '' })
        localStorage.removeItem('idStore')
        localStorage.removeItem('nameStore')
    }

    useEffect(() => {
        let storeName = localStorage.getItem('nameStore')
        setStoreName(storeName)
    }, [])


    return (
        <AppBar position='relative' style={{ backgroundColor: '#351b58' }} className='appBar'>
            <Toolbar>
                <div className="navContainer">
                    <h4>{storeName}</h4>
                    <div>
                        <Button onClick={() => setDrawelButton(true)}><MenuIcon /></Button>

                        <Drawer
                            anchor={'right'}
                            open={drawelMenu}
                            onClose={() => setDrawelButton(false)}
                        >
                            <div className="linksContainer" onClick={() => setTimeout(() => {
                                setDrawelButton(false)
                            }, 200)}>
                                <Link to={'/dashboard'}><MenuItem className='buttonNav'>Inicio</MenuItem></Link>
                                <Link to={'/movimientos'}><MenuItem className='buttonNav'>Movimientos</MenuItem></Link>
                                <Link to={'/cargaitems'}><MenuItem className='buttonNav'>Agregar producto</MenuItem></Link>
                                <Link to={'/cargacompra'}><MenuItem className='buttonNav'>Agregar compra de materiales</MenuItem></Link>
                                <Link to={'/crear-tienda'} ><MenuItem className='buttonNav'> Crear Tienda </MenuItem> </Link>
                                <Link to={'/tiendas'} ><MenuItem className='buttonNav' onClick={closeStore}>Cerrar Tienda</MenuItem></Link>
                                <MenuItem className='buttonNav' onClick={handlerClick}>Log out</MenuItem>
                            </div>
                        </Drawer>
                    </div>
                </div>
            </Toolbar>
        </AppBar>
    )
}

export default NavMobile