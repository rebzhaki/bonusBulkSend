import React, { useState } from "react";
  
export const Context = React.createContext();
export const ContextProvider = ({ children }) => {
    const [userJSON, setUserJSON] = useState({});
  
    return (
        <Context.Provider value={{ userJSON, setUserJSON }}>
            {children}
        </Context.Provider>
    );
};