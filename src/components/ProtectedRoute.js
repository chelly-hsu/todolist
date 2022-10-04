import { useAuth } from "./Context";
import { Navigate, Outlet } from 'react-router-dom';
import Todolist from './../pages/todolist';

export const ProtectedRoute = ({ children }) => {
    const { token } = useAuth();
    console.log('ProtectedRoute', token)

    if (!token) {
        return <Navigate to="/login" replace />;
    }
    return <Todolist />
};