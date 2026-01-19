import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTopicById, getPostsByTopic, createPost, updatePost, deletePost, incrementTopicViews } from '../../services/forumService';
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

  // États pour le chat
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

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
      
      // Initialiser le chat avec les posts du forum
      const chatMessagesFromPosts = postsResponse.data.map(post => ({
        id: post.id,
        text: post.content,
        sender: post.authorid === user?.id ? "me" : "other",
        time: new Date(post.createdat).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
        author: post.author?.name || "Utilisateur anonyme"
      }));
      setMessages(chatMessagesFromPosts);
      
      // Incrémenter les vues du sujet
      try {
        await incrementTopicViews(id);
      } catch (viewError) {
        // Silently fail - ne pas bloquer l'affichage si l'incrément échoue
        console.log('Incrément de vues non disponible:', viewError.message);
      }
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
      return;
    }

    if (!newPost.trim()) {
      toast.error('Veuillez écrire un contenu');
      return;
    }

    setSubmitting(true);
    try {
      await createPost(id, { content: newPost });
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

  // Fonctions de gestion du chat
  const handleSendMessage = async () => {
    if (inputMessage.trim()) {
      // Créer un nouveau post dans le Forum
      try {
        await createPost({
          topicId: id,
          authorId: user?.id,
          content: inputMessage
        });
        toast.success('Message envoyé avec succès !');
        setInputMessage("");
        fetchTopicData(); // Rafraîchir les posts et le chat
      } catch (error) {
        toast.error(error.response?.data?.message || 'Erreur lors de l\'envoi du message');
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const canEditPost = (post) => {
    return user && post.authorid === user.id;
  };

  // Grouper les messages par jour
  const groupMessagesByDay = (messages, posts) => {
    const grouped = {};
    
    messages.forEach((message, index) => {
      // Utiliser la date complète du post correspondant
      const post = posts[index];
      if (!post) return;
      
      const messageDate = new Date(post.createdat);
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      
      let dateKey;
      if (messageDate.toDateString() === today.toDateString()) {
        dateKey = "Aujourd'hui";
      } else if (messageDate.toDateString() === yesterday.toDateString()) {
        dateKey = "Hier";
      } else {
        dateKey = messageDate.toLocaleDateString('fr-FR', { 
          day: 'numeric', 
          month: 'long', 
          year: 'numeric' 
        });
      }
      
      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }
      grouped[dateKey].push(message);
    });
    
    return grouped;
  };

  const groupedMessages = groupMessagesByDay(messages, posts);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-r-2 border-t-2 border-orange-500"></div>
          <p className="mt-4 text-gray-600">Chargement du sujet...</p>
        </div>
      </div>
    );
  }

  if (!topic) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Sujet non trouvé</h3>
          <p className="text-gray-600">Ce sujet n'existe pas ou a été supprimé.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header with gradient */}
      <div className="h-1 bg-gradient-to-r from-orange-400 via-orange-300 to-yellow-300"></div>

      {/* Topic Header */}
      <div className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
          {/* Back Button */}
          <button
            onClick={() => navigate('/forum')}
            className="mb-4 sm:mb-6 inline-flex items-center gap-2 text-gray-600 hover:text-orange-500 transition-all duration-200 hover:translate-x-[-2px]"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            <span className="text-sm sm:text-base font-medium">Retour au forum</span>
          </button>

          {/* Topic Information */}
          <div className="space-y-3 sm:space-y-4">
            <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 leading-tight">
              {topic.title}
            </h1>
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-bold">
                  {topic.creator?.name?.charAt(0)?.toUpperCase() || '?'}
                </div>
                <span className="font-medium">{topic.creator?.name || 'Utilisateur anonyme'}</span>
              </div>
              <span className="hidden sm:inline text-gray-400">•</span>
              <span className="flex items-center gap-1">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                {new Date(topic.createdat).toLocaleDateString('fr-FR', { 
                  day: 'numeric', 
                  month: 'short', 
                  year: 'numeric'
                })}
              </span>
              <span className="hidden sm:inline text-gray-400">•</span>
              <span className="flex items-center gap-1">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
                {topic.viewcount || 0}
              </span>
              <span className="hidden sm:inline text-gray-400">•</span>
              <span className="flex items-center gap-1">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
                {posts.length}
              </span>
            </div>
            {topic.description && (
              <div className="bg-gray-50 rounded-lg p-3 sm:p-4 border-l-4 border-orange-400">
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{topic.description}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Chat Messages Area */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
          <div className="bg-gradient-to-r from-orange-50 to-yellow-50 px-4 sm:px-6 py-3 border-b border-gray-200">
            <h2 className="text-sm sm:text-base font-semibold text-gray-800 flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
              Discussion ({posts.length} messages)
            </h2>
          </div>
          
          <div className="h-80 sm:h-96 lg:h-[28rem] overflow-y-auto px-3 sm:px-4 lg:px-6 py-4 space-y-4 bg-gray-50">
            {messages.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-2">💬</div>
                <p className="text-gray-500 text-sm">Soyez le premier à répondre à cette discussion</p>
              </div>
            ) : (
              Object.entries(groupedMessages).map(([dateKey, dayMessages]) => (
                <div key={dateKey} className="space-y-3">
                  {/* Séparateur de jour */}
                  <div className="flex items-center gap-3 my-4">
                    <div className="flex-1 h-px bg-gray-300"></div>
                    <div className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap">
                      {dateKey}
                    </div>
                    <div className="flex-1 h-px bg-gray-300"></div>
                  </div>
                  
                  {/* Messages du jour */}
                  {dayMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
                    >
                      <div className={`flex items-start gap-2 max-w-[85%] sm:max-w-[75%] ${message.sender === 'me' ? 'flex-row-reverse' : ''}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 ${
                          message.sender === 'me' 
                            ? 'bg-gradient-to-br from-green-400 to-green-500' 
                            : 'bg-gradient-to-br from-gray-400 to-gray-500'
                        }`}>
                          {message.author?.charAt(0)?.toUpperCase() || '?'}
                        </div>
                        <div>
                          {message.sender !== 'me' && (
                            <p className="text-xs font-semibold text-gray-600 mb-1 px-1">{message.author}</p>
                          )}
                          <div
                            className={`px-3 py-2 rounded-2xl ${
                              message.sender === 'me'
                                ? 'bg-gradient-to-r from-green-400 to-green-500 text-white rounded-br-md'
                                : 'bg-white text-gray-800 rounded-bl-md shadow-sm border border-gray-200'
                            }`}
                          >
                            <p className="text-sm leading-relaxed">{message.text}</p>
                          </div>
                          <span className="text-xs text-gray-500 mt-1 px-1 block">{message.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))
            )}
          </div>

          {/* Message Input Area */}
          <div className="p-3 sm:p-4 bg-white border-t border-gray-200">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-orange-300 to-yellow-300 rounded-full opacity-20"></div>
              <div className="relative flex items-center bg-white rounded-full border border-gray-300 shadow-sm">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Écrire une réponse..."
                  className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 bg-transparent border-none outline-none text-gray-800 placeholder-gray-500 text-sm sm:text-base"
                />
                <button
                  onClick={handleSendMessage}
                  className="mr-2 p-2 text-orange-500 hover:text-orange-600 hover:bg-orange-50 rounded-full transition-all duration-200"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicDetail;