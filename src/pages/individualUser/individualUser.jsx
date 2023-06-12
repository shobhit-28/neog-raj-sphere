import { useParams } from "react-router-dom"

// import './homepage.css'

export const IndividualUser = () => {
    const {userID} = useParams()

    return (
        <div className="individual-user-page page">
            <p className="heading">
                User {userID}
            </p>
        </div>
    )
}