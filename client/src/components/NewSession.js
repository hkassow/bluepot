import React, { useEffect, useState } from "react";
import LoginForm from "./LoginForm.js"
import {Button, Container, Grid, GridColumn, GridRow, Header, Divider, Segment} from 'semantic-ui-react'
import CreateAccountForm from "./CreateAccountForm.js";
import { NavLink } from "react-router-dom";
import ReactPlayer from "react-player";
const NewSession = () => {
    //true is login false is create account
    const [loginBool, setLoginBool] = useState(true)
    const [posts, setPosts] = useState(false)
    const handleClick = () => {
        setLoginBool(!loginBool)
    }
    useEffect(() => {
        fetch('/show_top')
        .then(r => r.json())
        .then(data => setPosts(data[0]))
    },[])
    console.log(posts)
    return (
        <Grid columns={"equal"} divided verticalAlign="middle" style={{height: "100%"}}>
            <GridRow> 
            <GridColumn>
                {posts? <div className="videoWrapper" ><ReactPlayer style={{"margin-left":"auto", "margin-right":"auto", width: "fit-content"}} height="100%" className="videoPlayer" url={posts.video_url} controls={true} /></div>: <h1>video preview</h1> }
            </GridColumn>
            <GridColumn style={{height: "100vh", "display": "flex"}}>
                <Container style={{margin: "auto", width:"50%"}}>
                    <Header textAlign="center" size="huge">BLUEPOT</Header>
                    <br/><br/><br/><br/>
                    {loginBool? <LoginForm/>:<CreateAccountForm/>}
                    <br/><br/><br/><br/>
                    {!loginBool?
                    <Button style={{ "background": "none"}}onClick={handleClick}>Exisiting User? Click here to login in!</Button>
                    :<Button style={{ "background": "none"}} onClick={handleClick}>Don't have an account? click here to sign up!</Button>}
                </Container>
            </GridColumn>
            </GridRow>
        </Grid>
    )
}

export default NewSession