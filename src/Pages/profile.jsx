import React, {useEffect, useState} from 'react'
import './Profile.css'
import LoginModal from '../Components/LoginModal';
import { createPortal } from 'react-dom';
import LoginForm from '../Components/LoginForm';
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
        <img className= 'profilePic' src='/kirb.jpg' height={100} width={100} />  
        <div className='profile-text'>
          <h1 className='username'>Username: {validCookie ? decryptToken.username : "Not Found"}</h1>
          <h3 className='fullName'>Full name: InsertHere</h3>
        </div>
        <p className='bio-head'><b>Bio:</b></p>
        <p className='bio'>
          InsertBioHere<br/>
          I am just gonna keep making <br/>
          Lines. I have no idea how to make this auto align <br/>
          so... lmao. Lets try a really long string 12345 123135426 1234151 12341512 123412341 12341234 12341234 1234124 we gotta make this string really long aaah aaaha aaaaha aaahha aaaaha aaaah aaaah<br/>
          Lets go it already auto aligns I've just been wasting my time lmao
        </p>
      </div>

      <div className='userPosts'>
        <a>This is where posts should go</a>
      </div>
    </div>
  )
}

export default Profile