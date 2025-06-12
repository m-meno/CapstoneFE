import Post from "../../components/Post/Post";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";


export default function ShowOnePage() {
    const { id } = useParams()
    const [post, setPost] = useState({
        type: "",
        title: "",
        description: "",
        img: "",
        location: ""
    });

    async function getOnePost() {
        try {
            let url = `http://localhost:3000/api/post/${id}`
            const res = await axios(url);
            let data = res.data;
            console.log(data)
            setPost(data)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        getOnePost()
    }, []);

    return (
        <>
            <div >
                <Post key={post._id} post={post} />
            </div>
        </>
    )
}