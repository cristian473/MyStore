import React from 'react'
import LoginForm from './loginForm'
import RegisterForm from './registerForm'
import '../../styles/loginScreen.scss'
import graphAnalitycs from '../../media/DarkAnalytics.png'

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
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <path fill="#5000ca" fill-opacity="1" d="M0,160L60,160C120,160,240,160,360,186.7C480,213,600,267,720,250.7C840,235,960,149,1080,128C1200,107,1320,149,1380,170.7L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
            </svg>
            <img src={graphAnalitycs} alt="graphAnalitycs" />
        </div>
    )
}

export default loginScreen