import { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import "./loginForm.scss";

function LoginForm(props) {
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    });

    const handleChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
    const handleSubmit = async(e) => {
        e.preventDefault();

        const response = await fetch("/checkAdmin", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        });
        const loggedIn = await response.json();
        if(loggedIn.username && loggedIn.password){
            const cookies = new Cookies();

            cookies.set('currentUser', JSON.stringify(credentials), { path: '/' });
            console.log(cookies.get('currentUser')); // Pacman    

            props.setLoggedIn(true);
            setErrorMessage("");
            setError(false);
        }else{
            if(!loggedIn.username & !loggedIn.password){
                setErrorMessage("Username and Password are Incorrect");
                setError(true);
            }else if(!loggedIn.password){
                setErrorMessage("Password is Incorrect");
                setError(true);
            }
        }
    };
    return (
        <div className="loginFormContainer">
            <h1>Admin Login</h1>
            <form>
                {
                    error ? (
                        <div className='errorMessage'>
                            <p>{errorMessage}</p>
                        </div>
                    ) : null
                }
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
                value='Login'
                onClick={handleSubmit}/>
            </form>
        </div>
    )
}

export default LoginForm;