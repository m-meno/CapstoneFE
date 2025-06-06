import {Link} from "react-router-dom";

export default function Card({post}){
    let endpoint = `/api/post/${post._id}`

    return(
        <div>
            <img src={post.url}/>
            <h2><Link to={endpoint}>{post.title}</Link></h2>
            <h4>{post.location}</h4>
        </div>
    )
}