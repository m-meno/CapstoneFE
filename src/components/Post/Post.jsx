import UserProvider, { userInfo } from "../../context/user/userContext";
import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/auth/authContext";


export default function Post({ post }) {
    const id  = post._id;
    const nav = useNavigate();
    const { user } = userInfo();
    const [edit, setEdit] = useState(false);
    const [file, setFile] = useState(null);
    const {cookies} = useAuth();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        location: ""
    })

    const editing = (user && post.user === user._id)

    function handleEditClick() {
        if (!edit) {
            setFormData({
                title: post.title || "",
                description: post.description || "",
                location: post.location || "",
                img: post.img || ""
            })
        }
        
        setEdit(!edit)
    }

    function handleInputChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

   function handleUploadChange(e) {
        if (e.target.files) {
            setFile(e.target.files[0])
        }
    }

    async function handleDelete(e){
        try {
        let deletedPost = await axios.delete(`http://localhost:3000/api/post/${id}`, {
            headers: {
                   token:  cookies.token
                } 
        });
        alert(`Post deleted`)
        nav('/dashboard')
        } catch (err) {
            console.error(err)
        }
    };

    async function handleSubmit(e) {
        e.preventDefault();
        try {

            const data = new FormData();
            if (file) {
                console.log("Uploading file...")
                data.append("img", file)

            }
            if (formData.location) {
                data.append("location", formData.location)
            }

            data.append("title", formData.title)
            data.append("description", formData.description)


            const url = `http://localhost:3000/api/post/${id}`
            const res = await axios.put(url, data, {
                headers: {
                   token:  cookies.token
                } 
        });
         alert(`Post updated`)  
         nav(`/dashboard`)

        } catch (err) {
            console.error(err)
        }
    }

    return (
        <>
            <div>
                <img src={`http://localhost:3000/uploads/${post.img}`} alt={post.title} style={{maxWidth: "60%"}}/>
                <h3>{post.title}</h3>
                <h4>{post.location}</h4>
                <p>{post.description}</p>
            </div>
            {editing ? (
                <div>
                    <button onClick={handleEditClick}>Edit</button>

                    {edit ? (
                    
                        <form onSubmit={handleSubmit}>
                            <input onChange={handleInputChange} type="text" name="title" placeholder="Title" value={post.title} />
                            <input onChange={handleInputChange} type="text" name="description" placeholder="Description" value={post.description}/>
                            <input onChange={handleInputChange} type="text" name="location" placeholder="Location" value={post.location} />
                            <input onChange={handleUploadChange} type="file" name="img" placeholder="Image" />
                            <input type="submit" value="Save Changes"/>
                        </form>
                        
                    ) : (
                        null
                    )}

                    <button onClick={handleDelete}>Delete</button>
                </div>) : (
                null
            )}
        </>
    )
}