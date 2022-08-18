import React, { useContext } from "react";
import { Grid, GridColumn, Header} from "semantic-ui-react";
import CreatePostForm from "./CreatePostForm";
import PostCard from "./PostCard";
import TabSideBar from "./TabSideBar";
import NavBar from "./NavBar";
import { UserContext } from "../context/user";

const Home = () => {
    const {user} = useContext(UserContext)
    console.log(user)
    return (
        <>
        <NavBar/>
        <Header textAlign="centered" size="huge" style={{"padding":"50px"}}> home top space </Header>
        <Grid columns={"equal"}>
            <GridColumn width={3}>
                <TabSideBar/>
            </GridColumn>
            <GridColumn >
                
            </GridColumn>
            <GridColumn width={3}> hi </GridColumn>  
        </Grid>
        
        </>
    )
}
export default Home