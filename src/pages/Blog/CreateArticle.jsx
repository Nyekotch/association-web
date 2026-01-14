import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Button from '../../components/common/Button';
import FormField from '../../components/form/FormField';
import ImageUpload from '../../components/upload/ImageUpload';
import { createArticle } from '../../services/blogService';
import useAuthStore from '../../stores/authStore';

const CreateArticle = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    featuredimage: '',
    category: '',
    ispublished: false
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleTitleChange = (e) => {
    const title = e.target.value;
    setFormData(prev => ({
      ...prev,
      title,
      slug: generateSlug(title)
    }));
  };

  const handleImageUpload = (imageUrl) => {
    setFormData(prev => ({
      ...prev,
      featuredimage: imageUrl
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.content) {
      toast.error('Le titre et le contenu sont obligatoires');
      return;
    }

    setLoading(true);

    try {
      const articleData = {
        ...formData,
        authorid: user?.id
      };
      
      const response = await createArticle(articleData);
      toast.success('Article créé avec succès !');
      navigate(`/blog/${response.data.id}`);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Erreur lors de la création de l\'article');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold mb-2">Créer un article</h1>
        <p className="text-gray-600">Rédigez et publiez votre article</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <FormField label="Titre *">
          <input
            name="title"
            value={formData.title}
            onChange={handleTitleChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2"
            placeholder="Titre de l'article"
            required
          />
        </FormField>

        <FormField label="Slug (URL)">
          <input
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2"
            placeholder="url-de-l-article"
          />
        </FormField>

        <FormField label="Extrait">
          <textarea
            name="excerpt"
            value={formData.excerpt}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2"
            rows={3}
            placeholder="Brève description de l'article..."
          />
        </FormField>

        <FormField label="Contenu *">
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2"
            rows={10}
            placeholder="Rédigez votre article ici..."
            required
          />
        </FormField>

        <FormField label="Image à la une">
          <ImageUpload 
            onImageUploaded={handleImageUpload}
            currentImage={formData.featuredimage}
          />
        </FormField>

        <FormField label="Catégorie">
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2"
          >
            <option value="">Sélectionner une catégorie</option>
            <option value="Actualités">Actualités</option>
            <option value="Événements">Événements</option>
            <option value="Témoignages">Témoignages</option>
            <option value="Annonces">Annonces</option>
            <option value="Autre">Autre</option>
          </select>
        </FormField>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="ispublished"
            id="ispublished"
            checked={formData.ispublished}
            onChange={handleChange}
            className="rounded border-gray-300"
          />
          <label htmlFor="ispublished" className="text-sm text-gray-700">
            Publier immédiatement
          </label>
        </div>

        <div className="flex space-x-4">
          <Button 
            type="submit" 
            disabled={loading}
            className="flex-1"
          >
            {loading ? 'Création...' : 'Créer l\'article'}
          </Button>
          <Button 
            type="button"
            variant="secondary"
            onClick={() => navigate('/blog')}
            className="flex-1"
          >
            Annuler
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateArticle;
