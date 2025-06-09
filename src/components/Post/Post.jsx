import UserProvider, { userInfo } from "../../context/user/userContext";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth/authContext";


export default function Post({ post }) {
    const id  = post._id;
    const nav = useNavigate();
    const { user } = userInfo();
    const [edit, setEdit] = useState(false);
    const {cookies} = useAuth();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        location: "",
        img: ""
    })

    const editing = (user && post.user === user._id)

    function handleEditClick() {
        setEdit(!edit)
    }

    function handleInputChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const url = `http://localhost:3000/api/post/${id}`
            const res = await axios.put(url, formData, {
                headers: {
                   token:  `${cookies.token}`     
                } 
        });
         alert(`Post updated`)  
         nav(`/api/post/${id}`)

        } catch (err) {
            console.error(err)
        }
    }




    return (
        <>
            <div>
                <img src={post.url} />
                <h3>{post.title}</h3>
                <h4>{post.location}</h4>
                <p>{post.description}</p>
            </div>
            {editing ? (
                <div>
                    <button onClick={handleEditClick}>Edit</button>

                    {edit ? (
                        <form onSubmit={handleSubmit}>
                            <input onChange={handleInputChange} type="text" name="title" placeholder="Title" />
                            <input onChange={handleInputChange} type="text" name="description" placeholder="Description" />
                            <input onChange={handleInputChange} type="text" name="location" placeholder="Location" />
                            <input onChange={handleInputChange} type="text" name="img" placeholder="Image" />
                            <input type="submit" />
                        </form>
                    ) : (
                        null
                    )}

                    <button>Delete</button>
                </div>) : (
                null
            )}
        </>
    )
}