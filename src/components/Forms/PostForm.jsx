import { useState } from "react";
import { useAuth } from "../../context/auth/authContext";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";


export default function PostForm() {
    const [formType, setFormType] = useState(null);
    const { cookies } = useAuth();
    const [file, setFile] = useState(null)
    const nav = useNavigate();
    const { id } = useParams();

    const [formData, setFormData] = useState({
        type: "",
        title: "",
        description: "",
        location: "",
    });

    function handleChange(e) {
        setFormType(e.target.value)
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    function handleInputChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    function handleUploadChange(e) {
        if (e.target.files) {
            setFile(e.target.files[0])
        }
    }

    const selection = formType === `Offer` || formType === `Request`;
    const offer = (formType === 'Offer')

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            if (formType === 'Offer') {
                if (!formData.title || !formData.description || !formData.location)
                    return alert(`Please fill out all fields`)
            } else if (!formData.title || !formData.description) {
                return alert(`The title and description fields are required`)
            }
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
            data.append("type", formType)

            console.log(data)
            const res = await axios.post(`http://localhost:3000/api/post`, data, {
                headers: { token: cookies.token }
            })
            alert(`Post created.`)
            nav('/dashboard')

        } catch (err) {
            console.error(err)
        }
    }




    return (
        <>
            <h3>Select the post you would like to create:</h3>
            <form>
                <div>
                    <input id="offer" onChange={handleChange} type="radio" name="type" value="Offer" />
                    <label htmlFor="offer">Offer</label>
                </div>
                <div>
                    <input id="request" onChange={handleChange} type="radio" name="type" value="Request" />
                    <label htmlFor="request">Request</label>
                </div>
            </form>
            {selection ? (
                offer ? (
                    <>
                        <h2>New Offer</h2>
                        <form onSubmit={handleSubmit} encType="multipart/form-data">
                            <label htmlFor="title">Title:*</label>
                            <input id="title" onChange={handleInputChange} type="text" name="title" placeholder="Title*" /><br/>
                            <label htmlFor="description">Description:*</label>
                                <input id="description" onChange={handleInputChange} type="text" name="description" placeholder="Description*" /><br/>
                            <label htmlFor="location">Location:*</label>
                                <input id="location" onChange={handleInputChange} type="text" name="location" placeholder="Location*" /><br/>
                            <label htmlFor="img">Upload image:*</label>
                            <input id="img" onChange={handleUploadChange} type="file" name="img" placeholder="Image" /><br/>
                            <input type="submit" />
                        </form>
                        <p>Asterisks indicate required fields.</p>
                    </>
                ) : (
                    <>
                        <h2>New Request</h2>
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="title">Title:*</label>
                                <input id="title" onChange={handleInputChange} type="text" name="title" placeholder="Title*" /><br/>
                            <label htmlFor="description">Description:*</label>
                                <input id="description" onChange={handleInputChange} type="text" name="description" placeholder="Description*" /><br/>
                            <label htmlFor="img">Upload image:</label>
                                <input id="img" onChange={handleUploadChange} type="file" name="img" /><br/>
                            <input type="submit" />
                        </form>
                        <p>Asterisks indicate required fields.</p>
                    </>
                )
            ) : (

                <p>Please make a selection.</p>

            )}

        </>
    )
}