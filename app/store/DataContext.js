"use client"

import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from '@/Authentication/auth';


const DataContext = createContext();


export const DataProvider = ({ children }) => {
    const [data, setData]             = useState(null);
    const [viewCart, setViewCart]     = useState(false); //// View cart button
    const [isLoggedin, setIsLoggedIn] = useState(null); /////
    const { isAuthenticated }         = useAuth();

    
    ///// update login state according to user logged in or not
    useEffect(()=> {
        const checkAuthentication = async () => {
        
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('accessToken');
    
            if (token) {
                try {
                    const is_authenticate = await isAuthenticated(token);

                    if (is_authenticate === true) {
                        setIsLoggedIn(true);
                    } else {
                        setIsLoggedIn(false);
                    }
                } catch (error) {
                    //// console.error('Error during authentication:', error);
                    setIsLoggedIn(false);
                }
    
            } else {
                setIsLoggedIn(false);
            }
        };
    }
        
    checkAuthentication();
    }, [isAuthenticated]);


    if (isLoggedin === null) {
        // Render a placeholder or nothing while loading
        return <div>Loading...</div>;
    };


    return (
        <DataContext.Provider value={{ data, setData, viewCart, setViewCart, isLoggedin, setIsLoggedIn }}>
            {children}
        </DataContext.Provider>
    );
};




export const useDataContext = () => useContext(DataContext);

