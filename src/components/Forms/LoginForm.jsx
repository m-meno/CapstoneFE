import { useState } from "react";
import { useAuth } from "../../context/auth/authContext";
import { useNavigate } from "react-router-dom";
import style from "./Form.module.css"

export default function LoginForm( {setNewUser}) {
    const { login } = useAuth();
    const nav = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await login(formData);
            nav("/")

        } catch (err) {
            console.error(err)
        }
    }




    return (
        <>
            <form onSubmit={handleSubmit}>
                <input onChange={handleChange} type="text" name="email" placeholder="Enter email..." />
                <input onChange={handleChange} type="text" name="password" placeholder="Enter password..." />
                <input type="submit" value="Login"/>
                <p>
                    Not a User?{" "}
                    <span className={style.toggle}
                    onClick={()=> {
                        setNewUser(true)
                    }}
                    >
                        Register
                    </span>
                </p>
            </form>
          
        </>
    )
}