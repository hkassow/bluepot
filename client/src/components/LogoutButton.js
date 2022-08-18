import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import { UserContext } from "../context/user";

function LogoutButton() {
  const {setUser} = useContext(UserContext)
  const navigate = useNavigate()
    function handleLogout() {
      fetch("/logout", {
        method: "DELETE",
      })
      .then(() => navigate('/', {replace: true}))
      .then(setUser(false));
    }
  
    return (
        <Menu.Item onClick={handleLogout}>Logout</Menu.Item>
    );
}

export default LogoutButton