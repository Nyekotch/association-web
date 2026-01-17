import api from './api';

const apiInstance = api;

// Forum Topics
export const getAllTopics = () => apiInstance.get('/forum-topics');
export const getTopicById = (id) => apiInstance.get(`/forum-topics/${id}`);
export const createTopic = (data) => apiInstance.post('/forum-topics', data);
export const updateTopic = (id, data) => apiInstance.patch(`/forum-topics/${id}`, data);
export const deleteTopic = (id) => apiInstance.delete(`/forum-topics/${id}`);
export const incrementTopicViews = async (id) => {
  try {
    // Essayer l'endpoint dédié d'abord
    return await apiInstance.patch(`/forum-topics/${id}/views`);
  } catch (error) {
    // Si l'endpoint n'existe pas, utiliser update avec incrémentation
    const topicResponse = await apiInstance.get(`/forum-topics/${id}`);
    const currentViews = topicResponse.data.viewcount || 0;
    return apiInstance.patch(`/forum-topics/${id}`, { viewcount: currentViews + 1 });
  }
};

// Forum Posts
export const getPostsByTopic = (topicId) => apiInstance.get(`/forum-posts?topicid=${topicId}`);
export const createPost = (data) => apiInstance.post('/forum-posts', data);
export const updatePost = (id, data) => apiInstance.patch(`/forum-posts/${id}`, data);
export const deletePost = (id) => apiInstance.delete(`/forum-posts/${id}`);
