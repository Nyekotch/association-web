import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllTopics, createTopic } from '../../services/forumService';
import useAuthStore from '../../stores/authStore';
import toast from 'react-hot-toast';

function ForumPage() {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newTopic, setNewTopic] = useState({ title: '', content: '' });
  const [creating, setCreating] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tout');
  const { user } = useAuthStore();
  const navigate = useNavigate();

  // Catégories disponibles
  const categories = ['Tout', 'Évènements', 'Éducation', 'Environment', 'Bénévolat', 'Projets', 'Solidarité'];

  useEffect(() => {
    fetchTopics();
  }, []);

  const fetchTopics = async () => {
    try {
      setLoading(true);
      const response = await getAllTopics();
      
      // Transformer les données de l'API pour correspondre au format attendu
      const transformedTopics = response.data.map(topic => ({
        id: topic.id,
        title: topic.title,
        author: topic.creator?.name || 'Utilisateur anonyme',
        timeAgo: formatTimeAgo(topic.createdat),
        category: getCategoryFromTopic(topic),
        categoryColor: getCategoryColor(getCategoryFromTopic(topic)),
        responses: topic.posts?.length || 0,
        views: topic.viewcount || 0,
        lastUser: getLastPostUser(topic),
        lastActivity: formatTimeAgo(topic.updatedat || topic.createdat),
        creatorid: topic.creatorid,
        description: topic.description,
        createdat: topic.createdat,
        updatedat: topic.updatedat,
        posts: topic.posts || []
      }));
      
      setTopics(transformedTopics);
    } catch (error) {
      console.error('Erreur lors du chargement des sujets:', error);
      toast.error('Erreur lors du chargement des sujets');
    } finally {
      setLoading(false);
    }
  };

  const formatTimeAgo = (dateString) => {
    if (!dateString) return 'Date inconnue';
    
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffHours < 1) return 'Il y a quelques minutes';
    if (diffHours < 24) return `Il y a ${diffHours} heure${diffHours > 1 ? 's' : ''}`;
    if (diffDays < 7) return `Il y a ${diffDays} jour${diffDays > 1 ? 's' : ''}`;
    if (diffDays < 30) return `Il y a ${Math.floor(diffDays / 7)} semaine${Math.floor(diffDays / 7) > 1 ? 's' : ''}`;
    return `Il y a ${Math.floor(diffDays / 30)} mois`;
  };

  const getCategoryFromTopic = (topic) => {
    // Extraire la catégorie du titre ou de la description
    const title = (topic.title || '').toLowerCase();
    const description = (topic.description || '').toLowerCase();
    const content = (title + ' ' + description)
      .normalize('NFD')                    // Décomposer les accents
      .replace(/[\u0300-\u036f]/g, '')   // Supprimer les diacritiques
      .toLowerCase();                        // Mettre en minuscules
    
    // Évènements
    if (content.includes('evenement') || content.includes('evenement') || 
        content.includes('event') || content.includes('rencontre') || 
        content.includes('conference') || content.includes('reunion')) 
      return 'Évènements';
    
    // Éducation
    if (content.includes('education') || content.includes('enfant') || 
        content.includes('atelier') || content.includes('formation') || 
        content.includes('cours') || content.includes('apprentissage') || 
        content.includes('education') || content.includes('workshop')) 
      return 'Éducation';
    
    // Environment
    if (content.includes('environnement') || content.includes('ecologique') || 
        content.includes('nature') || content.includes('durable') || 
        content.includes('vert') || content.includes('ecology') || 
        content.includes('environment') || content.includes('green')) 
      return 'Environment';
    
    // Bénévolat
    if (content.includes('benevolat') || content.includes('benevole') || 
        content.includes('volontariat') || content.includes('aide') || 
        content.includes('soutien') || content.includes('volunteer') || 
        content.includes('help') || content.includes('support')) 
      return 'Bénévolat';
    
    // Projets
    if (content.includes('projet') || content.includes('initiative') || 
        content.includes('idee') || content.includes('proposition') || 
        content.includes('project') || content.includes('idea') || 
        content.includes('initiative')) 
      return 'Projets';
    
    // Solidarité
    if (content.includes('solidarite') || content.includes('entraide') || 
        content.includes('partage') || content.includes('collecte') || 
        content.includes('don') || content.includes('community') || 
        content.includes('sharing')) 
      return 'Solidarité';
    
    return 'Autre';
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Évènements': 'bg-green-500',
      'Éducation': 'bg-orange-400',
      'Environment': 'bg-blue-400',
      'Bénévolat': 'bg-green-400',
      'Projets': 'bg-blue-300',
      'Solidarité': 'bg-orange-500',
      'Autre': 'bg-gray-400'
    };
    return colors[category] || 'bg-gray-400';
  };

  const getLastPostUser = (topic) => {
    if (topic.posts && topic.posts.length > 0) {
      const lastPost = topic.posts[topic.posts.length - 1];
      return lastPost.creator?.name || 'Utilisateur anonyme';
    }
    return topic.creator?.name || 'Utilisateur anonyme';
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
      const response = await createTopic({
        title: newTopic.title,
        description: newTopic.content,
        creatorid: user.id
      });
      
      toast.success('Sujet créé avec succès !');
      setNewTopic({ title: '', content: '' });
      setShowCreateForm(false);
      fetchTopics(); // Rafraîchir la liste
    } catch (error) {
      console.error('Erreur lors de la création:', error);
      toast.error(error.response?.data?.message || 'Erreur lors de la création du sujet');
    } finally {
      setCreating(false);
    }
  };

  const handleTopicClick = (topicId) => {
    navigate(`/forum/${topicId}`);
  };

  // Filtrer les sujets selon la recherche et la catégorie
  const filteredTopics = topics.filter(topic => {
    const matchesSearch = topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          topic.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Tout' || topic.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Calculer les sujets populaires
  const popularTopics = topics.length > 0 
    ? topics
        .filter(topic => topic.responses > 5)
        .sort((a, b) => b.responses - a.responses)
        .slice(0, 4)
        .map((topic, index) => ({
          title: topic.title,
          responses: topic.responses,
          badge: index + 1
        }))
    : [
        { title: "Chargement...", responses: 0, badge: 1 },
        { title: "Chargement...", responses: 0, badge: 2 },
        { title: "Chargement...", responses: 0, badge: 3 },
        { title: "Chargement...", responses: 0, badge: 4 }
      ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-r-2 border-t-2 border-orange-500"></div>
          <p className="mt-4 text-gray-600">Chargement des sujets...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white py-8 px-4 sm:px-6 lg:px-8 shadow-sm">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">Forum de l'Association</h1>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600">
            Participez à nos discussions, posez vos questions et partagez vos expériences avec la communauté.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Main Forum Section */}
          <div className="lg:col-span-2">
            {/* Search and Create Button */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Rechercher..."
                  className="w-full px-3 py-2.5 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm sm:text-base"
                />
                <span className="absolute left-2.5 sm:left-4 top-2.5 sm:top-3.5 text-gray-400 text-sm sm:text-base">🔍</span>
              </div>
              {user && (
                <button 
                  onClick={() => setShowCreateForm(!showCreateForm)}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2.5 sm:px-6 sm:py-3 rounded-lg font-medium flex items-center gap-2 whitespace-nowrap text-sm sm:text-base w-full sm:w-auto"
                >
                  <span className="text-lg sm:text-xl">+</span> {showCreateForm ? 'Annuler' : 'Créer un Nouveau Sujet'}
                </button>
              )}
              {!user && (
                <button 
                  onClick={() => navigate('/login')}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2.5 sm:px-6 sm:py-3 rounded-lg font-medium flex items-center gap-2 whitespace-nowrap text-sm sm:text-base w-full sm:w-auto"
                >
                  <span className="text-lg sm:text-xl">+</span> Créer un Nouveau Sujet
                </button>
              )}
            </div>

            {/* Create Topic Form */}
            {showCreateForm && (
              <div className="mb-4 sm:mb-6 bg-white rounded-lg shadow-sm p-4 sm:p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Créer un nouveau sujet</h3>
                <form onSubmit={handleCreateTopic} className="space-y-3 sm:space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Titre du sujet
                    </label>
                    <input
                      type="text"
                      value={newTopic.title}
                      onChange={(e) => setNewTopic({ ...newTopic, title: e.target.value })}
                      className="w-full px-3 py-2.5 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm sm:text-base"
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
                      className="w-full px-3 py-2.5 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm sm:text-base"
                      rows={4}
                      placeholder="Décrivez votre sujet en détail..."
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setShowCreateForm(false);
                        setNewTopic({ title: '', content: '' });
                      }}
                      className="w-full sm:w-auto px-3 py-2 sm:px-4 sm:py-2.5 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-sm sm:text-base"
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      disabled={creating}
                      className="w-full sm:w-auto px-4 py-2.5 sm:px-6 sm:py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm sm:text-base"
                    >
                      {creating ? 'Création...' : '🚀 Créer le sujet'}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Forum Table */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              {/* Table Header - Hidden on mobile */}
              <div className="hidden lg:grid grid-cols-12 gap-4 px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 border-b border-gray-200 text-xs sm:text-sm font-medium text-gray-600">
                <div className="col-span-5">Sujet</div>
                <div className="col-span-2">Catégorie</div>
                <div className="col-span-5 text-right">Réponses | Vues</div>
              </div>

              {/* Forum Topics */}
              {filteredTopics.length === 0 ? (
                <div className="p-8 sm:p-12 lg:p-16 text-center">
                  <div className="text-4xl sm:text-5xl lg:text-6xl mb-4">🌱</div>
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 mb-2">
                    {searchTerm || selectedCategory !== 'Tout' ? 'Aucun sujet trouvé' : 'Aucun sujet de discussion'}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 max-w-md mx-auto">
                    {searchTerm || selectedCategory !== 'Tout' 
                      ? 'Essayez de modifier votre recherche ou votre filtre'
                      : 'Soyez le premier à lancer une conversation et à partager vos idées avec la communauté !'
                    }
                  </p>
                  {user && !searchTerm && selectedCategory === 'Tout' && (
                    <button
                      onClick={() => setShowCreateForm(true)}
                      className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2.5 sm:px-6 sm:py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 text-sm sm:text-base"
                    >
                      ✨ Créer le premier sujet
                    </button>
                  )}
                </div>
              ) : (
                filteredTopics.map((topic) => (
                  <div key={topic.id} className="border-b border-gray-200">
                    {/* Mobile Card Layout */}
                    <div className="lg:hidden p-4 cursor-pointer" onClick={() => handleTopicClick(topic.id)}>
                      <div className="space-y-3">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-1 hover:text-orange-500">
                              {topic.title}
                            </h3>
                            <p className="text-sm text-gray-500">
                              Par {topic.author}, {topic.timeAgo}
                            </p>
                          </div>
                          <span className={`${topic.categoryColor} text-white px-2 py-1 rounded-full text-xs font-medium`}>
                            {topic.category}
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">{topic.responses} réponses | {topic.views.toLocaleString()} vues</span>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-white text-sm font-medium">
                            {topic.lastUser?.charAt(0)?.toUpperCase() || '?'}
                          </div>
                          <div className="text-xs">
                            <p className="font-medium text-gray-900">{topic.lastUser}</p>
                            <p className="text-gray-500">{topic.lastActivity}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Desktop Table Layout */}
                    <div className="hidden lg:grid grid-cols-12 gap-4 px-4 sm:px-6 py-4 sm:py-5 hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => handleTopicClick(topic.id)}>
                      <div className="col-span-5">
                        <h3 className="font-semibold text-gray-900 mb-1 hover:text-orange-500">
                          {topic.title}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Par {topic.author}, {topic.timeAgo}
                        </p>
                      </div>
                      <div className="col-span-2">
                        <span className={`${topic.categoryColor} text-white px-2 py-1 rounded-full text-xs sm:text-sm font-medium`}>
                          {topic.category}
                        </span>
                      </div>
                      <div className="col-span-5 flex items-center justify-end gap-2 sm:gap-4">
                        <div className="text-right">
                          <p className="text-xs sm:text-sm text-gray-900 font-medium">{topic.responses} | {topic.views.toLocaleString()}</p>
                        </div>
                        <div className="hidden sm:flex items-center gap-2">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-300 rounded-full flex items-center justify-center text-white text-sm font-medium">
                            {topic.lastUser?.charAt(0)?.toUpperCase() || '?'}
                          </div>
                          <div className="text-xs sm:text-sm">
                            <p className="font-medium text-gray-900">{topic.lastUser}</p>
                            <p className="text-gray-500">{topic.lastActivity}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Categories Filter */}
            <div className="mt-4 sm:mt-6 text-center">
              <div className="inline-flex flex-wrap gap-1 sm:gap-2 text-xs sm:text-sm">
                {categories.map((cat, index) => (
                  <span key={index}>
                    <button 
                      onClick={() => setSelectedCategory(cat)}
                      className={selectedCategory === cat ? "text-orange-500 font-medium" : "text-gray-600 hover:text-orange-500"}
                    >
                      {cat}
                    </button>
                    {index < categories.length - 1 && <span className="text-gray-400 ml-1 sm:ml-2">|</span>}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar - Popular Topics */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 sticky top-4 sm:top-8">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Sujets Populaires</h2>
              <div className="space-y-3 sm:space-y-4">
                {popularTopics.map((topic, index) => (
                  <div key={index} className="flex gap-2 sm:gap-3 pb-3 sm:pb-4 border-b border-gray-200 last:border-0">
                    <div className="flex-shrink-0">
                      <span className="bg-green-500 text-white w-6 h-6 sm:w-8 sm:h-8 rounded flex items-center justify-center font-bold text-xs sm:text-sm">
                        {topic.badge}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-xs sm:text-sm mb-1 hover:text-orange-500 cursor-pointer leading-tight">
                        {topic.title}
                      </h3>
                      <p className="text-xs text-gray-500">{topic.responses} réponses</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="mt-4 sm:mt-6 flex items-center justify-center gap-2">
                <button className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 text-xs sm:text-sm">
                  ‹
                </button>
                <button className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center bg-orange-500 text-white rounded text-xs sm:text-sm font-medium">
                  1
                </button>
                <button className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded text-xs sm:text-sm">
                  2
                </button>
                <button className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded text-xs sm:text-sm">
                  3
                </button>
                <button className="text-xs sm:text-sm text-gray-600 hover:text-gray-900 px-2">
                  Suivant
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForumPage;