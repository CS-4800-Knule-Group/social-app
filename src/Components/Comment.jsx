import React, { useEffect, useState } from "react";
import moment from 'moment';
import './Comment.css';

const Comment = ({ comment }) => {
    const [user, setUser] = useState(null);
    const IMG_SIZE = 100;
    comment.timestamp = moment(comment.timestamp).local().format('MMMM D, YYYY [at] h:mm A')

    useEffect(() => {
        const userApi = `https://knule.duckdns.org/users/${comment.userId}`;   // userId from post
        // const userApi = `http://localhost:3000/users/${comment.userId}`;   // local test

        const fetchUser = async() => {
            try {
                const response = await fetch(userApi);
    
                if (!response.ok) {
                    throw new Error('Failed to fetch post');
                }
                // parse json response
                const userData = await response.json();
                setUser(userData);
                console.log(userData)
            } catch (error) {
                console.error('Error fetching user: ', error);
            }
        }
        fetchUser();
    }, [comment]);

    const openProfile = (userId) => {
        navigate(`/profile/${userId}`);
        location.reload();
    }

    return (
        <div className="comment-container">
            <div className="leftside-comment">
                <div className="comment-header">
                    <img className="comment-profilePic" src={user ? user.pfp : '/defaultProfilePic.jpg'} height={IMG_SIZE} width={IMG_SIZE}/>
                    <div className="header-texts">
                        <h1 className="comment-username" onClick={() => openProfile(user.userId)}>{user ? user.username : "NoUserNameFound"}</h1>
                        <p className="commentTime">{comment.timestamp}</p>
                    </div>
                </div>

                {comment && <p className="comment-text">{comment.content}</p>}
            </div>
        </div>
    )
}

export default Comment;