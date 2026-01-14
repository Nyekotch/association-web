import api from './api';

const apiInstance = api;

// Forum Topics
export const getAllTopics = () => apiInstance.get('/forum-topics');
export const getTopicById = (id) => apiInstance.get(`/forum-topics/${id}`);
export const createTopic = (data) => apiInstance.post('/forum-topics', data);
export const updateTopic = (id, data) => apiInstance.patch(`/forum-topics/${id}`, data);
export const deleteTopic = (id) => apiInstance.delete(`/forum-topics/${id}`);

// Forum Posts
export const getPostsByTopic = (topicId) => apiInstance.get(`/forum-posts?topicid=${topicId}`);
export const createPost = (data) => apiInstance.post('/forum-posts', data);
export const updatePost = (id, data) => apiInstance.patch(`/forum-posts/${id}`, data);
export const deletePost = (id) => apiInstance.delete(`/forum-posts/${id}`);
