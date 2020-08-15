import {db} from '../firebase'

export const addProduct = async (producto) => {
        await db.collection("productos").doc().set(producto)
}

export const getProducts = () => {
        return (dispatch) => {
                db.collection("productos").onSnapshot((querySnapshot) => {
                        const docs = []
                        querySnapshot.forEach(doc => {
                                docs.push({ ...doc.data(), id: doc.id })
                        })
                        dispatch({ type: 'GET_PRODUCTS', payload: docs })
                })
        }
        
}