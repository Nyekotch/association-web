import api from './api';

const apiInstance = api;

export const login = (data) => apiInstance.post('/auth/login', data);
export const register = (data) => apiInstance.post('/auth/register', data);
export const refresh = (data) => apiInstance.post('/auth/refresh', data);
