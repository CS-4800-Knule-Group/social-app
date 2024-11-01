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
    if (validate()) {
    onSubmit(e);
    }
};

return (
    <div className="login-form">
        {following.map(following => (
						<div key={following.userId} className='folloing'>
							<img className='following-profilePic' src='/kirb.jpg' height={100} width={100} />
							<h1 className='following-username'>{following.username}</h1>
						</div> )
                    )
        }
    </div>
);
};

export default LoginForm;