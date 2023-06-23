import { useContext } from 'react'
import { useEffect } from 'react'

import './homepage.css'
import { Loader } from '../../components/loader/loader'
import { PostComponent } from '../../components/postCard/postCardComponent'
import { PostContext } from '../../contexts/PostContext'
import { UserDataContext } from '../../contexts/userDataContext'

export const HomePage = () => {
    const userId = JSON.parse(localStorage.getItem('userData'))?._id;

    const {allPosts} = useContext(PostContext)
    const {followed, setFollowed} = useContext(UserDataContext)

    const fetchData = async () => {
        try {
            const response = await fetch(`/api/users/${userId}`)
            const data = (await response.json())
            setFollowed(data?.user?.following)
        } catch (error) {
            console.error(error)
        }
    }

    const filteredArr = (allPosts?.filter((post) => (
        followed?.some((followedPeople) => followedPeople?._id === post?.postedBy?._id )
    )))

    useEffect(() => {
        fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="homepage page">
            {!allPosts ? <Loader /> :
                <>
                <div className="header">
                    <p className="heading">Home</p>
                </div>
                {filteredArr?.length === 0
                    ?
                    <div className="no-post-div">
                        <p>Follow your friends to see their latest posts.</p>
                    </div>
                    :
                    <div className="post-container">
                        {filteredArr?.map((post) => (
                            <PostComponent postData={post} key={post?._id} />
                        ))}
                    </div>
                }
            </>}
        </div>
    )
}