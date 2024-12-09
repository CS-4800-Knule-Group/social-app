import React from 'react'
import CopyrightFooter from '../Components/CopyrightFooter.jsx'
import './register.css'
import { Link } from 'react-router-dom';

const Register = () => {
	const outletElements = document.getElementsByClassName('splitRight')
	if(outletElements.length > 0){
		document.getElementsByClassName('splitRight')[0].style.filter = 'blur(0px)';
	}
	
return (
<div>
	<div className="registerInfo">
		<h1 className="title">Create an Account</h1>
		<p className="subtitle">To get started, we need some information about you.</p>
		<br/>
		<form action='https://knule.duckdns.org/users/newUser' method='post'>
			<input type='text' id='fname' name='fname' placeholder="First Name" className="textBox"/>
			<br/>
			<input type='text' id='lname' name='lname' placeholder="Last Name" className="textBox"/>
			<br/>
			<input type='text' id='username' name='username' placeholder="Username" className="textBox"/>
			<br/>
			<input type='email' id='email' name='email' placeholder="Email" className="textBox"/>
			<br/>
			<input type='password' id='password' name='password' placeholder="Password" className="textBox"/>
			<br/>
			<input className='submitButton' type='submit'/>
		</form>
		<br/>
		<Link to="/profile" className='otherReg'>Already have an account? Log In</Link> {/* Has to Link to profile so when user logs in they open profile automatically */}
	</div>
	<CopyrightFooter/>
</div>
)
}

export default Register