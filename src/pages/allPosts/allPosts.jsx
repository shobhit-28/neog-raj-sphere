import { useContext, useEffect, useState } from 'react'
import './allPosts.css'
import { PostContext } from '../../contexts/PostContext'
import { PostComponent } from '../../components/postCard/postCardComponent'
import { Loader } from '../../components/loader/loader'
import { useRef } from 'react'

export const AllPosts = () => {
    const { allPosts } = useContext(PostContext)

    const [searchResults, setSearchResults] = useState(undefined)

    const searchBarChangeHandler = (event) => {
        if (event?.target?.value?.length === 0) {
            setSearchResults(undefined)
        } else {
            setSearchResults(
                [
                    ...allPosts?.filter((post) => post?.content?.slice(0, event?.target?.value.length).toLowerCase() === event?.target?.value.toLowerCase()),
                    ...allPosts?.filter((post) => post?.content?.slice(0, event?.target?.value.length).toLowerCase() !== event?.target?.value.toLowerCase())
                        ?.filter((post) => post?.content.concat(post?.postedBy?.firstName).concat(post?.postedBy?.lastName).toLowerCase()?.includes(event?.target?.value?.toLowerCase()))
                ]
            )
        }
    }

    const searchBarRef = useRef()

    useEffect(() => {
        if (allPosts) {
            const event = searchBarRef?.current?.value
            setSearchResults(
                [
                    ...allPosts?.filter((post) => post?.content?.slice(0, event?.length).toLowerCase() === event?.toLowerCase()),
                    ...allPosts?.filter((post) => post?.content?.slice(0, event?.length).toLowerCase() !== event?.toLowerCase())
                        ?.filter((post) => post?.content.concat(post?.postedBy?.firstName).concat(post?.postedBy?.lastName).toLowerCase()?.includes(event?.toLowerCase()))
                ]
            )
        }
    }, [allPosts])

    return (
        <>
            {!allPosts
                ?
                <Loader />
                :
                <div className="explore-page page">
                    <div className="header">
                        <p className="heading">Explore</p>
                        <div className="search-bar-container">
                            <input type="text" ref={searchBarRef} className="search" placeholder='Search' onChange={(event) => searchBarChangeHandler(event)} />
                        </div>
                    </div>
                    {allPosts?.length === 0
                        ?
                        <div className="no-post-div">
                            <p>No Posts</p>
                        </div>
                        :
                        <div className="post-container">
                            {searchResults
                                ?
                                searchResults?.length === 0
                                    ?
                                    <div className="not-found">
                                        <p>I'm sorry, but I couldn't find any results for your search. Can you please rephrase?</p>
                                    </div>
                                    :
                                    searchResults?.map((post) => (
                                        <PostComponent postData={post} key={post?._id} />
                                    ))
                                :
                                allPosts?.map((post) => (
                                    <PostComponent postData={post} key={post?._id} />
                                ))
                            }
                        </div>}
                </div>
            }
        </>
    )
}