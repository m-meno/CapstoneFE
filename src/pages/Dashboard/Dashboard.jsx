import PostForm from "../../components/Forms/PostForm";
import { userInfo } from "../../context/user/userContext"
import Card from "../../components/Card/Card";
import { useState, useEffect } from "react";
import axios from "axios";
import style from "./Dashboard.module.css"

export default function Dashboard() {
    const { user } = userInfo({});
    console.log({ user })

    const [userPosts, setUserPosts] = useState([]);
    const [createPost, setCreatePost] = useState(false);

    async function getUserPosts() {
        try {
            let url = `http://localhost:3000/api/post?user=${user._id}`;
            const res = await axios(url);
            let data = res.data;
            setUserPosts(data)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        if (user?._id) {
            getUserPosts();
        }

    }, [user])

    function handleClick(){
        setCreatePost(!createPost)
    }

    return (
        <>  
            <div className={style.dashboard}>
            <h1>Dashboard</h1>
            <button className={style.button}onClick={handleClick}>Create a Post</button>
            {createPost ? (
            <div className={style.section}>
                <PostForm />
            </div>
            ) : ( null 

            )}
            <div className={style.section}>
                <h2>My Posts</h2>
                <div className={style.cardGrid}>
                {userPosts.map((post) => { return <Card key={post._id} post={post} /> })}
                </div>
            </div>

            { user ? (
            <div className={style.section}>
                <h2>User information: </h2>
                <h4>Username: {user.username} </h4>
                <h4>Email: {user.email} </h4>
                <h4>Location: {user.location}</h4>
            </div> ) : (
                null
            )
        }
        </div>
        </>
    )
}