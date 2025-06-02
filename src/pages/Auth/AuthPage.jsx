import LoginForm from "../../components/Forms/LoginForm";
import {useState} from "react";
export default function AuthPage(){
    const [newUser, setNewUser] = useState(false)

    return(
        <>
        <LoginForm setNewUser={setNewUser}/>
        </>
    )
}