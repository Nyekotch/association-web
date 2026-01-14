import api from './api';

const apiInstance = api;

export const createDonation = (data) => apiInstance.post('/donations', data);
