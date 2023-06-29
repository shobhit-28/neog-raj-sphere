import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { toast } from "react-toastify";

export const PostContext = createContext();

export const PostDataHandler = ({ children }) => {
    const encodedToken = localStorage.getItem('encodedToken');

    const [allPosts, setAllPosts] = useState(undefined);
    const [bookMarks, setBookMarks] = useState(undefined)
    const [isLikeBtnDisabled, setIsLikeBtnDisabled] = useState(true)
    const [isDisLikeBtnDisabled, setIsDisLikeBtnDisabled] = useState(true)

    const fetchAllPostData = async () => {
        try {
            const response = await fetch('/api/posts')
            setAllPosts((await response.json())?.posts)
        } catch (error) {
            console.error(error)
        }
    }

    const editPost = async (editedPostData) => {
        const inputData = { ...editedPostData, isComment: false }

        try {
            const response = await fetch(`/api/posts/edit/${editedPostData._id}`, {
                method: 'POST',
                headers: { authorization: encodedToken },
                body: JSON.stringify(inputData)
            })
            const responseData = (await response.json())?.posts
            setAllPosts(responseData)
        } catch (error) {
            console.error(error);
        }
    }

    const addComment = async (editedPostData) => {
        const inputData = { ...editedPostData, isComment: true }

        try {
            const response = await fetch(`/api/posts/edit/${editedPostData._id}`, {
                method: 'POST',
                headers: { authorization: encodedToken },
                body: JSON.stringify(inputData)
            })
            await response.json()?.posts
        } catch (error) {
            console.error(error);
        }
    }

    const removeComment = async (editedPostData) => {
        const inputData = { ...editedPostData, isComment: true }

        try {
            const response = await fetch(`/api/posts/edit/${editedPostData._id}`, {
                method: 'POST',
                headers: { authorization: encodedToken },
                body: JSON.stringify(inputData)
            })
            await response.json()?.posts
            toast.info(`Comment removed`, {
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

    const createPost = async (postData) => {
        try {
            const response = await fetch(`/api/posts`, {
                method: 'POST',
                headers: { authorization: encodedToken },
                body: JSON.stringify(postData)
            })
            const responseData = (await response.json())?.posts
            setAllPosts(responseData)
            toast.success(`Posted successfully`, {
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

    const likePost = async (postId) => {
        try {
            const response = await fetch(`/api/posts/like/${postId}`, {
                method: 'post',
                headers: { authorization: encodedToken },
            })
            const responseData = await response.json()
            setAllPosts(responseData?.posts)
            setIsLikeBtnDisabled(responseData?.posts)
        } catch (error) {
            console.error(error);
        }
    }

    const dislikePost = async (postId) => {
        try {
            const response = await fetch(`/api/posts/dislike/${postId}`, {
                method: 'post',
                headers: { authorization: encodedToken },
            })
            const responseData = await response.json()
            setAllPosts(responseData?.posts)
            setIsDisLikeBtnDisabled(responseData?.posts)
        } catch (error) {
            console.error(error);
        }
    }

    const deletePost = async (postId) => {
        try {
            const response = await fetch(`/api/posts/${postId}`, {
                method: 'delete',
                headers: { authorization: encodedToken },
            })
            const responseData = await response.json()
            setAllPosts(responseData?.posts)
            toast.info(`Post deleted`, {
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

    //BOOKMARKS

    const fetchAllBookMarks = async () => {
        try {
            const response = await fetch('/api/users/bookmark/', {
                headers: { authorization: encodedToken }
            })
            const responseData = (await response.json())?.bookmarks
            setBookMarks(responseData)
        } catch (error) {
            console.error(error);
        }
    }

    const addBookmark = async (postID) => {
        try {
            const response = await fetch(`/api/users/bookmark/${postID}`,{
                method: 'post',
                headers: { authorization: encodedToken }
            })
            const responseData = (await response.json())?.bookmarks
            if (responseData) {
                setBookMarks(responseData)
                toast.success(`Successfully added to bookmarks`, {
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
    
    const removeBookmark = async (postID) => {
        try {
            const response = await fetch(`/api/users/remove-bookmark/${postID}`,{
                method: 'post',
                headers: { authorization: encodedToken }
            })
            const responseData = (await response.json())?.bookmarks
            if (responseData) {
                setBookMarks(responseData)
                toast.info(`Post removed from bookmarks`, {
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

    useEffect(() => {
        fetchAllPostData()
        fetchAllBookMarks()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <PostContext.Provider value={{
            allPosts,
            setAllPosts,
            editPost,
            addComment,
            removeComment,
            createPost,
            likePost,
            dislikePost,
            deletePost,
            isLikeBtnDisabled,
            setIsLikeBtnDisabled,
            isDisLikeBtnDisabled,
            setIsDisLikeBtnDisabled,
            //bookmarks
            fetchAllBookMarks,
            addBookmark,
            removeBookmark,
            bookMarks,
            setBookMarks
        }}>
            {children}
        </PostContext.Provider>
    )
}