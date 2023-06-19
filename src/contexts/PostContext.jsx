import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { toast } from "react-toastify";

export const PostContext = createContext();

export const PostDataHandler = ({children}) => {
    const encodedToken = localStorage.getItem('encodedToken');

    const [allPosts, setAllPosts] = useState([]);

    const fetchAllPostData = async () => {
        try {
            const response = await fetch('/api/posts')
            setAllPosts((await response.json())?.posts)
        } catch (error) {
            console.error(error)
        }
    }

    const editPost = async (editedPostData) => {
        try {
            const response = await fetch(`/api/posts/edit/${editedPostData._id}`,{
                method: 'POST',
                headers: { authorization: encodedToken },
                body: JSON.stringify(editedPostData)
            })
            const responseData = (await response.json())?.posts
            console.log(response)
            setAllPosts(responseData)
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

    const likePost = async (postId) => {
        try {
            const response = await fetch(`/api/posts/like/${postId}`,{
                method: 'post',
                headers: { authorization: encodedToken },
            })
            const responseData = await response.json()
            setAllPosts(responseData?.posts)
        } catch (error) {
            console.error(error);
        }
    }
    
    const dislikePost = async (postId) => {
        try {
            const response = await fetch(`/api/posts/dislike/${postId}`,{
                method: 'post',
                headers: { authorization: encodedToken },
            })
            const responseData = await response.json()
            setAllPosts(responseData?.posts)
        } catch (error) {
            console.error(error);
        }
    }
    
    const deletePost = async (postId) => {
        try {
            const response = await fetch(`/api/posts/${postId}`,{
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

    useEffect(() => {
        fetchAllPostData()
    }, [])

    return (
        <PostContext.Provider value={{
            allPosts,
            editPost,
            likePost,
            dislikePost,
            deletePost
        }}>
            {children}
        </PostContext.Provider>
    )
}