import {db} from '../firebase'

export const addProduct = async (producto) => {
        await db.collection("productos").doc().set(producto)
}

export const getProducts = (id) => {
        return (dispatch) => {
                db.collection("productos")
                  .where('idTienda', '==', id).onSnapshot((querySnapshot) => {
                        const docs = []
                        
                        querySnapshot.forEach(doc => {
                                docs.push({ ...doc.data(), id: doc.id })
                                console.log(docs)
                        })
                        dispatch({ type: 'GET_PRODUCTS', payload: docs })
                })
        }
        
}