import React from 'react';
import GreenLeaf from './GreenLeaf.png';
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
        <Link to="/userhomepage">
          <img src={GreenLeaf} alt="LOGO" className="logo" />
          Plant-ish
        </Link>
      </div>
      <div className='rightLinks'>
        {isLoggedIn ? (
          <>
            <Link to='/'>View Home Page</Link>
            <Link to="/userhomepage">User Home</Link>
            <Link to="/" onClick={logout}> Log Out </Link>
          </>
        ) : (
          <>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/login">Log In</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
