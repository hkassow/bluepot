import React, { useEffect, useState } from "react";
import ReactPlayer from 'react-player'
import { Card, Container, Divider, Grid, GridColumn, GridRow, Label, List, Menu } from "semantic-ui-react";

const PostCard = () => {
    const [post, setPost] = useState(false)
    useEffect(() => {
        fetch('/posts/51')
        .then(r => r.json())
        .then(post => setPost(post))
    },[])
    console.log(post)
    if (!post) {
        return (<h1>hi</h1>)
    }
    return (
        <>
            <Card fluid>
                <Card.Content as={Menu}>
                    <Card.Header as={Menu.Item}>{post.title}</Card.Header>
                    <Card.Header as={Menu.Item} position={"right"}>{post.user.username}</Card.Header>
                </Card.Content>
                <Card.Content>
                    <Grid columns={4} relaxed>
                        <GridRow >
                            <GridColumn style={{width:"fit-content"}}>
                                <ReactPlayer url={post.video_url} controls={true}></ReactPlayer>
                            </GridColumn>
                            <GridColumn stretched verticalAlign={"middle"}>
                                <List relaxed style={{textAlign: "center"}}>
                                    <List.Item >hi</List.Item>
                                    <List.Item textAlign="center">hi</List.Item>
                                    <List.Item textAlign="center">hi</List.Item>
                                </List> 
                            </GridColumn>
                        </GridRow>
                    </Grid>
                </Card.Content>
                <Card.Content as={Menu}>
                    <Card.Header as={Menu.Item}>vote</Card.Header>
                    <Card.Header as={Menu.Item} position={"right"}>comments</Card.Header>
                </Card.Content>
            </Card>
        </>
    )
}


export default PostCard