import React, {useContext, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { Accordion, Icon, Container, Segment, Button, Menu, Input} from "semantic-ui-react";
import { UserContext } from "../context/user";

const TabSideBar = ({handleTagUpdate, handleFollowUpdate}) => {
    const {user} = useContext(UserContext)
    const [activeIndex, setActiveIndex] = useState(0)
    const [tags, setTags] = useState(false)
    const [displayTags, setDisplayTags] = useState([])
    const [userTags, setUserTags] = useState([])
    const [filter, setFilter] = useState('')
    const [filterdTags, setFilteredTags] = useState(displayTags)
    const navigate = useNavigate()
    const handleClick = (e, titleProps) => {
      const { index } = titleProps
      const newIndex = activeIndex === index ? -1 : index
  
      setActiveIndex(newIndex)
    }
    const handleDeleteTag = (e, tagID) => {
      const path = e.target.id
      fetch(`/associated_tags/${tagID}`,{
        method: "DELETE"
      }).then(r => r.json())
      .then(d => {
        setUserTags(d)
        handleTagUpdate(d)
        })
      e.target.parentNode.remove()
    }
    const handleDeleteFollow = (e, followeeID) => {
      fetch(`/follows?follower_id=${user.id}&followee_id=${followeeID}`, {
        method: "DELETE"
      }).then(r => r.json())
      .then(d => handleFollowUpdate(d))
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
      .then(d => {
        setUserTags(d)
        handleTagUpdate(d)
      })
      console.log(e.target)
      console.log(e.target.parentNode)
      e.target.parentNode.remove()
    }
    useEffect(() => {
      fetch('/tags')
      .then(r => r.json())
      .then(data => setTags(data))
    },[])
    useEffect(() => {
      if (user) {
        handleTagUpdate(user.associated_tags)
        setUserTags(user.associated_tags)
        handleFollowUpdate(user.following)
      }
    }, [user])

    useEffect(() => {
      if (tags && user) {
          setDisplayTags(tags.map(tag => {
            if ((user.associated_tags.some((userTag) => userTag.name === tag.name)) || (!tag.name.includes(filter))) {
              return <></>
            } else {
              return (
              <div style={{"margin-top": "14px" , "margin-bottom": "14px"}}>
                <Menu.Item as={Menu} fluid widths={2}>
                  <Menu.Item >{tag.name}</Menu.Item>
                  <Menu.Item position="right" onClick={(e) => handleAddTag(e, tag.id)}>+</Menu.Item>
                </Menu.Item>
             </div>              
            )
            }
          }))
      }
    },[tags, userTags, filter])
    const handleFilter = (e, {value}) => {
      setFilter(value)
    }
    if (!user) {
      return (
      <Segment as={Button} onClick ={() => (navigate('/login'))} style={{position:"sticky", top:"20%"}} >
        login to customize your home view and upload posts
      </Segment>
      )
    }
    console.log(userTags)
      return (
        <Accordion styled style={{position:"sticky", top:"20%"}}>
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
              </Menu>
          )}
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
          <Container style={{maxHeight:"400px", "overflow-y": "scroll"}}>
            {userTags.map(tag => 
              <Menu widths={2}>
                <Menu.Item >{tag.name}</Menu.Item>
                <Menu.Item position="right" onClick={(e) => handleDeleteTag(e, tag.id)}>x</Menu.Item>
              </Menu>
              )}
          </Container>
          </Accordion.Content>

          <Accordion.Title
            active={activeIndex === 2}
            index={2}
            onClick={handleClick}
          >
            <Icon name='dropdown' />
            add tag
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 2} >
            <Container style={{maxHeight:"400px", "overflow-y": "scroll"}}>
            <Input fluid icon='search' placeholder='Search tags...' onChange={handleFilter}></Input>
            {displayTags}
            </Container>
          </Accordion.Content>
        </Accordion>
      )
}
export default TabSideBar