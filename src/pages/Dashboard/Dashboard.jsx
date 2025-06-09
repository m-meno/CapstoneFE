import PostForm from "../../components/Forms/PostForm";
import { userInfo } from "../../context/user/userContext"
import Card from "../../components/Card/Card";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Dashboard() {
    const { user } = userInfo();
    console.log({ user })

    const [userPosts, setUserPosts] = useState([]);

    async function getUserPosts() {
        try {
            let url = `http://localhost:3000/api/post?user=${user._id}`;
            const res = await axios(url);
            let data = res.data;
            // let userPost = data.filter((post) => post.user == user._id)
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

    return (
        <>
            <h1>Dashboard</h1>
            <PostForm />
            <div>
                {userPosts.map((post) => { return <Card key={post._id} post={post} /> })}
            </div>
            <h2>User information:</h2>
            <h4>Username: </h4>
        </>
    )
}