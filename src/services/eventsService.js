import api from './api';

const apiInstance = api;

export const getAllEvents = () => apiInstance.get('/events');
export const getEventById = (id) => apiInstance.get(`/events/${id}`);
export const createEvent = (data) => apiInstance.post('/events', data);
export const updateEvent = (id, data) => apiInstance.patch(`/events/${id}`, data);
export const deleteEvent = (id) => apiInstance.delete(`/events/${id}`);
