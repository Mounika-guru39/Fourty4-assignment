import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUsers } from '../context/UserContext';
import UserCard from '../components/UserCard';
import UserForm from '../components/UserForm';

const Dashboard = () => {
  const { state, dispatch } = useUsers();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        dispatch({ type: 'SET_USERS', payload: response.data });
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
        setLoading(false);
      });
  }, [dispatch]);

  const filteredUsers = state.users.filter(user =>
    user.name.toLowerCase().includes(state.searchTerm.toLowerCase())
  );

  if (loading) return <div>Loading...</div>;

  return (
    <div className="dashboard">
      <h1>User Dashboard</h1>
      
      <div className="controls">
        <input
          type="text"
          placeholder="Search by name..."
          value={state.searchTerm}
          onChange={(e) => dispatch({
            type: 'FILTER_USERS',
            payload: e.target.value
          })}
        />
      </div>

      <UserForm />

      <div className="users-grid">
        {filteredUsers.map(user => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
