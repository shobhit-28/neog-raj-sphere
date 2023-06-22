import { useNavigate, useParams } from "react-router-dom"
import { useState, useEffect, useRef, useContext } from "react";
import dayjs from "dayjs";

import './singlePostPage.css'

import { MdArrowBackIosNew } from 'react-icons/md'
import { AiFillHeart, AiOutlineClose, AiOutlineEdit, AiOutlineHeart, AiOutlineSend } from "react-icons/ai";
import { CiMenuKebab } from "react-icons/ci";
import { BsFillBookmarkCheckFill, BsFillBookmarkPlusFill, BsTrash } from "react-icons/bs";
import { GoComment } from "react-icons/go";

import { formatDate } from "../../backend/utils/authUtils";
import { PostContext } from "../../contexts/PostContext";
import { toast } from "react-toastify";
import { Loader } from "../../components/loader/loader";
import { UserDataContext } from "../../contexts/userDataContext";
import { TfiClose } from "react-icons/tfi";
import { randomProfilePic } from "../../resources/randomImages/randomImages";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { RiImageAddLine } from "react-icons/ri";

export const SinglePostPage = () => {
    const { postId } = useParams();
    const profileId = JSON.parse(localStorage.getItem('userData'))?._id;

    const { addComment, editPost } = useContext(PostContext)
    const { editedData } = useContext(UserDataContext)

    const [postData, setPostData] = useState(undefined)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [comment, setComment] = useState('')
    const [isEditCommentOpen, setIsEditCommentOpen] = useState('')
    const [isReplyCommentOpen, setIsReplyCommentOpen] = useState('')
    const [isEditPostModalOpen, setIsEditPostModalOpen] = useState(false)
    const [editedPostData, setEditedPostData] = useState(postData)

    const menuRef = useRef(null)
    const addCommentRef = useRef(null)
    const fileInputRef = useRef(null)

    const navigate = useNavigate()

    const fetchPostData = async () => {
        try {
            const response = await fetch(`/api/posts/${postId}`)
            const responseData = (await response.json())?.post
            setPostData(responseData)
            setEditedPostData(responseData)
        } catch (error) {
            console.error(error);
        }
    }

    const addCommentHandler = () => {
        if (comment?.length > 0) {
            addComment({
                ...postData,
                comments: [
                    ...postData?.comments,
                    {
                        _id: String(postData?.comments?.length + 1),
                        content: comment,
                        postId: postData?._id,
                        user: {
                            _id: JSON.parse(localStorage.getItem('userData'))?._id,
                            firstName: JSON.parse(localStorage.getItem('userData'))?.firstName,
                            lastName: JSON.parse(localStorage.getItem('userData'))?.lastName,
                            username: JSON.parse(localStorage.getItem('userData'))?.username,
                            profile_pic: JSON.parse(localStorage.getItem('userData'))?.profile_pic
                        },
                        replies: [],
                        createdAt: formatDate(),
                        updatedAt: formatDate(),
                    },
                ]
            })
            setPostData({
                ...postData,
                comments: [
                    ...postData?.comments,
                    {
                        _id: String(postData?.comments?.length + 1),
                        content: comment,
                        postId: postData?._id,
                        user: {
                            _id: JSON.parse(localStorage.getItem('userData'))?._id,
                            firstName: JSON.parse(localStorage.getItem('userData'))?.firstName,
                            lastName: JSON.parse(localStorage.getItem('userData'))?.lastName,
                            username: JSON.parse(localStorage.getItem('userData'))?.username,
                            profile_pic: JSON.parse(localStorage.getItem('userData'))?.profile_pic
                        },
                        replies: [],
                        createdAt: formatDate(),
                        updatedAt: formatDate(),
                    },
                ]
            })
            addCommentRef.current.value = ''
            setComment('')
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

    const isRemovable = (comment) => (
        postData?.postedBy?._id === profileId || comment?.user?._id === profileId
    )

    const handleEditComments = (commentID) => {
        setIsEditCommentOpen(commentID)
        if (isEditCommentOpen !== '') {
            setIsEditCommentOpen('')
        }
        if (commentID !== isEditCommentOpen) {
            setIsEditCommentOpen(commentID)
        }
    }

    const handleReplyOnComment = (commentID) => {
        setIsReplyCommentOpen(commentID)
        if (isReplyCommentOpen !== '') {
            setIsReplyCommentOpen('')
        }
        if (commentID !== isReplyCommentOpen) {
            setIsReplyCommentOpen(commentID)
        }
    }

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

    const postModalCancelClickHandler = () => {
        setIsEditPostModalOpen(false)
        setEditedPostData({
            content: postData.content,
            pic: postData.pic
        })
    }

    const closeEditPostModal = () => {
        setEditedPostData({
            content: postData.content,
            pic: postData.pic
        })
        setIsEditPostModalOpen(false)
    }

    const editClickHandler = () => {
        setIsEditPostModalOpen(false)
        editPost(editedPostData)
        setPostData({
            ...postData,
            content: editedPostData?.content,
            pic: editedPostData?.pic
        })
    }

    useEffect(() => {
        fetchPostData()
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
        <div className="single-post-page page">
            {!postData ? <Loader /> :
                <>
                    <div className="header">
                        <button className="back-btn" onClick={() => navigate(-1)} ><MdArrowBackIosNew /></button>
                        <p className="heading">Post</p>
                    </div>
                    <div className="comment-container">
                        <div className="posted-by">
                            <div className="left-section" title={`@${postData?.postedBy?.username}`}>
                                <div className="profile-pic-container">
                                    <img src={postData?.postedBy?.profile_pic} alt={`@${postData?.postedBy?.username}`} />
                                </div>
                                <div className="name-username-date">
                                    <p className="name">{`${postData?.postedBy?.firstName} ${postData?.postedBy?.lastName}`}</p>
                                    <p className="username">{`@${postData?.username}`}</p>
                                    <p className="date">{String((dayjs.call(postData?.createdAt))?.$d).slice(0, 16)}</p>
                                </div>
                            </div>
                            <div className="right-section">
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
                                                <p className="option-2"
                                                // onClick={() => deleteClickHandler()}
                                                >Delete</p>
                                            </div>
                                        }
                                    </div>
                                }
                            </div>
                        </div>
                        <div className="post-content">
                            <p className="content">{postData?.content}</p>
                            {postData?.pic &&
                                <div className="content-img">
                                    <img src={postData?.pic} alt="" />
                                </div>
                            }
                        </div>
                        <div className="btn-container">
                            <div className="like-btn-container">
                                {postData?.likes?.likedBy?.find((user) => user?._id === profileId)
                                    ?
                                    <button className="dislike heart"
                                    //  onClick={() => dislikeClickHandler()}
                                    ><AiFillHeart /></button>
                                    :
                                    <button className="like heart"
                                    // onClick={() => likeClickHandler()}
                                    ><AiOutlineHeart /></button>
                                }
                                <p className="likes-num">{postData?.likes?.likeCount}</p>
                            </div>
                            <button className="comment"><GoComment /></button>
                            <button className="bookmark"><BsFillBookmarkPlusFill /><BsFillBookmarkCheckFill /></button>
                        </div>
                        <div className="comment-section">
                            <div className="comment-input-div">
                                <label htmlFor="comment" className="comment-input">
                                    <input type="text" name="comment" onChange={(event) => setComment(event.target.value)} ref={addCommentRef} />
                                </label>
                                <button className="add-comment" onClick={() => addCommentHandler()}><AiOutlineSend /></button>
                            </div>
                            <div className="comments">
                                {postData?.comments?.map((comment) => (
                                    <div className="single-comment-div" key={comment?._id}>
                                        <div className="commented-by">
                                            <div className="left-section">
                                                <div className="profile-pic-container">
                                                    <img src={comment?.user?.profile_pic} alt="" />
                                                </div>
                                                <div className="name-username-date">
                                                    <p className="name">{`${comment?.user?.firstName} ${comment?.user?.lastName}`}</p>
                                                    <p className="username">{`@${comment?.user?.username}`}</p>
                                                    <p className="date">{String((dayjs.call(comment?.createdAt))?.$d).slice(0, 16)}</p>
                                                </div>
                                            </div>
                                            <div className="right-section">
                                                <div className="comment-btn-container">
                                                    {isRemovable(comment) &&
                                                        <button className="delete"><BsTrash /></button>
                                                    }
                                                    {comment?.user?._id === profileId &&
                                                        <button className="edit-comment" onClick={() => handleEditComments(comment?._id)}><AiOutlineEdit /></button>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        {isEditCommentOpen === comment?._id
                                            ?
                                            <div className="comment-input-div">
                                                <label className="comment-input">
                                                    <input type="text" defaultValue={comment?.content}
                                                    // onChange={(event) => setComment(event.target.value)}
                                                    />
                                                </label>
                                                <button className="add-comment"
                                                // onClick={() => addCommentHandler()}
                                                ><AiOutlineSend /></button>
                                            </div>
                                            :
                                            <p className="content">{comment?.content}</p>
                                        }
                                        <button className="reply-btn" onClick={() => handleReplyOnComment(comment?._id)}>Reply</button>
                                        {comment?.replies?.map((reply) => (
                                            <div className="reply" key={reply?._id}>
                                                <div className="replied-by">
                                                    <div className="profile-pic-container">
                                                        <img src={reply?.user?.profile_pic} alt="" />
                                                    </div>
                                                    <div className="name-username">
                                                        <p className="name">{`${reply?.user?.firstName} ${reply?.user?.lastName}`}</p>
                                                        <p className="username">{`@${reply?.user?.username}`}</p>
                                                    </div>
                                                </div>
                                                <p className="reply">{reply?.content}</p>
                                            </div>
                                        ))}
                                        {isReplyCommentOpen === comment?._id &&
                                            <div className="comment-reply-input-div">
                                                <div className="comment-input-div">
                                                    <label className="comment-input">
                                                        <input type="text"
                                                        // onChange={(event) => setComment(event.target.value)}
                                                        />
                                                    </label>
                                                    <button className="add-comment"
                                                    // onClick={() => addCommentHandler()}
                                                    ><AiOutlineSend /></button>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </>
            }
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