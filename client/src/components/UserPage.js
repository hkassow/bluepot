import { useContext, useEffect, useState } from "react"
import NavBar from "./NavBar"
import { Header, Grid, GridRow, GridColumn, Segment, Menu, Button, Comment, Container } from "semantic-ui-react"
import PostCard from "./PostCard"
import CommentCard from "./CommentCard"
import { UserContext } from "../context/user"
import FollowButton from "./FollowButton"

const UserPage = () => {
    let username = window.location.pathname.split('/')[2]
    const {user} = useContext(UserContext)
    const [pageOwner, setPageOwner] = useState(false)
    const [toggle, setToggle] = useState(false)
    const [comments, setComments] = useState([])
    const [posts, setPosts] = useState([])
    const [deleteConfirm, setDeleteConfirm] = useState(false)
    useEffect(() => {
        fetch(`/other?username=${username}`)
        .then(r => {
            if (r.ok) {
                r.json().then(d => setPageOwner(d))
            } else {
                r.json().then(error => console.error(error))
            }
        })
    },[])
    useEffect(() => {
        if (pageOwner) {
            setComments(pageOwner.comments.map(comment =><Segment><CommentCard comment={comment}/></Segment>))
            setPosts(pageOwner.posts.map(post => <PostCard post={post}/>))
        }
    }, [pageOwner])
    const handleClick = (bool) => {
        setToggle(bool)
    }
    const handleDelete = () => {
        fetch(`/users/${user.id}`, {
            method: "DELETE"
        })

    }
    return (
        <>
        <NavBar/>
        <br/><br/><br/>
        <Grid columns={"equal"}>
            <GridRow>
                <GridColumn width={3}>
                </GridColumn>
                <GridColumn >
                    <Segment textAlign="center">{pageOwner?<h1>{pageOwner.username}</h1>:<h1>user not found</h1>}</Segment>
                    <Segment>
                        <Menu fluid widths={2}>
                            <Menu.Item as={Button} onClick={() => handleClick(false)}>post history</Menu.Item>
                            <Menu.Item as={Button} onClick={() => handleClick(true)}>comment history</Menu.Item>
                        </Menu>
                        <br></br>
                        {toggle? 
                        comments.length === 0? <h1>no comment history</h1>: <Comment.Group>{comments}</Comment.Group>:
                        posts.length === 0? <h1> no post history</h1>: posts}
                    </Segment>
                </GridColumn>
                <GridColumn width={3}>
                {user.username === username? 
                    <Segment>
                        {deleteConfirm?
                        <>
                            <Button.Group widths={2}>
                                <Button as={Menu.Item} onClick={() => setDeleteConfirm(false)}>Cancel</Button>
                                <Button.Or />
                                <Button as={Menu.Item} onClick={() => handleDelete()} color="red">Confirm Delete</Button>
                            </Button.Group>
                        </>
                        :<Button onClick={() => setDeleteConfirm(true)}>delete account</Button>}
                    </Segment>
                    : 
                    <Menu widths={1}><FollowButton usernameToFollow={pageOwner.username} idToFollow={pageOwner.id}></FollowButton></Menu>}
                </GridColumn>  
            </GridRow>
        </Grid>
        
        </>
    )
}


export default UserPage