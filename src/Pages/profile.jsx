import {useEffect, useState} from 'react'
import './Profile.css'
import { createPortal } from 'react-dom';
import LoginForm from '../Components/LoginForm.jsx';
import { useAuth } from '../authContext.jsx'
import { Navigate } from 'react-router-dom';

const Profile = () => {
	const apiPosts = 'https://knule.duckdns.org/posts';
	const apiUsers = 'https://knule.duckdns.org/users';

	const { user, isAuthenticated, login } = useAuth();
	const[posts, setPosts] = useState([]);
	const [users, setUsers] = useState([]);

	// fetch user data when component mounts
	useEffect(() => {
		const fetchUser = async () => {
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
		fetchUser();
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


	return (
		<div>
			<div className='profile'>
				<div className="images">
				<img className= 'banner' src='/kirbBanner.jpg'/>
					<img className= 'profilePic' src='/kirb.jpg' height={100} width={100} />
				</div>
				
				<div className='profile-text'>
				<h1 className='username'>{user.username}</h1>
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