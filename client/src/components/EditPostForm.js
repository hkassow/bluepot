import { useEffect, useState, useContext } from "react"
import { UserContext } from "../context/user";
// import ReactPlayer from 'react-player'
import { Form, Dropdown, Segment, Grid, GridRow, GridColumn, Button } from "semantic-ui-react"
import { useNavigate } from "react-router-dom";
const EditPostForm = ({post}) => {
    const { user, setUser } = useContext(UserContext)
    const navigate = useNavigate()
    const [videoUrl, setVideoUrl] = useState(post.video_url)
    const [tags, setTags] = useState(null)
    const [valueArray, setValueArray] = useState({value: []})
    const [simpleFormData, setSimpleFormData] = useState({
        title: post.title,
        description: post.description
    })
    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('post[title]', e.target.title.value)
        formData.append('post[description]', e.target.description.value)
        formData.append('post[user_id]', user.id)
        formData.append('post[tags]', valueArray.value)
        if (e.target.fileInput.files['length'] !== 0) {
            formData.append('post[video]', e.target.fileInput.files[0])
        }
        fetch(`/posts/${post.id}`, {
            method: "PATCH",
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
        const postTags = post.associated_tags.map(tag => tag.name)
        setValueArray({value: postTags})
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
    const handleSimpleChange = (e, {value, name}) => {
        setSimpleFormData({...simpleFormData, [name]:value})
    }
    console.log(valueArray)
    console.log(simpleFormData)
    return (
        <Segment>
            <Grid>
                <GridRow columns={2}>
                    <GridColumn stretched>
                        <Form onSubmit={handleSubmit}>
                            <Form.Input label='edit title' name='title' type='text' id='title' value={simpleFormData['title']} onChange={handleSimpleChange} required>
                            </Form.Input>
                            <br/>
                            <Form.Field>
                                <label >
                                    edit tags
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
                            <Form.Input label='change video' onChange={(e) => handleChange(e)} name='fileInput' type="file" ></Form.Input>
                            <Form.Input label='edit description' name='description' type='text' value = {simpleFormData['description']} onChange={handleSimpleChange}/>
                            <Button style={{"width":"40%"}} type="submit">submit</Button>
                        </Form>
                    </GridColumn>
                    {/* <GridColumn> {videoUrl? <ReactPlayer url={videoUrl} controls={true} />: <h1>video preview</h1> }</GridColumn> */}
                </GridRow>
            </Grid>
        </Segment>
    )
}

export default EditPostForm