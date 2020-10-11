import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getGastos, getVentas } from '../../actions/ventasActions'
import OrdenVenta from '../ventas/ordenDeVenta'
import { Link } from 'react-router-dom'
import '../../styles/bottonOptions.scss'
const BottonOptions = () => {
    const movs = useSelector((store) => store.user.movimientos)
    const gastos = useSelector((store) => store.orden.gastos)
    const dispatch = useDispatch()
    const [totales, setTotales] = useState({ ingresos: 0, ganancia: 0, gastos: 0, balance: 0 })
    const idStore = useSelector((store) => store.user.storeSelected)
    const productsOrden = useSelector(store => store.orden.productsOrden)

    useEffect(() => {
        dispatch(getVentas(idStore))
        dispatch(getGastos(idStore))
    }, [idStore])

    useEffect(() => {
        if (movs.length > 0 || gastos.length > 0) {
            let ganaciaTotal = 0, gastosTotal = 0, ingresosTotal = 0, balance = 0;
            console.log(movs);
            movs.forEach(({ ganancia, total }) => {
                ganaciaTotal += parseInt(ganancia)
                ingresosTotal += parseInt(total)
            });
            gastos.forEach(({ gastoTotal }) => {
                gastosTotal += parseInt(gastoTotal)
            })
            debugger
            balance = ingresosTotal - gastosTotal
            setTotales({ ingresos: ingresosTotal, ganancia: ganaciaTotal, gastos: gastosTotal, balance: balance })
        }
    }, [movs, gastos])

    return (
        <div className='optionsContainer' >
            {productsOrden.length === 0 && (
                <>
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
                        <Link to={'/cargaitems'}>
                            <div>Agregar producto</div>
                        </Link>
                        <Link to={'/cargacompra'}>
                            <div>Agregar compra de materiales</div>
                        </Link>
                    </div>
                </>
            )}
        </div>
    )
}

export default BottonOptions