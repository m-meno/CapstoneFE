import PostForm from "../../components/Forms/PostForm";
import {userInfo} from "../../context/user/userContext"
import Card from "../../components/Card/Card"

export default function Dashboard(){
    // const {user} = userInfo();
    // console.log({user})
    return (
        <>
        <h1>Dashboard</h1>
        <PostForm/>
        {/* <Card/> */}
        <h2>User information:</h2>
        <h4>Username:</h4>
        </>
    )
}