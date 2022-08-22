import { useContext } from "react"
import { UserContext } from "../context/user"
import { Menu } from "semantic-ui-react"


const FollowButton = ({usernameToFollow, idToFollow}) => {
    const {user} = useContext(UserContext)
    const handleFollow = () => {
        const follow = {
            follower_id: user.id,
            followee_id: idToFollow
        }
        fetch('/follows',{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(follow)
        })
    }
    return (
        user?
        <Menu.Item onClick={handleFollow}>follow: {usernameToFollow}</Menu.Item>
        :
        <></>

    )
}

export default FollowButton