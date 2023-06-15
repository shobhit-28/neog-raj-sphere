import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const UserDataContext = createContext();

export const UserDataHandler = ({ children }) => {
    const encodedToken = localStorage.getItem('encodedToken');

    const [editedData, setEditedData] = useState({})

    const editUserData = async (inputData) => {
        try {
            const response = await fetch('/api/users/edit', {
                method: 'POST',
                headers: { authorization: encodedToken },
                body: JSON.stringify(inputData)
            });

            await response.json();
            toast.success(`Successfully edited`, {
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

    const unfollow = async (userID) => {
        try {
            const response = await fetch(`/api/users/unfollow/${userID}`,{
                method: 'POST',
                headers: {authorization: encodedToken},
            })
            const responseData =  await response.json();
            toast.warn(`You unfollowed @${responseData?.followUser?.username}`, {
                position: "top-center",
                autoClose: 1000,
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
    
    const follow = async (userID) => {
        try {
            const response = await fetch(`/api/users/follow/${userID}`,{
                method: 'POST',
                headers: {authorization: encodedToken},
            })
            const responseData = await response.json();
            toast.success(`You followed @${responseData?.followUser?.username}`, {
                position: "top-center",
                autoClose: 1000,
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

    return (
        <UserDataContext.Provider value={{
            editUserData,
            editedData,
            setEditedData,
            unfollow,
            follow
        }}>
            {children}
        </UserDataContext.Provider>
    )
}