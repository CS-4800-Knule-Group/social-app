import React, { useState, useEffect } from 'react'
import './profile.css'

const Profile = () => {
  const apiEndpoint = 'https://knule.duckdns.org/users'
  // const apiEndpoint = 'http://localhost:3000/users'
  
  // useState to manage users state
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(apiEndpoint, {
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

  return (
    <div>
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
    </div>
  );
};

export default Profile;