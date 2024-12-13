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
import CopyrightFooter from '../Components/CopyrightFooter.jsx'
import { setBadgeCount } from 'aws-amplify/push-notifications';
import moment from 'moment';



const Profile = () => {
	const { user } = useAuth();
	const [openFollowingModal, setFollowingOpenModal] = useState(false);
	const [openFollowerModal, setFollowerOpenModal] = useState(false);
	const[posts, setPosts] = useState([]);
	const [currUser, setCurrUser] = useState();
	const [followers, setFollowers] = useState([]);
	const [following, setFollowing] = useState([]);
	const [editFlag, setEditFlag] = useState(false);
	const [updateUser, setUpdateUser] = useState(false);


	const filterUser = async () => {
		const usersData = await getUsers();
		const filteredUsers = userById(usersData, user.userId)
		setCurrUser(filteredUsers)
		
		setFollowers(filterFollowers(usersData, filteredUsers))
		setFollowing(filterFollowing(usersData, filteredUsers))

		console.log(editFlag)
		if(editFlag){
			setEditFlag(false);
		}
		 
	};

	// fetch user posts from api
	const apiPosts = `https://knule.duckdns.org/posts/${user.userId}`
	const getUserPosts = async () => {
		try {
			const response = await fetch(apiPosts)
			
			// check if response is successful
			if (!response.ok) {
				throw new Error('Failed to fetch user posts')
			}

			// parse JSON response
			const userPosts = await response.json()

			const sortedPosts = userPosts
				.sort((x, y) => new Date(y.timestamp) - new Date(x.timestamp))
				.map(post => ({
					...post,
					timestamp: moment(post.timestamp).local().format('MMMM D, YYYY [at] h:mm A')
				}));
			setPosts(sortedPosts)
		} catch (error) {
			console.error('Error fetching user posts: ', error)
		}
	}
	useEffect(() => {
		getUserPosts();
	}, [user]);

	// fetch user data when component mounts
	useEffect(() => {
		filterUser();
	}, []);  // only re-run the effect if apiEndpoint changes

	useEffect(() => {
		filterUser();
	}, [updateUser]);

	const handleRefresh = () => {
		window.location.reload();
	}

	const openFollowingList = () => {
		if(!openFollowerModal && !editFlag){
			setFollowingOpenModal(true);
			document.getElementsByClassName('splitRight')[0].style.filter = 'blur(5px)';
		}
	}

	const openFollowerList = () => {
		if(!openFollowingModal && !editFlag){
			setFollowerOpenModal(true);
			document.getElementsByClassName('splitRight')[0].style.filter = 'blur(5px)';
		}
	}

	const openEdit = () =>{
		if(!openFollowerModal && !openFollowingModal){
			setEditFlag(true);
			document.getElementsByClassName('splitRight')[0].style.filter = 'blur(5px)';
		}
	}

	const submitEdit = async() => {
		setUpdateUser(!updateUser)
		setEditFlag(!editFlag)

	}

	return (
		<div className='whole-page'>
			{editFlag && createPortal(

				<EditModal user={currUser} onUpload ={submitEdit}/>,
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

			<div onClick={openEdit} className='dropdown'>
				<img className='profile-TR' src={'/EditIcon.png'} alt="Edit" height={100} width={100} />
				
			</div>

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
				
				<ProfileFollowStats
					followers={followers}
					following={following}
					openFollowersList={openFollowerList}
					openFollowingList={openFollowingList}
				/>

				{posts.map(post =>(
					<ProfilePosts
						post={post}
						user={currUser}
						deletable={true}
					/>
				))}
			</div>

			<CopyrightFooter/>
		</div>
	)
}

export default Profile