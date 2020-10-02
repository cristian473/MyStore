import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getVentas } from '../../actions/ventasActions'
import Item from '../catalogo/item'
import moment from 'moment'
import '../../styles/movsStyles.scss'
const Movimientos = () => {
    const movs = useSelector(store => store.user.movimientos)
    const dispatch = useDispatch();
    const idStore = useSelector((store) => store.user.storeSelected)
    const [detailsVenta, setDetailsVenta] = useState('');
    const [indexItem, setIndex] = useState('');

    const handlerSeeDetails = (mov) => {
        setDetailsVenta(mov)
    }

    useEffect(() => {
        dispatch(getVentas(idStore))
    }, [])

    return (
        <div className='movContainer'>
            <div className="titleMovs">
                <div className="titlesDiv">
                    <div className="titleItemsDiv">
                        <h3>Items</h3>
                    </div>
                    <div className="valuesTitlesDiv">
                        <h3>Total</h3> <h3>Ganancia</h3>
                    </div>
                </div>
                <div className="listaMovsContainer">

                    {movs.length > 0 ? (
                        movs.map((mov, index) => (
                            <div key={index} className='movContainer'>
                                <div className='movDiv'>
                                    <div className="containerItem">
                                        {mov.items.map(item =>
                                            <Item item={item} />
                                        )}
                                    </div>
                                    <div className="valuesDiv">
                                        <button onClick={() => {
                                            handlerSeeDetails(mov);
                                            setIndex(index);
                                        }
                                        }> ver detalles </button>
                                        <h3>${mov.total}</h3>
                                        <h3>${mov.ganancia}</h3>
                                    </div>
                                </div>
                                {indexItem === index && (
                                    <>
                                        {detailsVenta && (

                                            <div className='detailsContainer'>
                                                {detailsVenta.cliente &&
                                                    (detailsVenta.cliente.name || detailsVenta.cliente.direccion || detailsVenta.cliente.tel) &&
                                                    (
                                                        <div className="cardDetails">
                                                            {detailsVenta.cliente.name && <h5><strong>Cliente:</strong>  {detailsVenta.cliente.name}</h5>}
                                                            {detailsVenta.cliente.direccion && <h5><strong>Dirección:</strong> {detailsVenta.cliente.direccion}</h5>}
                                                            {detailsVenta.cliente.tel && <h5><strong> Tel: </strong> {detailsVenta.cliente.tel}</h5>}
                                                        </div>
                                                    )}

                                                <div className='cardDetails'>
                                                    <h3>Fecha: {moment(detailsVenta.fecha).format('DD/MM/YYYY')}</h3>
                                                    {detailsVenta.envío ? (
                                                        <h3>Envío: {detailsVenta.precioEnvio}</h3>
                                                    ) : (
                                                            <h3>No hay envío registrado</h3>
                                                        )}

                                                    <h3>Subtotal: {detailsVenta.subTotal}</h3>
                                                    <h3>Total: {detailsVenta.total}</h3>
                                                    <h3>Ganancia: {detailsVenta.ganancia}</h3>

                                                </div>
                                            </div>
                                        )

                                        }
                                    </>
                                )}

                            </div>
                        ))
                    ) : (
                            <h2>No tienes movimientos aún</h2>
                        )}
                </div>
            </div>


        </div>
    )
}
export default Movimientos