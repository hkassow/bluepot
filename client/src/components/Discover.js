import React, { useContext, useEffect } from "react";
import NavBar from "./NavBar";
import { Header, Grid, GridColumn, GridRow, Dropdown,  Button, Menu} from "semantic-ui-react";
import { useState } from "react";
import PostCard from "./PostCard";
import { PostContext } from "../context/posts";

const Discover = () => {
    const [tags, setTags] = useState(null)
    const [valueArray, setValueArray] = useState({value: []})
    const [showAll, setShowAll] = useState(true)
    const {posts} = useContext(PostContext)
    const [displayPosts, setDisplayPosts] = useState(null)
    useEffect(() => {
        fetch('/tags')
        .then(r => r.json())
        .then(tags => tags.map(tag => {return {key:tag.id, text:tag.name, value:tag.name}}))
        .then(tags => setTags(tags))
    },[])
    console.log(valueArray)
    useEffect(() => {
        if (showAll || (valueArray['value'].length === 0)) {
            setDisplayPosts(posts.map(post => { return <PostCard post={post}/>}))
        } else {
            setDisplayPosts(posts.map(post => { if (post.associated_tags.some(tag => valueArray['value'].includes(tag.name) )) {
                return <PostCard post={post}/>
            } else {
                <></>
            }}))
        }
    },[posts, valueArray, showAll])

    const handleChange = (e, { value }) => {
        if (showAll) {
            setShowAll(false)
        }
        setValueArray({...valueArray, value})
    }
    const handleShowAll = () => {
        setValueArray({value: []})
        setShowAll(true)
    }

    return (
        <>
        <NavBar/>
        <Header size="huge" style={{"padding":"50px", position: "sticky", top:"5%"}}> discover </Header>
        <Grid columns={"equal"}>
            <GridRow>
                <GridColumn width={3}>
                     <Menu vertical style={{position:"sticky", top:"20%"}}>
                            <Dropdown
                                placeholder='search by tag'
                                fluid
                                search
                                selection
                                value = {valueArray["value"]}
                                options={tags}
                                onChange={handleChange}
                            />
                            {valueArray["value"].length === 0? <></>:<Menu.Item fluid as={Button} onClick={() => handleShowAll()}>show all</Menu.Item>}
                        </Menu>
                </GridColumn>
                <GridColumn >
                {displayPosts}
                </GridColumn>
                <GridColumn width={3}></GridColumn>  
            </GridRow>
        </Grid>
        
        </>
    )
}

export default Discover