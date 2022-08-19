import React from "react";
import { useState, useEffect } from "react";

const PostContext = React.createContext()

function PostProvider({ children }) {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        fetch("/posts")
        .then(r => {
            if (r.ok) {
                r.json().then((dataPosts) =>setPosts(dataPosts))
            }
        })
    },[])
    return (
        <PostContext.Provider value = {{ posts, setPosts}}>
            { children }
        </PostContext.Provider>
    )
}

export {PostContext, PostProvider }