import React, {useEffect} from 'react'
import './loginForm.css'


useEffect(() => {
  const fetchLogin = async({username, password}) => {
    try{
      const response = await fetch('https://knule.duckdns.org/auth/login', {
        method: 'POST',
        body: JSON.stringify({
          username: {username},
          password: {password},
          
        })
      });

      if(!response.ok){
        throw new Error('Could not reach authentication service');
      }
      const loginResult = await response.json();
      console.log(loginResult);
    } catch (error) {
      console.error('Error authenticating login', error);
    }
  }
})



const LoginForm = ({onClose}) => {
  return (
    <div className="login-form">
        <div className="form-box solid">
            <form onSubmit={fetchLogin(username, password)}>
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