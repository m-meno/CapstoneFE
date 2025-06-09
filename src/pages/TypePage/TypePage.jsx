import {useParams, useNavigate} from "react-router-dom";
import Card from "../../components/Card/Card";
import {useEffect, useState} from "react";
import axios from "axios"

export default function TypePage(){
    const {type} = useParams();
    const nav = useNavigate();
    
    const [posts, setPosts] = useState(null);

    async function getTypePosts(){
        try {
            const url = `http://localhost:3000/api/post`
            let res = await axios(url);
            let posts = res.data.filter((post)=> post.type === type)
            setPosts(posts)
        } catch (err) {
            console.error(err)
        }
    }
    
useEffect(()=>{
    getTypePosts();
}, [type])

function displayPosts(){
    return posts.map((post)=> {
        return <Card key={post._id} post={post}/>
    })
}

function handleFilter(e){
        if(e.target.value) nav(`/type/${e.target.value}`);
        else nav("/")
    }
   return (
   <>
   <li>
            <label>
                <strong>Filter By:</strong>
                <select onChange={handleFilter}>
                    <option value="">...</option>
                    <option value="Offer">Offers</option>
                    <option value="Request">Requests</option>
                </select>
            </label>
        </li>

   {posts ? displayPosts() : <h3>Loading...</h3>}
    </>
   )
}