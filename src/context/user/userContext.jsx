import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

const UserContext = createContext();

export default function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [cookies] = useCookies(["token"])

    async function getUser(){
        try{
            if (!cookies.token) return;
            const url = `http://localhost:3000/api/user`;
            let res = await axios(url, {
                headers: {
                    token: `${cookies.token}`
                }
            });
            let data = res.data;
            setUser(data)

        } catch (err){
            console.error(err)
        }
    }

    useEffect(()=>{
        getUser()
    }, [])

    const value = {
        user,
        setUser
    }




    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export function userInfo() {
    return useContext(UserContext);
}