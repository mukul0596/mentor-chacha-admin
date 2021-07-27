import React from 'react';
import Button from '../Button/Button';
import Logo from '../../Assets/logo-white.png';
import AuthService from '../../Services/AuthService';
import './Header.css';

const Header = () => {
    const logoutUser = () => {
        AuthService.logout().then(() => {
            window.location.reload();
        });
    }

    return (
        <div className='Header'>
            <div className='Title'>
                <img src={Logo} alt='Logo' className='Logo' />
                <span>Mentor Chacha | Admin</span>
            </div>
            <Button color='secondary' onClick={logoutUser}>Logout</Button>
        </div>
    )
}

export default Header;