import React, { useState } from "react";
import { Comment, Button, Menu, Form, Segment, Container, Header } from "semantic-ui-react";
import { UserContext } from "../context/user";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const CommentCard = ({comment, deleteComment}) => {
    const { user } = useContext(UserContext)
    const navigate = useNavigate()
    const [deleteConfirm, setDeleteConfirm] = useState(false)
    const [editConfirm, setEditConfirm] = useState(false)
    const [text, setText] = useState(comment.text)
    const handleDelete = () => {
        fetch(`/comments/${comment.id}`,{
            method:'DELETE'
        })
        if (deleteComment) {
            deleteComment(comment.id)
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        fetch(`/comments/${comment.id}`,{
            method:'PATCH',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                text: e.target.comment.value
            }),
        })
        .then(r => r.json())
        .then(data => setText(data.text))
        .then(setEditConfirm(false))
    }
    const handleClick = async () => {
        let post 
        await fetch(`/posts/${comment.post_id}`)
        .then(r => r.json())
        .then(d => post = d)
        navigate(`/post/${post.id}`, {state: post})
    }
    return (
        <Comment>
            <>
            <Comment.Author >{deleteComment?comment.associated_username:comment.post_name}</Comment.Author>
            {editConfirm? 
            <Form onSubmit={handleSubmit}>
                <Form.Input placeholder={comment.text} name="comment" required></Form.Input>
                <Button type="submit">submit</Button>
                <Button onClick={() => setEditConfirm(false)}>cancel</Button>
            </Form>
            :
            <>
                <Comment.Content>{text}</Comment.Content>
                <Comment.Actions>
                <div>
                {deleteConfirm?
                <>
                <Button.Group widths={2}>
                    <Button as={Menu.Item} onClick={() => setDeleteConfirm(false)}>Cancel</Button>
                    <Button.Or />
                    <Button as={Menu.Item} onClick={() => handleDelete()} negative>Confirm Delete</Button>
                </Button.Group></>
                :
                <>
                {user.id === comment.user_id?
                <>
                    <Comment.Action onClick={() => setEditConfirm(true)} style={{display:editConfirm?"none":"inline"}}>edit</Comment.Action>
                    <Comment.Action  onClick={() => setDeleteConfirm(true)} style={{display:editConfirm?"none":"inline"}}>delete</Comment.Action>
                </>
                :<></>}
                </>}
                </div>
                 {deleteComment? <></> : <Comment.Action  onClick={handleClick} style={{display:editConfirm?"none":"inline"}}>view</Comment.Action> }
                </Comment.Actions>
            </>}
            </>
        </Comment>
    )
}

export default CommentCard