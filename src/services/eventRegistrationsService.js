import api from './api';

const apiInstance = api;

export const getAllRegistrations = () => apiInstance.get('/event-registrations');
export const getRegistrationById = (id) => apiInstance.get(`/event-registrations/${id}`);
export const createRegistration = (data) => apiInstance.post('/event-registrations', data);
export const updateRegistration = (id, data) => apiInstance.patch(`/event-registrations/${id}`, data);
export const deleteRegistration = (id) => apiInstance.delete(`/event-registrations/${id}`);
export const getRegistrationsByEvent = (eventId) => apiInstance.get(`/event-registrations?eventid=${eventId}`);
