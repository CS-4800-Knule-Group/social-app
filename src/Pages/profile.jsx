import {useEffect, useState} from 'react'
import './Profile.css'
import { createPortal } from 'react-dom';
import { useAuth } from '../authContext.jsx'
import { Navigate } from 'react-router-dom';
import EditModal from '../Components/EditModal.jsx';
import { getUsers } from '../database.js';
import { filterFollowers, filterFollowing, userById } from '../dataFilters.js';

const Profile = () => {
	const apiPosts = 'https://knule.duckdns.org/posts';
	const apiUsers = 'https://knule.duckdns.org/users';

	const { user, isAuthenticated, login } = useAuth();
	const[posts, setPosts] = useState([]);
	const [currUser, setCurrUser] = useState();
	const [followers, setFollowers] = useState([]);
	const [following, setFollowing] = useState([]);
	const [editFlag, setEditFlag] = useState(false);


	// fetch user data when component mounts
	useEffect(() => {
		
		const filterUser = async () => {
			const usersData = await getUsers();
			const filteredUsers = userById(usersData, user.userId)
			setCurrUser(filteredUsers)
			
			setFollowers(filterFollowers(usersData, filteredUsers))
			setFollowing(filterFollowing(usersData, filteredUsers))
			 
		};
		filterUser();
	}, []);  // only re-run the effect if apiEndpoint changes

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

				const userId = user.userId;
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
	}, [user])

	const handleRefresh = () => {
		window.location.reload();
	}


	return (
		<div>
			{editFlag && createPortal(

				<EditModal user={currUser}/>,
				document.body
			)}
			<div className='profile'>
				<div className="images">
				<img className= 'banner' src={currUser ? currUser.pfBanner : '/kirbBanner.jpg'}/>
					<img className= 'profilePic' src={currUser ? currUser.pfp : '/kirb.jpg'} height={100} width={100} />
				</div>
				
				<div className='profile-text'>
				<h1 className='username'>{currUser ? currUser.fullName : "NoDisplayNameFound"}</h1>
				<h3 className='fullName'>{"@" + (currUser ? currUser.username : "NoUsernameFound")}</h3>
				<br/>
				</div>
				<p className='bio'>
					{currUser ? currUser.bio : "NoBioFound"}
				</p>
				<br/>
				<button onClick={() => setEditFlag(!editFlag)}>Edit Profile</button>
				<div className='follow-section'>
					<div className='follow-text'>
						<p className='followers-text'>{followers? followers.length : "unknown"}</p>
						<p>Followers</p>
					</div>
					<div className='vertical-line'></div>
					<div className='follow-text'>
						<p className='following-text'>{following? following.length : "unknown"}</p>
						<p>Following</p>
					</div>
					<div className='vertical-line'></div>
				</div>
				{posts.map(post =>(
					<div key={post.postId} className='post'>
						<div className='poster'>
							<img className= 'post-profilePic' src='/kirb.jpg' height={100} width={100} />
							<h1 className='post-username'>{user.username}</h1>
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