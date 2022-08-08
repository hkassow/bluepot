import {useState} from "react"

const LoginForm = ({ onLogin }) => {
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
        .then((r) => r.json())
        .then((user) => console.log(user));
    }
    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData({...formData, [name]:value })
    }
  
    return (
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name='username'
          value={formData.username}
          onChange={handleChange}
        />
        <input
          type="password"
          name='password'
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>
    );
}

export default LoginForm