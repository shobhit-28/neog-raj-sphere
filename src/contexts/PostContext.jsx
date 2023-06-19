import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

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
            console.log(responseData)
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
            editPost
        }}>
            {children}
        </PostContext.Provider>
    )
}