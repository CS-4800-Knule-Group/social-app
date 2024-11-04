import React, {useEffect, useState} from 'react'
import './Profile.css'
import { createPortal } from 'react-dom';
import LoginForm from '../Components/LoginForm.jsx';
import EditModal from '../Components/editModal.jsx';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

const Profile = () => {

const apiPosts = 'https://knule.duckdns.org/posts'
const apiUsers = 'https://knule.duckdns.org/users'
const [validCookie, setValidCookie] = useState(Cookies.get('loginAuth'));
const [decryptToken, setDecryptToken] = useState(Cookies.get('loginAuth') ? jwtDecode(Cookies.get('loginAuth')) : undefined);
const [openModal, setOpenModal] = useState(Cookies.get('loginAuth') ? false : true);
const [posts, setPosts] = useState([]);
const [users, setUsers] = useState([]);
const [currUser, setCurrUser] = useState([])
const [followers, setFollowers] = useState([]);
const [following, setFollowing] = useState([]);
const [editFlag, setEditFlag] = useState(false);

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
	//console.log({openModal})

}, [validCookie])

useEffect(() => {
	const fetchUsers = async () => {
		try {
			const response = await fetch("http://localhost:3000/users/", {
			method: 'GET', // should be lowercase 'method'
			});

			if (!response.ok) {
			throw new Error('Could not reach /users');
			}
			const usersData = await response.json();
			setUsers(usersData);
			const filteredUsers = usersData.filter(user => user.userId == decryptToken.userId)

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
}, [decryptToken]);  // only re-run the effect if apiEndpoint changes




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

			const userId = decryptToken.userId;

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
}, [decryptToken])


return (
	<div>
	{openModal && createPortal(
		<LoginForm onSubmit={fetchLogin} />,
		document.body
	)}
	{editFlag && createPortal(
		<EditModal user={currUser[0]}/>,
		document.body
	)}
		<div className='profile'>
			<div className="images">
			<img className= 'banner' src='/kirbBanner.jpg'/>
				<img className= 'profilePic' src={currUser.length != 0 ? currUser[0].pfp : "/kirb.jpg"} height={100} width={100} />
			</div>
			
			<div className='profile-text'>
			<h1 className='username'>{currUser.length != 0 ? currUser[0].fullName : "noNameFound"}</h1>
			<h3 className='fullName'>{"@" + (validCookie ? decryptToken.username : "noUserFound")}</h3>
			<br/>

            <button onClick={() => setEditFlag(!editFlag)}>Edit Profile</button>
			</div>
			<p className='bio'>
				{currUser.length != 0 ? currUser[0].bio : "noBioFound"}
			</p>
			<div className='follow-section'>
				<div className='vertical-line'></div>
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
					{following.map(following => (
						<div key={following.userId} className='folloing'>
							<img className='following-profilePic' src='/kirb.jpg' height={100} width={100} />
							<h1 className='following-username'>{following.username}</h1>
						</div>)) }
				</div>
				<div className='vertical-line'></div>
			</div> 
			{posts.map(post =>(
				<div key={post.postId} className='post'>
					<div className='poster'>
						<img className= 'post-profilePic' src='/kirb.jpg' height={100} width={100} />
						<h1 className='post-username'>{validCookie ? decryptToken.username : "Kirby Watterson"}</h1>
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

export default Profile