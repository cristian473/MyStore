import { auth, db } from '../firebase'
import { GET_STORES, LOGGED } from '../constants/userConstants'
import Swal from 'sweetalert2'
import 'firebase/auth'

export const registerUser = (data) => {
    return (dispatch) => {
        auth.createUserWithEmailAndPassword(data.email, data.password)
            .then(u => {
                Swal.fire(
                    'Éxito',
                    'Ahora inicia sesión para continuar',
                    "success"
                ).then(() => {
                    window.location.replace('https://mystore-one.vercel.app/')
                })
            })
            .catch(erro => {
                if (erro.code === 'auth/email-already-in-use') {
                    Swal.fire(
                        'Error!',
                        'El correo ya está en uso',
                        'error'
                    )
                }
            })
    }
    //     auth.signInWithEmailAndPassword(data.email, data.password)
    //         .then(() => {

    //             const userLogged = auth.currentUser;
    //             userLogged.updateProfile({
    //                 displayName: data.name
    //             }).then(() => {
    //                 dispatch({ type: REGISTERED, payload: data })
    //             })

    //         })
    // })
}

export const loginUser = (data) => {

    return (dispatch) => {

        auth.signInWithEmailAndPassword(data.email, data.password)
            .then(() => {

                const currentUser = auth.currentUser;

                const userLogged = {
                    id: currentUser.uid,
                    name: currentUser.displayName,
                    email: currentUser.email
                }
                localStorage.setItem('userLogged', JSON.stringify(userLogged))
                dispatch({ type: LOGGED })
            })


    }
}

export const logUot = () => {
    localStorage.removeItem('userLogged');
    localStorage.removeItem('idStore');
    window.location.replace('https://mystore-one.vercel.app/')

}

export const addStore = (store) => {
    db.collection('stores').doc().set(store)
}

export const getStores = (id) => {

    return (dispatch) => {
        db.collection('stores').where('idUser', '==', id).get()
            .then((stores) => {
                if (stores.empty) {
                    return;
                }
                else {
                    const docs = [];
                    stores.forEach(doc => {
                        docs.push({ ...doc.data(), id: doc.id })
                    });
                    dispatch({ type: GET_STORES, payload: docs })
                }

            })
    }

}