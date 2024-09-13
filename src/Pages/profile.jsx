import React, { useState, useEffect } from 'react'

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
      <ul>
        {users.map(user => (
          <li key={user.username || user.email}>{user.fullName}</li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;