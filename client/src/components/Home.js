import React, { useContext, useEffect, useState } from "react";
import { Grid, GridColumn, Header} from "semantic-ui-react";
import CreatePostForm from "./CreatePostForm";
import PostCard from "./PostCard";
import TabSideBar from "./TabSideBar";
import NavBar from "./NavBar";
import { UserContext } from "../context/user";
import { PostContext } from "../context/posts";

const Home = () => {
    const {user} = useContext(UserContext)
    const {posts} = useContext(PostContext)
    const [userTags, setUserTags] = useState(false)
    const [displayPosts, setDisplayPosts] = useState(null)
    const handleTagUpdate = (tags) => {
        setUserTags(tags)
    }
    console.log(user)
    useEffect(() =>{
        if (posts.length !== 0 && user) {
            if (userTags) {
                setDisplayPosts(posts.map(post => {
                        if (post.associated_tags.some(tag => userTags.some(userTag => userTag.name === tag.name) )) {
                            return <PostCard post={post}/>
                        } else {
                            <></>
                        }
                }))
            } else {
                setDisplayPosts(posts.map(post => {
                    if (post.associated_tags.some(tag => user.associated_tags.some(userTag => userTag.name === tag.name) )) {
                        return <PostCard post={post}/>
                    } else {
                        <></>
                    }
            }))
            }
        }
    },[posts, userTags])
    return (
        <>
        <NavBar/>
        <Header textAlign="centered" size="huge" style={{"padding":"50px"}}> home top space </Header>
        <Grid columns={"equal"}>
            <GridColumn width={3}>
                <TabSideBar handleTagUpdate={handleTagUpdate}/>
            </GridColumn>
            <GridColumn >
                {displayPosts}
            </GridColumn>
            <GridColumn width={3}> hi </GridColumn>  
        </Grid>
        
        </>
    )
}
export default Home