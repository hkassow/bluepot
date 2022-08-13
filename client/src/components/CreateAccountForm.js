import { useState } from "react";
import { Container, Divider, Form, Message} from "semantic-ui-react";
const CreateAccountForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        password2:''
    });
    const [anyErrors, setAnyErrors] = useState(false)
    const [errorMessages, setErrorMessages] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.password2) {
            setAnyErrors(true)
            setErrorMessages('passwords must match')
        } else {
            fetch("/signup", {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: formData.username,
                    password: formData.password
                }),
            })
                .then((r) => {

                    if (r.ok) {
                        r.json().then((d) => console.log(d));
                    } else {
                        r.json().then(d => setErrorMessages(d.errors[0]))
                        setAnyErrors(true)
                    }
                })
            }
        }

    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData({...formData, [name]:value })
    }

    return (
        <>
        <Form onSubmit={handleSubmit} error={anyErrors}>
            <Form.Input
                transparent
                required
                label='username'
                type="text"
                name='username'
                value={formData.username}
                onChange={handleChange}
            />
            <Divider/>
            <Form.Input
                transparent
                required
                label='password'
                type="password"
                name='password'
                value={formData.password}
                onChange={handleChange}
            />
            <Divider/>
            <Form.Input
                transparent
                required
                label='password'
                type="password"
                name='password2'
                value={formData.password2}
                onChange={handleChange}
            />
            <Divider/>
            {anyErrors? 
            <Form.Field>
            <Message fluid style={{"padding":"14px", "margin": "0"}} error content= {errorMessages}/>
            </Form.Field>
            :
            <Form.Button fluid type="submit" >Create Account</Form.Button>
            }
        </Form>
        </>
    );
}

export default CreateAccountForm