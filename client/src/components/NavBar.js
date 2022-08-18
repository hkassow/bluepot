import React, { useContext, useState } from "react";
import { UserContext } from "../context/user";
import { Grid, GridColumn, GridRow, Menu, Button, Sidebar, Segment, Header} from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import LogoutButton from "./LogoutButton";
const NavBar = () => {
    const { user, setUser } = useContext(UserContext)
    const [visible, setVisible] = useState(false)
    return (
        <Segment basic style={{padding: 0,position:"sticky", top: 0, "zIndex":10}}>
        <Grid columns={3}>
            <GridRow style={{paddingTop:0}}>
            <GridColumn>
                <Menu widths={user? 3 : 2}>
                    <Menu.Item as={NavLink} to='/'>home</Menu.Item>
                    <Menu.Item as={NavLink} to='/new'>discover</Menu.Item>
                    {user? <Menu.Item as={NavLink} to='/create-post'>create</Menu.Item> : <></>}
                </Menu>
            </GridColumn>
            <GridColumn/>
            <GridColumn >
                <Menu floated="right" >
                    <Menu.Item icon='user' as={Button} onClick={() => setVisible(!visible)}></Menu.Item>
                    <Sidebar
                        id='userbar'
                        as={Menu}
                        animation='overlay'
                        icon='labeled'
                        onHide={() => setVisible(false)}
                        vertical
                        
                        visible={visible}
                        direction='right'
                        style={{"height":"50%"}}
                        width='thin'>
                            {user?<>
                            <Menu.Item as={Header}>{user.username}</Menu.Item>
                            <Menu.Item>User Page</Menu.Item>
                            <LogoutButton></LogoutButton>
                            <Menu.Item><br></br></Menu.Item>
                            </>:
                            <Menu.Item as={NavLink} to='/login'>Login</Menu.Item>
                            }
                            <Menu.Item onClick={() => setVisible(false)}>Close</Menu.Item>
                    </Sidebar>
                </Menu>
            </GridColumn>
            </GridRow>
        </Grid>
        </Segment>
    )
}

export default NavBar