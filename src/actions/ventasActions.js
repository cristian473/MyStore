import {db} from '../firebase'
import {ADD_PRODUCT_ORDEN, REST_STOCK_STATE} from '../constants/productConstants'
 // db.collection('productos').doc(id).update({
    //     stock: stock
    // })

export const sumUnidadVenta = (datos)=> {
    const newData = {...datos, cantidad: 1}
    return (dispatch) => {
        dispatch({type: ADD_PRODUCT_ORDEN, payload: newData})
        dispatch({type: REST_STOCK_STATE, payload:datos})

    }
   
}

export const resUnidadVenta = (id, stock)=> {
    stock--;
    db.collection('productos').doc(id).update({
        stock: stock
    })
}