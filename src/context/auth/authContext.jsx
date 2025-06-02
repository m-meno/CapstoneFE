import {createContext, useContext, useMemo} from "react";
import {userInfo} from "../user/userContext";
import {useCookies} from "react-cookie";
import axios from "axios";

//create context with no value
const AuthContext = createContext();

//create function component to provide context
export default function AuthProvider({children}) {
    const {setUser} = userInfo();
    const [cookies, setCookie, removeCookie] = useCookies();

    const baseURL= `http://localhost:3000/api/user`;

    async function login(formData){
        const res = await axios.post(`${baseURL}/login`, formData);
        setCookie("token", res.data.token)
    }

    function logout(){
        ["token"].forEach((cookie)=>{
            removeCookie(cookie);
        });

        setUser(null)
    };

    const value = useMemo(
        () => ({
            cookies,
            signup,
            login,
            logout
        }),
        [cookies]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(){
    return useContext(AuthContext);
}
