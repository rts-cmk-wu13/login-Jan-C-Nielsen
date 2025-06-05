import { useEffect, useState } from "react"
import { Link } from "react-router"
import { useContext } from "react"
//import { AuthContext } from "../AutoContext.jsx"
import { useAuth } from "../AutoContext.jsx"
import { redirect } from "react-router"


export default function Users() {
    const token1 = sessionStorage.getItem("token") // Get the token from sessionStorage
    if (!token1) {
        // If no token is found, redirect to login
        redirect("/login")
    }

    const [usrs, setUsrs] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    // const auth = useContext(AutoContext)
    const auth = useAuth() // Use useContext to access the context
    const { token } = auth // Destructure the token from context
    console.log(auth) // Access the token from context

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then(response => response.json())
            .then(result => setUsrs(result))
            .finally(() => setIsLoading(false))
    }, [])

    if (isLoading) {
        return (<p>Loading...</p>)
    }

    return isLoading ? (<p>Loading...</p>) : (
        <ul>
            {usrs.map(user => (
                <li key={user.id}><Link to={`/users/${user.id}`}>{user.name}</Link></li>
            ))}½
        </ul>

    )
}