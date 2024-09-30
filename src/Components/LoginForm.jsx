import React, {useEffect} from 'react'
import './loginForm.css'



const fetchLogin = async(e) => {
  e.preventDefault();

  const username = e.target.username.value;
  const password = e.target.password.value;

  try{
    const response = await fetch('https://knule.duckdns.org/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        "username": username,
        "password": password,
        
      })
  });

    const loginResult = await response.json();
    console.log("Success");
    
  } catch (error) {
    console.error('Error authenticating login', error);
  }

  console.log("test3")

}


const LoginForm = ({onClose}) => {
  
  return (
    <div className="login-form">
        <div className="form-box solid">
            <form onSubmit={fetchLogin}>
            <h1 className="login-text">Sign In</h1>
            <label>Username</label>
            <br></br>
            <input type="text" name="username" className="login-box" />
            <br></br>
            <label>Password</label>
            <br></br>
            <input type="password" name="password" className="login-box" />
            <br></br>
            <input type="submit" value="LOGIN" className="login-btn" />
            </form>
        </div>


        <button onClick={onClose}>Close</button>
    </div>
  )
}

export default LoginForm