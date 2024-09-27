import React from 'react'
import './Logintwo.css';

const Logintwo = () => {
return (
<div>
	<div class="columns">
		<div class="registerInfo">
			<img className= 'logo' src='/Knulle-Logo.png'/>  
			<h4 class="title">Sign into your account.</h4>
			<p class="subtitle">Enter your account information.</p>
			<br/>
			<form action='https://knule.duckdns.org/users/newUser' method='post'>
				<input type='text' id='fname' name='fname' placeholder="Username" class="textBox"/>
				<br/>
				<input type='text' id='lname' name='lname' placeholder="Password" class="textBox"/>
				<br/>

				<input class='submitButton' type='submit'/>
			</form>
		</div>

		<div class="image">
			<img src='/images.jpeg'/>
		</div>
	</div>
</div>
)
}

export default Logintwo