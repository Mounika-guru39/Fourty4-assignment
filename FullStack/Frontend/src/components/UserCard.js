// frontend/src/components/UserCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import './UserCard.css';

const UserCard = ({ user }) => {
  return (
    <div className="user-card">
      <h3>{user.name}</h3>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Phone:</strong> {user.phone}</p>
      <p><strong>Company:</strong> {user.company.name}</p>
      <div className="card-actions">
        <Link to={`/user/${user.id}`} className="btn-link">View Details</Link>
      </div>
    </div>
  );
};

export default UserCard;
