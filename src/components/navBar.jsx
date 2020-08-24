import React from 'react'
import {logUot} from '../actions/userActions'
import {Link} from 'react-router-dom'
import '../styles/navBar.scss'

const NavBar =() => {

    const handlerClick = () => {
        logUot()
    }

    const idStore = localStorage.getItem('idStore')

    return(
        <div className='NavBar'>
            <Link to={'/'+idStore+'/dashboard'}><button className='buttonNav'>Inicio</button></Link>
            
            <Link to={'/'+idStore+'/movimientos'}><button className='buttonNav'>Movimientos</button></Link>
            
            <Link to={'/'} ><button className='buttonNav' onClick={()=>localStorage.removeItem('idStore')}>Cerrar Tienda</button></Link>
            <button className='buttonNav' onClick = {handlerClick}>Log out</button>
        </div>
    )

}

export default NavBar