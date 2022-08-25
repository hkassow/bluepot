import React from "react";
import CreatePostForm from "./CreatePostForm";
import NavBar from "./NavBar";
import { Grid, Header, GridColumn } from "semantic-ui-react";

const CreatePost = () => {
    return (
        <>
        <NavBar/>
        <Header textAlign="centered" size="huge" style={{"padding":"50px"}}></Header>
        <Grid columns={"equal"}>
            <GridColumn width={2}>
            </GridColumn>
            <GridColumn >
                <CreatePostForm />
            </GridColumn>
            <GridColumn width={2}></GridColumn>  
        </Grid>
        </>
    )
}

export default CreatePost