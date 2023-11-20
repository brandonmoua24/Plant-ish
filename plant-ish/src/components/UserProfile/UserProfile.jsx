// UserProfile.jsx
import React, { useEffect } from "react";
import { useAuth } from '../LogIn/AuthProvider';
import './UserProfile.css'; // Import your CSS file

function UserProfile() {
  const { auth } = useAuth();
  const isLoggedIn = auth && auth.accessToken;

  useEffect(() => {
    // Add or remove the 'logged-in' class based on the login status
    document.body.classList.toggle('logged-in', isLoggedIn);

    // Clean up the effect to remove the 'logged-in' class when the component unmounts
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
