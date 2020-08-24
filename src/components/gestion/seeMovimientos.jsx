import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {getVentas} from '../../actions/ventasActions'
import '../../styles/movsStyles.scss'
const Movimientos = ()=>{

    const movs= useSelector(store => store.user.movimientos)
    const dispatch = useDispatch();
    const idStore = localStorage.getItem('idStore')
    console.log(movs)
    useEffect(()=>{
        dispatch(getVentas(idStore))
    },[])

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
                    movs.map(el => (
                        <div class='movDiv'>
                             <div className="containerItem">
                            {el.items.map(item => 
                               
                                    <h4>{item.cantidad} | {item.name}</h4>
                                
                            )}
                            </div>
                            <div className="valuesDiv">
                                <h3>${el.total}</h3>
                                <h3>${el.ganancia}</h3>
                            </div>
                            
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