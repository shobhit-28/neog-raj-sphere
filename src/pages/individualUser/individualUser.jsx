import { useNavigate, useParams } from "react-router-dom"
import { useContext, useEffect, useState } from "react";

import './individualUser.css'
import { randomCoverPic, randomProfilePic } from "../../resources/randomImages/randomImages";
import { Loader } from "../../components/loader/loader";
import { UserDataContext } from "../../contexts/userDataContext";
import { TfiClose } from "react-icons/tfi";
import { PostComponent } from "../../components/postCard/postCardComponent";
import { SmallLoader } from "../../components/smallLoader/smallLoader";

// import './homepage.css'

export const IndividualUser = () => {
    const navigate = useNavigate('')
    const { userID } = useParams()

    const profileID = JSON.parse(localStorage.getItem('userData'))?._id;

    const { followed, setFollowed, follow, unfollow, currUserData, setCurrUserData } = useContext(UserDataContext)

    const [userData, setUserData] = useState(false)
    const [isFollowingModalOpen, setIsFollowingModalOpen] = useState(false)
    const [isFollowersModalOpen, setIsFollowersModalOpen] = useState(false)
    const [isProfilePicModalOpen, setIsProfilePicModalOpen] = useState(false)
    const [isCoverPicModalOpen, setIsCoverPicModalOpen] = useState(false)
    const [allPosts, setAllPosts] = useState(undefined)

    const fetchData = async () => {
        try {
            const response = await fetch(`/api/users/${userID}`)
            const data = (await response.json())?.user
            setUserData(data)
            const posts = await fetch(`/api/posts/user/${data?.username}`)
            setAllPosts((await posts.json())?.posts)
        } catch (error) {
            console.error(error);
        }
    }

    const fetchCurrUser = async () => {
        try {
            const response = await fetch(`/api/users/${profileID}`)
            const data = (await response.json())
            setCurrUserData(data?.user)
            setFollowed(data?.user?.following)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        if (profileID === userID) {
            navigate('/profile')
        }
        fetchData()
        fetchCurrUser()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const unfollowHandler = (user) => {
        unfollow(user?._id)
        setUserData({
            ...userData,
            followers: userData?.followers?.filter((user) => user?._id !== currUserData?._id)
        })
        setFollowed(followed?.filter((user) => user?._id !== userID))
    }

    const followHandler = (user) => {
        follow(user)
        setUserData({
            ...userData,
            followers: [...userData?.followers, currUserData]
        })
        setFollowed([...followed, user])
    }

    const modalFollowHandler = (user) => {
        follow(user)
        setCurrUserData({
            ...currUserData,
            following: [...currUserData?.following, user]
        })
        setFollowed([...followed, user])
    }
    
    const modalUnfollowHandler = (user) => {
        unfollow(user?._id)
        setCurrUserData({
            ...currUserData,
            following: currUserData?.following?.filter((filterUser) => filterUser?._id !== user?._id  )
        })
        setFollowed(followed?.filter((followedUser) => followedUser?._id !== user?._id))
    }

    const navigationHandler = (url) => {
        setTimeout(() => {
            navigate('/')
        }, 0)
        setTimeout(() => {
            navigate(url)
            setIsFollowersModalOpen(false)
            setIsFollowingModalOpen(false)
        }, 1)
    }

    const followCheck = (userId) => currUserData?.following?.find((user) => user?._id === userId)
    
    return (
        <>
            {!userData ? <Loader /> :
                <div className="individual-user-page page">
                    <div className="img-container">
                        <div className="cover-pic-container"
                            onClick={() => setIsCoverPicModalOpen(true)}
                        >
                            <img src={userData?.cover_pic?.length > 0 ? userData?.cover_pic : randomCoverPic} alt="" className="cover-pic" />
                        </div>
                        <div className="profile-pic-container"
                            onClick={() => setIsProfilePicModalOpen(true)}
                        >
                            <img src={userData?.profile_pic?.length > 0 ? userData?.profile_pic : randomProfilePic} alt="" className="profile-pic" />
                        </div>
                    </div>
                    <div className="profile-btn-container">
                        {followed?.find((user) => user?._id === userID)
                            ?
                            <button className="unfollow-follow"
                                onClick={() => unfollowHandler(userData)}
                            ><span className="text">Unfollow</span></button>
                            :
                            <button className="unfollow-follow"
                                onClick={() => followHandler(userData)}
                            ><span className="text">Follow</span></button>
                        }
                    </div>
                    <div className="content">
                        <div className="name-username">
                            <p className="user-name">{`${userData?.firstName} ${userData?.lastName}`}</p>
                            {currUserData?.followers?.find((user) => user?._id === userID) &&
                                <p className="user-username">{`(follows you)`}</p>}
                            <p className="user-username">{`@${userData?.username}`}</p>
                        </div>
                        <a href={`mailto:${userData?.user_email}`} className="user-email">{userData?.user_email}</a>
                        {userData?.bio && <p className="user-bio">{userData?.bio}</p>}
                        {userData?.link && <a href={userData?.link} className="link" target='_'>{userData?.link?.slice(8)}</a>}
                    </div>
                    <div className="followers-btn-container">
                        <button className="following"
                            onClick={() => setIsFollowingModalOpen(!isFollowingModalOpen)}
                        >{`${userData?.following?.length} Following`}</button>
                        <button className="followers"
                            onClick={() => setIsFollowersModalOpen(!isFollowersModalOpen)}
                        >{`${userData?.followers?.length} Followers`}</button>
                    </div>
                    {!allPosts ? <SmallLoader /> :
                        <div className="post-content">
                            {allPosts?.length > 0
                                ?
                                <div className="user-post">
                                    {allPosts?.map((post) => <PostComponent postData={post} key={post?._id} />)}
                                </div>
                                :
                                <div className="not-posted">
                                    User has not posted anything yet!
                                </div>
                            }
                        </div>
                    }
                </div>
            }
            {isFollowingModalOpen &&
                <div className="follower-following-modal-container" onClick={() => setIsFollowingModalOpen(false)}>
                    <div className="following-modal modal" onClick={(event) => event.stopPropagation()}>
                        <button className="close-btn" onClick={() => setIsFollowingModalOpen(false)}><TfiClose /></button>
                        {userData?.following?.length === 0
                            ?
                            <div className="none">
                                <p>{`${userData?.firstName} doesn't follow anyone`}</p>
                            </div>
                            :
                            <div className="following-or-followers">
                                {userData?.following?.map((following) => (
                                    <div className="follower-div" key={following?._id}>
                                        <div className="left-section" onClick={() => navigationHandler(`/user/${following?._id}`)}>
                                            <div className="follower-img-container">
                                                <img src={following?.profile_pic?.length > 0 ? following?.profile_pic : 'https://png.pngtree.com/png-vector/20190820/ourmid/pngtree-no-image-vector-illustration-isolated-png-image_1694547.jpg'} alt="" />
                                            </div>
                                            <div className="details">
                                                <p className="follower-name">{`${following?.firstName} ${following?.lastName}`}</p>
                                                <p className="follower-username">{`@${following?.username}`}</p>
                                            </div>
                                        </div>
                                        <div className="right-section">
                                            {following?._id !== profileID &&
                                                (followCheck(following?._id) ?
                                                    <button className="unfollow"
                                                        onClick={() => modalUnfollowHandler(following)}
                                                    >Unfollow</button> :
                                                    <button className="unfollow"
                                                        onClick={() => modalFollowHandler(following)}
                                                    >Follow</button>)
                                            }
                                        </div>
                                    </div>
                                ))}
                            </div>}
                    </div>
                </div>
            }
            {isFollowersModalOpen &&
                <div className="follower-following-modal-container" onClick={() => setIsFollowersModalOpen(false)}>
                    <div className="followers-modal modal" onClick={(event) => event.stopPropagation()}>
                        <button className="close-btn" onClick={() => setIsFollowersModalOpen(false)}><TfiClose /></button>
                        {userData?.followers?.length === 0
                            ?
                            <div className="none">
                                <p>{`${userData.firstName} don't have any followers`}</p>
                            </div>
                            :
                            <div className="following-or-followers">
                                {userData?.followers?.map((follower) => (
                                    <div className="follower-div" key={follower?._id}>
                                        <div className="left-section" onClick={() => navigationHandler(`/user/${follower?._id}`)}>
                                            <div className="follower-img-container">
                                                <img src={follower?.profile_pic?.length > 0 ? follower?.profile_pic : 'https://png.pngtree.com/png-vector/20190820/ourmid/pngtree-no-image-vector-illustration-isolated-png-image_1694547.jpg'} alt="" />
                                            </div>
                                            <div className="details">
                                                <p className="follower-name">{`${follower?.firstName} ${follower?.lastName}`}</p>
                                                <p className="follower-username">{`@${follower?.username}`}</p>
                                            </div>
                                        </div>
                                        <div className="right-section">
                                            {follower?._id !== profileID &&
                                                (
                                                    followCheck(follower?._id) ?
                                                        <button className="unfollow"
                                                            onClick={() => modalUnfollowHandler(follower)}
                                                        >Unfollow</button> :
                                                        <button className="unfollow"
                                                            onClick={() => modalFollowHandler(follower)}
                                                        >Follow
                                                        </button>
                                                )
                                            }
                                        </div>
                                    </div>
                                ))}
                            </div>
                        }
                    </div>
                </div>
            }
            {isProfilePicModalOpen &&
                <div className="profile-pic-zoom-modal-container" onClick={() => setIsProfilePicModalOpen(false)}>
                    <div className="profile-pic-zoom-modal" onClick={(event) => event.stopPropagation()}>
                        <img src={userData?.profile_pic?.length > 0 ? userData?.profile_pic : randomProfilePic} alt="" className="profile-pic" />
                    </div>
                </div>
            }
            {isCoverPicModalOpen &&
                <div className="cover-pic-zoom-modal-container" onClick={() => setIsCoverPicModalOpen(false)}>
                    <div className="cover-pic-zoom-modal" onClick={(event) => event.stopPropagation()}>
                        <img src={userData?.cover_pic?.length > 0 ? userData?.cover_pic : randomCoverPic} alt="" className="cover-pic" />
                    </div>
                </div>
            }
        </>
    )
}