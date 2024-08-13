// src/components/SignUp.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/signup.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';

const SignUp = ({onSignUp}) => {
    const [formData, setFormData] = useState({
        user_name: '',
        email: '',
        password: '',
        phone_number: '',
        full_name: ''
    });
    
    const [error, setError] = useState('');
    const navigate=useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(formData)
            const response = await axios.post('http://localhost:8080/user/signup', formData);
            const userId = response.data.id; // Extract the user ID
            console.log(response.data);
            onSignUp(); // Notify parent component of successful sign-up
            navigate(`/Inventory/${userId}`); // Redirect to the inventory page with user ID
        } catch (error) {
            console.error('Sign-up error:', error);
            if (error.response && error.response.data) {
                setError(error.response.data.message || 'An error occurred');
            } else {
                setError('An unexpected error occurred');
            }
        }
    };

    return (
        <div className="signup-container">
             <p>
                    Already have an account? <Link to="/login" className="link">Log In</Link>
                </p>
            <div className="signup-form">
                <h2>Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        User Name:
                        <input type="text" name="user_name" value={formData.user_name} onChange={handleChange} required />
                    </label>
                    <br />
                    <label>
                        Email:
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                    </label>
                    <br />
                    <label>
                        Password:
                        <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                    </label>
                    <br />
                    <label>
                        Phone Number:
                        <input type="text" name="phone_number" value={formData.phone_number} onChange={handleChange} />
                    </label>
                    <br />
                    <label>
                        Full Name:
                        <input type="text" name="full_name" value={formData.full_name} onChange={handleChange} required />
                    </label>
                    <br />
                    <button type="submit">Sign Up</button>
                </form>
                {error && <p className="error">{error}</p>}
            </div>
        </div>
    );
};

export default SignUp;
