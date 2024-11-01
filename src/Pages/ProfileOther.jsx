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
    const apiPosts = 'https://knule.duckdns.org/posts'
    const [validCookie, setValidCookie] = useState(Cookies.get('loginAuth'));
    const [decryptToken, setDecryptToken] = useState(Cookies.get('loginAuth') ? jwtDecode(Cookies.get('loginAuth')) : undefined);
    const [openModal, setOpenModal] = useState(Cookies.get('loginAuth') ? false : true)
    const [users, setUsers] = useState([])
    const[posts, setPosts] = useState([])
    const [followButton, setFollowButton] = useState(true);
    const [currUser, setCurrUser] = useState([])
    const [followers, setFollowers] = useState([])
    const [following, setFollowing] = useState([]);

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
          Cookies.set('loginAuth', loginResult.accessToken,
            {
              expires: inFifteen
            }
          );
          const decoded = jwtDecode(loginResult.accessToken);
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
            const filteredUsers = usersData.filter(user => user.userId == params.id)

            setCurrUser(filteredUsers)
            
            const filterFollowers = usersData.filter(user => filteredUsers[0].followers.indexOf(user.userId) != -1)
            const filterFollowing = usersData.filter(user => filteredUsers[0].following.indexOf(user.userId) != -1)

            setFollowers(filterFollowers);
            setFollowing(filterFollowing); 

          } catch (error) {
            console.error('Error fetching users', error);
          }

          
        };
        fetchUsers();
      }, []);  // only re-run the effect if apiEndpoint changes


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


      useEffect(() => {
		
        const fetchPosts = async () => {
          try {
            const response = await fetch(apiPosts, {
            method: 'GET', // should be lowercase 'method'
            });
        
            if (!response.ok) {
            throw new Error('Could not reach /posts');
            }
            const postsData = await response.json();
      
            const userId = params.id;
      
            const filterPosts = postsData.filter(post => post.userId == userId);
      
            console.log(postsData[0].timestamp);
            setPosts(filterPosts.sort((x, y) => {
              return new Date(y.timestamp) - new Date(x.timestamp);    
            })); // Update the state with the fetched users
            console.log(posts)
          } catch (error) {
            console.error('Error fetching posts', error);
          }
          };
          fetchPosts();
      }, [])

      
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
            <h1 className='username'>{currUser.length != 0 ? currUser[0].username : "Kirby Watterson"}</h1>
            <h3 className='fullName'>@kirbistheword</h3>
            </div>
            <p className='bio'>
                I play video games and am the star of my own video game franchise. I'm not as popular as Mario and Sonic but at least I wasn't replaced with a robot like Sackboy.
            </p>
            <div className='follow-section'>
                <div className='follow-text'>
                    <p className='followers-text'>{currUser.length != 0? currUser[0].followers.length : "unknown"}</p>
                    <p>Followers</p>
                </div>
                {followers.map(followers => (
                  <div key={followers.userId} className='follower'>
                    <img className='follower-profilePic' src='/kirb.jpg' height={100} width={100} />
                    <h1 className='follower-username'>{followers.username}</h1>
                  </div>)) } 
                <div className='vertical-line'></div>
                <div className='follow-text'>
                    <p className='following-text'>{currUser.length != 0 ? currUser[0].following.length : "unknown"}</p>
                    <p>Following</p>
                </div>
                {following.map(following => (
                  <div key={following.userId} className='folloing'>
                    <img className='following-profilePic' src='/kirb.jpg' height={100} width={100} />
                    <h1 className='following-username'>{following.username}</h1>
                  </div>)) }
                <div className='vertical-line'></div>
                <div className='follow-button' onClick={onFollow}>
                    <p>{decryptToken ? (decryptToken.userId && users.followers ? (users.followers.indexOf(decryptToken.userId) != -1 ?
                    "Unfollow" : "Follow") : "Follow") : "Follow"}</p>
                </div>
                <Link to={'/tempmsg/' + params.id}>
                    <button>Send Message?</button>
                </Link>
            </div>
            {posts.map(post =>(
                  <div key={post.postId} className='post'>
                    <div className='poster'>
                      <img className= 'post-profilePic' src='/kirb.jpg' height={100} width={100} />
                      <h1 className='post-username'>{currUser.length != 0 ? currUser[0].username : "Kirby Watterson"}</h1>
                      <h3 className='post-fullName'>@kirbistheword</h3>
                      {post.timestamp && 
                      <div className='textInfo'>
                        <p className='postTime'>{post.timestamp}</p>
                      </div>
                      }
                    </div>
                    {post.content && <p>{post.content}</p>}
                  </div>
                ))}
        </div>
        </div>
    )
}

export default ProfileOther