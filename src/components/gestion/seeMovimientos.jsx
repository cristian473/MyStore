import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {getVentas} from '../../actions/ventasActions'
const Movimientos = ()=>{

    const movs= useSelector(store => store.user.movimientos)
    const dispatch = useDispatch();
    const idStore = localStorage.getItem('idStore')
    console.log(movs)
    useEffect(()=>{
        dispatch(getVentas(idStore))
    },[])

    return (
        <div>
            {movs.length > 0 ? (
                movs.map(el => (
                    <div>
                        <h2>{el.item}</h2>
                        <h3>cantidad:{el.cantidad}</h3>
                        <h3>total: {el.total}</h3>
                        <h3>ganacia: {el.ganancia}</h3>
                    </div>
                ))
            ):(
                <h2>No tienes movimientos aún</h2>
            )}
        </div>
    )
}
export default Movimientos