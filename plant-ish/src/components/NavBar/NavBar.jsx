import React from 'react-dom';
import Picture1 from './Picture1.png';
import { Link } from 'react-router-dom';
import './NavBar.css'

function NavBar () {
    return (
        <nav>
            <div className='leftElements'>
                <img src={Picture1} alt="LOGO" className="logo"/>
                Plant-ish
            </div>
            <div className='rightLinks'>
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/login">Log In</Link>
            </div>
        </nav>
       
    );
}

export default NavBar;