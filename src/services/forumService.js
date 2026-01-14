import api from './api';

// Forum Topics
export const getAllTopics = () => api.get('/forum-topics');
export const getTopicById = (id) => api.get(`/forum-topics/${id}`);
export const createTopic = (data) => api.post('/forum-topics', data);
export const updateTopic = (id, data) => api.patch(`/forum-topics/${id}`, data);
export const deleteTopic = (id) => api.delete(`/forum-topics/${id}`);

// Forum Posts
export const getPostsByTopic = (topicId) => api.get(`/forum-posts?topicid=${topicId}`);
export const createPost = (data) => api.post('/forum-posts', data);
export const updatePost = (id, data) => api.patch(`/forum-posts/${id}`, data);
export const deletePost = (id) => api.delete(`/forum-posts/${id}`);
