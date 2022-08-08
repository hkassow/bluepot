import { useState } from "react";
const CreateAccountForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        password2:''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData)
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
            .then((r) => r.json())
            .then((d) => console.log(d));
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
            <input
                type="password"
                name='password2'
                value={formData.password2}
                onChange={handleChange}
            />
            <button type="submit">Create Account</button>
        </form>
    );
}

export default CreateAccountForm