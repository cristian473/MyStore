import React, { useState } from 'react'
import { auth } from '../../firebase'
import { Link } from 'react-router-dom'
import '../../styles/formStyles.scss'
import { loginUser } from '../../actions/userActions'
import { useSelector, useDispatch } from 'react-redux'

const LoginForm = () => {
    const dispatch = useDispatch()
    const initialState = { email: '', password: '' };
    const user = useSelector(store => store.user.user);
    const [state, setState] = useState(initialState);

    const handlerInputChange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value })
    }

    const handlerSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser(state))
    }

    return (
        <div className='formLoginContainer' >
            <form onSubmit={(e) => (e.preventDefault())}>
                {/* <label>Email</label>    */}
                <input focus={false} onChange={handlerInputChange} placeholder='Email' type="email" name='email' />
                {/* <label>Contraseña</label> */}
                <input onChange={handlerInputChange} placeholder='Password' type="password" name='password' />
                <button className='btn btn-secondary' type='submit' onClick={handlerSubmit}>Iniciar sesion</button>
                <button className='btn btn-secondary'><Link to='/registro'>Registrarse</Link></button>
            </form>
            <div className="buttonsContainer">
            </div>
        </div>
    )

}

export default LoginForm