"use client"

import React, { createContext, useState, useContext } from 'react';


const DataContext = createContext();


export const DataProvider = ({ children }) => {
    const [data, setData] = useState(null);
    const [viewCart, setViewCart] = useState(false); //// View cart button

    return (
        <DataContext.Provider value={{ data, setData, viewCart, setViewCart }}>
            {children}
        </DataContext.Provider>
    );
};




export const useDataContext = () => useContext(DataContext);

