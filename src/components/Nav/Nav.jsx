import { Link } from "react-router-dom";
import { useEffect } from "react"
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { userInfo } from "../../context/user/userContext";
import { useAuth } from "../../context/auth/authContext";
import styles from "./Nav.module.css";
import logo from "../../images/logo.jpeg"

export default function Nav() {
    const { user, setUser } = userInfo();
    const { cookies, logout } = useAuth();
    const nav = useNavigate();
    
    useEffect(() => {
        async function checkUser() {
            if (cookies.token && !user) {
                try {
                    let res = await axios(`http://localhost:3000/api/user`, {
                        headers: { token: cookies.token },
                    });

                    const { username, email } = res.data;
                    setUser({ username, email })
                } catch (err) {
                    console.error(err.message)
                }
            }
        }
        checkUser();
    }, []);

    function handleLogout() {
        logout();

        nav("/");
    }

    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                {cookies.token ? (
                    <>
                        <li>
                            <Link to="/dashboard">Dashboard</Link>
                        </li>
                        <li>
                            <button className={styles.logoutButton} onClick={handleLogout}>Logout</button>
                        </li>
                    </>
                ) : (
                    <li>
                        <Link to="/auth">Login</Link>
                    </li>
                )}
            </ul>
        </nav>

    )
}