const express = require('express');
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} = require('../controllers/users');
const { validateUser } = require('../middleware/validation');

const router = express.Router();

// GET /api/users - Get all users
router.get('/', getUsers);

// GET /api/users/:id - Get single user by ID
router.get('/:id', getUserById);

// POST /api/users - Create a new user
router.post('/', validateUser, createUser);

// PUT /api/users/:id - Update a user
router.put('/:id', validateUser, updateUser);

// DELETE /api/users/:id - Delete a user
router.delete('/:id', deleteUser);

module.exports = router;
