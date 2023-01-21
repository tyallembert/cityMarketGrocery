import { useState, useEffect } from 'react';
import "./loginForm.scss";

function LoginForm(props) {
    const [loggedIn, setLoggedIn] = useState(false);
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    });

    const handleChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
    return (
        <div className="loginFormContainer">
            <h1>Admin Login</h1>
            <form onSubmit={props.checkIfLoggedIn()}>
                <div className='inputContainer'>
                    <p>Username</p>
                    <input type='text'
                    name='username'
                    className='inputUsername'
                    maxLength="20"
                    onChange={handleChange}/>
                </div>
                <div className='inputContainer'>
                    <p>Password</p>
                    <input type='password'
                    name='password'
                    className='inputUsername'
                    maxLength="20"
                    onChange={handleChange}/>
                </div>
                <input type='submit' 
                name='submitButton'
                className='submitButton'
                value='Login'/>
            </form>
        </div>
    )
}

export default LoginForm;