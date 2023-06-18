import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

export const PostContext = createContext();

export const PostDataHandler = ({children}) => {
    // const encodedToken = localStorage.getItem('encodedToken');

    const [allPosts, setAllPosts] = useState([]);

    const fetchAllPostData = async () => {
        try {
            const response = await fetch('/api/posts')
            setAllPosts((await response.json())?.posts)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchAllPostData()
    }, [])

    return (
        <PostContext.Provider value={{
            allPosts
        }}>
            {children}
        </PostContext.Provider>
    )
}