import { Navigate, useLocation } from 'react-router';
import { useAuth } from '../AutoContext.jsx';

export default function ReqAuth({ children }) {

    const { token } = useAuth();
    const location = useLocation();

    console.log("ReqAuth", token, location);
    if (!token) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    return children;

}