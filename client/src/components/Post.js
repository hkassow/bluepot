import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import ReactPlayer from "react-player";
import { List, Header, Grid, GridColumn, Segment, Icon, Button, Menu, Comment, Form} from "semantic-ui-react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../context/user";
import { useContext } from "react";
import CommentCard from "./CommentCard";

const Post = () => {
    const post = useLocation().state
    const { user, setUser } = useContext(UserContext)
    const [visible, setVisible] = useState(false)
    const [deleteConfirm, setDeleteConfirm] = useState(false)
    const [createComment, setCreateComment] = useState(false)
    const [comments, setComments] = useState(post.comments)
    const [votes, setVotes] = useState(post.rating)
    const navigate = useNavigate()
    useEffect(() => {
        fetch(`/posts/${post.id}`)
        .then(r => r.json())
        .then(fetchedPost => {
            setComments(fetchedPost.comments)
            setVotes(fetchedPost.rating)})
    }, [])
    const handleEditNavigate = () => {
        navigate('/edit-post', {replace: true, state: post})
    }
    const handleDelete = () => {
        fetch(`/posts/${post.id}`,{
            method:"DELETE"
        })
        .then(navigate('/', {replace: true}))
    }
    const handleComment = (e) => {
        e.preventDefault()
        const comment = {
            post_id: post.id,
            user_id: user.id,
            text: e.target.comment.value
        }
        fetch('/comments', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(comment),
        })
        .then(r => r.json())
        .then(comment => setComments([...comments, comment]))
        .then(setCreateComment(false))
    }
    const deleteComment = (id) => {
        setComments(comments.filter(comment => comment.id !== id))
    }
    return (
        <>
        <NavBar/>
        <Header textAlign="center" size="huge" style={{"padding":"50px"}}>{post.title}</Header>
        <Grid columns={"equal"}>
            <GridColumn width={3}>
                <Segment basic style={{position:"sticky", top:"25%"}}>
                <Button onClick={() => setVisible(!visible)} style={{background: "white"}}> post options </Button>
                <Segment style={{display: (visible? "block":"none")}}>
                <Menu vertical fluid style={{textAlign:"center"}} >
                {user?
                <>
                    {user.id == post.user.id?
                    <>
                    <Menu.Item as={Button} fluid onClick={() => handleEditNavigate()}>edit</Menu.Item>
                    {!deleteConfirm? <Menu.Item as={Button} fluid onClick={() => setDeleteConfirm(true)}>delete</Menu.Item> 
                    :
                    <Button.Group widths={2}>
                        <Button as={Menu.Item} onClick={() => setDeleteConfirm(false)}>Cancel</Button>
                        <Button.Or />
                        <Button as={Menu.Item} onClick={() => handleDelete()} positive>Confirm Delete</Button>
                    </Button.Group>
                    }
                    </>:
                    <Menu.Item>follow {post.user.username}</Menu.Item>
                    }
                </>
                :
                    <Menu.Item>Login to comment or rate</Menu.Item>}
                </Menu>
                </Segment>
                </Segment>
            </GridColumn>
            <GridColumn >
                <div className="videoWrapper">
                    <ReactPlayer className="videoPlayer" height={'100%'} url={post.video_url} controls={true} width='100%'></ReactPlayer>
                </div>
                <Segment textAlign="center">{post.description}</Segment>
                <Segment>
                <Menu fluid widths={2} >
                    <Menu.Item>
                        <Icon className="chevron up"></Icon>
                        {votes}
                        <Icon className="chevron down" style={{"marginLeft":"5px"}}></Icon>
                    </Menu.Item>
                    
                    <Menu.Item onClick={() => setCreateComment(!createComment)}>create comment</Menu.Item>
                </Menu>
                {createComment?
                <Form onSubmit={(e) => handleComment(e)}>
                    <Form.Input label='comment' name="comment"></Form.Input>
                    <Button type="submit">submit</Button>
                    <Button onClick={() => setCreateComment(false)}>cancel</Button>
                </Form>
                :
                <></>}
                </Segment>
                <Segment>
                    <br></br>
                    <Comment.Group>
                        {comments.length === 0? <></>
                        :
                        comments.map((comment) => <CommentCard deleteComment={deleteComment} comment={comment}/>)
                        }
                    </Comment.Group>
                </Segment>
            </GridColumn>
            <GridColumn width={3}>
                <Menu fluid vertical style={{"textAlign": "center"}}>
                    <Menu.Item as={Header} >tags</Menu.Item>
                    {post.associated_tags.length === 0? <></>: post.associated_tags.map(tag => {
                                return <Menu.Item>{tag.name}</Menu.Item>
                        })}
                </Menu>
            </GridColumn>  
        </Grid>
        </>
    )
}

export default Post