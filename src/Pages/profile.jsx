import React from 'react'
import './Profile.css'

const Profile = () => {
  return (
    <div>
      <div className='profile'>
        <img className= 'profilePic' src='/kirb.jpg' height={100} width={100} />  
        <div className='profile-text'>
          <h1 className='username'>This is the username</h1>
          <h3 className='fullName'>This is the real name</h3>
        </div>
        <p className='bio-head'><b>Bio</b></p>
        <p className='bio'>
          This is your bio <br/>
          I am just gonna keep making <br/>
          Lines. I have no fuckin idea how to make this auto align <br/>
          so... lmao. Lets try a really long string 12345 123135426 1234151 12341512 123412341 12341234 12341234 1234124 fuck we gotta make this string really long aaah aaaha aaaaha aaahha aaaaha aaaah aaaah<br/>
          Lets go it already auto aligns I've just been wasting my time lmao
        </p>
      </div>
    </div>
  )
}

export default Profile