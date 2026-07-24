/**
 * CLIENT SERVICE: userRestService
 * Implements RESTful HTTP resource endpoints.
 */
import httpClient from './httpClient';
import UserModel from '../models/UserModel';

export const userRestService = {
  // REST GET /users
  async getAllUsers() {
    const response = await httpClient.get('/users');
    const rawList = response.data.data || response.data || [];
    return rawList.map(item => UserModel.fromREST(item));
  },

  // REST GET /users/:id
  async getUserById(id) {
    const response = await httpClient.get(`/users/${id}`);
    return UserModel.fromREST(response.data.data || response.data);
  },

  // REST POST /users
  async createUser(userModel) {
    const payload = userModel instanceof UserModel ? userModel.toREST() : userModel;
    const response = await httpClient.post('/users', payload);
    return UserModel.fromREST(response.data.data || response.data);
  },

  // REST PUT /users/:id
  async updateUser(id, userModel) {
    const payload = userModel instanceof UserModel ? userModel.toREST() : userModel;
    const response = await httpClient.put(`/users/${id}`, payload);
    return UserModel.fromREST(response.data.data || response.data);
  },

  // REST DELETE /users/:id
  async deleteUser(id) {
    const response = await httpClient.delete(`/users/${id}`);
    return response.data?.data?.id || id;
  }
};

export default userRestService;
