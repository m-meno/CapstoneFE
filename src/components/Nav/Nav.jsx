import { Link } from "react-router-dom";
import { useEffect } from "react"
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { userInfo } from "../../context/user/userContext";
import { useAuth } from "../../context/auth/authContext";

export default function Nav() {
    const { user, setUser } = userInfo();
    const { cookies, logout } = useAuth();
    const nav = useNavigate();
    const {id} = useParams();

    //added useParams and added ${id} to the axios request url. New error now?

    useEffect(() => {
        async function checkUser() {
            if (cookies.token && !user) {
                try {
                    let res = await axios(`http://localhost:3000/api/user/${id}`, {
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
                            <button onClick={handleLogout}>Logout</button>
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