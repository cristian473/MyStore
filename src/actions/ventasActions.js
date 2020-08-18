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

export const EndOrden = (idTienda, orden, subTotal, descuentoMayorista, details) => {

    const fecha = new Date();
    let newData = {};
    const total = subTotal-descuentoMayorista;
    if(details){
        newData = {
            idTienda: idTienda,
            fecha: fecha,
            items: orden,
            envío: details.envio,
            precioEnvio: details.precioEnvio,
            precioMayorista: details.precioMayorista,
            subTotal: subTotal,
            total: total,
            ganancia: 500
            
        }
    }
    else {
        newData = {
            idTienda: idTienda,
            fecha: fecha,
            items: orden,
            subTotal: subTotal,
            total: total,
            ganancia: 500
        }
    }


    return(dispatch) => {
        db.collection('ventas').doc().set(newData)
        .then(()=>{
            orden.forEach(item => {
                let newStock = item.stock - item.cantidad
                db.collection('productos').doc(item.id).update({
                    stock:newStock
                })
            });
            
        })
    }
}

export const getVentas = (idTienda) =>{
    
        return (dispatch) => {
                db.collection("ventas")
                  .where('idTienda', '==', idTienda).onSnapshot((querySnapshot) => {
                        const docs = []
                        querySnapshot.forEach(doc => {
                                docs.push({ ...doc.data(), id: doc.id })
                        })
                        dispatch({ type: 'GET_MOVIMIENTOS', payload: docs })
                })
        }
        
}