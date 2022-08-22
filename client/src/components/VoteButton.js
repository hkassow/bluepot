import { useContext, useEffect, useState } from "react"
import { UserContext } from "../context/user"
import { Menu, Icon, Button } from "semantic-ui-react"


const VoteButton = ({rating, postId}) => {
    const {user} = useContext(UserContext)
    const [vote, setVote] = useState(false)
    const [currentRating, setCurrentRating] = useState(rating)
    useEffect(() => {
        if (user) {
            fetch(`/votes?user_id=${user.id}&post_id=${postId}`)
            .then(r => {
                if (r.ok) {
                    r.json().then(data => {
                        setVote(data)
                        setCurrentRating(data.rating)
                    })
                }
            })
        }
    },[user])
    const handleClick = (e, {name}) => {
        if (vote?.value === name) {
            fetch(`/votes/${vote.id}`, {
                method: "DELETE"
            }).then(r => r.json())
            .then(rating => {
                setCurrentRating(rating)
                setVote(false)})
        } else if (vote) {
            console.log(name, typeof name)
            fetch(`/votes/${vote.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                }, 
                body: JSON.stringify({value: name})
            })
            .then(r => r.json())
            .then(data => {
                setVote(data)
                setCurrentRating(data.rating)
            })
        } else {
            fetch('/votes', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                }, 
                body: JSON.stringify({
                    user_id: user.id,
                    post_id: postId,
                    value: name
                })
            })
            .then(r => r.json())
            .then(data => {
                setVote(data)
                setCurrentRating(data.rating)
            })
        }
    }
    return (
        <Menu.Item>
            <Button.Group>
            <Button icon basic>
            <Icon className="chevron up" color={(vote?.value === 1)?'red':'black'} onClick={handleClick} name={1}></Icon>
            </Button>
            <Button.Or text={currentRating}></Button.Or>
            <Button icon basic>
                <Icon className="chevron down" style={{"marginLeft":"5px"}} color={(vote?.value === -1)?'red':'black'} onClick={handleClick}  name={-1} ></Icon>
            </Button>
            </Button.Group>
        </Menu.Item> 
    )
}

export default VoteButton