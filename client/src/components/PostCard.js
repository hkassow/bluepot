import React, { useContext, useEffect, useState } from "react";
import ReactPlayer from 'react-player'
import { useNavigate } from "react-router-dom";
import { Card, Menu } from "semantic-ui-react";
import { UserContext } from "../context/user";
import VoteButton from "./VoteButton";

const PostCard = ({post}) => {
    const navigate = useNavigate()
    const {user} = useContext(UserContext)
    const handleClick = () => {
        navigate(`/post/${post.id}`, {replace: true, state: post})
    }
    return (
        <>
            <Card fluid>
                <Card.Content as={Menu}>
                    <Card.Header as={Menu.Item} onClick={handleClick}>{post.title}</Card.Header>
                    <Card.Header as={Menu.Item} position={"right"}>{post.user.username}</Card.Header>
                </Card.Content>
                <Card.Content>
                    <div className="videoWrapper" >
                        <ReactPlayer width="100%" height="100%" className="videoPlayer" url={post.video_url} controls={true}></ReactPlayer>
                    </div>
                </Card.Content>
                <Card.Content as={Menu}>
                    <Menu.Menu>
                        {post.associated_tags.length === 0? <></>: post.associated_tags.map(tag => {
                                return <Menu.Item>{tag.name}</Menu.Item>
                        })}
                    </Menu.Menu>
                    <Menu.Menu position="right" width={2}>
                        {user? <VoteButton rating={post.rating} postId={post.id}/> :<Card.Header as={Menu.Item} >rating: {post.rating}</Card.Header>}
                        <Card.Header as={Menu.Item} onClick={handleClick} >comments</Card.Header>
                    </Menu.Menu>
                </Card.Content>
            </Card>
        </>
    )
}


export default PostCard