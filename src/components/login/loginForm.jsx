import React, {useState} from 'react'
import {auth} from '../../firebase'
import {Link} from 'react-router-dom'
import {loginUser} from '../../actions/userActions'
import { useSelector } from 'react-redux'

const LoginForm = () => {

    const initialState={email:'', password:''};
    const user = useSelector(store => store.user.user);
    const [state, setState] = useState(initialState);

    const handlerInputChange = (e) => {
        const {name, value} = e.target;
        setState({...state, [name]: value})
    }

    const handlerSubmit = (e) => {
        e.preventDefault();
        loginUser(state)
    }

    return (
        <div>
            {user.name ? 
            (<h2>hola! {user.name}, ahora inicia sesion...</h2>)
            : //si no 
            (<h2>Hola! tanto tiempo!</h2>)}
            
            <div>
                <input type="email" placeholder='email' name='email'/>
                <input type="password" placeholder='password' name='password'/>
            </div>
            <div>
                <button>iniciar sesion</button>
            </div>
            <Link to='/registro'>registrarse</Link>
        </div>
    )

}

export default LoginForm