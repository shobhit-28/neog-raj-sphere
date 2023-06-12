import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import './profilePage.css'
import { AuthContext } from '../../contexts/AuthContext'

import { TfiClose } from 'react-icons/tfi'
import { LuLogOut } from 'react-icons/lu'
import { FiEdit } from 'react-icons/fi'

export const ProfilePage = () => {
    const navigate = useNavigate()

    const { userData, logOut } = useContext(AuthContext)

    const [isFollowingModalOpen, setIsFollowingModalOpen] = useState(false)
    const [isFollowersModalOpen, setIsFollowersModalOpen] = useState(false)
    const [isProfilePicModalOpen, setIsProfilePicModalOpen] = useState(false)
    const [isCoverPicModalOpen, setIsCoverPicModalOpen] = useState(false)

    return (
        <>
            <div className="profile-page page">
                <div className="img-container">
                    <div className="cover-pic-container" onClick={() => setIsCoverPicModalOpen(true)}>
                        <img src={userData?.cover_pic?.length > 0 ? userData?.cover_pic : 'https://picsum.photos/1500/500'} alt="" className="cover-pic" />
                    </div>
                    <div className="profile-pic-container" onClick={() => setIsProfilePicModalOpen(true)}>
                        <img src={userData?.profile_pic} alt="" className="profile-pic" />
                    </div>
                </div>
                <div className="profile-btn-container">
                    <button className="edit"><FiEdit /><span className="text">Profile</span></button>
                    <button className="logout" onClick={() => logOut()}><LuLogOut /></button>
                </div>
                <div className="content">
                    <div className="name-username">
                        <p className="user-name">{`${userData?.firstName} ${userData?.lastName}`}</p>
                        <p className="user-username">{`@${userData?.username}`}</p>
                    </div>
                    <p className="user-email">{userData?.user_email}</p>
                    {userData?.bio && <p className="user-bio">{userData?.bio}</p>}
                    {userData?.link && <a href={userData?.link} className="link" target='_'>{userData?.link}</a>}
                </div>
                <div className="followers-btn-container">
                    <button className="following" onClick={() => setIsFollowingModalOpen(!isFollowingModalOpen)}>{`${userData?.following?.length} Following`}</button>
                    <button className="followers" onClick={() => setIsFollowersModalOpen(!isFollowersModalOpen)}>{`${userData?.followers?.length} Followers`}</button>
                </div>
            </div>
            {isFollowingModalOpen &&
                <div className="follower-following-modal-container" onClick={() => setIsFollowingModalOpen(false)}>
                    <div className="following-modal modal" onClick={(event) => event.stopPropagation()}>
                        <button className="close-btn" onClick={() => setIsFollowingModalOpen(false)}><TfiClose /></button>
                        {userData?.following?.length === 0
                            ?
                            <div className="none">
                                <p>You don't follow anyone</p>
                            </div>
                            :
                            <div className="following-or-followers"></div>}
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
                                <p>You don't have followers</p>
                            </div>
                            :
                            <div className="following-or-followers">
                                {userData?.followers?.map((follower) => (
                                    <div className="follower-div">
                                        <div className="left-section" onClick={() => navigate(`/user/${follower?._id}`)}>
                                            <div className="follower-img-container">
                                                <img src={follower?.profile_pic} alt="" />
                                            </div>
                                            <div className="details">
                                                <p className="follower-name">{`${follower?.firstName} ${follower?.lastName}`}</p>
                                                <p className="follower-username">{`@${follower?.username}`}</p>
                                            </div>
                                        </div>
                                        <div className="right-section">
                                            <button className="unfollow">Unfollow</button>
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
                        <img src={userData?.profile_pic} alt="" className="profile-pic" />
                    </div>
                </div>
            }
            {isCoverPicModalOpen &&
                <div className="cover-pic-zoom-modal-container" onClick={() => setIsCoverPicModalOpen(false)}>
                    <div className="cover-pic-zoom-modal" onClick={(event) => event.stopPropagation()}>
                        <img src={userData?.cover_pic} alt="" className="cover-pic" />
                    </div>
                </div>
            }
        </>
    )
}