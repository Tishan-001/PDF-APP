import React, { createContext, useContext, useEffect, useState } from "react";

// Create the AuthContext
const AuthContext = createContext();

// Create the AuthProvider component
export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [userData, setUserData] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Check local storage for user data on initial render
    useEffect(() => {
        const storeData = JSON.parse(localStorage.getItem('user_data'));
        if (storeData) {
            const { userToken, user } = storeData;
            setToken(userToken);
            setUserData(user);
            setIsAuthenticated(true);
        }
    }, []);

    // Login function
    const login = (newToken, newData) => {
        localStorage.setItem(
            'user_data',
            JSON.stringify({ userToken: newToken, user: newData })
        );
        setToken(newToken);
        setUserData(newData);
        setIsAuthenticated(true);
    };

    // Logout function
    const logout = () => {
        localStorage.removeItem('user_data');
        setToken(null);
        setUserData(null);
        setIsAuthenticated(false);
    };

    // Context value
    const value = {
        token,
        isAuthenticated,
        login,
        logout,
        userData,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);
