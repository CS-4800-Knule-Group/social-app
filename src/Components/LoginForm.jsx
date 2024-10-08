import React, {useEffect} from 'react'
import './LoginForm.css'




const LoginForm = ({onSubmit}) => {
  
  return (
    <div className="login-form">
        <div className="form-box solid">
            <form onSubmit={onSubmit}>
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
    </div>
  )
}

export default LoginForm