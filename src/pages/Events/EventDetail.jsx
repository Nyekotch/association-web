import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEventById } from '../../services/eventsService';
import { createRegistration, getRegistrationsByEvent } from '../../services/eventRegistrationsService';
import ImageUpload from '../../components/upload/ImageUpload';
import useAuthStore from '../../stores/authStore';
import toast from 'react-hot-toast';

const getApiBaseUrl = () => import.meta.env.VITE_API_URL || 'http://localhost:3000';

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [event, setEvent] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventResponse, registrationsResponse] = await Promise.all([
          getEventById(id),
          getRegistrationsByEvent(id)
        ]);
        setEvent(eventResponse.data);
        setRegistrations(registrationsResponse.data);
      } catch (err) {
        setError('Événement non trouvé');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id, user]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="text-center">Chargement...</div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="text-red-600 text-center">
          <p className="mb-4">{error || 'Événement non trouvé'}</p>
          <button 
            onClick={() => navigate('/events')}
            className="text-blue-600 hover:text-blue-800 underline"
          >
            Retour aux événements
          </button>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const isUpcoming = (endDate) => {
    return new Date(endDate) > new Date();
  };

  const isUserRegistered = () => {
    if (!user) return false;
    return registrations.some(reg => reg.memberid === user.id);
  };

  const availableSpots = () => {
    if (!event.capacity) return null;
    const currentRegistrations = registrations.filter(reg => reg.status === 'REGISTERED').length;
    return event.capacity - currentRegistrations;
  };

  const handleRegistration = async () => {
    if (!user) {
      toast.error('Vous devez être connecté pour vous inscrire');
      navigate('/login');
      return;
    }

    if (isUserRegistered()) {
      toast.error('Vous êtes déjà inscrit à cet événement');
      return;
    }

    if (event.capacity && availableSpots() <= 0) {
      toast.error('Cet événement est complet');
      return;
    }

    setRegistering(true);
    try {
      await createRegistration({
        eventid: event.id,
        memberid: user.id
      });
      
      // Rafraîchir la liste des inscriptions
      const registrationsResponse = await getRegistrationsByEvent(id);
      setRegistrations(registrationsResponse.data);
      
      toast.success('Inscription réussie !');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Erreur lors de l\'inscription');
    } finally {
      setRegistering(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 space-y-6">
      <button 
        onClick={() => navigate('/events')}
        className="text-blue-600 hover:text-blue-800 underline mb-4"
      >
        ← Retour aux événements
      </button>
      
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {event.imageurl && (
          <img 
            src={event.imageurl.startsWith('http') 
              ? event.imageurl 
              : `${getApiBaseUrl()}${event.imageurl.startsWith('/') ? '' : '/'}${event.imageurl}`
            } 
            alt={event.title}
            className="w-full h-64 md:h-96 object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentElement.innerHTML = '<div class="w-full h-64 md:h-96 bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center"><div class="text-6xl opacity-50">📅</div></div>';
            }}
          />
        )}
        
        <div className="p-8">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <span className={`text-sm px-3 py-1 rounded-full ${
                isUpcoming(event.enddate) 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {isUpcoming(event.enddate) ? 'À venir' : 'Terminé'}
              </span>
              {event.ispublished && (
                <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                  Publié
                </span>
              )}
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {event.title}
            </h1>
            
            <div className="prose prose-lg max-w-none text-gray-700 mb-6">
              <p>{event.description || 'Aucune description'}</p>
            </div>
            
            {event.organizer && (
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                <div>
                  <p className="font-medium text-gray-900">{event.organizer.name}</p>
                  <p className="text-sm text-gray-500">Organisateur</p>
                </div>
              </div>
            )}
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-4">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <div>
                  <p className="text-sm text-gray-500">Date de début</p>
                  <p className="font-medium">{formatDate(event.startdate)}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <div>
                  <p className="text-sm text-gray-500">Date de fin</p>
                  <p className="font-medium">{formatDate(event.enddate)}</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              {event.location && (
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <p className="text-sm text-gray-500">Lieu</p>
                    <p className="font-medium">{event.location}</p>
                  </div>
                </div>
              )}
              
              {event.capacity && (
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                  <div>
                    <p className="text-sm text-gray-500">Capacité</p>
                    <p className="font-medium">
                      {availableSpots() !== null ? `${availableSpots()} places disponibles` : 'Illimité'}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                {event.ispublished && (
                  <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full">
                    Publié
                  </span>
                )}
                <span className="text-sm text-gray-500">
                  Créé le {new Date(event.createdat).toLocaleDateString('fr-FR')}
                </span>
              </div>
              
              <div className="text-sm text-gray-600">
                {registrations.filter(reg => reg.status === 'REGISTERED').length} participant(s) inscrit(s)
              </div>
            </div>
            
            {/* Bouton d'inscription */}
            {isUpcoming(event.enddate) && (
              <div className="flex justify-center">
                {isUserRegistered() ? (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                    <p className="text-green-800 font-medium">Vous êtes déjà inscrit à cet événement</p>
                  </div>
                ) : (
                  <button
                    onClick={handleRegistration}
                    disabled={registering || (event.capacity && availableSpots() <= 0)}
                    className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                  >
                    {registering ? 'Inscription...' : 'S\'inscrire à l\'événement'}
                  </button>
                )}
              </div>
            )}
            
            {!isUpcoming(event.enddate) && (
              <div className="text-center text-gray-500">
                Cet événement est terminé
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
