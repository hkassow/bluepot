import { useEffect, useState, useContext } from "react"
import { UserContext } from "../context/user";
import ReactPlayer from 'react-player'
import { Form, Dropdown, Segment, Grid, GridRow, GridColumn, Button } from "semantic-ui-react"
import { useNavigate } from "react-router-dom";
const CreatePostForm = () => {
    const { user, setUser } = useContext(UserContext)
    const [videoUrl, setVideoUrl] = useState(null)
    const [tags, setTags] = useState(null)
    const [valueArray, setValueArray] = useState({value: []})
    const navigate = useNavigate()
    console.log(user)
    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('post[title]', e.target.titleInput.value)
        formData.append('post[video]', e.target.fileInput.files[0])
        formData.append('post[description]', e.target.descriptionInput.value)
        formData.append('post[user_id]', user.id)
        formData.append('post[tags]', valueArray.value)
        console.log(formData.getAll("post[tags]"))
        fetch('/posts', {
            method: "POST",
            body: formData
        })
        .then(r => r.json())
        .then(d => navigate(`/post/${d.id}`, {replace: true, state: d}))
        .catch((error) => console.error(error))
    }
    useEffect(() => {
        fetch('/tags')
        .then(r => r.json())
        .then(tags => tags.map(tag => {return {key:tag.id, text:tag.name, value:tag.name}}))
        .then(tags => setTags(tags))
    },[])

    const handleChange = (e) => {
        var fReader = new FileReader()
        fReader.readAsDataURL(e.target.files[0]);
        fReader.onloadend = (event) => {
            setVideoUrl(event.target.result)
        }
    }
    const handleTags = (e, { value }) => {
        setValueArray({...valueArray, value})
    }

    return (
        <Segment>
            <Grid>
                <GridRow columns={2}>
                    <GridColumn stretched>
                        <Form onSubmit={handleSubmit}>
                            <Form.Input label='add title' name='title' type='text' id='titleInput' placeholder='title' required>
                            </Form.Input>
                            <br/>
                            <Form.Field>
                                <label >
                                    add tags
                                </label>
                                <Form.Input
                                as={Dropdown}
                                placeholder='tags'
                                fluid
                                multiple
                                search
                                selection
                                value = {valueArray["value"]}
                                options={tags}
                                onChange={handleTags}
                                />
                            </Form.Field>
                            <Form.Input label='add video' onChange={(e) => handleChange(e)} name='fileInput' type="file" required></Form.Input>
                            <Form.Input label='add description' name='descriptionInput' type='text' placeholder='description'/>
                            <Button style={{"width":"40%"}} type="submit">submit</Button>
                        </Form>
                    </GridColumn>
                    <GridColumn> {videoUrl? <ReactPlayer url={videoUrl} controls={true} />: <h1>video preview</h1> }</GridColumn>
                </GridRow>
            </Grid>
        </Segment>
    )
}

export default CreatePostForm