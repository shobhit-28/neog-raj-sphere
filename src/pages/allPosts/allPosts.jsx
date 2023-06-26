import { useContext, useEffect, useState } from 'react'
import './allPosts.css'
import { PostContext } from '../../contexts/PostContext'
import { PostComponent } from '../../components/postCard/postCardComponent'
import { Loader } from '../../components/loader/loader'
import { useRef } from 'react'
import { SmallLoader } from '../../components/smallLoader/smallLoader'

export const AllPosts = () => {
    const { allPosts } = useContext(PostContext)

    const [searchResults, setSearchResults] = useState(undefined)
    const [isLoading, setIsLoading] = useState(false)
    const [fragmentedSearchRes, setFragmentedSearchRes] = useState([])

    const searchBarChangeHandler = (event) => {
        window.scrollTo(0, 0);
        if (event?.target?.value?.length === 0) {
            setSearchResults(allPosts)
            setFragmentedSearchRes(allPosts?.slice(0, 3))
        } else {
            setSearchResults(
                [
                    ...allPosts?.filter((post) => post?.content?.slice(0, event?.target?.value.length).toLowerCase() === event?.target?.value.toLowerCase()),
                    ...allPosts?.filter((post) => post?.content?.slice(0, event?.target?.value.length).toLowerCase() !== event?.target?.value.toLowerCase())
                        ?.filter((post) => post?.content.concat(post?.postedBy?.firstName).concat(post?.postedBy?.lastName).toLowerCase()?.includes(event?.target?.value?.toLowerCase()))
                ]
            )
            setFragmentedSearchRes(
                [
                    ...allPosts?.filter((post) => post?.content?.slice(0, event?.target?.value.length).toLowerCase() === event?.target?.value.toLowerCase()),
                    ...allPosts?.filter((post) => post?.content?.slice(0, event?.target?.value.length).toLowerCase() !== event?.target?.value.toLowerCase())
                        ?.filter((post) => post?.content.concat(post?.postedBy?.firstName).concat(post?.postedBy?.lastName).toLowerCase()?.includes(event?.target?.value?.toLowerCase()))
                ]?.slice(0, 3)
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
            setFragmentedSearchRes([...fragmentedSearchRes,
            [
                ...allPosts?.filter((post) => post?.content?.slice(0, event?.length).toLowerCase() === event?.toLowerCase()),
                ...allPosts?.filter((post) => post?.content?.slice(0, event?.length).toLowerCase() !== event?.toLowerCase())
                    ?.filter((post) => post?.content.concat(post?.postedBy?.firstName).concat(post?.postedBy?.lastName).toLowerCase()?.includes(event?.toLowerCase()))
            ]?.slice(fragmentedSearchRes?.length, fragmentedSearchRes?.length + 3)
            ]?.flat())
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allPosts])

    // infinite-scroll
    const handelInfiniteScroll = () => {
        if (fragmentedSearchRes?.length !== searchResults?.length) {
            if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
                setIsLoading(true);
                setTimeout(() => {
                    setFragmentedSearchRes([
                        ...fragmentedSearchRes,
                        searchResults?.slice(fragmentedSearchRes?.length, fragmentedSearchRes?.length + 3)
                    ]?.flat())
                    setIsLoading(false)
                }, 1000)
            }
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handelInfiniteScroll);
        return () => window.removeEventListener("scroll", handelInfiniteScroll);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fragmentedSearchRes]);

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
                                    <>
                                        {fragmentedSearchRes?.map((post) => (
                                            <PostComponent postData={post} key={post?._id} />
                                        ))}
                                        <div className="loading-container">
                                            {isLoading && <SmallLoader />}
                                        </div>
                                    </>
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