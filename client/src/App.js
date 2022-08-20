import {BrowserRouter, Route, Routes} from "react-router-dom"
import Home from "./components/Home";
import Discover from "./components/Discover";
import CreatePost from "./components/CreatePost";
import { UserProvider } from "./context/user";
import NewSession from "./components/NewSession";
import Post from "./components/Post";
import EditPost from "./components/EditPost";
import { PostProvider } from "./context/posts";


function App() {


  return (
    <UserProvider>
      <PostProvider>
      <BrowserRouter>
          <Routes>
            <Route path='/' element = {<Home />}/>
            <Route path='/new' element = {<Discover />} />
            <Route path='/create-post' element = {<CreatePost />} />
            <Route path='/login' element = {<NewSession />} />
            <Route path='/post/:id' element = {<Post/>} />
            <Route path='/edit-post' element = {<EditPost />} />
        </Routes>
      </BrowserRouter>
      </PostProvider>
    </UserProvider>
  );
}

export default App;
