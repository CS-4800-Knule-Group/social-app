import {useEffect, useState} from 'react'
import './Profile.css'
import { createPortal } from 'react-dom';
import FollowingList from '../Components/FollowingList.jsx';
import FollowerList from '../Components/FollowerList.jsx';
import { useAuth } from '../authContext.jsx'
import { Navigate } from 'react-router-dom';
import EditModal from '../Components/EditModal.jsx';
import { getUsers } from '../database.js';
import { filterFollowers, filterFollowing, userById } from '../dataFilters.js';
import EditButton from '../Components/EditButton.jsx';
import ProfileImages from '../Components/ProfileImages.jsx';
import ProfileHeader from '../Components/ProfileHeader.jsx';
import ProfileFollowStats from '../Components/ProfileFollowStats.jsx';
import ProfilePosts from '../Components/ProfilePosts.jsx';



const Profile = () => {
	const apiPosts = 'https://knule.duckdns.org/posts';
	const apiUsers = 'https://knule.duckdns.org/users';

	const { user, isAuthenticated, login } = useAuth();
	const [openFollowingModal, setFollowingOpenModal] = useState(false);
	const [openFollowerModal, setFollowerOpenModal] = useState(false);
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

	const openFollowingList = () => {
		setFollowingOpenModal(true);
	}

	const openFollowerList = () => {
		setFollowerOpenModal(true);
	}

	return (
		<div>
			{editFlag && createPortal(

				<EditModal user={currUser}/>,
				document.body
			)}

			{openFollowingModal && createPortal(
				<FollowingList
					onClose={() => setFollowingOpenModal(false)}
					following={following} />,
				document.body
			)}

			{openFollowerModal && createPortal(
				<FollowerList
					onClose={() => setFollowerOpenModal(false)}
					followers={followers} />,
				document.body
			)}

			<div className='profile'>
				<ProfileImages
					banner={currUser ? currUser.pfBanner : '/kirbBanner.jpg'}
					profilePic={currUser ? currUser.pfp : '/kirb.jpg'}
				/>

				<ProfileHeader
					fullName={"@" + (currUser ? currUser.username : "NoUsernameFound")}
					username={currUser ? currUser.fullName : "NoDisplayNameFound"}
					bio={currUser ? currUser.bio : "NoBioFound"}
				
				/>
				
				<EditButton onClick={() => setEditFlag(!editFlag)} />
				
				<ProfileFollowStats
					followers={followers}
					following={following}
				/>

				{posts.map(post =>(
					<ProfilePosts
						post={post}
						user={user}
					/>
				))}
			</div>
		</div>
	)
}

export default Profile