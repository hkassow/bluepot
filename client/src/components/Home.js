import React, { useContext, useEffect, useState } from "react";
import { Grid, GridColumn, Header} from "semantic-ui-react";
import PostCard from "./PostCard";
import TabSideBar from "./TabSideBar";
import NavBar from "./NavBar";
import { UserContext } from "../context/user";
import { PostContext } from "../context/posts";

const Home = () => {
    const {user, updateUser} = useContext(UserContext)
    const {posts} = useContext(PostContext)
    const [userTags, setUserTags] = useState(false)
    const [following, setFollowing] = useState(false)
    const [displayPosts, setDisplayPosts] = useState(null)
    const handleTagUpdate = (tags) => {
        setUserTags(tags)
    }
    const handleFollowUpdate = (follows) => {
        setFollowing(follows)
    }
    useEffect(() => {
        updateUser()
    },[])
    useEffect(() =>{
        if (posts.length !== 0) {
            if (userTags && (userTags.length !== 0)) {
                setDisplayPosts(posts.map(post => {
                        if (post.associated_tags.some(tag => userTags.some(userTag => userTag.name === tag.name) )) {
                            return <PostCard post={post}/>
                        } else if ( following.some(userFollowing => post.user.id === userFollowing.id) ) {
                            return <PostCard post={post}/>
                        } else {
                            <></>
                        }
                }))
            } else if (userTags?.length === 0 && (following.length !== 0)) {
                setDisplayPosts(posts.map(post => {
                    if ( following.some(userFollowing => post.user.id === userFollowing.id) ) {
                        return <PostCard post={post}/>
                    } else {
                        <></>
                    }}))
            } else {
                console.log('hi')
                setDisplayPosts(posts.map(post => {return <PostCard post={post}/>}))
            }
        }
    },[posts, userTags, following])
    return (
        <>
        <NavBar/>
        <Header size="huge" style={{"padding":"50px", position: "sticky", top:"5%"}}> home  </Header>
        <Grid columns={"equal"}>
            <GridColumn width={3}>
                <TabSideBar handleTagUpdate={handleTagUpdate} handleFollowUpdate={handleFollowUpdate}/>
            </GridColumn>
            <GridColumn >
                {displayPosts}
            </GridColumn>
            <GridColumn width={3}></GridColumn>  
        </Grid>
        
        </>
    )
}
export default Home