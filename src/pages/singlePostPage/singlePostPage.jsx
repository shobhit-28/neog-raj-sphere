import { useParams } from "react-router-dom"

export const SinglePostPage = () => {
    const {post_id} = useParams();

    return (
        <div className="single-post-page page">
            <p className="heading">
                post - {post_id}
            </p>
        </div>
    )
}