import React from 'react'
import { useDispatch } from 'react-redux'
import { sumUnidadVenta, resUnidadVenta } from '../../actions/ventasActions'
import trashIcon from '../../media/trashIcon.svg'
import { deleteProduct } from '../../actions/productActions'

const Producto = ({ datos }) => {

    const dispatch = useDispatch();

    const handlerDeleteChange = (id) => {
        dispatch(deleteProduct(id))
    }

    return (
        <div className='productContainer'>
            <div className="optionButtons">
                <img src={trashIcon} alt="trashIcon" onClick={() => handlerDeleteChange(datos.id)} />
            </div>
            <div className='imgContainer'>
                <img src={datos.imagen} />
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