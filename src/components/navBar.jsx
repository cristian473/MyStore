import React from 'react'
import { logUot } from '../actions/userActions'
import { Link } from 'react-router-dom'
import '../styles/navBar.scss'

const NavBar = () => {

    const handlerClick = () => {
        logUot()
    }

    const idStore = localStorage.getItem('idStore')

    return (
        <div className='NavBar'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <path fill="#000b76" fill-opacity="1" d="M0,224L120,197.3C240,171,480,117,720,122.7C960,128,1200,192,1320,224L1440,256L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z"></path>
            </svg>
            <div className="linksContainer">
                <Link to={'/' + idStore + '/dashboard'}><button className='buttonNav'>Inicio</button></Link>

                <Link to={'/' + idStore + '/movimientos'}><button className='buttonNav'>Movimientos</button></Link>
                <Link to={'/crear-tienda'} ><button className='buttonNav'> Crear Tienda </button> </Link>
                <Link to={'/'} ><button className='buttonNav' onClick={() => localStorage.removeItem('idStore')}>Cerrar Tienda</button></Link>
                <button className='buttonNav' onClick={handlerClick}>Log out</button>
            </div>
        </div>
    )

}

export default NavBar