import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllArticles } from '../../services/blogService';

const getApiBaseUrl = () => import.meta.env.VITE_API_URL || 'http://localhost:3000';

const BlogPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await getAllArticles();
        setArticles(response.data);
      } catch (err) {
        setError('Erreur lors du chargement des articles');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="text-center">Chargement...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Blog</h1>
        <Link 
          to="/blog/create" 
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Nouvel article
        </Link>
      </div>
      
      {articles.length === 0 ? (
        <p className="text-gray-600">Aucun article publié pour le moment.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {articles.map((article) => (
            <article key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              {article.featuredimage && (
                <img 
                  src={article.featuredimage.startsWith('http') 
                    ? article.featuredimage 
                    : `${getApiBaseUrl()}${article.featuredimage.startsWith('/') ? '' : '/'}${article.featuredimage}`}
                  alt={article.title}
                  className="w-full h-48 sm:h-64 object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = '<div class="w-full h-48 sm:h-64 bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center"><div class="text-4xl sm:text-5xl opacity-50">📝</div></div>';
                  }}
                />
              )}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-500">{article.category}</span>
                  <span className="text-sm text-gray-500">
                    {new Date(article.createdat).toLocaleDateString('fr-FR')}
                  </span>
                </div>
                <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {article.excerpt || article.content.substring(0, 150) + '...'}
                </p>
                <div className="flex items-center justify-between">
                  <Link 
                    to={`/blog/${article.id}`} 
                    className="text-blue-600 hover:text-blue-800 font-medium text-sm sm:text-base"
                  >
                    Lire la suite
                  </Link>
                  {article.ispublished && (
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      Publié
                    </span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogPage;
