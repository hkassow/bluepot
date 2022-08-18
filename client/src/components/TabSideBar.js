import React, {useContext, useState} from "react";
import { Accordion, Icon} from "semantic-ui-react";
import { UserContext } from "../context/user";

const TabSideBar = () => {
    const {user} = useContext(UserContext)
    const [activeIndex, setActiveIndex] = useState(0)
    const handleClick = (e, titleProps) => {
      const { index } = titleProps
      const newIndex = activeIndex === index ? -1 : index
  
      setActiveIndex(newIndex)
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
            content
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
            content
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
            content
          </Accordion.Content>
        </Accordion>
      )
}
export default TabSideBar