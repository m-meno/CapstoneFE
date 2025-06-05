import axios from "axios";
import {useState, useEffect} from "react";
import PostForm from "../../components/Forms/PostForm";
import Card from "../../components/Card/Card";



export default function Homepage() {
    const [posts, setPosts] = useState([])

    async function getAllPosts() {
        try {
            //defines endpoint for all posts
            let url = `http://localhost:3000/api/posts`;
            const res = await axios(url);
            let data = res.data;
            // updates offers state with fetched data
            setPosts(data)
            console.log(data)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(()=>{
        getAllPosts();
    }, [])

    return (
        <>
        <div>
            {posts.map((post) => {return <Card post={post}/>})}
        </div>    
        
        </>
    )


}



