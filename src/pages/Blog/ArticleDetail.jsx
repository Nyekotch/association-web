import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getArticleById } from '../../services/blogService';

const getApiBaseUrl = () => import.meta.env.VITE_API_URL || 'http://localhost:3000';

const ArticleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await getArticleById(id);
        setArticle(response.data);
      } catch (err) {
        setError('Article non trouvé');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchArticle();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="text-center">Chargement...</div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="text-red-600 text-center">
          <p className="mb-4">{error || 'Article non trouvé'}</p>
          <button 
            onClick={() => navigate('/blog')}
            className="text-blue-600 hover:text-blue-800 underline"
          >
            Retour au blog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 space-y-6">
      <button 
        onClick={() => navigate('/blog')}
        className="text-blue-600 hover:text-blue-800 underline mb-4"
      >
        ← Retour au blog
      </button>
      
      <article className="bg-white rounded-lg shadow-lg overflow-hidden">
        {article.featuredimage && (
          <img 
            src={article.featuredimage.startsWith('http') 
              ? article.featuredimage 
              : `${getApiBaseUrl()}${article.featuredimage}`
            } 
            alt={article.title}
            className="w-full h-64 md:h-96 object-cover"
          />
        )}
        
        <div className="p-8">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                {article.category || 'Non catégorisé'}
              </span>
              <div className="text-sm text-gray-500">
                {new Date(article.createdat).toLocaleDateString('fr-FR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {article.title}
            </h1>
            
            {article.excerpt && (
              <p className="text-xl text-gray-600 mb-6 italic">
                {article.excerpt}
              </p>
            )}
            
            {article.author && (
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                <div>
                  <p className="font-medium text-gray-900">{article.author.name}</p>
                  <p className="text-sm text-gray-500">Auteur</p>
                </div>
              </div>
            )}
          </div>
          
          <div className="prose prose-lg max-w-none">
            <div 
              className="whitespace-pre-wrap text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ 
                __html: article.content.replace(/\n/g, '<br />') 
              }}
            />
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {article.ispublished && (
                  <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full">
                    Publié
                  </span>
                )}
                <span className="text-sm text-gray-500">
                  {article.viewcount || 0} vues
                </span>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default ArticleDetail;
