import React from 'react'
import { useDispatch } from 'react-redux'
import { sumUnidadVenta, resUnidadVenta } from '../../actions/ventasActions'

const Producto = ({ datos }) => {

    const dispatch = useDispatch();

    return (
        <div className='productContainer'>
            <div className='imgContainer'>
                <img src={'https://sommiercenter.com/media/catalog/product/cache/207e23213cf636ccdef205098cf3c8a3/C/O/CORAI160200_cenital.jpg'} />
            </div>
            <div className='details'>
                <div className='nameProduct'>
                    <span>{datos.name}</span>
                </div>
                <div className='stockPrecio'>
                    <span>stock: {datos.stock}</span>
                    <span>${datos.precio}</span>
                </div>
            </div>
            <div className='buttonContainer'>
                <div onClick={() => dispatch(resUnidadVenta(datos))}> - </div>
                <div onClick={() => dispatch(sumUnidadVenta(datos))} > + </div>
            </div>
        </div>
    )

}

export default Producto