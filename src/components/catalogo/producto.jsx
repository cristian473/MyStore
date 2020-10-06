import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { sumUnidadVenta, resUnidadVenta } from '../../actions/ventasActions'
import trashIcon from '../../media/trashIcon.svg'
import { deleteProduct } from '../../actions/productActions'
import Swal from 'sweetalert2'

const Producto = ({ datos, changeProductsAmountRest, changeProductsAmountSum, productsInOrden }) => {

    const dispatch = useDispatch();

    const handlerDeleteChange = (id) => {
        dispatch(deleteProduct(id))
    }

    const handlerWithoutStockMsg = () => {
        Swal.fire(
            'Error!',
            'Al parecer no tienes stock, por favor registra una compra de material antes de continuar',
            'error'
        )
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
                    <span>Stock: {datos.stock}</span>
                    <span>${datos.precio}</span>
                </div>
            </div>
            <div className={`buttonContainer`}>
                <div className={`${!productsInOrden[datos.id] && 'disable'}`} onClick={() => {
                    dispatch(resUnidadVenta(datos))
                    changeProductsAmountRest(datos.id)
                }}> - </div>
                <div onClick={() => {
                    if (datos.stock === 0) {
                        handlerWithoutStockMsg()
                    } else {
                        dispatch(sumUnidadVenta(datos))
                        changeProductsAmountSum(datos.id)
                    }
                }} > + </div>
            </div>
        </div>
    )

}

export default Producto