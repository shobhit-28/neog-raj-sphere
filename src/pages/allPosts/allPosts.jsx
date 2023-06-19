import { useContext } from 'react'
import './allPosts.css'
import { PostContext } from '../../contexts/PostContext'
import { PostComponent } from '../../components/postCard/postCardComponent'

export const AllPosts = () => {
    const { allPosts } = useContext(PostContext)

    return (
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
        </div>
    )
}