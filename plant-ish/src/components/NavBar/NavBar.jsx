import React from 'react-dom';
import GreenLeaf from './GreenLeaf.png';
import { Link } from 'react-router-dom';
import './NavBar.css'

function NavBar () {
    return (
        <nav>
            <div className='leftElements'>
                <img src={GreenLeaf} alt="LOGO" className="logo"/>
                Plant-ish
            </div>
            <div className='rightLinks'>
                <Link to="/">HOME</Link>
                <Link to="/about">ABOUT</Link>
                <div className='loginButton'>
                <Link to="/login">LOGIN</Link>
                </div>
            </div>
        </nav>
       
    );
}

export default NavBar;