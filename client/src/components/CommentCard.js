import React, { useState } from "react";
import { Comment, Button, Menu, Form } from "semantic-ui-react";
import { UserContext } from "../context/user";
import { useContext } from "react";

const CommentCard = ({comment, deleteComment}) => {
    const { user } = useContext(UserContext)
    const [deleteConfirm, setDeleteConfirm] = useState(false)
    const [editConfirm, setEditConfirm] = useState(false)
    const [text, setText] = useState(comment.text)
    const handleDelete = () => {
        fetch(`/comments/${comment.id}`,{
            method:'DELETE'
        }).then(deleteComment(comment.id))
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
    return (
        <Comment>
            {deleteConfirm?
            <>
            <Button.Group widths={2}>
                <Button as={Menu.Item} onClick={() => setDeleteConfirm(false)}>Cancel</Button>
                <Button.Or />
                <Button as={Menu.Item} onClick={() => handleDelete()} positive>Confirm Delete</Button>
            </Button.Group></>
            :
            <>
            <Comment.Author as='a'>{comment.associated_username}</Comment.Author>
            {editConfirm? 
            <Form onSubmit={handleSubmit}>
                <Form.Input placeholder={comment.text} name="comment" required></Form.Input>
                <Button type="submit">submit</Button>
                <Button onClick={() => setEditConfirm(false)}>cancel</Button>
            </Form>
            :
            <>
                <Comment.Content>{text}</Comment.Content>
                {user.id === comment.user_id?
                <Comment.Actions>
                    <Comment.Action onClick={() => setEditConfirm(true)} style={{display:editConfirm?"none":"inline"}}>edit</Comment.Action>
                    <Comment.Action onClick={() => setDeleteConfirm(true)} style={{display:editConfirm?"none":"inline"}}>delete</Comment.Action>
                </Comment.Actions>
                :<></>}
            </>}
            </>}
        </Comment>
    )
}

export default CommentCard