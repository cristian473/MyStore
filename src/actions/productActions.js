import { db } from '../firebase'

export const addProduct = async (producto) => {
        await db.collection("productos").doc().set(producto)
}

export const getProducts = (id) => {
        return async (dispatch) => {
                const productos = await db.collection("productos").where('idTienda', '==', id).get()
                const docs = [];
                productos.forEach(doc => {
                        docs.push({ ...doc.data(), id: doc.id })
                })
                dispatch({ type: 'GET_PRODUCTS', payload: docs })
        }
}

