import { useState, useEffect } from 'react';
import { getAllArticles, createArticle, updateArticle, deleteArticle } from '../../services/adminService';
import toast from 'react-hot-toast';
import useAuthStore from '../../stores/authStore';
import { useNavigate } from 'react-router-dom';

const BlogManagement = () => {
  const { user, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: '',
    ispublished: false
  });

  useEffect(() => {
    // Vérifier si l'utilisateur est authentifié et admin
    if (!isAuthenticated || !user || user.role !== 'ADMIN') {
      toast.error('Accès non autorisé. Vous devez être administrateur.');
      navigate('/login');
      return;
    }

    fetchArticles();
  }, [isAuthenticated, user, navigate]);

  const fetchArticles = async () => {
    try {
      const response = await getAllArticles();
      setArticles(response.data);
    } catch (error) {
      console.error('Erreur lors du chargement des articles:', error);
      toast.error('Erreur lors du chargement des articles');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const articleData = {
        ...formData,
        slug: formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        publishedat: formData.ispublished ? new Date().toISOString() : null
      };

      if (editingArticle) {
        await updateArticle(editingArticle.id, articleData);
        toast.success('Article mis à jour avec succès');
      } else {
        await createArticle(articleData);
        toast.success('Article créé avec succès');
      }

      setShowModal(false);
      setEditingArticle(null);
      setFormData({
        title: '',
        content: '',
        excerpt: '',
        category: '',
        ispublished: false
      });
      fetchArticles();
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      toast.error('Erreur lors de la sauvegarde de l\'article');
    }
  };

  const handleEdit = (article) => {
    setEditingArticle(article);
    setFormData({
      title: article.title || '',
      content: article.content || '',
      excerpt: article.excerpt || '',
      category: article.category || '',
      ispublished: article.ispublished || false
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
      try {
        await deleteArticle(id);
        toast.success('Article supprimé avec succès');
        fetchArticles();
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
        toast.error('Erreur lors de la suppression de l\'article');
      }
    }
  };

  const handleStatusToggle = async (article) => {
    try {
      const newStatus = !article.ispublished;
      await updateArticle(article.id, {
        ...article,
        ispublished: newStatus,
        publishedat: newStatus ? new Date().toISOString() : null
      });
      toast.success(`Statut mis à jour: ${newStatus ? 'Publié' : 'Brouillon'}`);
      fetchArticles();
    } catch (error) {
      console.error('Erreur lors du changement de statut:', error);
      toast.error('Erreur lors du changement de statut');
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="text-center">Chargement des articles...</div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
        {/* En-tête responsive */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">Gestion des Articles</h1>
            <p className="text-sm sm:text-base text-gray-600">Modérer et gérer les articles du blog</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
          >
            Nouvel Article
          </button>
        </div>

        {/* Liste des articles responsive */}
        <div className="p-4">
          {articles.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-4xl sm:text-5xl mb-4">📝</div>
              <p className="text-gray-500 text-sm sm:text-base">Aucun article trouvé</p>
              <button
                onClick={() => setShowModal(true)}
                className="mt-4 text-blue-600 hover:text-blue-700 text-sm sm:text-base"
              >
                Créer le premier article
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {articles.map((article) => (
                <div key={article.id} className="border border-gray-200 rounded-lg p-4 sm:p-6 hover:bg-gray-50">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                        <h3 className="text-base sm:text-lg font-medium text-gray-800">{article.title}</h3>
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs ${
                          article.ispublished 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {article.ispublished ? 'Publié' : 'Brouillon'}
                        </span>
                      </div>
                      {article.excerpt && (
                        <p className="text-gray-600 text-sm mb-2 line-clamp-2">{article.excerpt}</p>
                      )}
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500">
                        <span>Auteur: {article.author?.name || 'Non spécifié'}</span>
                        {article.publishedat && (
                          <span>Publié: {new Date(article.publishedat).toLocaleDateString()}</span>
                        )}
                        {article.category && (
                          <span>Catégorie: {article.category}</span>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 ml-0 sm:ml-4">
                      <button
                        onClick={() => handleStatusToggle(article)}
                        className={`px-3 py-2 rounded text-sm transition-colors ${
                          article.ispublished
                            ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                            : 'bg-green-100 text-green-700 hover:bg-green-200'
                        }`}
                      >
                        {article.ispublished ? 'Dépublier' : 'Publier'}
                      </button>
                      <button
                        onClick={() => handleEdit(article)}
                        className="px-3 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors text-sm"
                      >
                        Modifier
                      </button>
                      <button
                        onClick={() => handleDelete(article.id)}
                        className="px-3 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors text-sm"
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal pour créer/éditer un article */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-2xl sm:max-h-[90vh] max-h-[80vh] overflow-y-auto">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">
              {editingArticle ? 'Modifier l\'article' : 'Nouvel article'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Titre
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Extrait
                  </label>
                  <textarea
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    rows="2"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contenu
                  </label>
                  <textarea
                    required
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    rows="6 sm:rows-8"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Catégorie
                  </label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Statut
                  </label>
                  <select
                    value={formData.ispublished}
                    onChange={(e) => setFormData({ ...formData, ispublished: e.target.value === 'true' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                  >
                    <option value="false">Brouillon</option>
                    <option value="true">Publié</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3 mt-4 sm:mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingArticle(null);
                    setFormData({
                      title: '',
                      content: '',
                      excerpt: '',
                      category: '',
                      ispublished: false
                    });
                  }}
                  className="w-full sm:w-auto px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-base"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-base"
                >
                  {editingArticle ? 'Mettre à jour' : 'Créer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogManagement;
