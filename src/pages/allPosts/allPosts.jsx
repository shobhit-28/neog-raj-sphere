import { useContext } from 'react'
import './allPosts.css'
import { PostContext } from '../../contexts/PostContext'

export const AllPosts = () => {
    const { allPosts } = useContext(PostContext)

    console.log(allPosts)

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
                    <p className="name">{post?.content}</p>
                ))}
            </div>
        </div>
    )
}