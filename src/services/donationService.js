import api from './api';

export const createDonation = (data) => api.post('/donations', data);
