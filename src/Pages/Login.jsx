import React from 'react'
import './register.css';

const Login = () => {
return (
<div>
	<div class="columns">
		<div class="registerInfo">
			<img className= 'logo' src='/Knulle-Logo.png'/>  
			<h4 class="title">Create an Account</h4>
			<p class="subtitle">To get started, we need some information about you.</p>
			<br/>
			<form action='https://knule.duckdns.org/users/newUser' method='post'>
				<input type='text' id='fname' name='fname' placeholder="First Name" class="textBox"/>
				<br/>
				<input type='text' id='lname' name='lname' placeholder="Last Name" class="textBox"/>
				<br/>
				<input type='text' id='username' name='username' placeholder="Username" class="textBox"/>
				<br/>
				<input type='email' id='email' name='email' placeholder="Email" class="textBox"/>
				<br/>
				<input type='password' id='password' name='password' placeholder="Password" class="textBox"/>
				<br/>
				<input class='submitButton' type='submit'/>
			</form>
		</div>

		<div class="image">
			<img src='/RocketLeagueAd.jpg'/>
		</div>
	</div>
</div>
)
}

export default Login