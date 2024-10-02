import React, {useEffect, useState} from 'react'
import './Profile.css'
import LoginModal from '../Components/LoginModal';
import { createPortal } from 'react-dom';
import LoginForm from '../Components/LoginForm';
import Cookies from 'js-cookie';


const Profile = () => {

  
  const [validCookie, setValidCookie] = useState(Cookies.get('loginAuth'));
  const [openModal, setOpenModal] = useState(validCookie ? true : false)

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
      console.log(loginResult.acessToken);
      Cookies.set('loginAuth', loginResult.acessToken);
      setValidCookie(Cookies.get('loginAuth'))
      
    } catch (error) {
      console.error('Error authenticating login', error);
    }
  }
    

  useEffect(() => {
    const login = Cookies.get('loginAuth');
      
    setValidCookie(login ? login : undefined);
    setOpenModal(login ? true : false)
    console.log({validCookie})
    console.log({openModal})

  }, [validCookie])



  return (
    <div>
      {//<LoginModal/>
}
      {!openModal && createPortal(
          <LoginForm onSubmit={fetchLogin} />,
          document.body
      )}
      <a> {validCookie ? validCookie : "Whoops"} </a>
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
          Lines. I have no idea how to make this auto align <br/>
          so... lmao. Lets try a really long string 12345 123135426 1234151 12341512 123412341 12341234 12341234 1234124 we gotta make this string really long aaah aaaha aaaaha aaahha aaaaha aaaah aaaah<br/>
          Lets go it already auto aligns I've just been wasting my time lmao
        </p>
      </div>
    </div>
  )
}

export default Profile