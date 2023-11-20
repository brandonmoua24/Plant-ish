import React, { useEffect } from "react";
import { useAuth } from '../LogIn/AuthProvider';
import './UserHomePage.css';

const UserHomePage = () => {
    const { auth } = useAuth();
    const isLoggedIn = auth && auth.accessToken;

 
    useEffect(() => {
        document.body.className = isLoggedIn ? 'logged-in' : 'logged-out';
    
        return () => {
          document.body.className = '';
        };
      }, [isLoggedIn]);

    return (
        <div>
            WELCOME USER!
        </div>
    );
}

export default UserHomePage;