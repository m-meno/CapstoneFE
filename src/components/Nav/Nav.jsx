import { Link } from "react-router-dom";
import {useEffect} from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { userInfo } from "../../context/user/userContext";

export default function Nav(){
    const {user, setUser} = userInfo();
    const {cookies, logout} = useAuth();
    const nav = useNavigate();

    useEffect(()=>{
        async function checkUser(){
            if (cookies.token && !user) {
                try{
                    let res = await axios(`http://localhost:3000/api/user`, {
                        headers: {token: cookies.token},
                    });

                    const {username, email} = res.data;
                    setUser({username, email})
                } catch(err){
                    console.error(err.message)
                }
            }
        }
        checkUser();
    }, []);

    function handleLogout(){
        logout();

        nav("/");
    }

    return(
        <nav>
            <ul>
                <li>
                    
                </li>
            </ul>
        </nav>
    )
}