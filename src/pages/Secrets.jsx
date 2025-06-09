import { useAuth } from '../AutoContext.jsx';
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from 'react-router';
import { Link } from "react-router"

export default function Secrets() {

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
    console.log("Token:" + token) // Access the token from context

    useEffect(() => {
        fetch("http://localhost:4000/secrets", {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token // Include the token in the request headers
            }
           
        })
            .then(response => response.json())
            .then(result => {setUsrs(result)

                console.log("Fetched secrets:", result);
            })
            .finally(() => setIsLoading(false))
    }, [])

    if (isLoading) {
        return (<p>Loading...</p>)
    }

console.log("Users:"+usrs)
    return isLoading ? (<p>Loading...</p>) : (
        <>
        {usrs.map(user => (
            <Link to={`/secrets/${user.id}`} key={user.id}>
            <li>{user.quote}</li>
            </Link>
        ))}    
        </>
    )
}
 


