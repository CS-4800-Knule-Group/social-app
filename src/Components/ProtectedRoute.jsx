import { useAuth } from '../authContext';
import { Outlet } from 'react-router-dom';
import Login from '../Pages/Login';

const ProtectedRoute = () => {
    const { isAuthenticated } = useAuth();

    return isAuthenticated ? <Outlet /> : <Login />;
};

export default ProtectedRoute;
