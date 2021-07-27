import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = (props) => {
    return (
        <div className='NavBar'>
            {
                props.navElements.map(navElement => (
                    <Link key={navElement.title} to={navElement.link} style={{width: `${100/props.navElements.length}%`}} className={(window.location.pathname === navElement.link) ? 'Tab Active' : 'Tab'}>{navElement.title}</Link>
                ))
            } 
        </div>
    )
}

export default NavBar;