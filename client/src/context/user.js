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
    const updateUser = () => {
        fetch("/me").then((r) => {
            if (r.ok){
                r.json().then(user => setUser(user))
            }
        })
    }
    return (
        <UserContext.Provider value = {{ user, setUser, updateUser }}>
            { children }
        </UserContext.Provider>
    )
}

export  { UserContext, UserProvider }