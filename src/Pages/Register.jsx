import React from 'react'

const Register = () => {
return (
<div>
	<div className="columns">
		<div className="registerInfo">
			<img className= 'logo' src='/Knulle-Logo.png'/>  
			<h4 className="title">Create an Account</h4>
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
		</div>

		<div className="image">
			<img src='/RocketLeagueAd.jpg'/>
		</div>
	</div>
</div>
)
}

export default Register