import api from './api';

const apiInstance = api;

export const getAllArticles = () => apiInstance.get('/blog');
export const getArticleById = (id) => apiInstance.get(`/blog/${id}`);
export const createArticle = (data) => apiInstance.post('/blog', data);
export const updateArticle = (id, data) => apiInstance.patch(`/blog/${id}`, data);
export const deleteArticle = (id) => apiInstance.delete(`/blog/${id}`);
