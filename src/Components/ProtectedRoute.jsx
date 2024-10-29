import { useAuth } from '../authContext';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    const { isAuthenticated } = useAuth();

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
