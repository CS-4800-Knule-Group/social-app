import { React, useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import './Profile.css'
import { createPortal } from 'react-dom';
import LoginForm from '../Components/LoginForm.jsx';
import FollowingList from '../Components/FollowingList.jsx';
import FollowerList from '../Components/FollowerList.jsx';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import ProfileImages from '../Components/ProfileImages.jsx';
import ProfileHeader from '../Components/ProfileHeader.jsx';
import ProfileFollowStats from '../Components/ProfileFollowStats.jsx';
import ProfilePosts from '../Components/ProfilePosts.jsx';
import FollowButton from '../Components/FollowButton.jsx';
import MessageButton from '../Components/MessageButton.jsx';

const ProfileOther = () => {

    const params = useParams();

    const apiUsers = 'https://knule.duckdns.org/users'
    const apiPosts = 'https://knule.duckdns.org/posts'
    const [validCookie, setValidCookie] = useState(Cookies.get('loginAuth'));
    const [decryptToken, setDecryptToken] = useState(Cookies.get('loginAuth') ? jwtDecode(Cookies.get('loginAuth')) : undefined);
    const [openModal, setOpenModal] = useState(Cookies.get('loginAuth') ? false : true)
    const [openFollowingModal, setFollowingOpenModal] = useState(false);
    const [openFollowerModal, setFollowerOpenModal] = useState(false);
    const [users, setUsers] = useState([])
    const [posts, setPosts] = useState([])
    const [followButton, setFollowButton] = useState(true);
    const [currUser, setCurrUser] = useState([])
    const [followers, setFollowers] = useState([])
    const [following, setFollowing] = useState([]);

    const fetchLogin = async (e) => {
        e.preventDefault();

        const username = e.target.username.value;
        const password = e.target.password.value;

        try {
            const response = await fetch('https://knule.duckdns.org/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
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
        console.log({ validCookie })
        console.log({ decryptToken })

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


    const onFollow = async () => {
        try {
            const response = await fetch(apiUsers + '/toggleFollowers', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'userId': decryptToken.userId,
                    'targetId': params.id
                })
            })

            const resData = await response.text();
            console.log(resData);
            window.location.reload();

        } catch (err) {
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

    const openFollowingList = () => {
        setFollowingOpenModal(true);
    }

    const openFollowerList = () => {
        setFollowerOpenModal(true);
    }


    return (
        <div>
        {openModal && createPortal(
              <LoginForm onSubmit={fetchLogin} />,
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
				banner={currUser.length != 0 ? currUser[0].pfBanner : '/kirbBanner.jpg'}
				profilePic={currUser.length != 0 ? currUser[0].pfp : "/kirb.jpg"}
			/>
            
			<ProfileHeader
				fullName={"@" + (currUser.length != 0 ? currUser[0].username : "Kirby Watterson")}
				username={currUser.length != 0 ? currUser[0].fullName : "Kirby Watterson"}
				bio={currUser.length != 0 ? currUser[0].bio : "noBioFound"}
            />
			
            <div className='follow-section'>
				<ProfileFollowStats
					followers = {followers}
					following = {following}
                    openFollowersList={openFollowerList}
                    openFollowingList={openFollowingList}

				/>
				
				<FollowButton
					onFollow={onFollow}
					decryptToken={decryptToken}
					users={users}
				/>
                
				<MessageButton
					params={params}
				/>
            </div>
            {posts.map(post =>(
				<ProfilePosts
					post={post}
					user={currUser}
				/>
                ))}
            </div>
        </div>
    )
}

export default ProfileOther