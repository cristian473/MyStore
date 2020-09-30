import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../../actions/productActions'
import { EndOrden, getGastos, getVentas } from '../../actions/ventasActions'
import '../../styles/orderDiv.scss'
import Item from '../catalogo/item'

const OrdenVenta = ({ idStore }) => {
    const detailsInitialState = {
        detailsCompleted: false,
        envio: false,
        precioEnvio: '',
        ventaMayorista: false,
        cliente: false,
        datosCliente: { name: '', tel: '', direccion: '' }
    }
    const dataClientInitialState = { name: '', tel: '', direccion: '' };
    const dispatch = useDispatch();
    const productsOrden = useSelector(store => store.orden.productsOrden)
    const [detailsForm, setDetailsForm] = useState(false);
    const [details, setDetails] = useState(detailsInitialState)
    const [dataClient, setDataClient] = useState(dataClientInitialState)
    const [sending, setSending] = useState(false)
    let subTotal = 0;
    const handlerClickEndOrden = () => {
        if (detailsForm) {
            setSending(true)
            setDetails({ ...details, detailsCompleted: true })
        }
        else {
            setSending(true)
            sendDataClearForm()
            dispatch(EndOrden(idStore, productsOrden, subTotal, details));
            dispatch(getVentas(idStore))
            dispatch(getGastos(idStore))
        }
    }

    function toggleFlag(value) {
        var toggle = value ? false : true;
        return toggle;
    }

    function sendDataClearForm() {
        setDetails(detailsInitialState);
        setDataClient(dataClientInitialState);
        setDetailsForm(false);
    }

    useEffect(() => {
        if (details.detailsCompleted) {
            sendDataClearForm()
            dispatch(EndOrden(idStore, productsOrden, subTotal, details));
        }
    }, [details.detailsCompleted])



    const handlerInputClienteChange = (e) => {
        const { name, value } = e.target;
        let newState = details;
        newState.datosCliente[name] = value;
        setDetails(newState)
        setDataClient({ ...dataClient, [name]: value })
    }

    const handlerCheckboxChange = (e) => {
        const { name } = e.target;
        let newValue = toggleFlag(details[name])
        setDetails({ ...details, [name]: newValue })
    }

    const handlerInputChange = (e) => {
        const { name, value } = e.target;
        setDetails({ ...details, [name]: value })
    }

    const closeForm = () => {
        if (detailsForm) sendDataClearForm()
        else if (!detailsForm && productsOrden.length > 0) {
            console.log('holaa');
            dispatch(getProducts(idStore));
            dispatch({ type: 'CLEAN_ORDEN' })
            dispatch({ type: 'CLEAN_AMOUNT', payload: {} })
        }
    }

    return (
        <>
            {productsOrden.length > 0 ? (
                <div className='ordenesContainerDiv'>
                    <div className="buttonCloseContainer">
                        <button onClick={closeForm}>X</button>
                    </div>
                    <div className="ordenesDiv">
                        {productsOrden.map((e, i) => {
                            subTotal += e.cantidad * e.precio;
                            return (<Item key={i} item={e} />)
                        }
                        )}
                    </div>
                    {detailsForm && (
                        <div className='detailsFormContainer'>
                            <div className='envioDiv'>
                                <label for="envio">Envio</label>
                                <input type='checkbox' onChange={handlerCheckboxChange} name='envio' />
                            </div>
                            {details.envio && (
                                <>
                                    <label for="precioEnvio">Precio del envio</label>
                                    <input type="text" name='precioEnvio' onChange={handlerInputChange} value={details.precioEnvio} />
                                </>
                            )}
                            {/* <input type="text" name='envio' onChange={handlerInputChange} value
                             = {details.envio} /> */}
                            <div className="datosClienteDiv">
                                <label for="cliente">Datos del cliente</label>
                                <input type='checkbox' onChange={handlerCheckboxChange} name='cliente' />
                            </div>
                            {details.cliente && (
                                <>
                                    <label for="name">Nombre del cliente</label>
                                    <input type="text" name='name' onChange={handlerInputClienteChange} value={dataClient.name} />
                                    <label for="tel">Telefono</label>
                                    <input type="text" name='tel' onChange={handlerInputClienteChange} value={dataClient.tel} />
                                    <label for="direccion">Dirección</label>
                                    <input type="text" name='direccion' onChange={handlerInputClienteChange} value={dataClient.direccion} />
                                </>
                            )}
                            <div className="precioMayorista">
                                <label for="precioMayorista">Venta Mayorista</label>
                                <input type='checkbox' onChange={handlerCheckboxChange} name='ventaMayorista' />
                            </div>
                        </div>
                    )}
                    <div className="buttonsContainer">
                        <div onClick={() => setDetailsForm(true)}>Agregar Detalles</div>
                        <div className={`${sending && 'disable'}`} onClick={handlerClickEndOrden} >Finalizar venta</div>
                    </div>
                </div>

            ) : (

                    <>
                    </>
                )}
        </>
    )

}

const dobleClick = () => {
    console.log('dobleClick');
}

export default OrdenVenta