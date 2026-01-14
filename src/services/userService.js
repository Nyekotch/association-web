import api from './api';

export const getEventsByUser = (userId) => api.get(`/events?organizerid=${userId}`);
export const getRegistrationsByUser = (userId) => api.get(`/event-registrations?userid=${userId}`);
