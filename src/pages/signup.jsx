import { Form } from 'react-router';
import { useAuth } from '../AutoContext.jsx';
import { useLocation, useNavigate } from 'react-router';
import { useState } from 'react';


export default function Signup() {

    const [error, setError] = useState(null);
    const { login } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/';
 
    async function handleLogin(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());
        console.log(data);
        const response = await fetch('http://localhost:4000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        const result = await response.json();
        console.log(result);
        if (!response.ok) {
            // Handle error, e.g., show a message to the user
            //throw new Error('Login failed');
            setError(result.message || 'Login failed');
            console.error('Login failed:', result);
            return;
        }
        login(result.accessToken);
        navigate(from, { replace: true }); // Redirect to the previous page or home

    }

    return (
        <div className="login-container">
            <h1>Signup</h1>
            <Form onSubmit={handleLogin}>
            <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="text" id="email" name="email" required />
                </div>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" name="username" required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" required />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmpassword">Confirm Password:</label>
                    <input type="password" id="confirmpassword" name="confirmpassword" required />
                </div>
                {error && <div className="error-message">{error}</div>}
                <button type="submit">Sign up</button>
            </Form>
        </div>
    )
}
