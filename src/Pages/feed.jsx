import React, { useEffect, useState } from 'react'
import './Feed.css'

const Feed = () => {
	
	const[posts, setPosts] = useState([])
	const apiPosts = 'https://knule.duckdns.org/posts'

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
				setPosts(postsData); // Update the state with the fetched users
				console.log(posts)
			} catch (error) {
				console.error('Error fetching posts', error);
			}
			};
			fetchPosts();
	})
return (
	<div>
		<div className='feed'>
			{posts.map(post =>(
				<div className='post'>
				<div className='poster'>
					<img className='profilePicture' src='/kirb.jpg' height={100} width={100} />
					<div className='textInfo'>
						<h1 className='username'>{post.userId}</h1>
						<p className='postTime'>{post.timestamp}</p>
					</div>
				</div>
				<p>{post.content}</p>
			</div>
			))}
		</div>
	</div>
)
}

export default Feed