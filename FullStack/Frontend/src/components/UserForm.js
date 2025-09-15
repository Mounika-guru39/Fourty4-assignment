// frontend/src/pages/UserDetails.js
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { userService } from '../services/api';
import './UserDetails.css';

const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await userService.getUser(id);
        setUser(response.data);
        setFormData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.response?.data?.error || 'Failed to fetch user');
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await userService.updateUser(id, formData);
      setUser(response.data);
      setEditing(false);
    } catch (error) {
      setError(error.response?.data?.errors?.join(', ') || 'Failed to update user');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await userService.deleteUser(id);
        navigate('/');
      } catch (error) {
        setError(error.response?.data?.error || 'Failed to delete user');
      }
    }
  };

  if (loading) return <div className="loading">Loading user details...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="user-details">
      <Link to="/" className="back-link">← Back to Dashboard</Link>
      
      {!editing ? (
        <>
          <div className="user-header">
            <h1>{user.name}</h1>
            <div className="action-buttons">
              <button 
                className="btn-secondary"
                onClick={() => setEditing(true)}
              >
                Edit
              </button>
              <button 
                className="btn-danger"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>

          <div className="user-info">
            <h2>Contact Information</h2>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
            
            <h2>Company</h2>
            <p><strong>Name:</strong> {user.company.name}</p>
            
            <h2>Address</h2>
            <p><strong>Street:</strong> {user.address.street}</p>
            <p><strong>City:</strong> {user.address.city}</p>
            <p><strong>Zipcode:</strong> {user.address.zipcode}</p>
            <p><strong>Geo Location:</strong> {user.address.geo?.lat}, {user.address.geo?.lng}</p>
          </div>
        </>
      ) : (
        <form onSubmit={handleSubmit} className="user-form">
          <h2>Edit User</h2>
          
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              value={formData.name || ''}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={formData.email || ''}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Phone:</label>
            <input
              type="text"
              value={formData.phone || ''}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Company Name:</label>
            <input
              type="text"
              value={formData.company?.name || ''}
              onChange={(e) => setFormData({ 
                ...formData, 
                company: { ...formData.company, name: e.target.value } 
              })}
              required
            />
          </div>
          
          <h3>Address</h3>
          
          <div className="form-group">
            <label>Street:</label>
            <input
              type="text"
              value={formData.address?.street || ''}
              onChange={(e) => setFormData({ 
                ...formData, 
                address: { ...formData.address, street: e.target.value } 
              })}
              required
            />
          </div>
          
          <div className="form-group">
            <label>City:</label>
            <input
              type="text"
              value={formData.address?.city || ''}
              onChange={(e) => setFormData({ 
                ...formData, 
                address: { ...formData.address, city: e.target.value } 
              })}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Zipcode:</label>
            <input
              type="text"
              value={formData.address?.zipcode || ''}
              onChange={(e) => setFormData({ 
                ...formData, 
                address: { ...formData.address, zipcode: e.target.value } 
              })}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Latitude:</label>
            <input
              type="text"
              value={formData.address?.geo?.lat || ''}
              onChange={(e) => setFormData({ 
                ...formData, 
                address: { 
                  ...formData.address, 
                  geo: { ...formData.address.geo, lat: e.target.value } 
                } 
              })}
            />
          </div>
          
          <div className="form-group">
            <label>Longitude:</label>
            <input
              type="text"
              value={formData.address?.geo?.lng || ''}
              onChange={(e) => setFormData({ 
                ...formData, 
                address: { 
                  ...formData.address, 
                  geo: { ...formData.address.geo, lng: e.target.value } 
                } 
              })}
            />
          </div>
          
          <div className="form-actions">
            <button type="submit" className="btn-primary">Save Changes</button>
            <button 
              type="button" 
              className="btn-secondary"
              onClick={() => setEditing(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default UserDetails;
