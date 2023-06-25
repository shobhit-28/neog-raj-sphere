import { useContext } from 'react'

import './bookmarks.css'
import { PostComponent } from '../../components/postCard/postCardComponent'
import { PostContext } from '../../contexts/PostContext'
import { Loader } from '../../components/loader/loader'

export const BookmarkPage = () => {

    const { bookMarks, allPosts } = useContext(PostContext)

    const filteredData = allPosts?.filter((post) => (
        bookMarks.some((bookmarkedPostID) => bookmarkedPostID === post?._id)
    ))

    return (
        <div className="bookmark-page page">
            {!allPosts ? <Loader /> :
                <>
                <div className="header">
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
            </>}
        </div>
    )
}