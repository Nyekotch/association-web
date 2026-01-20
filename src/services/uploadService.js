import api from './api';

const apiInstance = api;

export const uploadFile = (formData) =>
  apiInstance.post('/upload/image', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
