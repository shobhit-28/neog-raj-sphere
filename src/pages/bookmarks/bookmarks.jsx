import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'

import { MdArrowBackIosNew } from 'react-icons/md'

import './bookmarks.css'
import { PostComponent } from '../../components/postCard/postCardComponent'
import { PostContext } from '../../contexts/PostContext'

export const BookmarkPage = () => {
    const navigate = useNavigate()

    const { bookMarks, allPosts } = useContext(PostContext)

    const filteredData = allPosts?.filter((post) => (
        bookMarks.some((bookmarkedPost) => bookmarkedPost?._id === post?._id )
    ))

    return (
        <div className="bookmark-page page">
            <div className="header">
                <button className="back-btn" onClick={() => navigate(-1)} ><MdArrowBackIosNew /></button>
                <p className="heading">Bookmarks</p>
            </div>
            {bookMarks?.length === 0
                ?
                <div className="no-post-div">
                    <p>No Bookmarks yet</p>
                </div>
                :
                <div className="post-container">
                    {filteredData?.map((post) => (
                        <PostComponent postData={post} key={post?._id} />
                    ))}
                </div>
            }
        </div>
    )
}