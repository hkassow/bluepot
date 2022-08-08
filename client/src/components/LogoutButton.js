
function LogoutButton() {
    function handleLogout() {
      fetch("/logout", {
        method: "DELETE",
      }).then(() => console.log('logged'));
    }
  
    return (
      <header>
        <button onClick={handleLogout}>Logout</button>
      </header>
    );
}

export default LogoutButton