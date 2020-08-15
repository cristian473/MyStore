import React from 'react'
import {useDispatch} from 'react-redux'
import {sumUnidadVenta, resUnidadVenta} from '../../actions/ventasActions'

const Producto = ({id, name, precio, stock, imagen}) => {

    
    return (
        <div>
            <button onClick = {()=>resUnidadVenta(id,stock)}> - </button>
            <div className='details'>{name} {stock} {precio}</div>
            <img src={imagen}/>
            <button  onClick = {()=>sumUnidadVenta(id, stock)} > + </button>
        </div>
    )

}

export default Producto