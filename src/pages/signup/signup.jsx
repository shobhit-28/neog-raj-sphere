import { useContext, useEffect, useState } from 'react'
import './signup.css'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'

export const SignupPage = () => {
    const navigate = useNavigate();

    const [signupInputData, setSignupInputData] = useState({ user_email: '', password: '', username: '', firstName: '', lastName: '' })
    const [isValid, setIsValid] = useState({ isEmail: false, isPassword: false, isUsername: false, isName: false })
    const [showErrors, setShowErrors] = useState(false);

    const { signUp, isLoggedIn } = useContext(AuthContext)

    const isEmail = (email) =>
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,3}$/i.test(email);

    const validateForm = (event) => {
        if (event.target.id === 'email') {
            setIsValid({ ...isValid, isEmail: isEmail(event.target.value) })
        }
        if (event.target.id === 'pass') {
            setIsValid({ ...isValid, isPassword: (/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/.test(event.target.value)) })
        }
        if (event.target.id === 'username') {
            setIsValid({ ...isValid, isUsername: event.target.value.length > 0 })
        }
        if (event.target.id === 'firstName') {
            setIsValid({ ...isValid, isName: event.target.value.length >= 2 })
        }
    }

    const mailChangeHandler = (event) => {
        setSignupInputData({ ...signupInputData, user_email: event.target.value })
    }

    const passwordChangeHandler = (event) => {
        setSignupInputData({ ...signupInputData, password: event.target.value })
    }

    const usernameChangeHandler = (event) => {
        setSignupInputData({ ...signupInputData, username: event.target.value })
    }

    const signUpClickHandler = () => {
        setShowErrors(true)
        signUp(signupInputData, isValid)
    }

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        
        <div className="signup-page">
                {isLoggedIn ? navigate('/') :
                <div className="signup-modal">
                    <p className="signup-heading">
                        Sign Up
                    </p>
                    <form action="submit" className="signup" onChange={validateForm}>
                        <div className="input-field-container">
                            <label className="first-name">
                                <span className="input-title">First Name: </span>
                                <input type="text" name="" id="firstName"
                                    onChange={(event) => setSignupInputData({ ...signupInputData, firstName: event.target.value })}
                                />
                                {showErrors && !isValid?.isName && <p className="name-error error">name should be at least two letters long</p>}
                            </label>
                        </div>
                        <div className="input-field-container">
                            <label className="last-name">
                                <span className="input-title">Last Name: </span>
                                <input type="text" name="" id="lastName"
                                    onChange={(event) => setSignupInputData({ ...signupInputData, lastName: event.target.value })}
                                />
                            </label>
                        </div>
                        <div className="input-field-container">
                            <label className="username">
                                <span className="input-title">Username: </span>
                                <input type="text" name="" id="username"
                                    onChange={usernameChangeHandler}
                                />
                                {showErrors && !isValid?.isUsername && <p className="username-error error">username can't be empty</p>}
                            </label>
                        </div>
                        <div className="input-field-container">
                            <label className="email">
                                <span className="input-title">Email: </span>
                                <input type="email" name="" id="email"
                                    onChange={mailChangeHandler}
                                />
                                {showErrors && !isValid?.isEmail && <p className="email-error error">Please enter a valid email address.</p>}
                            </label>
                        </div>
                        <div className="input-field-container">
                            <label className="password">
                                <span className="input-title">Password: </span>
                                <input type="password" name="" id="pass"
                                    onChange={passwordChangeHandler}
                                />
                                {showErrors && !isValid?.isPassword && <p className="password-error error">password should be between 8 to 20 characters long and should contain at least one special character</p>}
                            </label>
                        </div>
                    </form>
                    <button className="signup-btn" onClick={signUpClickHandler}>
                        Sign Up
                    </button>
                </div>}
            </div>
    )

}
