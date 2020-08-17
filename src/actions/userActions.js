import {auth, db} from '../firebase'
import {Redirect} from 'react-router-dom'
import {GET_STORES, REGISTERED, LOGGED} from '../constants/userConstants'
import firebase from 'firebase/app'
import 'firebase/auth'
import { GET_PRODUCTS } from '../constants/productConstants'

export const registerUser = (data) => {
    
   
    return (dispatch) => {

        
            auth.createUserWithEmailAndPassword(data.email, data.password)
            .then(u => {
                auth.signInWithEmailAndPassword(data.email, data.password)
                .then(()=>{
            
                    const userLogged = auth.currentUser;
                    userLogged.updateProfile({
                        displayName:data.name
                    }).then(()=> {
                        dispatch({type: REGISTERED, payload: data})
                    })
                    
                })
            })
            
        }
   
            
   
}

export const loginUser = (data) => {

    return (dispatch) => {

        auth.signInWithEmailAndPassword(data.email, data.password)
        .then(()=>{
            
            const currentUser = auth.currentUser;

            const userLogged = {
                id: currentUser.uid,
                name: currentUser.displayName,
                email: currentUser.email
            }
            localStorage.setItem('userLogged', JSON.stringify(userLogged))
            dispatch({type: LOGGED})
        })


    }
}

export const logUot = () => {
    localStorage.removeItem('userLogged');
    window.location.replace('http://localhost:3000/login')
}

export const addStore = (store) => {
    db.collection('stores').doc().set(store)
}

export const getStores = (id) => {

    return (dispatch) => {
        db.collection('stores').where('idUser', '==', id).get()
        .then((stores)=> {
            if(stores.empty){
                console.log('no tiene tiendas cargadas aún')
                return;
            }
            else {
                const docs = [];
                stores.forEach(doc => {
                    docs.push({ ...doc.data(), id: doc.id })
                });
                dispatch({type: GET_STORES, payload: docs})
            }

        })
    }

}