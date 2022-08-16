import React, { useContext, useState } from "react";
import { UserContext } from "../context/user";
import { Grid, GridColumn, GridRow, Menu, Button, Sidebar, MenuItem} from "semantic-ui-react";
import { NavLink } from "react-router-dom";
const NavBar = () => {
    const { user, setUser } = useContext(UserContext)
    const [visible, setVisible] = useState(false)
    return (
        <Grid columns={3} >
            <GridRow>
            <GridColumn>
                <Menu widths='2'>
                    <Menu.Item as={NavLink} to='/'>home</Menu.Item>
                    <Menu.Item as={NavLink} to='/new'>new</Menu.Item>
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
                            <Menu.Item ><br></br></Menu.Item>
                            <Menu.Item>User Page</Menu.Item>
                            <Menu.Item>hi</Menu.Item>
                            <Menu.Item>User History</Menu.Item>
                            <Menu.Item><br></br></Menu.Item>
                            <Menu.Item onClick={() => setVisible(false)}>Close</Menu.Item>
                    </Sidebar>
                </Menu>
            </GridColumn>
            </GridRow>
        </Grid>
    )
}

export default NavBar