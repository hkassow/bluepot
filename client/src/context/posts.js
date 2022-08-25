import React from "react";
import { useState, useEffect } from "react";

const PostContext = React.createContext()

function PostProvider({ children }) {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        updatePosts()
    },[])
    const updatePosts = () => {
        fetch("/posts")
        .then(r => {
            if (r.ok) {
                r.json().then((dataPosts) =>setPosts(dataPosts))
            }
        })
    }
    return (
        <PostContext.Provider value = {{ posts, setPosts, updatePosts}}>
            { children }
        </PostContext.Provider>
    )
}

export {PostContext, PostProvider }