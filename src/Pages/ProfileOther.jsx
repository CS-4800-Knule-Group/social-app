import {React, useState, useEffect} from 'react'
import { useParams, Link } from 'react-router-dom'
import './Profile.css'
import { createPortal } from 'react-dom';
import LoginForm from '../Components/LoginForm.jsx';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

const ProfileOther = () => {

    const params = useParams();
    
    const apiUsers = 'https://knule.duckdns.org/users'
    const [validCookie, setValidCookie] = useState(Cookies.get('loginAuth'));
    const [decryptToken, setDecryptToken] = useState(Cookies.get('loginAuth') ? jwtDecode(Cookies.get('loginAuth')) : undefined);
    const [openModal, setOpenModal] = useState(Cookies.get('loginAuth') ? false : true)
    const [users, setUsers] = useState([])
    const [followButton, setFollowButton] = useState(true);

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
          const inFifteen = new Date(new Date().getTime() + 2 * 60 * 1000)
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
        console.log({decryptToken})
    
    }, [validCookie])

    useEffect(() => {
        const fetchUsers = async () => {
          try {
            const response = await fetch(apiUsers, {
              method: 'GET', // should be lowercase 'method'
            });
    
            if (!response.ok) {
              throw new Error('Could not reach /users');
            }
            const usersData = await response.json();
            setUsers(usersData);
          } catch (error) {
            console.error('Error fetching users', error);
          }

          
        };
        fetchUsers();
      }, []);  // only re-run the effect if apiEndpoint changes

      for(let i = 0; i < users.length; i++){
        if(users[i].userId == params.id){
            setUsers(users[i]);
            break;
        }
      };
      console.log(users)
      console.log(params.id);


      const onFollow = async() =>{
        try{ 
            const response = await fetch(apiUsers + '/toggleFollowers', {
                method: 'PUT',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    'userId': decryptToken.userId,
                    'targetId': params.id
                })
            })

            const resData = await response.text();
            console.log(resData);
            window.location.reload();

        } catch(err){
            console.log("There was an error: ", err)
        }
      }

      const testFun = () => {
        setFollowButton(false)
      }
      testFun



      
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
            <h1 className='username'>{params.id ? users.username : "Kirby Watterson"}</h1>
            <h3 className='fullName'>@kirbistheword</h3>
            </div>
            <p className='bio'>
                I play video games and am the star of my own video game franchise. I'm not as popular as Mario and Sonic but at least I wasn't replaced with a robot like Sackboy.
            </p>
            <div className='follow-section'>
                <div className='follow-text'>
                    <p className='followers-text'>{users.followers? users.followers.length : "unknown"}</p>
                    <p>Followers</p>
                </div>
                <div className='vertical-line'></div>
                <div className='follow-text'>
                    <p className='following-text'>{users.following? users.following.length : "unknown"}</p>
                    <p>Following</p>
                </div>
                <div className='vertical-line'></div>
                <div className='follow-button' onClick={onFollow}>
                    <p>{decryptToken ? (decryptToken.userId && users.followers ? (users.followers.indexOf(decryptToken.userId) != -1 ?
                    "Unfollow" : "Follow") : "Follow") : "Follow"}</p>
                </div>
                <Link to={'/tempmsg/' + users.userId}>
                    <button>Send Message?</button>
                </Link>
            </div>
        </div>
        </div>
    )
}

export default ProfileOther