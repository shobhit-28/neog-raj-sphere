import { useContext, useEffect, useState, } from "react"
import { useNavigate } from "react-router-dom";

import { UserDataContext } from "../../contexts/userDataContext"
import { Loader } from "../loader/loader";
import './peopleComponent.css'

export const PeopleComponent = () => {
    const navigate = useNavigate()

    const userId = JSON.parse(localStorage.getItem('userData'))?._id;

    const { allUsersData, followingData, follow, followedIds, setFollowedIds } = useContext(UserDataContext)

    const [currUserData, setCurrUserData] = useState(false)

    const userData = followingData ? followingData : currUserData
    const filteredArr = allUsersData
        ?.filter((user) => user._id !== userId)
        ?.filter((allUsersUser) => !userData?.following?.find((user) => user?._id === allUsersUser?._id))
        ?.filter((allUsersUser) => !userData?.followers?.find((user) => user?._id === allUsersUser?._id))
        ?.filter((allUsersUser) => !followedIds?.find((id) => id === allUsersUser?._id))

    const fetchData = async () => {
        try {
            const response = await fetch(`/api/users/${userId}`)
            const data = (await response.json())
            setCurrUserData(data?.user)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const followHandler = (user, event) => {
        follow(user)
        setFollowedIds([...followedIds, user?._id])
        event.stopPropagation()
    }

    return (
        <div className="people-component">
            {!userData ? <Loader /> :
                <>
                    <p className="head">Who to follow</p>
                    <div className="user-data">
                        {filteredArr?.map((user) => (
                            <div className="user" key={user?._id} onClick={() => navigate(`/user/${user._id}`)}>
                                <div className="profile-pic-container">
                                    <img src={user?.profile_pic} alt="" />
                                </div>
                                <div className="name-username">
                                    <p className="name">{`${user?.firstName} ${user?.lastName}`}</p>
                                    <p className="username">{`@${user?.username}`}</p>
                                </div>
                                <button className="follow" onClick={(event) => followHandler(user, event)}>Follow</button>
                            </div>
                        ))}
                    </div>
                </>}
        </div>
    )
}