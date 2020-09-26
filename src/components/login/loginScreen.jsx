import React from 'react'
import LoginForm from './loginForm'
import RegisterForm from './registerForm'
import '../../styles/loginScreen.scss'

const loginScreen = ({ register, title, description }) => {
    return (
        <div className="loginScreenContainer">
            <div className="formsMsjContainer">
                <div className="titleContainer">
                    <h2>{title}</h2>
                    <h4>{description}</h4>
                </div>
                <div className="formContainer">
                    {register ? <RegisterForm /> : <LoginForm />}
                </div>
            </div>
        </div>
    )
}

export default loginScreen