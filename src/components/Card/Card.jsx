import {Link} from "react-router-dom";
import styles from "./Card.module.css";

export default function Card({post}){
    let endpoint = `/api/post/${post._id}`;
    const type = post.type === "Request" ? styles.request : styles.offer;
    

    return(
        <div className={`${styles.card} ${type}`}>
            <div className={styles.imageWrapper}>
                <img src={`http://localhost:3000/uploads/${post.img}`} alt={post.title}/>
            </div>
            <h2><Link to={endpoint}>{post.title}</Link></h2>
            <h3>{post.description}</h3>
            <h4>{post.location}</h4>
        </div>
    )
}