import React, { useState, useEffect } from 'react'

const Profile = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Define the API endpoint
    const apiEndpoint = 'http://knule.duckdns.org/users';  // Replace with your EC2 IP or domain

    // Fetch users from the backend
    const fetchUsers = async () => {
      try {
        const response = await fetch(apiEndpoint, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();  // Parse the JSON data
        setUsers(data);  // Set the users data in state
      } catch (error) {
        setError(error.message);  // Handle any errors
      } finally {
        setLoading(false);  // Turn off loading state
      }
    };

    fetchUsers();  // Call the function to fetch data
  }, []);

  // Render UI
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Profile