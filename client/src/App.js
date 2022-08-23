import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom"
import Home from "./components/Home";
import Discover from "./components/Discover";
import CreatePost from "./components/CreatePost";
import { UserProvider } from "./context/user";
import NewSession from "./components/NewSession";
import Post from "./components/Post";
import EditPost from "./components/EditPost";
import { PostProvider } from "./context/posts";
import UserPage from "./components/UserPage";


function App() {


  return (
    <UserProvider>
      <PostProvider>
      <BrowserRouter>
          <Routes>
            <Route path='/' element = {<Home />}/>
            <Route exact path='/new' element = {<Discover />} />
            <Route exact path='/create-post' element = {<CreatePost />} />
            <Route exact path='/login' element = {<NewSession />} />
            <Route path='/post/:id' element = {<Post/>} />
            <Route exact path='/edit-post' element = {<EditPost />} />
            <Route path='/user/:username' element = {<UserPage/>} />
            <Route path='*' element ={<Navigate to="/" />
} />
        </Routes>
      </BrowserRouter>
      </PostProvider>
    </UserProvider>
  );
}

export default App;
