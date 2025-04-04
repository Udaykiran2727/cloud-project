// src/components/AdminRoute.tsx  

import React from 'react';  
import { Route, Navigate } from 'react-router-dom';  
import { useSelector } from 'react-redux';  

interface AdminRouteProps {  
  children: React.ReactNode;  
}  

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {  
  const role = useSelector((state: any) => state.user.role); // Adjust according to your state structure  

  return (  
    <Route  
      render={({ location }) =>  
        role === 'admin' ? ( // Check if the user is an admin  
          children  
        ) : (  
          <Navigate to="/" state={{ from: location }} /> // Redirect non-admins  
        )  
      }  
    />  
  );  
};  

export default AdminRoute;  