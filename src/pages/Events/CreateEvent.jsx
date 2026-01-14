import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Button from '../../components/common/Button';
import FormField from '../../components/form/FormField';
import DatePicker from '../../components/form/DatePicker';
import ImageUpload from '../../components/upload/ImageUpload';
import { createEvent } from '../../services/eventsService';
import useAuthStore from '../../stores/authStore';

const CreateEvent = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  
  // Vérifier si l'utilisateur a les permissions pour créer un événement
  const canCreateEvent = user?.role === 'ADMIN' || user?.role === 'MODERATOR';
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startdate: '',
    enddate: '',
    location: '',
    capacity: '',
    imageurl: '',
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

  const handleImageUpload = (imageUrl) => {
    setFormData(prev => ({
      ...prev,
      imageurl: imageUrl
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Vérifier les permissions avant de soumettre
    if (!canCreateEvent) {
      toast.error('Vous n\'avez pas les permissions pour créer un événement');
      navigate('/events');
      return;
    }
    
    if (!formData.title || !formData.startdate || !formData.enddate) {
      toast.error('Le titre, la date de début et de fin sont obligatoires');
      return;
    }

    setLoading(true);

    try {
      const eventData = {
        ...formData,
        organizerid: user?.id,
        capacity: formData.capacity ? parseInt(formData.capacity) : null
      };
      
      const response = await createEvent(eventData);
      toast.success('Événement créé avec succès !');
      navigate(`/events/${response.data.id}`);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Erreur lors de la création de l\'événement');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      {!canCreateEvent ? (
        <div className="text-center py-10">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-red-800 mb-2">Accès refusé</h2>
            <p className="text-red-600 mb-4">
              Vous n'avez pas les permissions nécessaires pour créer des événements.
              Seuls les administrateurs et modérateurs peuvent créer des événements.
            </p>
            <Button 
              onClick={() => navigate('/events')}
              className="mx-auto"
            >
              Retour aux événements
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div className="mb-6">
            <h1 className="text-2xl font-semibold mb-2">Créer un événement</h1>
            <p className="text-gray-600">Organisez un nouvel événement pour l'association</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
        <FormField label="Titre *">
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2"
            placeholder="Nom de l'événement"
            required
          />
        </FormField>

        <FormField label="Description">
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2"
            rows={4}
            placeholder="Décrivez l'événement"
          />
        </FormField>

        <div className="grid md:grid-cols-2 gap-4">
          <FormField label="Date de début *">
            <input
              type="datetime-local"
              name="startdate"
              value={formData.startdate}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2"
              required
            />
          </FormField>

          <FormField label="Date de fin *">
            <input
              type="datetime-local"
              name="enddate"
              value={formData.enddate}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2"
              required
            />
          </FormField>
        </div>

        <FormField label="Lieu">
          <input
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2"
            placeholder="Adresse ou lieu de l'événement"
          />
        </FormField>

        <FormField label="Capacité">
          <input
            type="number"
            name="capacity"
            value={formData.capacity}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2"
            placeholder="Nombre de participants maximum"
            min="1"
          />
        </FormField>

        <FormField label="Image de l'événement">
          <ImageUpload 
            onImageUploaded={handleImageUpload}
            currentImage={formData.imageurl}
          />
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
            {loading ? 'Création...' : 'Créer l\'événement'}
          </Button>
          <Button 
            type="button"
            variant="secondary"
            onClick={() => navigate('/events')}
            className="flex-1"
          >
            Annuler
          </Button>
        </div>
      </form>
        </>
      )}
    </div>
  );
};

export default CreateEvent;
