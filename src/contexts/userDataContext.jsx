import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { PostContext } from "./PostContext";

export const UserDataContext = createContext();

export const UserDataHandler = ({ children }) => {
    const encodedToken = localStorage.getItem('encodedToken');
    const userId = JSON.parse(localStorage.getItem('userData'))?._id;

    const { allPosts, setAllPosts, editPost, addComment } = useContext(PostContext)

    const [editedData, setEditedData] = useState({})
    const [allUsersData, setAllUsersData] = useState([])
    const [isMobileViewOpen, setIsMobileViewOpen] = useState(false)
    const [isPostModalOpen, setIsPostModalOpen] = useState(false)
    const [followingData, setFollowingData] = useState(false)
    const [followed, setFollowed] = useState([])
    const [currUserData, setCurrUserData] = useState(false)
    const [userData, setUserData] = useState(false)

    const fetchAllUsers = async () => {
        try {
            const response = await fetch('/api/users')
            setAllUsersData((await response.json())?.users)
        } catch (error) {
            console.error(error)
        }
    }

    const fetchUserData = async () => {
        try {
            const response = await fetch(`/api/users/${userId}`)
            const data = (await response.json())
            setEditedData(data?.user)
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

            const responseData = (await response.json())?.user;

            setEditedData(responseData)

            setAllPosts(allPosts?.map((post) => post?.postedBy?._id === userId ? { ...post, postedBy: responseData } : post))

            allPosts?.map((post) => (
                post?.comments?.find((comment) => comment?.user?._id === userId)
                    ?
                    addComment({ ...post, comments: post?.comments?.map((comment) => comment?.user?._id === userId ? { ...comment, user: responseData } : comment) })
                    :
                    post
            ))

            allPosts?.map((post) => post?.postedBy?._id === userId ? editPost({ ...post, postedBy: responseData }) : post)

            allPosts?.map((post) => (
                post?.comments?.find((comment) => comment?.replies?.find((reply) => reply?.user?._id === userId))
                    ?
                    addComment({
                        ...post,
                        comments: post?.comments?.map((comment) => comment?.replies?.find((reply) => reply?.user?._id === userId)
                            ?
                            { ...comment, replies: comment?.replies?.map((reply) => reply?.user?._id ? { ...reply, user: responseData } : reply) }
                            :
                            comment
                        ),
                        postedBy: post?.postedBy?._id === userId && responseData
                    })
                    :
                    post
            ))

            setAllUsersData(allUsersData?.map((user) => user?._id === userId
                ?
                responseData
                :
                {
                    ...user,
                    followers: user?.followers?.map((follower) => follower?._id === userId ? responseData : follower),
                    following: user?.following?.map((followed) => followed?._id === userId ? responseData : followed),
                }
            ))

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
        fetchUserData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
            followed,
            setFollowed,
            currUserData,
            setCurrUserData,
            //individual-user-page
            userData,
            setUserData
        }}>
            {children}
        </UserDataContext.Provider>
    )
}