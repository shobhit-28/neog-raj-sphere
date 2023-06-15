import './navbar.css'

import { NavLink, useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'

import { MdOutlineExplore, MdBookmarks } from 'react-icons/md'
import { BsPlusSquare } from 'react-icons/bs'
import { TfiClose } from 'react-icons/tfi'
import { RiImageAddLine } from 'react-icons/ri'
import { IoIosCloseCircleOutline } from 'react-icons/io'
import { AuthContext } from '../../contexts/AuthContext'
import { randomProfilePic } from '../../resources/randomImages/randomImages'
import { UserDataContext } from '../../contexts/userDataContext'

export const Navbar = () => {
    const navigate = useNavigate()

    const { userData } = useContext(AuthContext);
    const { editedData } = useContext(UserDataContext)

    const [isPostModalOpen, setIsPostModalOpen] = useState(false)
    const [postInput, setPostInput] = useState({
        content: "",
        pic: "",
        fileName: ''
    });
    const [isClosePostModalConfirmationOpen, setIsClosePostModalConfirmationOpen] = useState(false)

    const remove_img_click_Handler = () => {
        setPostInput({ ...postInput, pic: '' })
        setTimeout(() => {
            setIsPostModalOpen(false)
        }, 0);
        setTimeout(() => {
            setIsPostModalOpen(true)
        }, 1);
    }

    const handleFileChange = async (e) => {
        const file = e.target.files[0];

        const base64Promise = (file) =>
            new Promise((resolve, reject) => {
                const fileReader = new FileReader();
                fileReader.readAsDataURL(file);
                fileReader.onload = () => resolve(fileReader.result);
                fileReader.onerror = (err) => reject(err);
            });
        let base64File = await base64Promise(file);
        setPostInput({ ...postInput, pic: base64File, fileName: file?.name });
    };

    const postModalCancelClickHandler = () => {
        setIsPostModalOpen(false)
        setPostInput({
            content: "",
            pic: "",
            fileName: ''
        })
    }

    const closePostModal = () => {
        if ((postInput.content === '') && (postInput.pic === '')) {
            setIsPostModalOpen(false)
        } else {
            setIsClosePostModalConfirmationOpen(true)
        }
    }

    const saveConfirmationHandler = () => {
        setIsClosePostModalConfirmationOpen(false)
        setIsPostModalOpen(false)
    }

    const cancelConfirmationHandler = () => {
        setIsClosePostModalConfirmationOpen(false)
        setIsPostModalOpen(false)
        setPostInput({
            content: "",
            pic: "",
            fileName: ''
        })
    }

    return (
        <>
            <div className="navbar">
                <div className="nav-upper-section">
                    <div className="nav-head" onClick={() => navigate('/')}>
                        <div className="nav-img-container">
                            <img src={require('../../resources/images/raj-sphere.png')} alt="" className="nav-img" />
                        </div>
                        <p className="nav-text">
                            RajSphere
                        </p>
                    </div>
                    <div className="nav-links">
                        <NavLink to={'/explore'} className={'nav-link'}>
                            <MdOutlineExplore className='nav-img' /> <span className="nav-text">Explore</span>
                        </NavLink>
                        <NavLink to={'/bookmarks'} className={'nav-link'}>
                            <MdBookmarks className='nav-img' /> <span className="nav-text">Bookmarks</span>
                        </NavLink>
                    </div>
                    <div className="btn-container">
                        <button className="post-btn" onClick={() => setIsPostModalOpen(true)}><BsPlusSquare className='btn-img' />
                            <span className="text">Post</span>
                        </button>
                    </div>
                </div>
                <div className="profile" onClick={() => navigate('profile')}>
                    <div className="profile-pic-container">
                        <img src={editedData?.profile_pic
                            ?
                            editedData?.profile_pic  !== undefined 
                            :
                            userData?.profile_pic?.length > 0
                                ? userData?.profile_pic
                                : randomProfilePic} alt="profile" className="profile-pic" />
                    </div>
                    <div className="content">
                        <p className="profile-name">{`${editedData?.firstName  !== undefined  ? editedData?.firstName : userData?.firstName} ${editedData?.lastName  !== undefined  ? editedData?.lastName : userData?.lastName}`}</p>
                        <p className="profile-username">{userData?.username}</p>
                    </div>
                </div>
            </div>
            {isPostModalOpen &&
                <div className="post-modal-container" onClick={() => closePostModal()}>
                    <div className="post-modal" onClick={(event) => event.stopPropagation()}>
                        <button className="close-btn" onClick={() => closePostModal()}><TfiClose /></button>
                        <div className="img-and-text">
                            <div className="profile-pic-container">
                                <img src={editedData?.profile_pic
                                    ?
                                    editedData?.profile_pic !== undefined 
                                    :
                                    userData?.profile_pic?.length > 0
                                        ? userData?.profile_pic
                                        : randomProfilePic} alt="profile" className="profile-pic" />
                            </div>
                            <textarea name="" id="" cols="30" rows="7"
                                className='post-textarea'
                                placeholder="What's happening?!"
                                defaultValue={postInput?.content !== '' ? postInput?.content : ''}
                                onChange={(event) => setPostInput({ ...postInput, content: event.target.value })}
                            ></textarea>
                        </div>
                        {postInput?.pic !== '' &&
                            <div className="input-img-container">
                                <button onClick={() => remove_img_click_Handler()} className="remove-img">
                                    <IoIosCloseCircleOutline />
                                </button>
                                <img src={postInput?.pic} alt="" className="input-pic" />
                            </div>}
                        <hr className="post-modal-hr" />
                        <div className="post-modal-foot">
                            <div className="post-modal-fileinput-container">
                                <label htmlFor='imgInput' className="fileinput-label"
                                    title={`${postInput.pic !== "" ? postInput.fileName : "No file chosen"}`}
                                >
                                    <span className="img"><RiImageAddLine /></span>
                                    <span className="text">Image</span>
                                </label>
                                <input type="file" name="" id="imgInput" className='post-modal-fileinput'
                                    accept='image/*'
                                    onChange={handleFileChange}
                                />
                            </div>
                            <div className="btn-container">
                                <button className={postInput.content === '' ? "disabled-btn" : 'btn'} disabled={postInput.content === ''}>Post</button>
                                <button className="cancel btn" onClick={() => postModalCancelClickHandler()}>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {isClosePostModalConfirmationOpen &&
                <div className="post-modal-confirmation-dialog-container" onClick={() => setIsClosePostModalConfirmationOpen(false)}>
                    <div className="post-modal-confirmation-dialog" onClick={(event) => event.stopPropagation()}>
                        <p className="confirmation-text">
                            Do you want to save this post as a draft?
                        </p>
                        <div className="btn-container">
                            <button className="save" onClick={() => saveConfirmationHandler()}>Save</button>
                            <button className="discard" onClick={() => cancelConfirmationHandler()}>Discard</button>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}