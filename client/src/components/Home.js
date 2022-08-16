import React from "react";
import { Grid, GridColumn, GridRow, Header } from "semantic-ui-react";
import CreatePostForm from "./CreatePostForm";
import PostCard from "./PostCard";

const Home = () => {

    return (
        <>
        <Header textAlign="centered" size="huge" style={{"padding":"50px"}}> home top space </Header>
        <Grid columns={"equal"}>
            <GridColumn width={3}> hi </GridColumn>
            <GridColumn > <PostCard/> </GridColumn>
            <GridColumn width={3}> hi </GridColumn>  
        </Grid>
        
        </>
    )
}
export default Home