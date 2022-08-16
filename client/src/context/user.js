import React, { useTransition } from "react";
import { useState, useEffect } from "react";

const UserContext = React.createContext()


function UserProvider({ children }) {
    useEffect(() => {
        fetch("/me").then((response) => {
        if (response.ok) {
            response.json().then((user) => setUser(user));
        }
        });
    }, []);
    const [user, setUser] = useState(false)
    return (
        <UserContext.Provider value = {{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}

export  { UserContext, UserProvider }