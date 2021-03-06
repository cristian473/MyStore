import { db } from '../firebase'
import { ADD_PRODUCT_ORDEN, REST_STOCK_STATE } from '../constants/productConstants'
import Swal from 'sweetalert2'
import moment from 'moment'

export const sumUnidadVenta = (datos) => {
    const newData = { ...datos, cantidad: 1, imagen: '' };
    return (dispatch) => {
        dispatch({ type: ADD_PRODUCT_ORDEN, payload: newData });
        dispatch({ type: REST_STOCK_STATE, payload: datos });
    }
}

export const resUnidadVenta = (datos) => {
    return (dispatch) => {
        dispatch({ type: 'REST_PRODUCT_ORDEN', payload: datos });
        dispatch({ type: 'SUM_STOCK_STATE', payload: datos });
    }
}

export const EndOrden = (idTienda, orden, subTotal, details) => {
    const fecha = moment().format('YYYY-MM-DD');
    let newData = {};
    let total = subTotal;

    const calculeGain = (envio) => {
        let sumaCosto = 0;
        let ganancia = 0;
        let newSubtotal = 0;
        let precioEnvio = envio || 0;

        orden.forEach((it) => {
            sumaCosto += parseInt(it.costoMaterial * it.cantidad);
        })
        if (details.ventaMayorista) {
            orden.forEach((it) => {
                newSubtotal += parseInt(it.precioMayorista * it.cantidad);
            })
            total = newSubtotal;
        }
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
                const batch = db.batch();
                orden.forEach(item => {
                    let ref = db.collection('productos').doc(item.id);
                    let newStock = item.stock - item.cantidad;
                    batch.update(ref, { stock: newStock })
                })
                batch.commit()
                    .then(() =>
                        Swal.fire(
                            'Buen trabajo!',
                            'Orden registrada con éxito.',
                            'success'
                        ).then(() => {
                            dispatch({ type: 'CLEAN_ORDEN' })
                        })
                    )
                    .catch((err) => {
                        console.log(err);
                        Swal.fire(
                            'Error!',
                            'No sabemos qué pasó! intente nuevamente.',
                            'error'
                        )
                    })

            })
            .catch(err => {
                console.log(err)
                Swal.fire(
                    'Error!',
                    'No sabemos qué pasó! intente nuevamente.',
                    'error'
                )
            })
    }
}

export const getVentas = (idTienda) => {
    return (dispatch) => {
        db.collection("ventas")
            .where('idTienda', '==', idTienda)
            .orderBy("fecha", "desc")
            .onSnapshot(querySnapshot => {
                const docs = []
                querySnapshot.forEach(doc => {
                    docs.push({ ...doc.data(), id: doc.id })
                })
                dispatch({ type: 'GET_MOVIMIENTOS', payload: docs })
            })
    }
}

export const getGastos = (idStore) => {
    return (dispatch) => {
        db.collection("gastos")
            .where('idTienda', '==', idStore)
            .onSnapshot(querySnapshot => {
                const docs = []
                querySnapshot.forEach(doc => {
                    docs.push({ ...doc.data(), id: doc.id })
                })
                dispatch({ type: 'GET_GASTOS', payload: docs })
            })
    }
}

export const pushGasto = (mov = {}) => {
    const { items = [] } = mov;
    const batch = db.batch();
    const gastoRef = db.collection('gastos').doc()

    if (items.length > 0) {
        items.forEach((item) => {
            let newStock = item.stock + parseInt(item.cantidad);
            item.imagen = ''
            let productRef = db.collection('productos').doc(item.id)
            batch.update(productRef, { stock: newStock })
        })
    }
    batch.set(gastoRef, mov);

    batch.commit()
        .then(() => {
            Swal.fire(
                'Exito',
                'Gasto Cargado',
                'success'
            )
        })
        .catch((err) => {
            console.log(err);
            Swal.fire(
                'Error',
                'Algo ocurrió, por favor vuelva a intentar',
                'error'
            )
        })
}