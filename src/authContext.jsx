import React, { createContext, useContext, useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = Cookies.get('loginAuth');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setUser(decoded);
                setIsAuthenticated(true);
            } catch {
                logout();
            }
        }
    }, []);

    const login = async (username, password) => {
        try {
            const response = await fetch('https://knule.duckdns.org/auth/login', {
            // const response = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ "username": username, "password": password }),
            });
            if (response.status == 400) {
                throw new Error("failed to login")
            }
            const data = await response.json();
            const token = data.accessToken;
            Cookies.set('loginAuth', token);
            const decoded = jwtDecode(token);
            setUser(decoded);
            setIsAuthenticated(true);
            return true;
        } catch (error) {
            logout();
            return false;
        }
    };

    const logout = () => {
        Cookies.remove('loginAuth');
        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);