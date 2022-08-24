import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, Divider, Form, Message, Button} from "semantic-ui-react";
import { UserContext } from "../context/user";
import { NavLink } from "react-router-dom";
const CreateAccountForm = () => {
    const navigate = useNavigate()
    const {setUser} = useContext(UserContext)
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        password2:''
    });
    const [anyErrors, setAnyErrors] = useState(false)
    const [errorMessages, setErrorMessages] = useState('')
    const handleLogin = (user) => {
        setUser(user)
        navigate("/", { replace: true })
      }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.password2) {
            setAnyErrors(true)
            setErrorMessages('passwords must match')
        } else {
            const loginData = {
                username: formData.username,
                    password: formData.password
            }
            fetch("/signup", {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(loginData),
            })
                .then((r) => {

                    if (r.ok) {
                        fetch("/login", {
                            method: "POST",
                            headers: {
                              "Content-Type": "application/json",
                            },
                            body: JSON.stringify(loginData),
                          })
                          .then(r => r.json())
                          .then(user => handleLogin(user))
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
        if (anyErrors) {
            setTimeout(() => {  setAnyErrors(false) }, 1000);
        }
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
            <Menu widths={2}>
                <Button as={Menu.Item} type="submit">Create Account</Button>
                <Menu.Item as={NavLink} to="/">return</Menu.Item>
            </Menu>
            }
        </Form>
        </>
    );
}

export default CreateAccountForm