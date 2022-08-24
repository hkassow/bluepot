import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import ReactPlayer from "react-player";
import { List, Header, Grid, GridColumn, Segment, Icon, Button, Menu, Comment, Form} from "semantic-ui-react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../context/user";
import { useContext } from "react";
import CommentCard from "./CommentCard";
import VoteButton from "./VoteButton";
import FollowButton from "./FollowButton";

const Post = () => {
    const post = useLocation().state
    const { user, setUser } = useContext(UserContext)
    const [visible, setVisible] = useState(false)
    const [deleteConfirm, setDeleteConfirm] = useState(false)
    const [createComment, setCreateComment] = useState(false)
    const [comments, setComments] = useState(post.comments)
    const [votes, setVotes] = useState(post.rating)
    const [associated_tags, setAssociated_tags] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        fetch(`/posts/${post.id}`)
        .then(r => r.json())
        .then(fetchedPost => {
            setComments(fetchedPost.comments)
            setVotes(fetchedPost.rating)
            setAssociated_tags(fetchedPost.associated_tags)
        })
    }, [])
    const handleEditNavigate = () => {
        navigate('/edit-post', {replace: true, state: post})
    }
    const handleLoginNav = () => {
        navigate('/login')
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
        <br/><br/><br/>
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
                    <FollowButton usernameToFollow={post.user.username} idToFollow={post.user.id}/>
                    }
                </>
                :
                    <Menu.Item onClick={handleLoginNav}>Login to comment or rate</Menu.Item>}
                </Menu>
                </Segment>
                </Segment>
            </GridColumn>
            <GridColumn >
                <div className="videoWrapper">
                    <ReactPlayer className="videoPlayer" height={'100%'} url={post.video_url} controls={true} width='100%'></ReactPlayer>
                </div>
                {user? 
                <Segment>
                 <Menu fluid widths={2} >
                    <VoteButton postId={post.id} rating={votes}/>
                    
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
                : <></>}
                {comments.length === 0?  <></>:
                <Segment>
                    <br></br>
                    <Comment.Group>
                        {comments.map((comment) => <CommentCard deleteComment={deleteComment} comment={comment}/>)}
                    </Comment.Group>
                </Segment>}
            </GridColumn>
            <GridColumn width={3}>
                <Menu fluid vertical>
                    <Menu.Item as={Header}>{post.title}</Menu.Item>
                    <Menu.Item >posted by: <Header style={{display: "inline"}}>{post.user.username}</Header></Menu.Item>
                    <Menu.Item>{post.description}</Menu.Item>
                </Menu>
                <br></br>
                <Menu fluid vertical style={{"textAlign": "center"}}>
                    <Menu.Item as={Header} >tags</Menu.Item>
                    {associated_tags === 0? <></>:associated_tags.map(tag => {
                                return <Menu.Item>{tag.name}</Menu.Item>
                        })}
                </Menu>
            </GridColumn>  
        </Grid>
        </>
    )
}

export default Post