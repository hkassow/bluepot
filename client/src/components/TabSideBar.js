import React, {useContext, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { Accordion, Icon, Segment, Button, Menu} from "semantic-ui-react";
import { UserContext } from "../context/user";

const TabSideBar = () => {
    const {user} = useContext(UserContext)
    const [activeIndex, setActiveIndex] = useState(0)
    const [tags, setTags] = useState(false)
    const [displayTags, setDisplayTags] = useState([])
    const [userTags, setUserTags] = useState([])
    const navigate = useNavigate()
    const handleClick = (e, titleProps) => {
      const { index } = titleProps
      const newIndex = activeIndex === index ? -1 : index
  
      setActiveIndex(newIndex)
    }
    const handleDeleteTag = (e, tagID) => {
      console.log(tagID)
      const path = e.target.id
      console.log(path)
      fetch(`/associated_tags/${tagID}`,{
        method: "DELETE"
      })
      e.target.parentNode.remove()
    }
    const handleDeleteFollow = (e, followerID) => {
      fetch(`/follows?follower_id=${followerID}&followee_id=${user.id}`, {
        method: "DELETE"
      })
      e.target.parentNode.remove()
    }
    const handleAddTag = (e, tagID) => {
      fetch('/associated_tags',{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user.id,
          tag_id: tagID
        })
      })
      .then(r => r.json())
      .then(d => setUserTags(d))
      e.target.parentNode.remove()
    }
    useEffect(() => {
      fetch('/tags')
      .then(r => r.json())
      .then(data => setTags(data))
    },[])
    useEffect(() => {
      if (user) {
        setUserTags(user.associated_tags)
      }
    }, [user])

    useEffect(() => {
      if (tags && user) {
          setDisplayTags(tags.map(tag => {
            if (user.associated_tags.some((userTag) => userTag.name === tag.name)) {
              return <></>
            } else {
              return (
              <Menu widths={2}>
                <Menu.Item >{tag.name}</Menu.Item>
                <Menu.Item position="right" onClick={(e) => handleAddTag(e, tag.id)}>+</Menu.Item>
              </Menu>
            )
            }
          }))
      }
    },[tags])
    if (!user) {
      return (
      <Segment as={Button} onClick ={() => (navigate('/login'))} >
        login to customize your home page
      </Segment>
      )
    }
      return (
        <Accordion styled style={{position:"sticky", top:"25%"}}>
          <Accordion.Title
            active={activeIndex === 0}
            index={0}
            onClick={handleClick}
          >
            <Icon name='dropdown' />
            users you follow
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 0}>
          {user.following.map(followee => 
            <Menu widths={2}>
              <Menu.Item >{followee.username}</Menu.Item>
              <Menu.Item position="right" onClick={(e) => handleDeleteFollow(e, followee.id)}>x</Menu.Item>
            </Menu>)}
          </Accordion.Content>
  
          <Accordion.Title
            active={activeIndex === 1}
            index={1}
            onClick={handleClick}
          >
            <Icon name='dropdown' />
            tags you follow
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 1}>
            {userTags.map(tag => 
            <Menu widths={2}>
              <Menu.Item >{tag.name}</Menu.Item>
              <Menu.Item position="right" onClick={(e) => handleDeleteTag(e, tag.id)}>x</Menu.Item>
            </Menu>)}
          </Accordion.Content>

          <Accordion.Title
            active={activeIndex === 2}
            index={2}
            onClick={handleClick}
          >
            <Icon name='dropdown' />
            add tag
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 2}>
            {displayTags}
          </Accordion.Content>
        </Accordion>
      )
}
export default TabSideBar