import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllTopics, createTopic, updateTopic, deleteTopic } from '../../services/forumService';
import useAuthStore from '../../stores/authStore';
import toast from 'react-hot-toast';

const ForumPage = () => {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newTopic, setNewTopic] = useState({ title: '', content: '' });
  const [creating, setCreating] = useState(false);
  const [editingTopic, setEditingTopic] = useState(null);
  const [editTopic, setEditTopic] = useState({ title: '', content: '' });
  const [deletingTopic, setDeletingTopic] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null);
  const { user } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchTopics();
  }, []);

  useEffect(() => {
    const handleClickOutside = () => setActiveMenu(null);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const fetchTopics = async () => {
    try {
      const response = await getAllTopics();
      setTopics(response.data);
    } catch (error) {
      toast.error('Erreur lors du chargement des sujets');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTopic = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error('Vous devez être connecté pour créer un sujet');
      navigate('/login');
      return;
    }

    if (!newTopic.title.trim() || !newTopic.content.trim()) {
      toast.error('Veuillez remplir tous les champs');
      return;
    }

    setCreating(true);
    try {
      await createTopic({
        title: newTopic.title,
        description: newTopic.content,
        creatorid: user.id
      });
      
      toast.success('Sujet créé avec succès !');
      setNewTopic({ title: '', content: '' });
      setShowCreateForm(false);
      fetchTopics();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Erreur lors de la création du sujet');
    } finally {
      setCreating(false);
    }
  };

  const handleEditTopic = (topic) => {
    setEditingTopic(topic.id);
    setEditTopic({ 
      title: topic.title, 
      content: topic.description || topic.content 
    });
  };

  const handleUpdateTopic = async (topicId) => {
    if (!editTopic.title.trim() || !editTopic.content.trim()) {
      toast.error('Veuillez remplir tous les champs');
      return;
    }

    try {
      await updateTopic(topicId, {
        title: editTopic.title,
        description: editTopic.content
      });
      toast.success('Sujet modifié avec succès !');
      setEditingTopic(null);
      setEditTopic({ title: '', content: '' });
      fetchTopics();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Erreur lors de la modification');
    }
  };

  const handleDeleteTopic = async (topicId) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce sujet et toutes ses réponses ?')) {
      return;
    }

    setDeletingTopic(topicId);
    try {
      await deleteTopic(topicId);
      toast.success('Sujet supprimé avec succès !');
      fetchTopics();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Erreur lors de la suppression');
    } finally {
      setDeletingTopic(null);
    }
  };

  const canEditTopic = (topic) => {
    return user && topic.creatorid === user.id;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-r-2 border-t-2 border-indigo-600"></div>
          <p className="mt-4 text-gray-600">Chargement des sujets...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Forum de la communauté
              </h1>
              <p className="text-gray-600 mt-1">
                Partagez vos idées et participez aux discussions
              </p>
            </div>
            {user && (
              <button
                onClick={() => setShowCreateForm(!showCreateForm)}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                {showCreateForm ? 'Annuler' : '✨ Nouveau sujet'}
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Formulaire de création */}
        {showCreateForm && (
          <div className="mb-8 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4">
              <h2 className="text-xl font-bold text-white">
                Créer un nouveau sujet
              </h2>
            </div>
            <form onSubmit={handleCreateTopic} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Titre du sujet
                </label>
                <input
                  type="text"
                  value={newTopic.title}
                  onChange={(e) => setNewTopic({ ...newTopic, title: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Entrez un titre clair et concis"
                  maxLength={200}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contenu
                </label>
                <textarea
                  value={newTopic.content}
                  onChange={(e) => setNewTopic({ ...newTopic, content: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  rows={6}
                  placeholder="Décrivez votre sujet en détail..."
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={creating}
                  className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  {creating ? 'Création...' : '🚀 Créer le sujet'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Statistiques */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <div className="text-2xl">💬</div>
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-blue-600">{topics.length}</div>
                <div className="text-sm text-gray-600">Sujets actifs</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <div className="text-2xl">👥</div>
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-green-600">
                  {topics.reduce((acc, topic) => acc + (topic.posts?.length || 0), 0)}
                </div>
                <div className="text-sm text-gray-600">Total réponses</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg">
                <div className="text-2xl">🔥</div>
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-purple-600">
                  {topics.filter(topic => {
                    const createdAt = new Date(topic.createdat);
                    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
                    return createdAt > weekAgo;
                  }).length}
                </div>
                <div className="text-sm text-gray-600">Cette semaine</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 bg-orange-100 rounded-lg">
                <div className="text-2xl">⭐</div>
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-orange-600">
                  {topics.filter(topic => topic.posts?.length > 5).length}
                </div>
                <div className="text-sm text-gray-600">Sujets populaires</div>
              </div>
            </div>
          </div>
        </div>

        {/* Liste des sujets */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center">
              <span className="mr-2">📚</span>
              {topics.length} sujet{topics.length > 1 ? 's' : ''} de discussion
            </h2>
          </div>
          
          {topics.length === 0 ? (
            <div className="p-16 text-center">
              <div className="text-6xl mb-4">🌱</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucun sujet de discussion</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Soyez le premier à lancer une conversation et à partager vos idées avec la communauté !
              </p>
              {user && (
                <button
                  onClick={() => setShowCreateForm(true)}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                >
                  ✨ Créer le premier sujet
                </button>
              )}
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {topics.map((topic) => (
                <div key={topic.id} className="hover:bg-gray-50 transition-colors">
                  {editingTopic === topic.id ? (
                    <div className="p-6 space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Titre du sujet
                        </label>
                        <input
                          type="text"
                          value={editTopic.title}
                          onChange={(e) => setEditTopic({ ...editTopic, title: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          maxLength={200}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Contenu
                        </label>
                        <textarea
                          value={editTopic.content}
                          onChange={(e) => setEditTopic({ ...editTopic, content: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          rows={4}
                        />
                      </div>
                      <div className="flex justify-end space-x-3">
                        <button
                          onClick={() => {
                            setEditingTopic(null);
                            setEditTopic({ title: '', content: '' });
                          }}
                          className="px-3 py-1 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 text-sm"
                        >
                          Annuler
                        </button>
                        <button
                          onClick={() => handleUpdateTopic(topic.id)}
                          className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
                        >
                          Enregistrer
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div
                      onClick={() => navigate(`/forum/${topic.id}`)}
                      className="p-6 cursor-pointer"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center mb-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                              {topic.creator?.name?.charAt(0) || topic.author?.name?.charAt(0) || '?'}
                            </div>
                            <div className="ml-3">
                              <span className="font-medium text-gray-900">
                                {topic.creator?.name || topic.author?.name || 'Utilisateur anonyme'}
                              </span>
                              <span className="text-sm text-gray-500 ml-2">
                                • {formatDate(topic.createdat)}
                              </span>
                            </div>
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-indigo-600 transition-colors">
                            {topic.title}
                          </h3>
                          <p className="text-gray-600 line-clamp-2 mb-3">
                            {topic.description || topic.content}
                          </p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className="flex items-center">
                              <div className="text-lg mr-1">💬</div>
                              {topic.posts?.length || 0} réponse{topic.posts?.length > 1 ? 's' : ''}
                            </span>
                            <span className="flex items-center">
                              <div className="text-lg mr-1">👁</div>
                              {topic.viewcount || 0} vue{topic.viewcount > 1 ? 's' : ''}
                            </span>
                            {topic.ispinned && (
                              <span className="flex items-center">
                                <div className="text-lg mr-1">📌</div>
                                Épinglé
                              </span>
                            )}
                          </div>
                        </div>
                        {canEditTopic(topic) && (
                          <div className="relative">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveMenu(activeMenu === topic.id ? null : topic.id);
                              }}
                              className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition-colors"
                            >
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                              </svg>
                            </button>
                            
                            {activeMenu === topic.id && (
                              <div className="absolute right-0 mt-1 w-32 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveMenu(null);
                                    handleEditTopic(topic);
                                  }}
                                  className="w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-t-lg"
                                >
                                  ✏️ Modifier
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveMenu(null);
                                    handleDeleteTopic(topic.id);
                                  }}
                                  disabled={deletingTopic === topic.id}
                                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-b-lg disabled:opacity-50"
                                >
                                  {deletingTopic === topic.id ? '🗑️ Suppression...' : '🗑️ Supprimer'}
                                </button>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForumPage;
