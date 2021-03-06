import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../../styles/formStyles.scss'
import { useDispatch } from 'react-redux'
import { registerUser } from '../../actions/userActions'

const RegisterForm = () => {
    const dispatch = useDispatch();
    const initialState = { name: '', lastname: '', email: '', password: '' };

    const [state, setState] = useState(initialState);

    const handlerInputChange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value })
    }

    const handlerSubmit = (e) => {
        e.preventDefault();
        dispatch(registerUser(state))
    }



    return (
        <div className='formLoginContainer'>
            <form onSubmit={handlerSubmit}>
                <input required placeholder='Nombre' type="text" name='productName' onChange={handlerInputChange} />
                <input required placeholder='Email' type="email" name='email' onChange={handlerInputChange} />
                <input required placeholder='Password' type="password" name='password' onChange={handlerInputChange} />
                {!state.password ?
                    <Link to='/'><button type='button' className='loginButton'>Iniciar sesion</button></Link>
                    :
                    <button className='listoButton' type='submit'>Listo!</button>
                }
            </form>

        </div>
    )

}

export default RegisterForm