import { Form } from 'react-router';
import { useAuth } from '../AutoContext.jsx';
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from 'react-router';
import { Link } from "react-router"

export default function Statements() {

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
        fetch("http://localhost:4000/statements")
            .then(response => response.json())
            .then(result => setUsrs(result))
            .finally(() => setIsLoading(false))
    }, [])

    if (isLoading) {
        return (<p>Loading...</p>)
    }
console.log(usrs)
    return isLoading ? (<p>Loading...</p>) : (
        <ul>
            {usrs.map(user => (
                 <li key={user.id}>{user.sentence}</li>
            ))}½
        </ul>

    )
}
 


