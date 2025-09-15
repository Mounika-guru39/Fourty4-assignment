// frontend/src/pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useUsers } from '../context/UserContext';
import { userService } from '../services/api';
import UserCard from '../components/UserCard';
import UserForm from '../components/UserForm';
import './Dashboard.css';

const Dashboard = () => {
  const { state, dispatch } = useUsers();
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        const response = await userService.getUsers();
        dispatch({ type: 'SET_USERS', payload: response.data });
      } catch (error) {
        dispatch({ 
          type: 'SET_ERROR', 
          payload: error.response?.data?.error || 'Failed to fetch users' 
        });
      }
    };

    fetchUsers();
  }, [dispatch]);

  const filteredUsers = state.users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (state.loading) return <div className="loading">Loading...</div>;
  if (state.error) return <div className="error">Error: {state.error}</div>;

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>User Management Dashboard</h1>
        <button 
          className="btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : 'Add New User'}
        </button>
      </header>

      {showForm && (
        <div className="form-section">
          <h2>Create New User</h2>
          <UserForm onSuccess={() => setShowForm(false)} />
        </div>
      )}

      <div className="search-section">
        <input
          type="text"
          placeholder="Search users by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="users-grid">
        {filteredUsers.map(user => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <div className="no-users">
          <p>No users found. {searchTerm && 'Try a different search term.'}</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
