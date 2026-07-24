/**
 * SERVER CONTROLLER: UserController
 * Handles HTTP requests, invokes UserModel, returns RESTful JSON responses & HTTP status codes.
 */
import UserModel from '../models/userModel.js';

export const UserController = {
  // GET /api/users
  getUsers(req, res) {
    try {
      const users = UserModel.findAll();
      return res.status(200).json({
        status: 'success',
        results: users.length,
        data: users
      });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        message: 'Internal server error while fetching users'
      });
    }
  },

  // GET /api/users/:id
  getUserById(req, res) {
    try {
      const user = UserModel.findById(req.params.id);
      if (!user) {
        return res.status(404).json({
          status: 'fail',
          message: `User with ID ${req.params.id} not found`
        });
      }
      return res.status(200).json({
        status: 'success',
        data: user
      });
    } catch (error) {
      return res.status(500).json({ status: 'error', message: error.message });
    }
  },

  // POST /api/users
  createUser(req, res) {
    try {
      const { name, email } = req.body;
      if (!name || !email) {
        return res.status(400).json({
          status: 'fail',
          message: 'Validation Error: Name and Email are required fields'
        });
      }

      const newUser = UserModel.create(req.body);
      return res.status(201).json({
        status: 'success',
        message: 'User created successfully',
        data: newUser
      });
    } catch (error) {
      return res.status(500).json({ status: 'error', message: error.message });
    }
  },

  // PUT /api/users/:id
  updateUser(req, res) {
    try {
      const updatedUser = UserModel.update(req.params.id, req.body);
      if (!updatedUser) {
        return res.status(404).json({
          status: 'fail',
          message: `User with ID ${req.params.id} not found`
        });
      }

      return res.status(200).json({
        status: 'success',
        message: 'User updated successfully',
        data: updatedUser
      });
    } catch (error) {
      return res.status(500).json({ status: 'error', message: error.message });
    }
  },

  // DELETE /api/users/:id
  deleteUser(req, res) {
    try {
      const success = UserModel.delete(req.params.id);
      if (!success) {
        return res.status(404).json({
          status: 'fail',
          message: `User with ID ${req.params.id} not found`
        });
      }

      return res.status(200).json({
        status: 'success',
        message: `User ID ${req.params.id} deleted successfully`,
        data: { id: Number(req.params.id) }
      });
    } catch (error) {
      return res.status(500).json({ status: 'error', message: error.message });
    }
  }
};

export default UserController;
