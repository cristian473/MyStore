import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getVentas } from '../../actions/ventasActions'
import Item from '../catalogo/item'
import '../../styles/movsStyles.scss'
const Movimientos = () => {

    const movs = useSelector(store => store.user.movimientos)
    const dispatch = useDispatch();
    const idStore = localStorage.getItem('idStore')
    const [detailsVenta, setDetailsVenta] = useState('');
    const [indexItem, setIndex] = useState('');
    console.log(movs)

    const handlerSeeDetails = (mov) => {
        console.log(mov)
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
                            <div className='movContainer'>
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
                                                <div className='cardDetails'>
                                                    {console.log(detailsVenta)}
                                                    {/* <h2>{detailsVenta.fecha}</h2> */}
                                                    <div className='itemsContainer'>
                                                        {detailsVenta.items.map(item => <Item item={item} />)}
                                                    </div>
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