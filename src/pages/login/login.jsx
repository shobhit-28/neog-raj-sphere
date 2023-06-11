import './login.css'

import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../../contexts/AuthContext';
// import { AuthContext } from '../../contexts/authContext';


// export const LoginPage = () => {
//     return (
//         <div className="login-page page">
//             <p className="heading">Login</p>
//         </div>
//     )
// }


export const LoginPage = () => {
    const { testLogin } = useContext(AuthContext);

    const navigate = useNavigate()

    const [loginInputData, setLoginInputData] = useState({ email: '', password: '' })

    const emailChangeHandler = (event) => {
        setLoginInputData({ ...loginInputData, email: event.target.value })
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
                        <label className="email">
                            <span className="input-title">Email: </span>
                            <input type="email" name="" id="email" onChange={emailChangeHandler} />
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
                    //  onClick={() => login(loginInputData)} 
                    >Login</button>
                    <button className="test-login login-btn" onClick={testLogin}>Test Login</button>
                    <button className="signup" onClick={signUpClickHandler}>{`Create an Account >`}</button>
                </div>
            </div>
        </div>
    )
}
