import AuthProvider from "./auth/authContext";
import UserProvider from "./user/userContext";
import PostListProvider from "./post/postContext";

export default function AppProvider({children}){
    return(
        <UserProvider>
            <AuthProvider>
                <PostListProvider>{children}</PostListProvider>
            </AuthProvider>    
        </UserProvider>
    )
}