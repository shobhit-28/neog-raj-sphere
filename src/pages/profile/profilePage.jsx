import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import './profilePage.css'
import { AuthContext } from '../../contexts/AuthContext'
import { randomCoverPic, randomProfilePic } from '../../resources/randomImages/randomImages'

import { TfiClose } from 'react-icons/tfi'
import { LuLogOut } from 'react-icons/lu'
import { FiEdit } from 'react-icons/fi'
import { MdOutlineAddPhotoAlternate } from 'react-icons/md'
import { toast } from 'react-toastify'

export const ProfilePage = () => {
    const encodedToken = localStorage.getItem('encodedToken');

    const navigate = useNavigate()

    const { userData, logOut } = useContext(AuthContext)

    const [isFollowingModalOpen, setIsFollowingModalOpen] = useState(false)
    const [isFollowersModalOpen, setIsFollowersModalOpen] = useState(false)
    const [isProfilePicModalOpen, setIsProfilePicModalOpen] = useState(false)
    const [isCoverPicModalOpen, setIsCoverPicModalOpen] = useState(false)
    const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false)
    // const [isEditProfileModalConfirmationDialogOpen, setIsEditProfileModalConfirmationDialogOpen] = useState(false);

    // const [editedCoverPic, setEditedCoverPic] = useState('');
    // const [editedProfilePic, setEditedProfilePic] = useState('');
    // const [editedName, setEditedName] = useState('');
    // const [editedUserName, setEditedUserName] = useState('');
    // const [editedEmail, setEditedEmail] = useState('');
    // const [editedBio, setEditedBio] = useState('');
    // const [editedLink, setEditedLink] = useState('');

    const [editedUserData, setEditedUserData] = useState({
        cover_pic: '',
        profile_pic: '',
        firstName: '',
        lastName: '',
        user_email: '',
        bio: '',
        link: ''
    })

    const handleCoverPicChange = async (e) => {
        const file = e.target.files[0];

        const base64Promise = (file) =>
            new Promise((resolve, reject) => {
                const fileReader = new FileReader();
                fileReader.readAsDataURL(file);
                fileReader.onload = () => resolve(fileReader.result);
                fileReader.onerror = (err) => reject(err);
            });
        let base64File = await base64Promise(file);
        setEditedUserData({ ...editedUserData, cover_pic: base64File })
    };

    const handleProfilePicChange = async (e) => {
        const file = e.target.files[0];

        const base64Promise = (file) =>
            new Promise((resolve, reject) => {
                const fileReader = new FileReader();
                fileReader.readAsDataURL(file);
                fileReader.onload = () => resolve(fileReader.result);
                fileReader.onerror = (err) => reject(err);
            });
        let base64File = await base64Promise(file);
        setEditedUserData({ ...editedUserData, profile_pic: base64File })
    };

    const firstNameChangeHandler = (event) => {
        setEditedUserData({ ...editedUserData, firstName: event.target.value })
    }
    
    const lastNameChangeHandler = (event) => {
        setEditedUserData({ ...editedUserData, lastName: event.target.value })
    }

    const emailChangeHandler = (event) => {
        setEditedUserData({ ...editedUserData, user_email: event.target.value })
    }

    const bioChangeHandler = (event) => {
        setEditedUserData({ ...editedUserData, bio: event.target.value })
    }

    const linkChangeHandler = (event) => {
        setEditedUserData({ ...editedUserData, link: event.target.value })
    }

    const editUserData = async (inputData) => {
        console.log('inputData', inputData)
        try {
            const response = await fetch('/api/users/edit', {
                method: 'POST',
                headers: { authorization: encodedToken },
                body: JSON.stringify(inputData)
            });

            const data = await response.json();
            console.log(data)
            // if (data?.encodedToken) {
            //     localStorage.setItem('encodedToken', data?.encodedToken);
            //     localStorage.setItem('userData', `${JSON.stringify(data?.foundUser)}`)
            //     toast.success(`Successfully edited`, {
            //         position: "top-center",
            //         autoClose: 1500,
            //         hideProgressBar: false,
            //         closeOnClick: true,
            //         pauseOnHover: true,
            //         draggable: true,
            //         progress: undefined,
            //         theme: "dark",
            //         });
            // } else {
            //     toast.error(`Error ${response?.status}: ${data?.errors[0]}`, {
            //         position: "top-center",
            //         autoClose: 1500,
            //         hideProgressBar: false,
            //         closeOnClick: true,
            //         pauseOnHover: true,
            //         draggable: true,
            //         progress: undefined,
            //         theme: "dark",
            //     });
            // }
        } catch (error) {
            console.error(error);
        }
    }

    const editUserDataClickHandler = () => {
        editUserData({ userData: editedUserData })
    }

    return (
        <>
            <div className="profile-page page">
                <div className="img-container">
                    <div className="cover-pic-container" onClick={() => setIsCoverPicModalOpen(true)}>
                        <img src={userData?.cover_pic?.length > 0 ? userData?.cover_pic : randomCoverPic} alt="" className="cover-pic" />
                    </div>
                    <div className="profile-pic-container" onClick={() => setIsProfilePicModalOpen(true)}>
                        <img src={userData?.profile_pic?.length > 0 ? userData?.profile_pic : randomProfilePic} alt="" className="profile-pic" />
                    </div>
                </div>
                <div className="profile-btn-container">
                    <button className="edit" onClick={() => setIsEditProfileModalOpen(true)}><FiEdit /><span className="text">Profile</span></button>
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
                            <div className="following-or-followers">
                                {userData?.following?.map((following) => (
                                    <div className="follower-div">
                                        <div className="left-section" onClick={() => navigate(`/user/${following?._id}`)}>
                                            <div className="follower-img-container">
                                                <img src={following?.profile_pic?.length > 0 ? following?.profile_pic : 'https://png.pngtree.com/png-vector/20190820/ourmid/pngtree-no-image-vector-illustration-isolated-png-image_1694547.jpg'} alt="" />
                                            </div>
                                            <div className="details">
                                                <p className="follower-name">{`${following?.firstName} ${following?.lastName}`}</p>
                                                <p className="follower-username">{`@${following?.username}`}</p>
                                            </div>
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
                                <p>You don't have followers</p>
                            </div>
                            :
                            <div className="following-or-followers">
                                {userData?.followers?.map((follower) => (
                                    <div className="follower-div">
                                        <div className="left-section" onClick={() => navigate(`/user/${follower?._id}`)}>
                                            <div className="follower-img-container">
                                                <img src={follower?.profile_pic?.length > 0 ? follower?.profile_pic : 'https://png.pngtree.com/png-vector/20190820/ourmid/pngtree-no-image-vector-illustration-isolated-png-image_1694547.jpg'} alt="" />
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
            {isEditProfileModalOpen &&
                <div className="profile-edit-modal-container" onClick={() => setIsEditProfileModalOpen(false)}>
                    <div className="profile-edit-modal" onClick={(event) => event.stopPropagation()}>
                        <div className="edit-modal-header">
                            <button className="close-btn" onClick={() => setIsFollowersModalOpen(false)}><TfiClose /></button>
                            <p className="heading">Edit Profile</p>
                            <button className="save" onClick={() => editUserDataClickHandler()}>Save</button>
                        </div>
                        <form className="edit-user-data">
                            <div className="img-container">
                                <div className="cover-pic-container">
                                    <img src={editedUserData?.cover_pic !== ""
                                        ?
                                        editedUserData?.cover_pic
                                        :
                                        userData?.cover_pic?.length > 0
                                            ? userData?.cover_pic
                                            : randomCoverPic}
                                        alt="" className="cover-pic" />
                                    <div className="edit-user-fileinput-container">
                                        <label htmlFor='imgInput' className="fileinput-label"
                                            title={`${editedUserData?.cover_pic !== "" ? editedUserData?.cover_pic : "No file chosen"}`}
                                        >
                                            <span className="img"><MdOutlineAddPhotoAlternate /></span>
                                        </label>
                                        <input type="file" name="" id="imgInput" className='edit-user-fileinput'
                                            accept='image/x-png,image/gif,image/jpeg'
                                            onChange={handleCoverPicChange}
                                        />
                                    </div>
                                </div>
                                <div className="profile-pic-container">
                                    <img src={editedUserData?.profile_pic !== ""
                                        ?
                                        editedUserData?.profile_pic
                                        :
                                        userData?.profile_pic?.length > 0
                                            ? userData?.profile_pic
                                            : randomProfilePic}
                                        alt="" className="profile-pic" />
                                    <div className="edit-user-fileinput-container">
                                        <label htmlFor='imgInput' className="fileinput-label"
                                            title={`${editedUserData?.profile_pic !== "" ? editedUserData?.profile_pic : "No file chosen"}`}
                                        >
                                            <span className="img"><MdOutlineAddPhotoAlternate /></span>
                                        </label>
                                        <input type="file" name="" id="imgInput" className='edit-user-fileinput'
                                            accept='image/*'
                                            onChange={handleProfilePicChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="profile-content-container">
                                <label htmlFor="" className="edit-user-first-name">
                                    <span className="text">First Name:</span>
                                    <input onChange={(event) => firstNameChangeHandler(event)} type="text" name="" id="" className="edit-first-name" defaultValue={`${userData?.firstName}`} placeholder='First Name' />
                                </label>
                                <label htmlFor="" className="edit-user-last-name">
                                    <span className="text">Last Name:</span>
                                    <input onChange={(event) => lastNameChangeHandler(event)} type="text" name="" id="" className="edit-last-name" defaultValue={`${userData?.lastName}`} placeholder='Last Name' />
                                </label>
                                <label htmlFor="" className="edit-user-email" onChange={(event) => emailChangeHandler(event)}>
                                    <span className="text">Email:</span>
                                    <input type="email" name="" id="" className="edit-email" defaultValue={`${userData?.user_email}`} placeholder='email' />
                                </label>
                                <label htmlFor="" className="edit-user-bio" onChange={(event) => bioChangeHandler(event)}>
                                    <span className="text">Bio:</span>
                                    <input type="text" name="" id="" className="edit-bio" defaultValue={userData?.bio} placeholder='Bio' />
                                </label>
                                <label htmlFor="" className="edit-user-link" onChange={(event) => linkChangeHandler(event)}>
                                    <span className="text">Website</span>
                                    <input type="text" name="" id="" className="edit-link" defaultValue={userData?.link} placeholder='Website' />
                                </label>
                            </div>
                        </form>
                    </div>
                </div>
            }
            { }
        </>
    )
}