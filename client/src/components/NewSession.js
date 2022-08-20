import React, { useState } from "react";
import LoginForm from "./LoginForm.js"
import {Button, Grid, GridColumn, GridRow, Header} from 'semantic-ui-react'
import CreateAccountForm from "./CreateAccountForm.js";
import { NavLink } from "react-router-dom";
const NewSession = () => {
    //true is login false is create account
    const [loginBool, setLoginBool] = useState(true)
    const handleClick = () => {
        setLoginBool(!loginBool)
    }
    return (
        <div className="outer">
            <div className="middle">
                <div className="inner">
                    <Grid stretched style={{"width": "100%", "margin": "0"}} >
                        <GridRow centered style={{"height": "35%"}}>
                            <GridColumn textAlign="center" verticalAlign="middle">
                                <Header as='h1'>BLUEPOT</Header>
                            </GridColumn>
                        </GridRow>
                        <GridRow columns="equal">
                            <GridColumn>
                                {loginBool? <LoginForm/>:<CreateAccountForm/>}
                            </GridColumn>
                        </GridRow>
                        <GridRow verticalAlign="bottom" columns="equal" style={{"position":"relative"}}>
                            <GridColumn >
                                <Button as={NavLink} to="/">return</Button>
                            </GridColumn>
                            <GridColumn>
                                {!loginBool?
                                <Button onClick={handleClick}>login</Button>
                               :<Button onClick={handleClick}>sign up</Button>}
                            </GridColumn>
                        </GridRow>
                    </Grid>
                </div>
            </div>
        </div>
    )
}

export default NewSession