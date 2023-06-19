import './postCardComponent.css'

import { AiOutlineHeart, AiFillHeart, AiOutlineClose } from 'react-icons/ai'
import { GoComment } from 'react-icons/go'
import { BsFillBookmarkPlusFill, BsFillBookmarkCheckFill } from 'react-icons/bs'
import { CiMenuKebab } from 'react-icons/ci'
import dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { TfiClose } from 'react-icons/tfi'
import { useContext } from 'react'
import { UserDataContext } from '../../contexts/userDataContext'
import { randomProfilePic } from '../../resources/randomImages/randomImages'
import { IoIosCloseCircleOutline } from 'react-icons/io'
import { RiImageAddLine } from 'react-icons/ri'
import { PostContext } from '../../contexts/PostContext'

export const PostComponent = ({ postData }) => {
    const { editedData } = useContext(UserDataContext)
    const { editPost, likePost, dislikePost, deletePost } = useContext(PostContext)

    const navigate = useNavigate()

    const profileId = JSON.parse(localStorage.getItem('userData'))?._id;

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isEditPostModalOpen, setIsEditPostModalOpen] = useState(false)
    const [editedPostData, setEditedPostData] = useState(postData)

    const menuRef = useRef(null)
    const fileInputRef = useRef(null)


    useEffect(() => {
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
    }, [])

    const remove_img_click_Handler = () => {
        setEditedPostData({ ...editedPostData, pic: '' })
        fileInputRef.current.value = ''
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
        setEditedPostData({ ...editedPostData, pic: base64File });
    };

    const closeEditPostModal = () => {
        setEditedPostData({
            content: postData.content,
            pic: postData.pic
        })
        setIsEditPostModalOpen(false)
    }

    const postModalCancelClickHandler = () => {
        setIsEditPostModalOpen(false)
        setEditedPostData({
            content: postData.content,
            pic: postData.pic
        })
    }

    const editClickHandler = () => {
        setIsEditPostModalOpen(false)
        editPost(editedPostData)
        // setEditedPostDataFront(editedPostData)
    }

    return (
        <div className="post-card-container">
            <div className="post-card">
                <div className="post-card-head">
                    <div className="posted-by" onClick={() => navigate(`/user/${postData?.postedBy?._id}`)}>
                        <div className="profile-pic-container">
                            <img src={postData?.postedBy?.profile_pic} alt="" />
                        </div>
                        <div className="name-username-date">
                            <p className="name">{`${postData?.postedBy?.firstName} ${postData?.postedBy?.lastName}`}</p>
                            <p className="username">{`@${postData?.postedBy?.username}`}</p>
                            <p className="date">{String((dayjs.call(postData?.createdAt))?.$d).slice(0, 16)}</p>
                        </div>
                    </div>
                    {postData?.postedBy?._id === profileId &&
                        <div className="kebab-menu-container">
                            {isMenuOpen
                                ?
                                <button className="kebab-icon" onClick={() => isMenuOpen ? setIsMenuOpen(false) : setIsMenuOpen(true)}>
                                    <AiOutlineClose />
                                </button>
                                :
                                <button className="kebab-icon" onClick={() => setIsMenuOpen(true)}>
                                    <CiMenuKebab />
                                </button>
                            }
                            {isMenuOpen &&
                                <div className="menu" ref={menuRef}>
                                    <p className="option-1" onClick={() => setIsEditPostModalOpen(true)}>Edit</p>
                                    <p className="option-2" onClick={() => deletePost(postData?._id)}>Delete</p>
                                </div>
                            }
                        </div>}
                </div>
                <p className="content">{postData?.content}</p>
                {postData?.pic && <div className="post-img-container">
                    <img src={postData?.pic} alt="" />
                </div>}
                <div className="btn-container">
                    <div className="like-btn-container">
                        {postData?.likes?.likedBy?.find((user) => user?._id === profileId)
                            ?
                            <button className="dislike heart" onClick={() => dislikePost(postData?._id)}><AiFillHeart /></button>
                            :
                            <button className="like heart" onClick={() => likePost(postData?._id)}><AiOutlineHeart /></button>
                        }
                        <p className="likes-num">{postData?.likes?.likeCount}</p>
                    </div>
                    <button className="comment"><GoComment /></button>
                    <button className="bookmark"><BsFillBookmarkPlusFill /><BsFillBookmarkCheckFill /></button>
                </div>
            </div>
            {isEditPostModalOpen &&
                <div className="edit-post-modal-container" onClick={() => closeEditPostModal()}>
                    <div className="edit-post-modal" onClick={(event) => event.stopPropagation()}>
                        <button className="close-btn"
                            onClick={() => closeEditPostModal()}
                        ><TfiClose /></button>
                        <div className="img-and-text">
                            <div className="profile-pic-container">
                                <img src={editedData?.profile_pic
                                    ?
                                    editedData?.profile_pic
                                    :
                                    postData?.postedBy?.profile_pic?.length > 0
                                        ? postData?.postedBy?.profile_pic
                                        : randomProfilePic} alt="profile" className="profile-pic" />
                            </div>
                            <textarea name="" id="" cols="30" rows="7"
                                className='post-textarea'
                                placeholder="What's happening?!"
                                defaultValue={postData?.content}
                                onChange={(event) => setEditedPostData({ ...editedPostData, content: event.target.value })}
                            ></textarea>
                        </div>
                        {editedPostData?.pic !== '' &&
                            <div className="input-img-container">
                                <button
                                    onClick={() => remove_img_click_Handler()}
                                    className="remove-img">
                                    <IoIosCloseCircleOutline />
                                </button>
                                <img src={editedPostData?.pic} alt="" className="input-pic" />
                            </div>
                        }
                        <hr className="post-modal-hr" />
                        <div className="post-modal-foot">
                            <div className="post-modal-fileinput-container">
                                <label htmlFor='imgInput' className="fileinput-label">
                                    <span className="img"><RiImageAddLine /></span>
                                    <span className="text">Image</span>
                                </label>
                                <input type="file" name="" id="imgInput" className='post-modal-fileinput'
                                    accept='image/*'
                                    onChange={handleFileChange}
                                    ref={fileInputRef}
                                />
                            </div>
                            <div className="btn-container">
                                <button className={editedPostData.content === '' ? "disabled-btn" : 'btn'} disabled={editedPostData.content === ''} onClick={() => editClickHandler()}>Save</button>
                                <button className="cancel btn" onClick={() => postModalCancelClickHandler()}>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>}
        </div>
    )
}