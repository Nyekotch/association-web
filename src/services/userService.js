import api from './api';

const apiInstance = api;

export const getEventsByUser = (userId) => apiInstance.get(`/events?organizerid=${userId}`);
export const getRegistrationsByUser = (userId) => apiInstance.get(`/event-registrations?userid=${userId}`);
