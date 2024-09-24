import React from 'react'

const Login = () => {
  return (
    <div>
        <div>  
            <h4>Welcome to K[NULL]E!</h4>
            <p>To get started, we need some information about you</p>
            <br/>
            <form action='https://knule.duckdns.org/users/newUser' method='post'>
                <label for='fname'>First Name:</label>
                <input type='text' id='fname' name='fname'/>
                <br/>
                <label for='lname'>Last Name: </label>
                <input type='text' id='lname' name='lname'/>
                <br/>
                <label for='username'>Username: </label>
                <input type='text' id='username' name='username'/>
                <br/>
                <label for='email'>Email: </label>
                <input type='email' id='email' name='email'/>
                <br/>
                <label for='password'>Password: </label>
                <input type='password' id='password' name='password'/>
                <br/>
                <input class='submitButton' type='submit'/>
            </form>
        </div>
    </div>
  )
}

export default Login