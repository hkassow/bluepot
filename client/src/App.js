import { useState, useEffect } from "react";
import ReactDom from "react-dom/client"
import {BrowserRouter, Route, Routes} from "react-router-dom"
import CreateAccountForm from "./components/CreateAccountForm";
import CreatePostForm from "./components/CreatePostForm";
import LoginForm from "./components/LoginForm";
import LogoutButton from "./components/LogoutButton";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Discover from "./components/Discover";
import CreatePost from "./components/CreatePost";
import { UserProvider } from "./context/user";
import NewSession from "./components/NewSession";


function App() {

  // useEffect(() => {
  //   fetch("/me").then((response) => {
  //     if (response.ok) {
  //       response.json().then((user) => setUser(user));
  //     }
  //   });
  // }, []);
  
  

  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path='' element = {<Home />}/>
          <Route path='/new' element = {<Discover />} />
          <Route path='/create-post' element = {<CreatePost />} />
          <Route path='/login' element = {<NewSession />} />
          {/* <Route path="users">
            <Route path=":id" element={<UserProfile />} />
          </Route> */}
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
