import { useContext, useEffect, useState, } from "react"
import { useNavigate } from "react-router-dom";

import { UserDataContext } from "../../contexts/userDataContext"
import './peopleComponent.css'
import { SmallLoader } from "../smallLoader/smallLoader";

export const PeopleComponent = () => {
    const navigate = useNavigate()

    const userId = JSON.parse(localStorage.getItem('userData'))?._id;

    const { allUsersData, followingData, follow, followed, setFollowed } = useContext(UserDataContext)

    const [currUserData, setCurrUserData] = useState(false)

    const userData = followingData ? followingData : currUserData
    const filteredArr = allUsersData
        ?.filter((user) => user._id !== userId)
        ?.filter((allUsersUser) => !userData?.following?.find((user) => user?._id === allUsersUser?._id))
        ?.filter((allUsersUser) => !userData?.followers?.find((user) => user?._id === allUsersUser?._id))
        ?.filter((allUsersUser) => !followed?.find((user) => user?._id === allUsersUser?._id))

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
        setFollowed([...followed, user])
        event.stopPropagation()
    }

    return (
        <div className="people-component">
            {!userData ? <SmallLoader /> :
                <>
                    <p className="head">Who to follow</p>
                    <div className="user-data">
                        {filteredArr?.length === 0
                            ?
                            <p className="no-one">There's no one here</p>
                            :
                            filteredArr?.map((user) => (
                                <div className="user" key={user?._id} onClick={() => navigate(`/user/${user._id}`)}>
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