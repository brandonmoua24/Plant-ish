import React, { useEffect } from "react";
import { useAuth } from '../LogIn/AuthProvider';
import './UserProfile.css';

function UserProfile() {
  const { auth } = useAuth();
  const isLoggedIn = auth && auth.accessToken;

  useEffect(() => {
    document.body.classList.toggle('logged-in', isLoggedIn);

    return () => {
      document.body.classList.remove('logged-in');
    };
  }, [isLoggedIn]);

  return (
    <div>
      WELCOME TO YOUR PROFILE
    </div>
  );
}

export default UserProfile;
