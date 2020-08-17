import React from 'react'
import {logUot} from '../actions/userActions'

const NavBar =() => {

    const handlerClick = () => {
        logUot()
    }

    return(
        <div>
            <button onClick = {handlerClick}>Log out</button>
        </div>
    )

}

export default NavBar