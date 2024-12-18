import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    const token = sessionStorage.getItem('token');

    if (!token) {
        return (
            <Navigate to={'/login'} replace />
        )
    }
    
    return <Outlet /> //Displaying child elements: Page Content
};
export default ProtectedRoute;