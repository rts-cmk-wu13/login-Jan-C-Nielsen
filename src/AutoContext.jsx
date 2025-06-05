
import { useState, createContext, useContext } from "react";

export const AuthContext = createContext()

export function useAuth () {
    return useContext(AuthContext)
} 
 
export default function AuthProvider( props) {

    console.log(props)
    
    const [token, setToken] = useState(sessionStorage.getItem("token"));

    function login (newToken) {
        setToken(newToken)
        sessionStorage.setItem("token", newToken)
    }

    function logout() {
        setToken(null)
        sessionStorage.removeItem("token")
    }

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {props.children}
        </AuthContext.Provider>
    )
}