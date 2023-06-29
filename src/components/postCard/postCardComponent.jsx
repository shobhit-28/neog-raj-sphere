import copy from "copy-to-clipboard";
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState, useContext } from 'react'

import { AiOutlineHeart, AiFillHeart, AiOutlineClose, AiOutlineSend } from 'react-icons/ai'
import { GoComment } from 'react-icons/go'
import { CiMenuKebab } from 'react-icons/ci'
import { TfiClose } from 'react-icons/tfi'
import { IoIosCloseCircleOutline } from 'react-icons/io'
import { RiBookmarkFill, RiBookmarkLine, RiImageAddLine } from 'react-icons/ri'
import { FiShare2 } from 'react-icons/fi';

import './postCardComponent.css'
import { UserDataContext } from '../../contexts/userDataContext'
import { randomProfilePic } from '../../resources/randomImages/randomImages'
import { PostContext } from '../../contexts/PostContext'
import { formatDate } from "../../backend/utils/authUtils";

export const PostComponent = ({ postData }) => {
    const { editedData } = useContext(UserDataContext)
    const { editPost,
        likePost,
        dislikePost,
        deletePost,
        isLikeBtnDisabled,
        setIsLikeBtnDisabled,
        isDisLikeBtnDisabled,
        setIsDisLikeBtnDisabled,
        bookMarks,
        addBookmark,
        removeBookmark,
        addComment,
        allPosts,
        setAllPosts,
    } = useContext(PostContext)

    const navigate = useNavigate()
    const location = useLocation()

    const profileId = JSON.parse(localStorage.getItem('userData'))?._id;

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isEditPostModalOpen, setIsEditPostModalOpen] = useState(false)
    const [editedPostData, setEditedPostData] = useState(postData)
    const [comment, setComment] = useState('')
    const [isCommentOpen, setIsCommentOpen] = useState(false)

    const menuRef = useRef(null)
    const fileInputRef = useRef(null)
    const addCommentRef = useRef(null)


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
        toast.success(`Successfully edited`, {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }

    const deleteClickHandler = () => {
        deletePost(postData?._id)
        setIsEditPostModalOpen(false)
    }

    const dislikeClickHandler = () => {
        if (isDisLikeBtnDisabled) {
            dislikePost(postData?._id)
        }
        setIsDisLikeBtnDisabled(false)
    }

    const likeClickHandler = () => {
        if (isLikeBtnDisabled) {
            likePost(postData?._id)
        }
        setIsLikeBtnDisabled(false)
    }

    const shareHandler = () => {
        copy(`${(window.location.href).slice(0, window.location.href.length - (location.pathname.length - 1))}post/${postData?._id}`)
        toast.success(`Link has been copied to clipboard.`, {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }

    const commentClickHandler = () => {
        setIsCommentOpen(!isCommentOpen)
        if (addCommentRef) {
            setTimeout(() => {
                addCommentRef?.current?.focus()  
            }, 1)
        }
    } 

    const addCommentHandler = () => {
        setIsCommentOpen(!isCommentOpen)
        if (comment?.length > 0) {
            addComment({
                ...postData,
                comments: [
                    ...postData?.comments,
                    {
                        _id: uuidv4(),
                        content: comment,
                        postId: postData?._id,
                        user: editedData,
                        replies: [],
                        createdAt: formatDate(),
                        updatedAt: formatDate(),
                    },
                ]
            })
            setEditedPostData({
                ...postData,
                comments: [
                    ...postData?.comments,
                    {
                        _id: uuidv4(),
                        content: comment,
                        postId: postData?._id,
                        user: editedData,
                        replies: [],
                        createdAt: formatDate(),
                        updatedAt: formatDate(),
                    },
                ]
            })
            setAllPosts(
                allPosts?.map((post) => post?._id === postData?._id
                    ?
                    {
                        ...postData,
                        comments: [
                            ...postData?.comments,
                            {
                                _id: uuidv4(),
                                content: comment,
                                postId: postData?._id,
                                user: editedData,
                                replies: [],
                                createdAt: formatDate(),
                                updatedAt: formatDate(),
                            },
                        ]
                    }
                    :
                    post
                )
            )
            addCommentRef.current.value = ''
            setComment('')
            toast.success(`Comment added`, {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } else {
            toast.warn(`Comment cannot be empty`, {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
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
                            <p className="date">{new Date(postData?.createdAt).toDateString()}</p>
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
                                    <p className="option-2" onClick={() => deleteClickHandler()}>Delete</p>
                                </div>
                            }
                        </div>}
                </div>
                <div onClick={() => navigate(`/post/${postData?._id}`)}>
                    <p className="content">{postData?.content}</p>
                    {postData?.pic && <div className="post-img-container">
                        <img src={postData?.pic} alt="" />
                    </div>}
                </div>
                <div className="btn-container">
                    <div className="like-btn-container">
                        {postData?.likes?.likedBy?.find((user) => user?._id === profileId)
                            ?
                            <button className="dislike heart" onClick={() => dislikeClickHandler()}><AiFillHeart /></button>
                            :
                            <button className="like" onClick={() => likeClickHandler()}><AiOutlineHeart /></button>
                        }
                        <p className="likes-num">{postData?.likes?.likeCount}</p>
                    </div>
                    <button className="comment" onClick={() => commentClickHandler()} ><GoComment /></button>
                    {!bookMarks?.find((postID) => postID === postData?._id)
                        ?
                        <button className="bookmark" onClick={() => addBookmark(postData?._id)}><RiBookmarkLine /></button>
                        :
                        <button className="bookmark" onClick={() => removeBookmark(postData?._id)}><RiBookmarkFill /></button>
                    }
                    <button className="share" onClick={() => shareHandler()}><FiShare2 /></button>
                </div>
                {isCommentOpen && <div className="comment-input-div">
                    <label htmlFor="comment" className="comment-input">
                        <input type="text" name="comment" placeholder="Enter Comment" onChange={(event) => setComment(event.target.value)} ref={addCommentRef} />
                    </label>
                    <button className="add-comment" onClick={() => addCommentHandler()}><AiOutlineSend /></button>
                </div>}
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