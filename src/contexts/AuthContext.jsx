import { createContext, useState } from "react";
// import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthenticationHandler = ({ children }) => {

    const [isLoggedIn, setIsLoggedIn] = useState(localStorage?.getItem('encodedToken')?.length > 0)

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
            console.log(response)

            const data = await response.json();
            console.log(data)
            localStorage.setItem('encodedToken', data?.encodedToken);
            localStorage.setItem('userName', `${data?.foundUser?.firstName} ${data?.foundUser?.lastName}`)
            localStorage.setItem('userEmail', data?.foundUser?.email)
            setIsLoggedIn(true)
        } catch (error) {
            console.error(error);
        }
    }

    // const login = async (loginInputData) => {
    //     try {
    //         const response = await fetch('/api/auth/login', {
    //             method: 'POST',
    //             body: JSON.stringify(loginInputData)
    //         });

    //         const data = await response.json();
    //         if (data?.encodedToken) {
    //             localStorage.setItem('encodedToken', data?.encodedToken);
    //             localStorage.setItem('userName', data?.foundUser?.name)
    //             localStorage.setItem('userEmail', data?.foundUser?.email)
    //             setIsLoggedIn(true)
    //         } else {
    //             toast.error(`Error ${response?.status}: ${data?.errors[0]}`, {
    //                 position: "bottom-center",
    //                 autoClose: 2000,
    //                 hideProgressBar: false,
    //                 closeOnClick: true,
    //                 pauseOnHover: true,
    //                 draggable: true,
    //                 progress: undefined,
    //                 theme: "dark",
    //                 });
    //         }
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    const logOut = () => {
        localStorage.clear();
        setIsLoggedIn(false);
    }

    // const signUp = async (signupInputData, isValid) => {
    //     if (isValid?.isEmail && isValid?.isPassword && isValid?.isPassAndConfirmPassEqual && isValid?.isName) {
    //         try {
    //             const response = await fetch('/api/auth/signup', {
    //                 method: 'POST',
    //                 body: JSON.stringify(signupInputData)
    //             });
    //             const data = await response.json();
    //             if (data?.encodedToken) {
    //                 localStorage.setItem('encodedToken', data?.encodedToken);
    //                 localStorage.setItem('userName', data?.createdUser?.name)
    //                 localStorage.setItem('userEmail', data?.createdUser?.email)
    //                 setIsLoggedIn(true)
    //             } else {
    //                 toast.error(`Error ${response?.status}: ${data?.errors[0]}`, {
    //                     position: "bottom-center",
    //                     autoClose: 2000,
    //                     hideProgressBar: false,
    //                     closeOnClick: true,
    //                     pauseOnHover: true,
    //                     draggable: true,
    //                     progress: undefined,
    //                     theme: "dark",
    //                     });
    //             }

    //         } catch (error) {
    //             console.error(error);
    //         }
    //     }
    // }

    return (
        <AuthContext.Provider value={{
            testLogin,
            isLoggedIn,
            logOut,
            // signUp,
            // login,
        }}>
            {children}
        </AuthContext.Provider>
    )

}