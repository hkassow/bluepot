import React, { useState } from "react";
import LoginForm from "./LoginForm.js"
import {Button, Grid, GridColumn, GridRow, Header} from 'semantic-ui-react'
import CreateAccountForm from "./CreateAccountForm.js";
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
                                <Button active={loginBool} onClick={handleClick}>login</Button>
                            </GridColumn>
                            <GridColumn >
                                <Button active={!loginBool} onClick={handleClick}>sign up</Button>
                            </GridColumn>
                        </GridRow>
                    </Grid>
                </div>
            </div>
        </div>
    )
}

export default NewSession

{/* <div>
                        <LoginForm/>
                    </div>
                    <div>
                        <button>sign up</button>
                        <button>sign in</button>
                    </div> */}