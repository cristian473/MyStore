import React, { useState } from 'react'
import {auth} from '../../firebase'
import {Link} from 'react-router-dom'
import '../../styles/formStyles.scss'
import {useDispatch} from 'react-redux'
import {registerUser} from '../../actions/userActions'

const RegisterForm = () => {
    const dispatch = useDispatch();
    const initialState={name:'', lastname:'', email:'', password:''};

    const [state, setState] = useState(initialState);

    const handlerInputChange = (e) => {
        const {name, value} = e.target;
        setState({...state, [name]: value})
    }

    const handlerSubmit = (e) => {
        e.preventDefault();
        dispatch(registerUser(state))
    }



    return (
        <div className='formLoginContainer'>
            <form onSubmit={handlerSubmit}>
                <label>Nombre</label>
                <input required type="text" name='name' onChange={handlerInputChange}/>
                <label>Apellido</label>
                <input required type="text" name='lastname' onChange={handlerInputChange}/>
                <label>Email</label>
                <input required type="email" name='email' onChange={handlerInputChange}/>
                <label>Password</label>
                <input required type="password" name='password' onChange={handlerInputChange}/>
                <button>Registrarse</button>
            </form>
            
        </div>
    )

}

export default RegisterForm