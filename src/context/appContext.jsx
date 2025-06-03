import AuthProvider from "./auth/authContext";
import UserProvider from "./user/userContext";

export default function AppProvider({children}){
    return(
        <UserProvider>
            <AuthProvider>{children}</AuthProvider>
        </UserProvider>
    )
}