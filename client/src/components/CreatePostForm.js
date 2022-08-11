import { useEffect, useState } from "react"
import ReactPlayer from 'react-player'
const CreatePostForm = () => {
    const [videoUrl, setVideoUrl] = useState(null)
    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('post[title]', e.target.title.value)
        formData.append('post[video]', e.target.fileInput.files[0])
        formData.append('post[user_id]', 1)
        fetch('/posts', {
            method: "POST",
            body: formData
        })
        .then(r => r.json())
        .then(d => setVideoUrl(d.video_url))
        .catch((error) => console.error(error))
    }
    // useEffect(() => {
    //     fetch('/posts/17')
    //     .then(r => r.json())
    //     .then(d => setVideoUrl(d.image_url))
    // })

    return (
        <div> 
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Title</label>
                <input name='title' type='text' id='title'>
                </input>
                <br/>
                <input name='fileInput' type="file" required></input>
                <input type="submit"/>
            </form>
            {videoUrl? <ReactPlayer url={videoUrl} controls={true} />: <h1>no vid</h1> }
        </div>
    )
}

export default CreatePostForm