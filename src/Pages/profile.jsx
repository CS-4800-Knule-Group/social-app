import React from 'react'
import './Profile.css'

const Profile = () => {
return (
	<div>
	<div className='profile'>
		<div className="images">
		<img className= 'banner' src='/kirbBanner.jpg'/>
			<img className= 'profilePic' src='/kirb.jpg' height={100} width={100} />
		</div>
		
		<div className='profile-text'>
		<h1 className='username'>Kirby Watterson</h1>
		<h3 className='fullName'>@kirbistheword</h3>
		</div>
		<p className='bio'>
			I play video games and am the star of my own video game franchise. I'm not as popular as Mario and Sonic but at least I wasn't replaced with a robot like Sackboy.
		</p>
		<div className='follow-section'>
			<div className='follow-text'>
				<p className='followers-text'>3492</p>
				<p>Followers</p>
			</div>
			<div className='vertical-line'></div>
			<div className='follow-text'>
				<p className='following-text'>3492</p>
				<p>Following</p>
			</div>
			<div className='vertical-line'></div>
			<div className='follow-button'>
				<p>Follow</p>
			</div>
		</div>
	</div>
	</div>
)
}

export default Profile