import { useState } from "react";
import { useAuth } from "../../context/auth/authContext";
import { useNavigate } from "react-router-dom";
import style from "./Form.module.css"



export default function RegisterForm({ setNewUser }) {
    const { signup } = useAuth();
    const nav = useNavigate();

    const [error, setError] = useState(null)

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        password2: "",
        location: ""
    });


    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const errors = []

        if (!formData.username.trim()) {
            errors.push(`Please include Username`);
        }

        if (!formData.email || !emailRegex.test(formData.email)) {
            errors.push(`Please include a valid email`)
        }

        if (!formData.password || formData.password !== formData.password2) {
            errors.push(`Please ensure both passwords match`)
        }

        if (!formData.location) {
            errors.push(`Please include your location`)
        }

        console.log(errors)
        if (errors.length) {
            let alert = errors.map((err) => {
                return err
            })

            setError(alert);
            setTimeout(() => {
                setError(null)
            }, 2000);
            return;
        }

        try {
            await signup(formData);

            nav("/dashboard")

        } catch (err) {
            alert("Registeration failed. Make sure you do not already have an account.")
            console.error(err.response.data.msg);
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input onChange={handleChange} type="text" name="username" placeholder="Name" />
                <input onChange={handleChange} type="text" name="email" placeholder="Email" />
                <input onChange={handleChange} type="text" name="password" placeholder="Password" />
                <input onChange={handleChange} type="text" name="password2" placeholder="Confirm password" />
                <input onChange={handleChange} type="text" name="location" placeholder="City, State" />
                <input type="submit" value="Register" />
                <p>Already have an account?{" "}
                    <span className={style.toggle}
                        onClick={() => {
                            setNewUser(false);
                        }}>
                        Login
                    </span>
                </p>
            </form>

        </>
    )
}