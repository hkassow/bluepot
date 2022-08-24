import React from "react";
import EditPostForm from "./EditPostForm";
import NavBar from "./NavBar";
import { Grid, Header, GridColumn } from "semantic-ui-react";
import { useLocation } from "react-router-dom";

const EditPost = () => {
    const post = useLocation().state
    return (
        <>
        <NavBar/>
        <Header textAlign="centered" size="huge" style={{"padding":"50px"}}> home top space </Header>
        <Grid columns={"equal"}>
            <GridColumn width={2}>
            </GridColumn>
            <GridColumn >
                <EditPostForm post={post}/>
            </GridColumn>
            <GridColumn width={2}></GridColumn>  
        </Grid>
        </>
    )
}

export default EditPost