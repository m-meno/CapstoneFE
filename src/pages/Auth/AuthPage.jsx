import LoginForm from "../../components/Forms/LoginForm";
import RegisterForm from "../../components/Forms/RegisterForm";
import {useState} from "react";
export default function AuthPage(){
    const [newUser, setNewUser] = useState(false)

    return(
        <>
        <LoginForm setNewUser={setNewUser}/>
        </>
    )
}