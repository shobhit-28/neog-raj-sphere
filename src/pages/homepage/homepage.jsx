import { useContext, useState, useRef } from 'react'
import { useEffect } from 'react'

import { AiOutlineClose } from 'react-icons/ai'

import './homepage.css'
import { Loader } from '../../components/loader/loader'
import { PostComponent } from '../../components/postCard/postCardComponent'
import { PostContext } from '../../contexts/PostContext'
import { UserDataContext } from '../../contexts/userDataContext'
import { BsFilterRight } from 'react-icons/bs'

export const HomePage = () => {
    const userId = JSON.parse(localStorage.getItem('userData'))?._id;

    const { allPosts } = useContext(PostContext)
    const { followed, setFollowed } = useContext(UserDataContext)

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [option, setOption] = useState('latest')

    const menuRef = useRef(null)

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
        followed?.some((followedPeople) => followedPeople?._id === post?.postedBy?._id)
    )))

    const menuChangeHandler = (eventVal) => {
        setOption(eventVal)
    }

    useEffect(() => {
        fetchData()
        const handleOutsideClick = (e) => {
            if (!menuRef?.current?.contains(e?.target)) {
                setIsMenuOpen(false)
            }
        }
        document.addEventListener("mousedown", handleOutsideClick, true)
        document.addEventListener("scroll", () => setIsMenuOpen(false))
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick)
            document.removeEventListener("scroll", () => setIsMenuOpen(false))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="homepage page">
            {!allPosts ? <Loader /> :
                <>
                    <div className="header">
                        {(() => {
                            switch (option) {
                                case 'latest':
                                    return <p className="declaration">Latest Posts</p>
                                case 'oldest':
                                    return <p className="declaration">Oldest Posts</p>
                                case 'trending':
                                    return <p className="declaration">Trending Posts</p>
                                default:
                                    return <p className="declaration"></p>
                            }
                        })()}
                        <p className="heading">Home</p>
                        <div className="sort">
                            <div className="menu-container">
                                {isMenuOpen
                                    ?
                                    <button className="icon" onClick={() => isMenuOpen ? setIsMenuOpen(false) : setIsMenuOpen(true)}>
                                        <AiOutlineClose />
                                    </button>
                                    :
                                    <button className="icon" onClick={() => setIsMenuOpen(true)}>
                                        <BsFilterRight />
                                    </button>
                                }
                                {isMenuOpen &&
                                    <div className="menu" ref={menuRef}>
                                        <form onChange={(event) => menuChangeHandler(event.target.value)}>
                                            <label htmlFor="sort1" className={option === 'trending' && 'active-style'}>
                                                <input type="radio" name="sort" id="sort1" value={'trending'} />
                                                Trending
                                            </label>
                                            <label htmlFor="sort2" className={option === 'latest' && 'active-style'}>
                                                <input type="radio" name="sort" id="sort2" value={'latest'} />
                                                Latest
                                            </label>
                                            <label htmlFor="sort3" className={option === 'oldest' && 'active-style'}>
                                                <input type="radio" name="sort" id="sort3" value={'oldest'} />
                                                Oldest
                                            </label>
                                        </form>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                    {filteredArr?.length === 0
                        ?
                        <div className="no-post-div">
                            <p>Follow your friends to see their latest posts.</p>
                        </div>
                        :
                        <div className="post-container">
                            {(() => {
                                switch (option) {
                                    case 'latest':
                                        return filteredArr?.sort((a, b) => {
                                            let da = new Date(a.createdAt),
                                                db = new Date(b.createdAt);
                                            return db - da;
                                        })?.map((post) => (
                                            <PostComponent postData={post} key={post?._id} />
                                        ))
                                    case 'oldest':
                                        return filteredArr?.sort((a, b) => {
                                            let da = new Date(a.createdAt),
                                                db = new Date(b.createdAt);
                                            return da - db;
                                        })?.map((post) => (
                                            <PostComponent postData={post} key={post?._id} />
                                        ))
                                    case 'trending':
                                        return filteredArr?.sort((a, b) => b?.likes?.likeCount - a?.likes?.likeCount)?.map((post) => (
                                            <PostComponent postData={post} key={post?._id} />
                                        ))
                                    default:
                                        return filteredArr?.map((post) => (
                                            <PostComponent postData={post} key={post?._id} />
                                        ))
                                }
                            })()}
                        </div>
                    }
                </>}
        </div>
    )
}