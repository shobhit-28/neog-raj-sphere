import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const UserDataContext = createContext();

export const UserDataHandler = ({ children }) => {
    const encodedToken = localStorage.getItem('encodedToken');

    const [editedData, setEditedData] = useState({})
    const [allUsersData, setAllUsersData] = useState([])
    const [isMobileViewOpen, setIsMobileViewOpen] = useState(false)
    const [isPostModalOpen, setIsPostModalOpen] = useState(false)
    const [followingData, setFollowingData] = useState(false)
    const [followedIds, setFollowedIds] = useState([])
    const [userData, setUserData] = useState(false)

    const fetchAllUsers = async () => {
        try {
            const response = await fetch('/api/users')
            setAllUsersData((await response.json())?.users)
        } catch (error) {
            console.error(error)
        }
    }

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
            const response = await fetch(`/api/users/unfollow/${userID}`, {
                method: 'POST',
                headers: { authorization: encodedToken },
            })
            const responseData = await response.json();
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

    const follow = async (user) => {
        try {
            const response = await fetch(`/api/users/follow/${user?._id}`, {
                method: 'POST',
                headers: { authorization: encodedToken },
            })
            setUserData({
                ...userData,
                following: [...userData?.following, user]
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

    useEffect(() => {
        fetchAllUsers()
    }, [])

    return (
        <UserDataContext.Provider value={{
            editUserData,
            editedData,
            setEditedData,
            unfollow,
            follow,
            allUsersData,
            isMobileViewOpen,
            setIsMobileViewOpen,
            isPostModalOpen,
            setIsPostModalOpen,
            followingData,
            setFollowingData,
            followedIds,
            setFollowedIds,
            userData,
            setUserData
        }}>
            {children}
        </UserDataContext.Provider>
    )
}