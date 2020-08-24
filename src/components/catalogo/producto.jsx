import React from 'react'
import {useDispatch} from 'react-redux'
import {sumUnidadVenta, resUnidadVenta} from '../../actions/ventasActions'

const Producto = ({datos}) => {

    const dispatch = useDispatch();
    
    return (
        <div className='productContainer'>
            <div className='buttonContainer'>
            <div onClick = {()=>dispatch(resUnidadVenta(datos))}> - </div>
            </div>
            
            <div className='details'>
                <div className='nameProduct'>
                    {datos.name}
                </div>
                <div className='stockPrecio'>
                    stock: {datos.stock} precio: {datos.precio}
                </div>
                
                
            </div>
            <div className='imgContainer'>
                <img src={datos.imagen}/>   
            </div>
            <div  className='buttonContainer'>
            <div  onClick = {()=>dispatch(sumUnidadVenta(datos))} > + </div>
            </div>
            
        </div>
    )

}

export default Producto