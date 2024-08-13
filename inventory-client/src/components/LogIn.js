import React, { useState } from 'react';
import axios from 'axios';
import '../styles/login.css'; // Import the CSS file
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Login = ({onLogin}) => {
    const [credentials, setCredentials] = useState({
        user_name: '',
        password: ''
    });
    const navigate=useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/user/login', credentials);
            localStorage.setItem('token', response.data.token); // Save the token in local storage
            const userId = response.data.id; // Extract the user ID
            onLogin(); // Notify parent component of successful login
            navigate(`/Inventory/${userId}`); // Redirect to the inventory page with user ID
        } catch (error) {
            console.error('Login error:', error.response.data);
        }
    };

    return (
        <div className="login-container">
             <p>
                    Already have an account? <Link to="/signup" className="link">Sign Up</Link>
                </p>
            <div className="login-form">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        User Name:
                        <input type="text" name="user_name" value={credentials.user_name} onChange={handleChange} required />
                    </label>
                    <br />
                    <label>
                        Password:
                        <input type="password" name="password" value={credentials.password} onChange={handleChange} required />
                    </label>
                    <br />
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
