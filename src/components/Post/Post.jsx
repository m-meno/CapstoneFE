import UserProvider, { userInfo } from "../../context/user/userContext";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth/authContext";
import styles from "./Post.module.css"


export default function Post({ post }) {
    const id = post._id;
    const nav = useNavigate();
    const { user } = userInfo();
    const [edit, setEdit] = useState(false);
    const [file, setFile] = useState(null);
    const { cookies } = useAuth();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        location: "",
        img: ""
    })

    const canEdit = (user && post.user === user._id);


    function handleEditClick() {
        setFormData({
            title: post.title || "",
            description: post.description || "",
            location: post.location || "",
            img: post.img || ""
        })


        setEdit((prev) => !prev)
    }

    function handleInputChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    function handleUploadChange(e) {
        if (e.target.files) {
            setFile(e.target.files[0])
        }
    }

    async function handleDelete(e) {
        try {
            const response = confirm(`Are you sure you want to delete this post?`)
            if (response) {
                let deletedPost = await axios.delete(`http://localhost:3000/api/post/${id}`, {
                    headers: {
                        token: cookies.token
                    }

                });
            } else {
                return;
            }
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
                    token: cookies.token
                }
            });
            alert(`Post updated`)
            nav(`/dashboard`)

        } catch (err) {
            console.error(err)
        }
    }

    const image = post.img && post.img.trim() !== "";


    return (
        <>
            <div className={`${styles.postContainer} ${post.type === "Request" ? styles.request : styles.offer}`}>
                {image ? (<div className={styles.imageWrapper}> <img className={styles.image} src={`http://localhost:3000/uploads/${post.img}`} alt={post.title} /></div>) : (null)}
                <div className={styles.content}>
                    <h3 className={styles.title}>{post.title}</h3>
                    <h4 className={styles.location}>{post.location}</h4>
                    <p className={styles.description}>{post.description}</p>

                    {canEdit ? (
                        <div className={styles.buttonGroup}>

                            {edit ? (
                                //encType (encoding type) - specifies how form data should be formatted when being sent to the server (necessary because of the file upload)
                                <form onSubmit={handleSubmit} encType="multipart/form-data">
                                    <label htmlFor="title">Title:*</label>
                                    <input id="title" onChange={handleInputChange} type="text" name="title" placeholder="Title" value={formData.title} /><br />
                                    <label htmlFor="description">Description:*</label>
                                    <input id="description" onChange={handleInputChange} type="text" name="description" placeholder="Description" value={formData.description} /><br />
                                    <label htmlFor="location">Location:</label>
                                    <input id="location" onChange={handleInputChange} type="text" name="location" placeholder="Location" value={formData.location} /><br />
                                    <label htmlFor="img">Upload image:</label>
                                    <input id="img" onChange={handleUploadChange} type="file" name="img" placeholder="Image" /><br />
                                    <input className={styles.submit} type="submit" />
                                    <p>Asterisks indicate required fields.</p>
                                </form>

                            ) : (
                                null
                            )}

                            <button onClick={handleEditClick}>Edit</button>
                            <button onClick={handleDelete}>Delete</button>

                        </div>) : (
                        null
                    )}
                </div>
            </div>
        </>
    )
}