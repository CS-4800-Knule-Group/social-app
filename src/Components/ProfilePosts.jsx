import React from 'react';
import Cookies from 'js-cookie';
import './ProfilePosts.css'


const apiPosts = 'https://knule.duckdns.org/posts'

const ProfilePosts = ({ post, user, deletable }) => {
    const deletePost = async () => {
        try {
            const response = await fetch(`${apiPosts}/del/${user.userId}/${post.postId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + Cookies.get('loginAuth'),
                },
            });

            const result = await response.json();

            if (response.status === 200) {
                console.log(result.success);
                window.location.reload();
            } else {
                console.error('Failed to delete post:', result.error);
            }
        } catch (err) {
            console.error("Post deletion failed:", err);
        }
    };



  return (
	<div key={post.postId} className='post'>
		<div className='poster'>
			<img className= 'post-profilePic' src={user ? user.pfp : '/kirb.jpg'} height={100} width={100} />
			<div className='postTexts'>
				<h1 className='post-username'>{user ? user.username : "NoUserNameFound"}</h1>
				<p className='postTime'>{post.timestamp}</p>
			</div>
		</div>

		{post.content && <p className='post-text'>{post.content}</p>}
        {(post.images.length > 0) &&
            post.images.map(img => (
                <div>
                    <img src={img}></img>
                </div>
        ))
        }
		{deletable ? (<p onClick={deletePost} className='deletePost'>Delete Post</p>) : null }
	</div>
  );
};

export default ProfilePosts;