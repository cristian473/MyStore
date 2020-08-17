import React from 'react'
import {useDispatch} from 'react-redux'
import {sumUnidadVenta, resUnidadVenta} from '../../actions/ventasActions'

const Producto = ({datos}) => {

    const dispatch = useDispatch();
    
    return (
        <div>
            <button onClick = {()=>dispatch(resUnidadVenta(datos))}> - </button>
            <div className='details'>{datos.name} {datos.stock} {datos.precio}</div>
            <img src={datos.imagen}/>
            <button  onClick = {()=>dispatch(sumUnidadVenta(datos))} > + </button>
        </div>
    )

}

export default Producto