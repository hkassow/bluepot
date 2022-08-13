import {useState, useContext} from "react"
import { Divider, Form, Message } from "semantic-ui-react";
import { UserContext } from "../context/user";

const LoginForm = () => {
  const { setUser } = useContext(UserContext)
  const [anyErrors, setAnyErrors] = useState(false)
  const [errorMessages, setErrorMessages] = useState('')
  const [formData, setFormData] = useState({
      username: '',
      password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData)
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      } else {
        setAnyErrors(true)
        setErrorMessages('invalid username or password')
      }
    })
  }
  const handleChange = (e) => {
      const {name, value} = e.target
      setFormData({...formData, [name]:value })
      if (anyErrors) {
        setTimeout(() => {  setAnyErrors(false) }, 3000);
    }
  }

  return (
    <Form style={{"width":"100%", "margin": "auto"}}onSubmit={handleSubmit}>
      <Form.Input
        transparent
        required
        type="text"
        label='username'
        name='username'
        value={formData.username}
        onChange={handleChange}
      />
      <Divider/>
      <Form.Input
        transparent
        required
        type="password"
        label='password'
        name='password'
        value={formData.password}
        onChange={handleChange}
      />
      <Divider/>
      {anyErrors?
      <Message fluid style={{"padding":"14px", "margin": "0"}} error content= {errorMessages}/>
      :
      <Form.Button fluid type="submit">Login</Form.Button>
      }
    </Form>
  );
}

export default LoginForm