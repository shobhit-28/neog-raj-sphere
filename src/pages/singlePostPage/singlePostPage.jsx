import { useNavigate, useParams } from "react-router-dom"
import { useState, useEffect, useRef, useContext } from "react";
import { v4 as uuidv4 } from 'uuid';
import copy from "copy-to-clipboard";

import './singlePostPage.css'

import { MdArrowBackIosNew } from 'react-icons/md'
import { AiFillHeart, AiOutlineClose, AiOutlineEdit, AiOutlineHeart, AiOutlineSend } from "react-icons/ai";
import { CiMenuKebab } from "react-icons/ci";
import { BsTrash } from "react-icons/bs";
import { GoComment } from "react-icons/go";
import { FiShare2 } from "react-icons/fi"
import { TfiClose } from "react-icons/tfi";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { RiBookmarkFill, RiBookmarkLine, RiImageAddLine } from "react-icons/ri";

import { formatDate } from "../../backend/utils/authUtils";
import { PostContext } from "../../contexts/PostContext";
import { toast } from "react-toastify";
import { Loader } from "../../components/loader/loader";
import { UserDataContext } from "../../contexts/userDataContext";
import { randomProfilePic } from "../../resources/randomImages/randomImages";

export const SinglePostPage = () => {
    const { postId } = useParams();
    const profileId = JSON.parse(localStorage.getItem('userData'))?._id;

    const {
        allPosts,
        setAllPosts,
        addComment,
        editPost,
        removeComment,
        deletePost,
        isLikeBtnDisabled,
        setIsLikeBtnDisabled,
        isDisLikeBtnDisabled,
        setIsDisLikeBtnDisabled,
        likePost,
        dislikePost,
        //bookmarks
        addBookmark,
        removeBookmark,
        bookMarks
    } = useContext(PostContext)
    const { editedData } = useContext(UserDataContext)

    const [postData, setPostData] = useState(undefined)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [comment, setComment] = useState('')
    const [editedComment, setEditedComment] = useState('')
    const [reply, setReply] = useState('')
    const [isEditCommentOpen, setIsEditCommentOpen] = useState('')
    const [isReplyCommentOpen, setIsReplyCommentOpen] = useState('')
    const [isEditPostModalOpen, setIsEditPostModalOpen] = useState(false)
    const [editedPostData, setEditedPostData] = useState(postData)

    const menuRef = useRef(null)
    const addCommentRef = useRef(null)
    const fileInputRef = useRef(null)
    const replyCommentRef = useRef(null)
    const editCommentRef = useRef(null)

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
            setPostData({
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
    const addReplyHandler = (commentId) => {
        if (reply?.length > 0) {
            setPostData({
                ...postData,
                comments: postData?.comments?.map((comment) => comment?._id === commentId
                    ?
                    {
                        ...comment,
                        replies: [...comment?.replies, {
                            _id: uuidv4(),
                            content: reply,
                            user: editedData
                        }]
                    }
                    :
                    comment)
            })
            setEditedPostData({
                ...postData,
                comments: postData?.comments?.map((comment) => comment?._id === commentId
                    ?
                    {
                        ...comment,
                        replies: [...comment?.replies, {
                            _id: uuidv4(),
                            content: reply,
                            user: editedData
                        }]
                    }
                    :
                    comment)
            })
            addComment({
                ...postData,
                comments: postData?.comments?.map((comment) => comment?._id === commentId
                    ?
                    {
                        ...comment,
                        replies: [...comment?.replies, {
                            _id: uuidv4(),
                            content: reply,
                            user: editedData
                        }]
                    }
                    :
                    comment)
            })
            setAllPosts(
                allPosts?.map((post) => post?._id === postData?._id
                    ?
                    {
                        ...postData,
                        comments: postData?.comments?.map((comment) => comment?._id === commentId
                            ?
                            {
                                ...comment,
                                replies: [...comment?.replies, {
                                    _id: uuidv4(),
                                    content: reply,
                                    user: editedData
                                }]
                            }
                            :
                            comment)
                    }
                    :
                    post
                )
            )
            replyCommentRef.current.value = ''
            setReply('')
            setIsReplyCommentOpen(false)
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

    const editCommentHandler = (commentId) => {
        if (editedComment === (postData?.comments?.find((comment) => comment?._id === commentId))?.content) {
            setIsEditCommentOpen(false)
        } else {
            if (editedComment?.length > 0) {
                setPostData({
                    ...postData,
                    comments: postData?.comments?.map((comment) => comment?._id === commentId ? { ...comment, content: editedComment } : comment)
                })
                setEditedPostData({
                    ...postData,
                    comments: postData?.comments?.map((comment) => comment?._id === commentId ? { ...comment, content: editedComment } : comment)
                })
                addComment({
                    ...postData,
                    comments: postData?.comments?.map((comment) => comment?._id === commentId ? { ...comment, content: editedComment } : comment)
                })
                setAllPosts(
                    allPosts?.map((post) => post?._id === postData?._id
                        ?
                        {
                            ...postData,
                            comments: postData?.comments?.map((comment) => comment?._id === commentId ? { ...comment, content: editedComment } : comment)
                        }
                        :
                        post
                    )
                )
                setEditedComment('')
                setIsEditCommentOpen(false)
                toast.success(`Comment edited`, {
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
    }

    const deleteCommentHandler = (commentId) => {
        removeComment({
            ...postData,
            comments: postData?.comments?.filter((comment) => comment?._id !== commentId)
        })
        setPostData({
            ...postData,
            comments: postData?.comments?.filter((comment) => comment?._id !== commentId)
        })
        setEditedPostData({
            ...postData,
            comments: postData?.comments?.filter((comment) => comment?._id !== commentId)
        })
        setAllPosts(
            allPosts?.map((post) => post?._id === postData?._id
                ?
                {
                    ...postData,
                    comments: postData?.comments?.filter((comment) => comment?._id !== commentId)
                }
                :
                post
            )
        )
    }

    const isRemovable = (comment) => (
        postData?.postedBy?._id === profileId || comment?.user?._id === profileId
    )

    const handleEditComments = (commentID) => {
        if (isEditCommentOpen === commentID) {
            setIsEditCommentOpen('')
        } else {
            setIsEditCommentOpen(commentID)
            setTimeout(() => {
                editCommentRef.current.focus()
                setEditedComment(editCommentRef.current.value)
            }, 1)
        }
        setIsReplyCommentOpen('')
    }

    const handleReplyOnComment = (commentID) => {
        if (isReplyCommentOpen === commentID) {
            setIsReplyCommentOpen('')
        } else {
            setIsReplyCommentOpen(commentID)
            setTimeout(() => {
                replyCommentRef.current.focus()
            }, 1)
        }
        setIsEditCommentOpen('')
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

    const deleteClickHandler = () => {
        deletePost(postData?._id)
        setIsEditPostModalOpen(false)
        navigate('/')
    }

    const commentBtnClickHandler = () => {
        addCommentRef.current.focus()
    }

    const shareHandler = () => {
        copy(window.location.href)
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

    const dislikeClickHandler = () => {
        if (isDisLikeBtnDisabled) {
            dislikePost(postData?._id)
            setPostData({
                ...postData,
                likes: {
                    ...postData?.likes,
                    likeCount: (postData?.likes?.likeCount - 1),
                    likedBy: postData?.likes?.likedBy?.filter((user) => user?._id !== profileId)
                }
            })
        }
        setIsDisLikeBtnDisabled(false)
    }

    const likeClickHandler = () => {
        if (isLikeBtnDisabled) {
            likePost(postData?._id)
            setPostData({
                ...postData,
                likes: {
                    ...postData?.likes,
                    likeCount: (postData?.likes?.likeCount + 1),
                    likedBy: [...postData?.likes?.likedBy, editedData]
                }
            })
        }
        setIsLikeBtnDisabled(false)
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
                            <div className="left-section" title={`@${postData?.postedBy?.username}`} onClick={() => navigate(`/user/${postData?.postedBy?._id}`)}>
                                <div className="profile-pic-container">
                                    <img src={postData?.postedBy?.profile_pic} alt={`@${postData?.postedBy?.username}`} />
                                </div>
                                <div className="name-username-date">
                                    <p className="name">{`${postData?.postedBy?.firstName} ${postData?.postedBy?.lastName}`}</p>
                                    <p className="username">{`@${postData?.username}`}</p>
                                    <p className="date">{new Date(postData?.createdAt).toDateString()}</p>
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
                                                <p className="option-2" onClick={() => deleteClickHandler()}>Delete</p>
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
                                    <button className="dislike heart" onClick={() => dislikeClickHandler()}><AiFillHeart /></button>
                                    :
                                    <button className="like heart" onClick={() => likeClickHandler()}><AiOutlineHeart /></button>
                                }
                                <p className="likes-num">{postData?.likes?.likeCount}</p>
                            </div>
                            <button className="comment" onClick={() => commentBtnClickHandler()}><GoComment /></button>
                            {!bookMarks?.find((post) => post?._id === postData?._id)
                                ?
                                <button className="bookmark" onClick={() => addBookmark(postId)}><RiBookmarkLine /></button>
                                :
                                <button className="bookmark" onClick={() => removeBookmark(postId)}><RiBookmarkFill /></button>
                            }
                            <button className="share" onClick={() => shareHandler()}><FiShare2 /></button>
                        </div>
                        <div className="comment-section">
                            <div className="comment-input-div">
                                <label htmlFor="comment" className="comment-input">
                                    <input type="text" name="comment" placeholder="Enter Comment" onChange={(event) => setComment(event.target.value)} ref={addCommentRef} />
                                </label>
                                <button className="add-comment" onClick={() => addCommentHandler()}><AiOutlineSend /></button>
                            </div>
                            <div className="comments">
                                {postData?.comments?.map((comment) => (
                                    <div className="single-comment-div" key={comment?._id}>
                                        <div className="commented-by">
                                            <div className="left-section" onClick={() => navigate(`/user/${comment?.user?._id}`)}>
                                                <div className="profile-pic-container">
                                                    <img src={comment?.user?.profile_pic} alt="" />
                                                </div>
                                                <div className="name-username-date">
                                                    <p className="name">{`${comment?.user?.firstName} ${comment?.user?.lastName}`}</p>
                                                    <p className="username">{`@${comment?.user?.username}`}</p>
                                                    <p className="date">{new Date(comment?.createdAt).toDateString()}</p>
                                                </div>
                                            </div>
                                            <div className="right-section">
                                                <div className="comment-btn-container">
                                                    {isRemovable(comment) &&
                                                        <button className="delete" onClick={() => deleteCommentHandler(comment?._id)}><BsTrash /></button>
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
                                                    <input type="text" ref={editCommentRef} defaultValue={comment?.content} onChange={(event) => setEditedComment(event.target.value)} />
                                                </label>
                                                <button className="add-comment" onClick={() => editCommentHandler(comment?._id)}><AiOutlineSend /></button>
                                            </div>
                                            :
                                            <p className="content">{comment?.content}</p>
                                        }
                                        <button className="reply-btn" onClick={() => handleReplyOnComment(comment?._id)}>Reply</button>
                                        {comment?.replies?.map((reply) => (
                                            <div className="reply" key={reply?._id}>
                                                <div className="replied-by" onClick={() => navigate(`/user/${reply?.user?._id}`)}>
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
                                                        <input type="text" ref={replyCommentRef} onChange={(event) => setReply(event.target.value)} />
                                                    </label>
                                                    <button className="add-comment" onClick={() => addReplyHandler(comment?._id)}><AiOutlineSend /></button>
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