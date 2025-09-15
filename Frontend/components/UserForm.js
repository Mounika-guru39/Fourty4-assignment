import React, { useState } from 'react';
import { useUsers } from '../context/UserContext';

const UserForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: { name: '' },
    address: {
      city: '',
      street: '',
      zipcode: '',
      geo: { lat: '', lng: '' }
    }
  });
  const { dispatch } = useUsers();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      ...formData,
      id: Date.now(),
      username: formData.email.split('@')[0]
    };
    dispatch({ type: 'ADD_USER', payload: newUser });
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: { name: '' },
      address: {
        city: '',
        street: '',
        zipcode: '',
        geo: { lat: '', lng: '' }
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="user-form">
      <input
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />
      <input
        type="tel"
        placeholder="Phone"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
      />
      <input
        type="text"
        placeholder="Company Name"
        value={formData.company.name}
        onChange={(e) => setFormData({
          ...formData,
          company: { ...formData.company, name: e.target.value }
        })}
      />
      <button type="submit">Add User</button>
    </form>
  );
};

export default UserForm;
