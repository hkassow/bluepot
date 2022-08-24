import {useState, useContext} from "react"
import { useNavigate } from "react-router-dom";
import { Divider, Form, Message, Button, Menu, GridRow, GridColumn, Grid } from "semantic-ui-react";
import { UserContext } from "../context/user";
import { NavLink } from "react-router-dom";

const LoginForm = () => {
  let navigate = useNavigate()
  const { setUser } = useContext(UserContext)
  const [anyErrors, setAnyErrors] = useState(false)
  const [errorMessages, setErrorMessages] = useState('')
  const [formData, setFormData] = useState({
      username: '',
      password: ''
  });
  const handleLogin = (user) => {
    setUser(user)
    navigate("/", { replace: true })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((r) => {
      if (r.ok) {
        r.json().then((user) => handleLogin(user));
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
        setTimeout(() => {  setAnyErrors(false) }, 1000);
    }
  }

  return (
    <Form style={{"width":"100%", "margin": "auto"}} error onSubmit={handleSubmit}>
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
      <Message style={{"padding":"14px", "margin": "0"}} error content={errorMessages}/>
      :
      <>
      <Grid>
        <GridRow columns={'equal'}>
          <GridColumn>
          <Button fluid type="submit">Login</Button>
          </GridColumn>
          <GridColumn>
          <Button fluid as={NavLink} to="/">return</Button>
          </GridColumn>
        </GridRow>
      </Grid>
      </>
      }
    </Form>
  );
}

export default LoginForm