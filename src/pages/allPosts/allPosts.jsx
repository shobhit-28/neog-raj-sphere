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
    const [sliceQuantity, setSliceQuantity] = useState(3)
    const [isBottom, setIsBottom] = useState(sliceQuantity >= searchResults?.length)

    const searchBarChangeHandler = (event) => {
        window.scrollTo(0, 0);
        setSliceQuantity(3)
        if (event?.target?.value?.length === 0) {
            setSearchResults(allPosts)
        } else {
            setSearchResults(
                [
                    ...allPosts?.filter((post) => post?.content?.slice(0, event?.target?.value.length).toLowerCase() === event?.target?.value.toLowerCase()),
                    ...allPosts?.filter((post) => post?.content?.slice(0, event?.target?.value.length).toLowerCase() !== event?.target?.value.toLowerCase())
                        ?.filter((post) => post?.content.concat(post?.postedBy?.firstName).concat(post?.postedBy?.lastName).toLowerCase()?.includes(event?.target?.value?.toLowerCase()))
                ]
            )
            setIsBottom(3 >= [
                ...allPosts?.filter((post) => post?.content?.slice(0, event?.target?.value.length).toLowerCase() === event?.target?.value.toLowerCase()),
                ...allPosts?.filter((post) => post?.content?.slice(0, event?.target?.value.length).toLowerCase() !== event?.target?.value.toLowerCase())
                    ?.filter((post) => post?.content.concat(post?.postedBy?.firstName).concat(post?.postedBy?.lastName).toLowerCase()?.includes(event?.target?.value?.toLowerCase()))
            ]?.length)
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allPosts])

    // infinite-scroll
    const handelInfiniteScroll = () => {
        if (!isBottom) {
            if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
                setIsBottom(sliceQuantity >= searchResults?.length)
                setIsLoading(true);
                setTimeout(() => {
                    setSliceQuantity(sliceQuantity + 3)
                    setIsLoading(false)
                }, 600)
            }
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handelInfiniteScroll);
        return () => window.removeEventListener("scroll", handelInfiniteScroll);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sliceQuantity]);
    
    useEffect(() => {
        window.addEventListener("scroll", handelInfiniteScroll);
        return () => window.removeEventListener("scroll", handelInfiniteScroll);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isBottom]);

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
                                        {searchResults?.slice(0, sliceQuantity)?.map((post) => (
                                            <PostComponent postData={post} key={post?._id} />
                                        ))}
                                        <div className="loading-container">
                                            {isLoading && sliceQuantity < searchResults?.length && <SmallLoader />}
                                            {sliceQuantity >= searchResults?.length && searchBarRef?.current?.value === '' && <p className="over">“You're All Caught Up”</p>}
                                        </div>
                                    </>
                                :

                                <>
                                    {allPosts?.slice(0, sliceQuantity)?.map((post) => (
                                        <PostComponent postData={post} key={post?._id} />
                                    ))}
                                    <div className="loading-container">
                                        {isLoading && <SmallLoader />}
                                    </div>
                                </>
                            }
                        </div>}
                </div >
            }
        </>
    )
}