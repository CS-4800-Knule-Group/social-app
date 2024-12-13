// Updated Login component
import { useAuth } from '../authContext';
import { useState } from 'react';
import CopyrightFooter from '../Components/CopyrightFooter.jsx'
import './register.css'
import { Link } from 'react-router-dom';

const Login = () => {
    const { login } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showError, setShowError] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const loggedIn = await login(username, password);
            if (loggedIn) {
                setShowError(false);
                window.location.reload();
            } else {
                console.log("Incorrect usernmae or password.")
                setShowError(true);
                setUsername("");
                setPassword("");
            }
        } catch (err){
            setShowError(true);
            console.error("No account exists " + err);
        }
    };

    return (
        <div>
            <div className='registerInfo'>
                <h1 className='title'>Login</h1>
                <p className="subtitle">Welcome back to the land of the leftovers!</p>
                <br/>
                <form onSubmit={handleSubmit} className='columnFlex'>
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
                    { showError && (
                        <span className='wrong-pass'>Incorrect username or password.</span>
                    )}
                </form>
                <br/>
                <Link to="/register" className='otherReg'>Need to make an account? Register</Link>
            </div>

			<div className='spacing'>
			</div>

            <CopyrightFooter/>
        </div>
    );
};

export default Login;
