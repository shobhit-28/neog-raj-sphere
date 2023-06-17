import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthenticationHandler = ({ children }) => {

    const [isLoggedIn, setIsLoggedIn] = useState(localStorage?.getItem('encodedToken')?.length > 0)

    const userData = JSON.parse(localStorage.getItem('userData'));

    const testLogin = async () => {
        try {
            const testCreds = {
                username: "shobhitraj",
                password: "shohehe",
            }

            const response = await fetch('/api/auth/login', {
                method: 'POST',
                body: JSON.stringify(testCreds)
            });
            const data = await response.json();
            localStorage.setItem('encodedToken', data?.encodedToken);
            localStorage.setItem('userData', `${JSON.stringify(data?.foundUser)}`)
            setIsLoggedIn(true)
            toast.success(`Welcome ${data?.foundUser?.firstName} ${data?.foundUser?.lastName}`, {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
        } catch (error) {
            console.error(error);
        }
    }

    const login = async (loginInputData) => {
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                body: JSON.stringify(loginInputData)
            });

            const data = await response.json();
            if (data?.encodedToken) {
                localStorage.setItem('encodedToken', data?.encodedToken);
                localStorage.setItem('userData', `${JSON.stringify(data?.foundUser)}`)
                setIsLoggedIn(true)
                toast.success(`Welcome ${data?.foundUser?.firstName} ${data?.foundUser?.lastName}`, {
                    position: "top-center",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    });
            } else {
                toast.error(`Error ${response?.status}: ${data?.errors[0]}`, {
                    position: "top-center",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }
        } catch (error) {
            console.error(error);
        }
    }

    const logOut = () => {
        localStorage.clear();
        setIsLoggedIn(false);
        toast.warn(`Logged Out`, {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }

    const signUp = async (signupInputData, isValid) => {
        if (isValid?.isEmail && isValid?.isPassword && isValid?.isUsername && isValid?.isName) {
            try {
                const response = await fetch('/api/auth/signup', {
                    method: 'POST',
                    body: JSON.stringify(signupInputData)
                });
                const data = await response.json();
                console.log(data?.createdUser)
                if (data?.encodedToken) {
                    localStorage.setItem('encodedToken', data?.encodedToken);
                    localStorage.setItem('userData', `${JSON.stringify(data?.createdUser)}`)
                    setIsLoggedIn(true)
                } else {
                    toast.error(`Error ${response?.status}: ${data?.errors[0]}`, {
                        position: "bottom-center",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                        });
                }

            } catch (error) {
                console.error(error);
            }
        }
    }

    return (
        <AuthContext.Provider value={{
            testLogin,
            isLoggedIn,
            logOut,
            userData,
            signUp,
            login,
        }}>
            {children}
        </AuthContext.Provider>
    )

}