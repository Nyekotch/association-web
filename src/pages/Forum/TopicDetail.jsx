import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTopicById, getPostsByTopic, createPost, updatePost, deletePost } from '../../services/forumService';
import useAuthStore from '../../stores/authStore';
import toast from 'react-hot-toast';

const TopicDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [topic, setTopic] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newPost, setNewPost] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [editContent, setEditContent] = useState('');
  const [deletingPost, setDeletingPost] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null);
  const [sortBy, setSortBy] = useState('newest');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchTopicData();
  }, [id]);

  useEffect(() => {
    const handleClickOutside = () => setActiveMenu(null);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const fetchTopicData = async () => {
    try {
      const [topicResponse, postsResponse] = await Promise.all([
        getTopicById(id),
        getPostsByTopic(id)
      ]);
      setTopic(topicResponse.data);
      setPosts(postsResponse.data);
    } catch (error) {
      toast.error('Sujet non trouvé');
      navigate('/forum');
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error('Vous devez être connecté pour répondre');
      navigate('/login');
      return;
    }

    if (!newPost.trim()) {
      toast.error('Veuillez écrire une réponse');
      return;
    }

    setSubmitting(true);
    try {
      await createPost({
        content: newPost,
        topicid: id,
        authorid: user.id
      });
      
      toast.success('Réponse ajoutée !');
      setNewPost('');
      fetchTopicData(); // Rafraîchir les posts
    } catch (error) {
      toast.error(error.response?.data?.message || 'Erreur lors de l\'ajout de la réponse');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditPost = (post) => {
    setEditingPost(post.id);
    setEditContent(post.content);
  };

  const handleUpdatePost = async (postId) => {
    if (!editContent.trim()) {
      toast.error('Veuillez écrire un contenu');
      return;
    }

    try {
      await updatePost(postId, { content: editContent });
      toast.success('Post modifié avec succès !');
      setEditingPost(null);
      setEditContent('');
      fetchTopicData();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Erreur lors de la modification');
    }
  };

  const handleDeletePost = async (postId) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce post ?')) {
      return;
    }

    setDeletingPost(postId);
    try {
      await deletePost(postId);
      toast.success('Post supprimé avec succès !');
      fetchTopicData();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Erreur lors de la suppression');
    } finally {
      setDeletingPost(null);
    }
  };

  const canEditPost = (post) => {
    return user && post.authorid === user.id;
  };

  const filteredAndSortedPosts = posts
    .filter(post => 
      searchTerm === '' || 
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.createdat) - new Date(a.createdat);
      } else if (sortBy === 'oldest') {
        return new Date(a.createdat) - new Date(b.createdat);
      } else if (sortBy === 'popular') {
        return (b.likescount || 0) - (a.likescount || 0);
      }
      return 0;
    });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <div className="flex items-center justify-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-r-2 border-t-2 border-indigo-600"></div>
            <p className="ml-4 text-gray-600">Chargement de la discussion...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!topic) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="text-center text-red-600">
          Sujet non trouvé
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
            <button 
              onClick={() => navigate('/forum')}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Retour au forum
            </button>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">
                {posts.length} réponse{posts.length > 1 ? 's' : ''}
              </span>
              <span className="text-sm text-gray-500">
                {topic.viewcount || 0} vue{topic.viewcount > 1 ? 's' : ''}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        {/* Sujet principal */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-white mb-3">{topic.title}</h1>
                <div className="flex items-center space-x-4 text-indigo-100">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white font-bold mr-3">
                      {topic.creator?.name?.charAt(0) || topic.author?.name?.charAt(0) || '?'}
                    </div>
                    <span className="font-medium">
                      {topic.creator?.name || topic.author?.name || 'Utilisateur anonyme'}
                    </span>
                  </div>
                  <span>•</span>
                  <span>{formatDate(topic.createdat)}</span>
                  {topic.ispinned && (
                    <span className="flex items-center">
                      <div className="text-lg mr-1">📌</div>
                      Épinglé
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-8">
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="text-lg leading-relaxed">{topic.description || topic.content}</p>
            </div>
          </div>
        </div>

        {/* Barre d'outils de discussion */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Rechercher dans les réponses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent w-64"
                />
                <svg className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="newest">Plus récents</option>
                <option value="oldest">Plus anciens</option>
                <option value="popular">Plus populaires</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span>{filteredAndSortedPosts.length} réponse{filteredAndSortedPosts.length > 1 ? 's' : ''}</span>
              {searchTerm && (
                <span className="text-indigo-600">• filtré</span>
              )}
            </div>
          </div>
        </div>

        
        {/* Discussion - Réponses */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <div className="text-3xl mr-3">💭</div>
              Discussion
              <span className="ml-3 text-lg font-normal text-gray-600">
                ({filteredAndSortedPosts.length} réponse{filteredAndSortedPosts.length > 1 ? 's' : ''})
              </span>
            </h2>
          </div>
          
          {filteredAndSortedPosts.length === 0 ? (
            <div className="p-16 text-center">
              <div className="text-6xl mb-4">🌱</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {searchTerm ? 'Aucune réponse trouvée' : 'Soyez le premier à répondre !'}
              </h3>
              <p className="text-gray-600 max-w-md mx-auto">
                {searchTerm 
                  ? 'Essayez de modifier votre recherche pour trouver des réponses.'
                  : 'Lancez la conversation en partageant votre point de vue.'
                }
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {filteredAndSortedPosts.map((post, index) => (
                <div key={post.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start space-x-4">
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                        {post.author?.name?.charAt(0) || '?'}
                      </div>
                      {index === 0 && (
                        <div className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                          1
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <span className="font-semibold text-gray-900 text-lg">
                            {post.author?.name || 'Utilisateur anonyme'}
                          </span>
                          <span className="text-sm text-gray-500">
                            {formatDate(post.createdat)}
                          </span>
                          {post.likescount > 0 && (
                            <span className="flex items-center text-sm text-red-500">
                              <div className="text-lg mr-1">❤️</div>
                              {post.likescount}
                            </span>
                          )}
                        </div>
                        {canEditPost(post) && (
                          <div className="relative">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveMenu(activeMenu === post.id ? null : post.id);
                              }}
                              className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition-colors"
                            >
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                              </svg>
                            </button>
                            
                            {activeMenu === post.id && (
                              <div className="absolute right-0 mt-1 w-40 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveMenu(null);
                                    handleEditPost(post);
                                  }}
                                  className="w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-t-lg flex items-center"
                                >
                                  <span className="mr-2">✏️</span>
                                  Modifier
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveMenu(null);
                                    handleDeletePost(post.id);
                                  }}
                                  disabled={deletingPost === post.id}
                                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-b-lg disabled:opacity-50 flex items-center"
                                >
                                  <span className="mr-2">🗑️</span>
                                  {deletingPost === post.id ? 'Suppression...' : 'Supprimer'}
                                </button>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                      
                      {editingPost === post.id ? (
                        <div className="space-y-4">
                          <textarea
                            value={editContent}
                            onChange={(e) => setEditContent(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                            rows={4}
                          />
                          <div className="flex justify-end space-x-3">
                            <button
                              onClick={() => {
                                setEditingPost(null);
                                setEditContent('');
                              }}
                              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                            >
                              Annuler
                            </button>
                            <button
                              onClick={() => handleUpdatePost(post.id)}
                              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                              Enregistrer
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="prose prose-lg max-w-none text-gray-700">
                          <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-indigo-500">
                            <p className="text-gray-800 leading-relaxed">{post.content}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Formulaire de réponse */}
        {user && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-4">
              <h3 className="text-xl font-bold text-white flex items-center">
                <div className="text-2xl mr-2">💬</div>
                Participer à la discussion
              </h3>
            </div>
            <form onSubmit={handleCreatePost} className="p-6 space-y-4">
              <div>
                <textarea
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                  rows={4}
                  placeholder="Partagez votre point de vue, posez une question ou apportez une réponse..."
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={submitting || !newPost.trim()}
                  className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  {submitting ? 'Envoi en cours...' : '🚀 Publier ma réponse'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Message pour les utilisateurs non connectés */}
        {!user && (
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-8 text-center">
            <div className="text-5xl mb-4">🔐</div>
            <h3 className="text-xl font-bold text-blue-900 mb-3">
              Rejoignez la discussion !
            </h3>
            <p className="text-blue-800 mb-6 max-w-md mx-auto">
              Connectez-vous pour partager vos idées, poser vos questions et participer à la conversation.
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => navigate('/login')}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg"
              >
                Se connecter
              </button>
              <button
                onClick={() => navigate('/register')}
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors border-2 border-blue-200"
              >
                Créer un compte
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopicDetail;
