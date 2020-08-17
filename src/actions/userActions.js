import {auth} from '../firebase'
import {Redirect} from 'react-router-dom'
import {LOGGED, REGISTERED} from '../constants/userConstants'

export const registerUser = (data) => {
    
   
    return (dispatch) => {
        auth.createUserWithEmailAndPassword(data.email, data.password)
            .then(u => {
                dispatch({type: REGISTERED, payload: data})
        })}
   
            
   
}

export const loginUser = () => {

}