import React, { createContext, useState, useEffect } from 'react';
import AuthService from '../Services/AuthService';

export const AuthContext =  createContext();

const Context = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        AuthService.isAuthenticated().then((data => {
            setIsAuthenticated(data.isAuthenticated);
            setIsLoaded(true);
        }));
    }, []);
    
    return (
        <div>
            {
                (!isLoaded)
                ? <h1>Loading...</h1>
                : <AuthContext.Provider value={{isAuthenticated, setIsAuthenticated}}>
                    { children }
                </AuthContext.Provider>
            }
        </div>
    )
}

export default Context;