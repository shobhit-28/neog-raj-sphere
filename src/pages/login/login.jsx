import './login.css'

import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../../contexts/AuthContext';

export const LoginPage = () => {
    const { testLogin, login } = useContext(AuthContext);

    const navigate = useNavigate()

    const [loginInputData, setLoginInputData] = useState({ username: '', password: '' })

    const userNameChangeHandler = (event) => {
        setLoginInputData({ ...loginInputData, username: event.target.value })
    }

    const passwordChangeHandler = (event) => {
        setLoginInputData({ ...loginInputData, password: event.target.value })
    }

    const signUpClickHandler = () => {
        navigate('/signup')
    }

    return (
        <div className="login-page">
            <div className="login-modal">
                <p className="login-heading">
                    Login
                </p>
                <form action="" className="login">
                    <div className="input-field-container">
                        <label className="username">
                            <span className="input-title">Username: </span>
                            <input type="text" name="" id="username" onChange={userNameChangeHandler} />
                        </label>
                    </div>
                    <div className="input-field-container">
                        <label className="password">
                            <span className="input-title">Password: </span>
                            <input type="password" name="" id="password" onChange={passwordChangeHandler} />
                        </label>
                    </div>
                </form>
                <div className='buttons'>
                    <button className="login login-btn"
                     onClick={() => login(loginInputData)} 
                    >Login</button>
                    <button className="test-login login-btn" onClick={testLogin}>Test Login</button>
                    <button className="signup" onClick={signUpClickHandler}>{`Create an Account >`}</button>
                </div>
            </div>
        </div>
    )
}
