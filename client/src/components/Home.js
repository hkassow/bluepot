import React from "react";
import {createRef} from 'react'
import { Grid, GridColumn, Header} from "semantic-ui-react";
import CreatePostForm from "./CreatePostForm";
import PostCard from "./PostCard";
import TabSideBar from "./TabSideBar";

const Home = () => {
    let contextRef = createRef()

    return (
        <>
        <Header textAlign="centered" size="huge" style={{"padding":"50px"}}> home top space </Header>
        <Grid columns={"equal"}>
            <GridColumn width={3}>
                <TabSideBar/>
            </GridColumn>
            <GridColumn >
                <PostCard/> 
                <PostCard/> 
                <PostCard/> 
                <PostCard/> 
                <PostCard/> 
            </GridColumn>
            <GridColumn width={3}> hi </GridColumn>  
        </Grid>
        
        </>
    )
}
export default Home