import React, { useContext } from "react";
import { UserContext } from "../context/user";

const NavBar = () => {
    const { user, setUser } = useContext(UserContext)
    console.log(user)
    return (
        <h1> nav bar</h1>
    )
}

export default NavBar