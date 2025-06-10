import {Link} from "react-router-dom";

export default function Card({post}){
    let endpoint = `/api/post/${post._id}`

    return(
        <div>
            <img src={`http://localhost:3000/uploads/${post.img}`} alt={post.title} style={{maxWidth: "60%"}}/>
            <h2><Link to={endpoint}>{post.title}</Link></h2>
            <h4>{post.location}</h4>
        </div>
    )
}