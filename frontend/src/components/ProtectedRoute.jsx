import React from 'react'
import useAuthStore from '../store/useAuthStore'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({allowedRoles, children}) => {
    const {user, isAuthenticated, isLoading} = useAuthStore();
    
    if(isLoading){
        return <div>Loading...</div>
    }
    
    if(!isAuthenticated){
        return <Navigate to="/login" replace />
    }
    
    if(allowedRoles && !allowedRoles.includes(user.role)){
        return <Navigate to="/unauthorized" replace />
    }
    
    return children;
}

export default ProtectedRoute