// NavBar.jsx
import React from 'react';
import Picture1 from './Picture1.png';
import { useAuth } from '../LogIn/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  const { auth, setAuth } = useAuth();
  const isLoggedIn = auth && auth.accessToken;
  const navigate = useNavigate();

  const logout = () => {
    setAuth(null);
    navigate('/');
  };

  return (
    <nav className={`nav ${isLoggedIn ? 'logged-in' : 'logged-out'}`}>
      <div className='leftElements'>
        <img src={Picture1} alt="LOGO" className="logo" />
        Plant-ish
      </div>
      <div className='rightLinks'>
        {isLoggedIn ? (
            <Link to="/userhomepage">Home</Link>
            ) : (
            <Link to="/">Home</Link>
        )}
        {isLoggedIn ? (
          <Link to="/userprofile">Profile</Link>
        ) : (
          <Link to="/about">About</Link>
        )}
        {isLoggedIn ? (
          <Link to="/" onClick={logout}> Log Out </Link>
        ) : (
          <Link to="/login">Log In</Link>
        )}
      </div>
    </nav>
  );
};

export default NavBar;

