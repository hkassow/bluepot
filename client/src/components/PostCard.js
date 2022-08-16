import React, { useEffect, useState } from "react";
import ReactPlayer from 'react-player'
import { Card, Container, Divider, Grid, GridColumn, GridRow, Label, List, Menu } from "semantic-ui-react";

const PostCard = () => {
    const [post, setPost] = useState(false)
    useEffect(() => {
        fetch('/posts/53')
        .then(r => r.json())
        .then(post => setPost(post))
    },[])   
    if (!post) {
        return (<h1>hi</h1>)
    }
    console.log(post)
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
                        </GridRow>
                    </Grid>
                </Card.Content>
                <Card.Content as={Menu}>
                    <Menu.Menu>
                        {post.associated_tags.length === 0? <></>: post.associated_tags.map(tag => {
                                return <Menu.Item>{tag.name}</Menu.Item>
                        })}
                    </Menu.Menu>
                    <Menu.Menu position="right" width={2}>
                        <Card.Header as={Menu.Item} >rating: {post.rating}</Card.Header>
                        <Card.Header as={Menu.Item} >comments</Card.Header>
                    </Menu.Menu>
                </Card.Content>
            </Card>
        </>
    )
}


export default PostCard