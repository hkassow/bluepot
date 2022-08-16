import React, { useEffect } from "react";
import NavBar from "./NavBar";
import { Header, Grid, GridColumn, GridRow, Dropdown, Container, Button, Menu, MenuItem } from "semantic-ui-react";
import { useState } from "react";
import PostCard from "./PostCard";

const Discover = () => {
    const [tags, setTags] = useState(null)
    const [valueArray, setValueArray] = useState({value: []})
    const [showAll, setShowAll] = useState(true)
    useEffect(() => {
        fetch('/tags')
        .then(r => r.json())
        .then(tags => tags.map(tag => {return {key:tag.id, text:tag.name, value:tag.name}}))
        .then(tags => setTags(tags))
    },[])

    const handleChange = (e, { value }) => {
        if (showAll) {
            setShowAll(false)
        }
        setValueArray({...valueArray, value})
    }
    const handleShowAll = () => {
        setShowAll(true)
        setValueArray({value: []})
    }
    console.log(showAll)
    return (
        <>
        <NavBar/>
        <Header textalign="centered" size="huge" style={{"padding":"50px"}}> discover top space </Header>
        <Grid columns={"equal"}>
            <GridRow>
                <GridColumn width={3}>
                     <Menu vertical style={{position:"sticky", top:"25%"}}>
                            <Dropdown
                                placeholder='tags'
                                fluid
                                multiple
                                search
                                selection
                                value = {valueArray["value"]}
                                options={tags}
                                onChange={handleChange}
                            />
                            <Menu.Item></Menu.Item>
                            <Menu.Item fluid as={Button} onClick={() => handleShowAll()}>show all</Menu.Item>
                        </Menu>
                </GridColumn>
                <GridColumn >
                    <PostCard/>
                    <PostCard/>
                    <PostCard/>
                    <PostCard/>
                    <PostCard/>
                </GridColumn>
                <GridColumn width={3}> hi </GridColumn>  
            </GridRow>
        </Grid>
        
        </>
    )
}

export default Discover