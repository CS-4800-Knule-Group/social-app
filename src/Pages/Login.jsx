// Updated Login component
import { useAuth } from '../authContext';
import { useState } from 'react';
import CopyrightFooter from '../Components/CopyrightFooter.jsx'
import './register.css'

const Login = () => {
    const { login } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            await login(username, password);
            window.location.reload();
        } catch (err){
            console.error("No account exists " + err);
        }
    };

    return (
        <div>
            <div className='registerInfo'>
                <h1 className='title'>Login</h1>
                <p className="subtitle">Welcome back to the land of the leftovers!</p>
                <br/>
                <form onSubmit={handleSubmit}>
                    <div>
                        <input 
                            type="text" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                            required 
                            placeholder="Username"
                            className="textBox"
                        />
                    </div>
                    <div>
                        <input 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                            placeholder="Password"
                            className="textBox"
                        />
                    </div>
                    <input className='submitButton' type='submit'/>
                </form>
                <br/>
                <p className='otherReg'>Need to make an account? Register</p>
            </div>

            <CopyrightFooter/>
        </div>
    );
};

export default Login;
