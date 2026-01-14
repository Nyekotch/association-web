import api from './api';

export const getAllRegistrations = () => api.get('/event-registrations');
export const getRegistrationById = (id) => api.get(`/event-registrations/${id}`);
export const createRegistration = (data) => api.post('/event-registrations', data);
export const updateRegistration = (id, data) => api.patch(`/event-registrations/${id}`, data);
export const deleteRegistration = (id) => api.delete(`/event-registrations/${id}`);
export const getRegistrationsByEvent = (eventId) => api.get(`/event-registrations?eventid=${eventId}`);
