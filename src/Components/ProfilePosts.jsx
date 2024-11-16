import React from 'react';

const apiPosts = 'https://knule.duckdns.org/posts'

const ProfilePosts = ({ post, user }) => {
  return (
	<div key={post.postId} className='post'>
						<div className='poster'>
							<img className= 'post-profilePic' src='/kirb.jpg' height={100} width={100} />
							<h1 className='post-username'>{user.username}</h1>
							<h3 className='post-fullName'>{user.fullName || "NoNameFound"}</h3>
							<div className='textInfo'>
								<p className='postTime'>{post.timestamp}</p>
							</div>
							<p>X</p>
						</div>
						{post.content && <p>{post.content}</p>}
					</div>
  );
};

export default ProfilePosts;
