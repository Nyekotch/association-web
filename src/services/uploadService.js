import api from './api';

export const uploadFile = (formData) =>
  api.post('/uploads', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
