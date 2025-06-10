import axios from "axios";
import {useState, useEffect} from "react";
import PostForm from "../../components/Forms/PostForm";
import Card from "../../components/Card/Card";
import { usePostList } from "../../context/post/postContext";
import { useNavigate } from "react-router-dom";



export default function Homepage() {
    const [posts, setPosts] = useState([]);
    // const {postList, setPostList} = usePostList();
    const nav = useNavigate();


    async function getAllPosts() {
        try {
            //defines endpoint for all posts
            let url = `http://localhost:3000/api/post`;
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
    }, []);

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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
            {posts.map((post)=> (
                <div key = {post._id} className="bg-white rounded shadow p-4 w-full h-72" >
            <Card post={post}/>
            </div>
         ))}
        </div>    
        
        </>
    )


}



