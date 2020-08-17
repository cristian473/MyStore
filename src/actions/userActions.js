import {auth} from '../firebase'
import {Redirect} from 'react-router-dom'
import {LOGGED, REGISTERED} from '../constants/userConstants'

export const registerUser = (data) => {
    
   
    return (dispatch) => {
        auth.createUserWithEmailAndPassword(data.email, data.password)
            .then(u => {
                auth.signInWithEmailAndPassword(data.email, data.password)
                .then(()=>{
            
                    const userLogged = auth.currentUser;
                    userLogged.updateProfile({
                        displayName:data.name
                    })
                    
                })
        })}
   
            
   
}

export const loginUser = (data) => {
    auth.signInWithEmailAndPassword(data.email, data.password)
        .then(()=>{
            
            const userLogged = auth.currentUser;
            console.log(userLogged)
        })
    
    
}