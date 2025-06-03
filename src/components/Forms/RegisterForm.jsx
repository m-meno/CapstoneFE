import { useState } from "react";
import {useAuth} from "../../context/auth/authContext";
import { useNavigate } from "react-router-dom";



export default function RegisterForm() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        password2: ""
    });


    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let msg = "";

        if (!formData.username.trim()) {
            msg += `Please include Username \n`;
        }

        if (!formData.email || !emailRegex.test(formData.email)) {
            msg += `Please include a valid email \n`
        }

        if (!formData.password || !formData.password !== formData.password2) {
            msg += `Please ensure both passwords match`
        }

        try {
            await signup(formData);

            // nav("/dashboard")

        } catch (err) {
            alert("Registeration failed. Make sure you do not already have an account.")
            console.error(err)
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input onChange={handleChange} type="text" name="name" placeholder="Name..." />
                <input onChange={handleChange} type="text" name="email" placeholder="Email..." />
                <input onChange={handleChange} type="text" name="password" placeholder="Password..." />
                <input onChange={handleChange} type="text" name="password2" placeholder="Reenter your password..." />
            </form>

        </>
    )
}