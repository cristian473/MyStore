import {db} from '../firebase'

export const sumUnidadVenta = (id, stock)=> {
    stock++;
    db.collection('productos').doc(id).update({
        stock: stock
    })
}

export const resUnidadVenta = (id, stock)=> {
    stock--;
    db.collection('productos').doc(id).update({
        stock: stock
    })
}