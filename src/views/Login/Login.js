import React, { useContext, useEffect, useState } from 'react';
import AuthService from '../../Services/AuthService';
import { AuthContext } from '../../Context/AuthContext';
import logo from '../../Assets/logo.png';
import './Login.css';
import Button from '../../Components/Button/Button';


const Login = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const authContext = useContext(AuthContext);

    useEffect(() => {
        if (authContext.isAuthenticated) 
            props.history.push('/institute');
    }, []);

    const loginUser = (e) => {
        e.preventDefault();
        AuthService.login ({ username, password }).then(data => {
            const {isAuthenticated, user, message} = data;
            if (isAuthenticated) {
                authContext.setIsAuthenticated(isAuthenticated);
                props.history.push('/institute')
            } else 
                setMessage(message.msgBody);
        })
    }

    return (
        <div className='Login'>
            <div className='Cover'>
                <img src={logo} alt='LOGO' />
                <div className='Title'>Mentor <span>Chacha</span></div>
            </div>

            <form onSubmit={loginUser}>
                <input type='text' name='username' placeholder='username' value={username} onChange={e => setUsername(e.target.value)} required />
                <input type='password' name='password' placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} required />
                <Button style={{margin: '20px 0', fontSize: '1.25rem'}}>Login</Button>
            </form>
            {
                message 
                ? <div>
                    {message}
                </div>
                : null
            }
        </div>
    )
}

export default Login;