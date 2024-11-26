import React, { useState } from 'react';
import './LoginForm.css';

const LoginForm = ({ onSubmit }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        if (!username) {
        newErrors.username = 'Username is required';
        }
        if (!password) {
        newErrors.password = 'Password is required';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate())
        {
            onSubmit(e);
            window.location.reload();
        }
    };

    return (
        <div className="login-form">
        <div className="form-box solid">
            <form onSubmit={handleSubmit}>
            <h1 className="login-text">Sign In</h1>

            <label>Username</label>
            <br />
            <input
                type="text"
                name="username"
                className="login-box"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            {errors.username && <p className="error">{errors.username}</p>}
            <br />

            <label>Password</label>
            <br />
            <input
                type="password"
                name="password"
                className="login-box"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <p className="error">{errors.password}</p>}
            <br />

            <input type="submit" value="LOGIN" className="login-btn" />
            </form>
        </div>
        </div>
    );
};

export default LoginForm;