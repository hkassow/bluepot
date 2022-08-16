import { Menu } from "semantic-ui-react";

function LogoutButton() {
    function handleLogout() {
      fetch("/logout", {
        method: "DELETE",
      }).then(() => console.log('logged'));
    }
  
    return (
        <Menu.Item onClick={handleLogout}>Logout</Menu.Item>
    );
}

export default LogoutButton