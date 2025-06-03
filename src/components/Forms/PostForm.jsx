import { useState } from "react";

export default function PostForm() {
    const [formType, setFormType] = useState("")

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        location: "",
        img: ""
    });

    function handleChange(e) {
        setFormType(e.target.value)
    }

    function handleInputChange(e){
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const offer = (formType === 'offer')

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            if (formType === 'offer') {
                if (!formData.title || !formData.description || !formData.location || !formData.img)
                    return alert(`Please fill out all fields`)
            } else if (!formData.title || !formData.description) {
                return alert(`Please fill out all fields`)
            }
        } catch (error) {

        }
    }




    return (
        <>
            <h1>Select the post you would like to create:</h1>
            <form>
                <div>
                    <input onChange={handleChange} type="radio" name="post" value="offer" />
                    <label>Offer</label>
                </div>
                <div>
                    <input onChange={handleChange} type="radio" name="post" value="request" />
                    <label>Request</label>
                </div>
            </form>

            {offer ? (
                <>
                    <h2>New Offer</h2>
                    <form onSubmit={handleSubmit}>
                        <input onChange={handleInputChange} type="text" name="title" placeholder="Title" />
                        <input onChange={handleInputChange} type="text" name="description" placeholder="Description" />
                        <input onChange={handleInputChange} type="text" name="location" placeholder="Location" />
                        <input onChange={handleInputChange} type="text" name="img" placeholder="Image" />
                        <input type="submit"/>
                    </form>
                </>
            ) : (
                <>
                    <h2>New Request</h2>
                    <form onSubmit={handleSubmit}>
                        <input onChange={handleInputChange} type="text" name="title" placeholder="Title" />
                        <input onChange={handleInputChange} type="text" name="description" placeholder="Description" />
                        <input type="submit"/>
                    </form>
                </>
            )}
        </>
    )
}