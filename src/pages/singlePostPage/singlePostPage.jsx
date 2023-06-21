import { useNavigate, useParams } from "react-router-dom"
import { useState, useEffect, useRef, useContext } from "react";
import dayjs from "dayjs";

import './singlePostPage.css'

import { MdArrowBackIosNew } from 'react-icons/md'
import { AiFillHeart, AiOutlineClose, AiOutlineHeart, AiOutlineSend } from "react-icons/ai";
import { CiMenuKebab } from "react-icons/ci";
import { BsFillBookmarkCheckFill, BsFillBookmarkPlusFill } from "react-icons/bs";
import { GoComment } from "react-icons/go";

import { formatDate } from "../../backend/utils/authUtils";
import { PostContext } from "../../contexts/PostContext";

export const SinglePostPage = () => {
    const { postId } = useParams();
    const profileId = JSON.parse(localStorage.getItem('userData'))?._id;

    const { addComment } = useContext(PostContext)

    const [postData, setPostData] = useState(undefined)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [comment, setComment] = useState('')

    const menuRef = useRef(null)
    const addCommentRef = useRef(null)

    const navigate = useNavigate()

    const fetchPostData = async () => {
        try {
            const response = await fetch(`/api/posts/${postId}`)
            const responseData = (await response.json())?.post
            setPostData(responseData)
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
        }
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
                                        <p className="option-1"
                                        // onClick={() => setIsEditPostModalOpen(true)}
                                        >Edit</p>
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
                                    <div className="profile-pic-container">
                                        <img src={comment?.user?.profile_pic} alt="" />
                                    </div>
                                    <div className="name-username-date">
                                        <p className="name">{`${comment?.user?.firstName} ${comment?.user?.lastName}`}</p>
                                        <p className="username">{`@${comment?.user?.username}`}</p>
                                        <p className="date">{String((dayjs.call(comment?.createdAt))?.$d).slice(0, 16)}</p>
                                    </div>
                                </div>
                                <p className="content">{comment?.content}</p>
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
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}