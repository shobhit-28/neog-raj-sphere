import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const DataContext = createContext();

export const DataHandler = ({ children }) => {
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

    return (
        <DataContext.Provider value={{
            editUserData,
            editedData,
            setEditedData,
        }}>
            {children}
        </DataContext.Provider>
    )
}