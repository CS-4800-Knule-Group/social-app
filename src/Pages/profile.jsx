import React, {useEffect, useState} from 'react'
import './Profile.css'
import { createPortal } from 'react-dom';
import LoginForm from '../Components/LoginForm.jsx';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

const Profile = () => {
  const [validCookie, setValidCookie] = useState(Cookies.get('loginAuth'));
  const [decryptToken, setDecryptToken] = useState(Cookies.get('loginAuth') ? jwtDecode(Cookies.get('loginAuth')) : undefined);
  const [openModal, setOpenModal] = useState(Cookies.get('loginAuth') ? false : true)

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
      const inFifteen = new Date(new Date().getTime() + 0.25 * 60 * 1000)
      Cookies.set('loginAuth', loginResult.acessToken,
        {
          expires: inFifteen
        }
      );
      const decoded = jwtDecode(loginResult.acessToken);
      //console.log(decoded); 
      setValidCookie(Cookies.get('loginAuth'))
      
    } catch (error) {
      setValidCookie(undefined);
      console.error('Error authenticating login', error);
    }
  }
    

  useEffect(() => {
    const login = Cookies.get('loginAuth');
      
    setValidCookie(login ? login : undefined);
    setDecryptToken(login ? jwtDecode(validCookie) : "Yeah this fucked up")
    setOpenModal(login ? false : true)
    console.log({validCookie})
    //console.log({decryptToken})
    //console.log({openModal})

  }, [validCookie])
return (
	<div>
    {openModal && createPortal(
          <LoginForm onSubmit={fetchLogin} />,
          document.body
      )}
	<div className='profile'>
		<div className="images">
		<img className= 'banner' src='/kirbBanner.jpg'/>
			<img className= 'profilePic' src='/kirb.jpg' height={100} width={100} />
		</div>
		
		<div className='profile-text'>
		<h1 className='username'>{validCookie ? decryptToken.username : "Kirby Watterson"}</h1>
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