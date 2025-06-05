import { useAuth } from '../AutoContext';
import { Link, useNavigate } from 'react-router';

export default function LogoutButton() {
    const { logout, token } = useAuth();
    const navigate = useNavigate();

    function handleLogout() {
        logout();
       // navigate('/login', { replace: true }); // Redirect to login page after logout
       navigate('/'); // Redirect to login page after logout
    }

    return token ? (
        <button onClick={handleLogout} className="logout-button">
            Logout
        </button>
    ) : <Link to="/login" className="login-link">Login</Link>;
}