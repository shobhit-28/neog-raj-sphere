import { useContext } from 'react'
import './allPosts.css'
import { PostContext } from '../../contexts/PostContext'
import { PostComponent } from '../../components/postCard/postCardComponent'
// import { useEffect, useState } from 'react'
import { Loader } from '../../components/loader/loader'

export const AllPosts = () => {
    const { allPosts } = useContext(PostContext)
    // const [allPosts, setAllPosts] = useState([])

    // const fetchAllPostData = async () => {
    //     try {
    //         const response = await fetch('/api/posts')
    //         setAllPosts((await response.json())?.posts)
    //     } catch (error) {
    //         console.error(error)
    //     }
    // }

    // useEffect(() => {
    //     fetchAllPostData()
    // }, [])

    return (
        <>
            {!allPosts?.length > 0
                ?
                <Loader />
                :
                <div className="explore-page page">
                    <div className="header">
                        <p className="heading">Explore</p>
                        <div className="search-bar-container">
                            <input type="text" className="search" placeholder='Search' />
                        </div>
                    </div>
                    <div className="post-container">
                        {allPosts?.map((post) => (
                            <PostComponent postData={post} key={post?._id} />
                        ))}
                    </div>
                </div>}
        </>
    )
}