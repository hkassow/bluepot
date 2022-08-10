import { useEffect, useState } from "react"
const CreatePostForm = () => {
    const [imageUrl, setImageUrl] = useState(null)
    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('post[title]', e.target.title.value)
        formData.append('post[image]', e.target.fileInput.files[0])
        formData.append('post[user_id]', 1)
        fetch('/posts', {
            method: "POST",
            body: formData
        })
        .then(r => r.json())
        .then(d => setImageUrl(d.image_url))
        .catch((error) => console.error(error))
    }
    useEffect(() => {
        fetch('/posts/11')
        .then(r => r.json())
        .then(d => setImageUrl(d.image_url))
    })

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
            {imageUrl? <img src={imageUrl} alt="image" id='testImage' />:<h1>still no image</h1>}
        </div>
    )
}

export default CreatePostForm