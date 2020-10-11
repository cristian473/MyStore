import { db } from '../firebase'
import Swal from 'sweetalert2'

export const addProduct = async (producto) => {
        Swal.fire({ title: 'Realizando operación' })
        Swal.showLoading()
        await db.collection("productos").doc().set(producto)

        Swal.fire(
                'Exito!',
                'Producto Cargado',
                "success"
        )
        return;
}

export const getProducts = (id) => {
        return async (dispatch) => {
                console.log('holapidodatos')
                db.collection("productos")
                        .where('idTienda', '==', id)
                        .onSnapshot((snap) => {
                                const docs = [];
                                snap.forEach(doc => {
                                        docs.push({ ...doc.data(), id: doc.id })
                                })
                                dispatch({ type: 'GET_PRODUCTS', payload: docs })
                        })

        }
}

export const deleteProduct = (id) => {
        return (dispatch) => {
                Swal.fire({
                        title: '¿Desea eliminar el producto?',
                        icon: 'question',
                        cancelButtonText: 'Cancelar',
                        confirmButtonText: 'Confirmar',
                        showCancelButton: true,
                        showCloseButton: true
                }).then((result) => {
                        if (result.isConfirmed) {
                                db.collection('productos').doc(id).delete()
                                        .then(res => {
                                                Swal.fire('Operacion exitosa!')
                                                dispatch({ type: 'DELETE_PRODUCT', payload: id })
                                        })
                                        .catch(err => {
                                                Swal.fire('Ocurrió un error!')
                                        })
                        }
                })
        }
}

