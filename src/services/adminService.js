import api from './api';

const apiInstance = api;

export const getAllUsers = () => apiInstance.get('/users');
export const getUserById = (id) => apiInstance.get(`/users/${id}`);
export const updateUser = (id, data) => apiInstance.patch(`/users/${id}`, data);
export const deleteUser = (id) => apiInstance.delete(`/users/${id}`);
export const getUserStats = () => apiInstance.get('/users/stats');
