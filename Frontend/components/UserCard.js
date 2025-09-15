import React from 'react';
import { Link } from 'react-router-dom';

const UserCard = ({ user }) => {
  return (
    <div className="user-card">
      <h3>{user.name}</h3>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      <p>Company: {user.company?.name}</p>
      <Link to={`/user/${user.id}`}>View Details</Link>
    </div>
  );
};

export default UserCard;
