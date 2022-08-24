import React, { useEffect, useState } from "react";
import LoginForm from "./LoginForm.js"
import {Button, Container, Grid, GridColumn, GridRow, Header, Divider, Segment} from 'semantic-ui-react'
import CreateAccountForm from "./CreateAccountForm.js";
import { NavLink } from "react-router-dom";
import ReactPlayer from "react-player";
const NewSession = () => {
    //true is login false is create account
    const [loginBool, setLoginBool] = useState(true)
    const [displayPost, setDisplayPost] = useState(false)
    const [displayTag, setDisplayTag] = useState(false)
    const [posts, setPosts] = useState(false)
    const [counter, setCounter] = useState(1)
    const handleClick = () => {
        setLoginBool(!loginBool)
    }
    useEffect(() => {
        fetch('/show_top')
        .then(r => r.json())
        .then(data => setPosts(data))
    },[])
    // console.log(posts)
    // useEffect(() => {
    //     if ((posts?.length !== 0) & !displayPost) {
    //         setDisplayPost(posts[0])
    //         setDisplayTag(posts[0]["associated_tags"][0])
    //     }
    // },[posts])

    const moveDisplay = () => {
        setDisplayPost(posts[counter])
        setDisplayTag(posts[counter]["associated_tags"][0])
        setCounter((counter + 1)%3)
    }
    return (
        <Grid columns={"equal"} divided verticalAlign="middle" style={{height: "100%"}}>
            <GridRow> 
            <GridColumn>
                <Header textAlign="center">All your favorite {displayTag["name"]} clips in one place!</Header>
                <br/><br/><br/>
                <div>
                {displayPost? <ReactPlayer style={{"margin-left":"auto", "margin-right":"auto", }} height="100%" url={displayPost.video_url} controls={true} onEnded={() => moveDisplay()} playing={true} volume={0}/>: <h1>no video preview</h1> }
                </div>
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