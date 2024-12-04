import React, { useState, useEffect } from 'react'
import './Data.css'

const Data = () => {
  document.getElementsByClassName('outlet-container')[0].style.filter = 'blur(0px)';
  
  const apiUsers = 'https://knule.duckdns.org/users'
  const apiPosts = 'https://knule.duckdns.org/posts'
  const apiComments = 'https://knule.duckdns.org/comments'
  const apiLikes = 'https://knule.duckdns.org/likes'
  // const apiEndpoint = 'http://localhost:3000/users'

  
  
  // useState to manage users state
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);

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
        setUsers(usersData); // Update the state with the fetched users
        console.log(users)
      } catch (error) {
        console.error('Error fetching users', error);
      }
    };
    fetchUsers();
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
        setPosts(postsData); // Update the state with the fetched users
        console.log(posts)
      } catch (error) {
        console.error('Error fetching posts', error);
      }
    };
    fetchPosts();
  }, []);  // only re-run the effect if apiEndpoint changes

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(apiComments, {
          method: 'GET', // should be lowercase 'method'
        });

        if (!response.ok) {
          throw new Error('Could not reach /comments');
        }
        const commentsData = await response.json();
        setComments(commentsData); // Update the state with the fetched users
        console.log(comments)
      } catch (error) {
        console.error('Error fetching comments', error);
      }
    };
    fetchComments();
  }, []);  // only re-run the effect if apiEndpoint changes

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const response = await fetch(apiLikes, {
          method: 'GET', // should be lowercase 'method'
        });

        if (!response.ok) {
          throw new Error('Could not reach /likes');
        }
        const likesData = await response.json();
        setLikes(likesData); // Update the state with the fetched users
        console.log(likes)
      } catch (error) {
        console.error('Error fetching likes', error);
      }
    };
    fetchLikes();
  }, []);  // only re-run the effect if apiEndpoint changes

  return (
    <div className='totalTable'>
      <h1>Users</h1>
      <table>
        <thead>
        <tr>
          <th>Following</th>
          <th>Posts</th>
          <th>Followers</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Bio</th>
          <th>Friends</th>
          <th>Created At</th>
          <th>Full Name</th>
          <th>Email</th>
          <th>PassWord</th>
          <th>User ID</th>
          <th>Username</th>
        </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr>
              <td>{user.following}</td>
              <td>{user.posts}</td>
              <td>{user.followers}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.bio}</td>
              <td>{user.friends}</td>
              <td>{user.createdAt}</td>
              <td>{user.fullName}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>{user.userId}</td>
              <td>{user.username}</td>
            </tr>
          ))}
        </tbody>
      </table>


      <h1>Posts</h1>
      <table>
        <thead>
        <tr>
          <th>Content</th>
          <th>Post ID</th>
          <th>User ID</th>
          <th>TimeStamp</th>
        </tr>
        </thead>
        <tbody>
          {posts.map(post => (
            <tr>
              <td>{post.content}</td>
              <td>{post.postId}</td>
              <td>{post.userId}</td>
              <td>{post.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>


      <h1>Comments</h1>
      <table>
        <thead>
        <tr>
          <th>Content</th>
          <th>Timestamp</th>
          <th>Post ID</th>
          <th>Comment ID</th>
          <th>Parent Comment ID</th>
          <th>User ID</th>
        </tr>
        </thead>
        <tbody>
          {comments.map(comment => (
            <tr>
              <td>{comment.content}</td>
              <td>{comment.createdAt}</td>
              <td>{comment.postId}</td>
              <td>{comment.commentId}</td>
              <td>{comment.parentCommentId}</td>
              <td>{comment.userId}</td>
            </tr>
          ))}
        </tbody>
      </table>


      <h1>Likes</h1>
      <table>
        <thead>
        <tr>
          <th>Like Type</th>
          <th>Timestamp</th>
          <th>Target Type</th>
          <th>Target ID</th>
          <th>User ID</th>
          <th>Target Owner ID</th>
        </tr>
        </thead>
        <tbody>
          {likes.map(like => (
            <tr>
              <td>{like.like ? 'True' : 'False'}</td>
              <td>{like.createdAt}</td>
              <td>{like.targetType}</td>
              <td>{like.targetId}</td>
              <td>{like.userId}</td>
              <td>{like.targetOwnerId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Data;