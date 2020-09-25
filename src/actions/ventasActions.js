import { db } from '../firebase'
import { ADD_PRODUCT_ORDEN, REST_STOCK_STATE } from '../constants/productConstants'
import Swal from 'sweetalert2'
// db.collection('productos').doc(id).update({
//     stock: stock
// })

export const sumUnidadVenta = (datos) => {
    const newData = { ...datos, cantidad: 1 }
    return (dispatch) => {
        dispatch({ type: ADD_PRODUCT_ORDEN, payload: newData })
        dispatch({ type: REST_STOCK_STATE, payload: datos })

    }

}

export const resUnidadVenta = (id, stock) => {
    stock--;
    db.collection('productos').doc(id).update({
        stock: stock
    })
}

export const EndOrden = (idTienda, orden, subTotal, details) => {
    const fecha = new Date();
    let newData = {};
    let total = subTotal;

    const calculeGain = (envio) => {
        let sumaCosto = 0
        let ganancia = 0
        let newSubtotal = 0
        let precioEnvio = envio || 0

        orden.forEach((it) => {
            sumaCosto += parseInt(it.costoMaterial * it.cantidad)
        })
        if (details.ventaMayorista) {
            orden.forEach((it) => {
                newSubtotal += parseInt(it.precioMayorista * it.cantidad)
            })
            total = newSubtotal;
        }
        debugger;
        ganancia = total - sumaCosto + parseInt(precioEnvio);
        return ganancia;
    }

    if (details.detailsCompleted) {
        newData = {
            ganancia: calculeGain(details.precioEnvio),
            idTienda: idTienda,
            fecha: fecha,
            items: orden,
            envío: details?.envio,
            precioEnvio: details?.precioEnvio,
            cliente: details?.datosCliente,
            subTotal: subTotal,
            total: total,
        }
    }
    else {
        newData = {
            ganancia: calculeGain(),
            idTienda: idTienda,
            fecha: fecha,
            items: orden,
            subTotal: subTotal,
            total: total
        }
    }


    return (dispatch) => {
        db.collection('ventas').doc().set(newData)
            .then(() => {
                orden.forEach(item => {
                    let newStock = item.stock - item.cantidad
                    db.collection('productos').doc(item.id).update({
                        stock: newStock
                    })

                })
                Swal.fire(
                    'Buen trabajo!',
                    'Orden registrada con éxito.',
                    'success'
                ).then(() => {
                    dispatch({ type: 'CLEAN_ORDEN' })
                })

            })
            .catch(err => console.log(err))
    }
}

export const getVentas = (idTienda) => {
    return (dispatch) => {
        db.collection("ventas")
            .where('idTienda', '==', idTienda)
            .orderBy("fecha", "desc")
            .get().then(querySnapshot => {
                const docs = []
                querySnapshot.forEach(doc => {
                    docs.push({ ...doc.data(), id: doc.id })
                })

                dispatch({ type: 'GET_MOVIMIENTOS', payload: docs })
            })
    }
}