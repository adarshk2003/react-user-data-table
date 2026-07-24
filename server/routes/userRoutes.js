/**
 * SERVER ROUTES: RESTful User Endpoints
 * Maps REST verbs to UserController methods.
 */
import express from 'express';
import UserController from '../controllers/userController.js';

const router = express.Router();

// Collection routes
router.route('/')
  .get(UserController.getUsers)
  .post(UserController.createUser);

// Member resource routes
router.route('/:id')
  .get(UserController.getUserById)
  .put(UserController.updateUser)
  .delete(UserController.deleteUser);

export default router;
