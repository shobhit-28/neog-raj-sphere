import { useContext, useEffect, useRef, useState, } from "react"
import { useNavigate } from "react-router-dom";

import { UserDataContext } from "../../contexts/userDataContext"
import './peopleComponent.css'
import { SmallLoader } from "../smallLoader/smallLoader";

export const PeopleComponent = () => {
    const navigate = useNavigate()

    const userId = JSON.parse(localStorage.getItem('userData'))?._id;

    const { allUsersData,
        followingData,
        follow,
        followed,
        setFollowed,
        setIsMobileViewOpen,
        currUserData,
        setCurrUserData,
        userData,
        setUserData
    } = useContext(UserDataContext)

    const [profileData, setProfileData] = useState(false)
    const [searchResults, setSearchResults] = useState(false)
    const [isSearchResultOpen, setIsSearchResultOpen] = useState(false)

    const ref = useRef(null)
    const searchResRef = useRef(null)

    const peopleCompUserData = followingData ? followingData : profileData
    const filteredArr = allUsersData
        ?.filter((user) => user._id !== userId)
        ?.filter((allUsersUser) => !peopleCompUserData?.following?.find((user) => user?._id === allUsersUser?._id))
        ?.filter((allUsersUser) => !peopleCompUserData?.followers?.find((user) => user?._id === allUsersUser?._id))
        ?.filter((allUsersUser) => !followed?.find((user) => user?._id === allUsersUser?._id))

    const fetchData = async () => {
        try {
            const response = await fetch(`/api/users/${userId}`)
            const data = (await response.json())
            setProfileData(data?.user)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchData()
        const handleOutsideClick = (e) => {
            if (!searchResRef?.current?.contains(e?.target)) {
                setIsSearchResultOpen(false)
                if (ref?.current?.value?.length > 0) {
                    ref.current.value = '' 
                }
            }
        }
        document.addEventListener("mousedown", handleOutsideClick, true)
        document.addEventListener("scroll", () => setIsSearchResultOpen(false))
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick)
            document.removeEventListener("scroll", () => setSearchResults(false))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const followHandler = (user, event) => {
        follow(user)
        setFollowed([...followed, user])
        if (user?._id === userData?._id) {
            setUserData({
                ...userData,
                followers: [...userData?.followers, currUserData]
            })            
        }
        event.stopPropagation()
        if (currUserData) {
            setCurrUserData({
                ...currUserData,
                following: [...currUserData?.following, user]
            })
        }
    }

    const searchBarChangeHandler = (event) => {
        if (event?.target?.value?.length === 0) {
            setSearchResults([])
        } else {
            setIsSearchResultOpen(true)
            setSearchResults(
                [
                    ...allUsersData?.filter((user) => user?.firstName?.slice(0, event?.target?.value.length).toLowerCase() === event?.target?.value.toLowerCase()),
                    ...allUsersData?.filter((user) => user?.firstName?.slice(0, event?.target?.value.length).toLowerCase() !== event?.target?.value.toLowerCase())
                        ?.filter((user) => user?.firstName.concat(user?.lastName).toLowerCase()?.includes(event?.target?.value?.toLowerCase()))
                ]
            )
        }
    }

    const searchNavHandler = (id) => {
        setTimeout(() => {
            navigate(`/`)
        }, 0)
        setTimeout(() => {
            navigate(`/user/${id}`)
            setSearchResults([])
            setIsMobileViewOpen(false)
            ref.current.value = ''
        }, 1)
    }

    const navHandler = (id) => {
        setTimeout(() => {
            navigate(`/`)
        }, 0)
        setTimeout(() => {
            navigate(`/user/${id}`)
            setIsMobileViewOpen(false)
            ref.current.value = ''
        }, 1)
    }

    return (
        <div className="people-component">
            {!peopleCompUserData ? <SmallLoader /> :
                <>
                    <p className="head">Who to follow</p>
                    <input type="text" name="" id="" ref={ref} className="search-bar" onChange={(event) => searchBarChangeHandler(event)} placeholder="Search Users" />
                    {searchResults?.length > 0 &&
                        <div className="search-results-container" ref={searchResRef}>
                            {isSearchResultOpen && <div className="search-results">
                                {searchResults.map((user) => (
                                    <div className="user" title={user?.username} key={user?._id} onClick={() => searchNavHandler(user?._id)}>
                                        <div className="img-container">
                                            <img src={user?.profile_pic} alt="" />
                                        </div>
                                        <div className="username-name">
                                            <p className="name">{`${user?.firstName} ${user?.lastName}`}</p>
                                            <p className="username">{`@${user?.username}`}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>}
                        </div>
                    }
                    <div className="user-data">
                        {filteredArr?.length === 0
                            ?
                            <p className="no-one">There's no one here</p>
                            :
                            filteredArr?.map((user) => (
                                <div className="user" key={user?._id} onClick={() => navHandler(user._id)}>
                                    <div className="left-section">
                                        <div className="profile-pic-container">
                                            <img src={user?.profile_pic} alt="" />
                                        </div>
                                        <div className="name-username">
                                            <p className="name">{`${user?.firstName} ${user?.lastName}`}</p>
                                            <p className="username">{`@${user?.username}`}</p>
                                        </div>
                                    </div>
                                    <div className="right-section">
                                        <button className="follow" onClick={(event) => followHandler(user, event)}>Follow</button>
                                    </div>
                                </div>
                            ))}
                    </div>
                </>}
        </div>
    )
}