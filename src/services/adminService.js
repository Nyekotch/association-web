import api from './api';

const apiInstance = api;

export const getAllUsers = () => apiInstance.get('/users');
export const getUserById = (id) => apiInstance.get(`/users/${id}`);
export const updateUser = (id, data) => apiInstance.patch(`/users/${id}`, data);
export const deleteUser = (id) => apiInstance.delete(`/users/${id}`);
export const getUserStats = () => apiInstance.get('/users/stats');
export const updateUserRole = (id, role) => apiInstance.patch(`/users/${id}/role`, { role });
export const toggleUserStatus = (id) => apiInstance.patch(`/users/${id}/toggle-status`);

export const getAllEvents = () => apiInstance.get('/events');
export const createEvent = (data) => apiInstance.post('/events', data);
export const updateEvent = (id, data) => apiInstance.patch(`/events/${id}`, data);
export const deleteEvent = (id) => apiInstance.delete(`/events/${id}`);

export const getAllArticles = () => apiInstance.get('/blog');
export const createArticle = (data) => apiInstance.post('/blog', data);
export const updateArticle = (id, data) => apiInstance.patch(`/blog/${id}`, data);
export const deleteArticle = (id) => apiInstance.delete(`/blog/${id}`);

export const getAllDonations = () => {
  console.warn('Donations module not implemented in backend yet');
  return Promise.resolve({ data: [] });
};
export const getDonationStats = () => {
  console.warn('Donations module not implemented in backend yet');
  return Promise.resolve({ data: { total: 0, month: 0 } });
};
export const updateDonationStatus = (id, status) => {
  console.warn('Donations module not implemented in backend yet');
  return Promise.resolve({ data: null });
};

// Forum management functions
export const getAllTopics = () => apiInstance.get('/forum-topics');
export const getTopicById = (id) => apiInstance.get(`/forum-topics/${id}`);
export const updateTopic = (id, data) => apiInstance.patch(`/forum-topics/${id}`, data);
export const deleteTopic = (id) => apiInstance.delete(`/forum-topics/${id}`);
export const lockTopic = (id) => apiInstance.patch(`/forum-topics/${id}/lock`);
export const unlockTopic = (id) => apiInstance.patch(`/forum-topics/${id}/unlock`);
export const pinTopic = (id) => apiInstance.patch(`/forum-topics/${id}/pin`);
export const unpinTopic = (id) => apiInstance.patch(`/forum-topics/${id}/unpin`);
