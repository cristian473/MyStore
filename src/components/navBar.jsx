import React from 'react'
import {logUot} from '../actions/userActions'
import {Link} from 'react-router-dom'

const NavBar =() => {

    const handlerClick = () => {
        logUot()
    }

    const idStore = localStorage.getItem('idStore')

    return(
        <div>
            <Link to={'/'+idStore+'/dashboard'}><button>Inicio</button></Link>
            
            <Link to={'/'+idStore+'/movimientos'}><button>Movimientos</button></Link>
            
            <Link to={'/'} ><button onClick={()=>localStorage.removeItem('idStore')}>Cerrar Tienda</button></Link>
            <button onClick = {handlerClick}>Log out</button>
        </div>
    )

}

export default NavBar