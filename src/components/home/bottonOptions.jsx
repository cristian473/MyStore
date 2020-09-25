import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getVentas } from '../../actions/ventasActions'
import OrdenVenta from '../ventas/ordenDeVenta'
import { Link } from 'react-router-dom'
import '../../styles/bottonOptions.scss'
const BottonOptions = ({ idStore }) => {
    const movs = useSelector((store) => store.user.movimientos)
    const dispatch = useDispatch()
    const [totales, setTotales] = useState({ ingresos: 0, ganancia: 0, gastos: 0, balance: 0 })

    useEffect(() => {
        dispatch(getVentas(idStore))
    }, [])

    useEffect(() => {
        if (movs.length > 0) {
            let ganaciaTotal = 0, gastosTotal = 5800, ingresosTotal = 0, balance = 0;
            movs.forEach(el => {
                ganaciaTotal += parseInt(el.ganancia)
                ingresosTotal += parseInt(el.total)
            });
            balance = ingresosTotal - gastosTotal
            setTotales({ ingresos: ingresosTotal, ganancia: ganaciaTotal, gastos: gastosTotal, balance: balance })
        }
    }, [movs])

    return (
        <div className='bottonContainer'>
            <div className='ordenVentaContainer'>
                <OrdenVenta idStore={idStore} />
            </div>
            <div className='optionsContainer' >
                <div className='datosContainer'>
                    <div className='valueDiv'>
                        <h4>Ingresos:</h4>
                        <h3>${totales.ingresos}</h3>
                    </div>
                    <div className='valueDiv'>
                        <h4>Gastos:</h4>
                        <h3>${totales.gastos}</h3>
                    </div>

                    <div className='valueDiv'>
                        <h4>Ganancia:</h4>
                        <h3>${totales.ganancia}</h3>
                    </div>
                    <div className='valueDiv'>
                        <h4>Balance:</h4>
                        <h3>${totales.balance}</h3>
                    </div>

                </div>
                <div className='buttonsContainer'>
                    <Link to={'/' + idStore + '/cargaitems'}>
                        <div>Agregar producto</div>
                    </Link>
                    <Link to={'/' + idStore + '/cargacompra'}>
                        <div>Agregar compra de materiales</div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default BottonOptions