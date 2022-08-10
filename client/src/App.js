import { useState, useEffect } from "react";
import CreateAccountForm from "./components/CreateAccountForm";
import CreatePostForm from "./components/CreatePostForm";
import LoginForm from "./components/LoginForm";
import LogoutButton from "./components/LogoutButton";


function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/me").then((response) => {
      if (response.ok) {
        response.json().then((user) => setUser(user));
      }
    });
  }, []);
  console.log(user)
  

  return (
    // <>
    // {!user?
    //   <>
    //     <LoginForm/>
    //     <CreateAccountForm/>
    //   </>
    // :
    //   <LogoutButton />}
    //   <div>hello {user.username}</div>
    // </>
    <CreatePostForm/>
  );
}

export default App;
