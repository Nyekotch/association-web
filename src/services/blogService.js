import api from './api';

export const getAllArticles = () => api.get('/blog');
export const getArticleById = (id) => api.get(`/blog/${id}`);
export const createArticle = (data) => api.post('/blog', data);
export const updateArticle = (id, data) => api.patch(`/blog/${id}`, data);
export const deleteArticle = (id) => api.delete(`/blog/${id}`);
