import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllEvents } from '../../services/eventsService';
import useAuthStore from '../../stores/authStore';

const getApiBaseUrl = () => import.meta.env.VITE_API_URL || 'http://localhost:3000';

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuthStore();
  
  // Vérifier si l'utilisateur peut créer des événements
  const canCreateEvent = user?.role === 'ADMIN' || user?.role === 'MODERATOR';

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await getAllEvents();
        setEvents(response.data);
      } catch (err) {
        setError('Erreur lors du chargement des événements');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-r-2 border-t-2 border-indigo-600"></div>
          <p className="mt-4 text-gray-600">Chargement des événements...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Erreur de chargement</h3>
          <p className="text-gray-600">{error}</p>
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

  const getEventTypeColor = (type) => {
    const colors = {
      'conference': 'from-blue-500 to-indigo-600',
      'workshop': 'from-emerald-500 to-green-600',
      'meetup': 'from-purple-500 to-pink-600',
      'webinar': 'from-orange-500 to-red-600',
      'default': 'from-gray-500 to-gray-600'
    };
    return colors[type] || colors['default'];
  };

  const getEventTypeIcon = (type) => {
    const icons = {
      'conference': '🎤',
      'workshop': '🛠️',
      'meetup': '👥',
      'webinar': '💻',
      'default': '📅'
    };
    return icons[type] || icons['default'];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Événements
              </h1>
              <p className="text-gray-600 mt-2">
                Découvrez nos événements et participez à la vie de l'association
              </p>
            </div>
            {canCreateEvent && (
              <Link 
                to="/events/create" 
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                ✨ Nouvel événement
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Statistiques */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <div className="text-2xl">📅</div>
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-blue-600">{events.length}</div>
                <div className="text-sm text-gray-600">Total événements</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <div className="text-2xl">🚀</div>
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-green-600">
                  {events.filter(event => isUpcoming(event.enddate)).length}
                </div>
                <div className="text-sm text-gray-600">À venir</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg">
                <div className="text-2xl">👥</div>
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-purple-600">
                  {events.reduce((acc, event) => acc + (event.capacity || 0), 0)}
                </div>
                <div className="text-sm text-gray-600">Places totales</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 bg-orange-100 rounded-lg">
                <div className="text-2xl">🔥</div>
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-orange-600">
                  {events.filter(event => {
                    const eventDate = new Date(event.startdate);
                    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
                    return eventDate > weekAgo && isUpcoming(event.enddate);
                  }).length}
                </div>
                <div className="text-sm text-gray-600">Cette semaine</div>
              </div>
            </div>
          </div>
        </div>

        {/* Filtres */}
        <div className="mb-8 flex flex-wrap gap-3">
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium">
            Tous
          </button>
          <button className="px-4 py-2 bg-white text-gray-700 rounded-lg font-medium border border-gray-300 hover:bg-gray-50">
            À venir
          </button>
          <button className="px-4 py-2 bg-white text-gray-700 rounded-lg font-medium border border-gray-300 hover:bg-gray-50">
            Terminés
          </button>
          <button className="px-4 py-2 bg-white text-gray-700 rounded-lg font-medium border border-gray-300 hover:bg-gray-50">
            En ligne
          </button>
          <button className="px-4 py-2 bg-white text-gray-700 rounded-lg font-medium border border-gray-300 hover:bg-gray-50">
            Présentiel
          </button>
        </div>

        {/* Liste des événements */}
        {events.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-16 text-center">
              <div className="text-6xl mb-4">🎭</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucun événement prévu</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Revenez bientôt pour découvrir nos prochains événements et activités !
              </p>
              {canCreateEvent && (
                <Link 
                  to="/events/create" 
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                >
                  ✨ Créer le premier événement
                </Link>
              )}
            </div>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <div key={event.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                {/* Image ou placeholder */}
                <div className="relative h-48 bg-gradient-to-br from-indigo-100 to-purple-100">
                  {event.imageurl ? (
                    <img 
                      src={event.imageurl.startsWith('http') 
                        ? event.imageurl 
                        : `${getApiBaseUrl()}${event.imageurl}`
                      } 
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-6xl opacity-50">
                        {getEventTypeIcon(event.type)}
                      </div>
                    </div>
                  )}
                  
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    <span className={`text-xs px-3 py-1 rounded-full font-semibold shadow-lg ${
                      isUpcoming(event.enddate) 
                        ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white' 
                        : 'bg-gradient-to-r from-gray-500 to-gray-600 text-white'
                    }`}>
                      {isUpcoming(event.enddate) ? '🚀 À venir' : '✅ Terminé'}
                    </span>
                    {event.ispublished && (
                      <span className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-lg">
                        📢 Publié
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="p-6">
                  {/* Titre et type */}
                  <div className="mb-3">
                    <div className={`inline-block px-2 py-1 rounded-lg text-xs font-semibold text-white bg-gradient-to-r ${getEventTypeColor(event.type)} mb-2`}>
                      {getEventTypeIcon(event.type)} {event.type || 'Événement'}
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 hover:text-indigo-600 transition-colors">
                      {event.title}
                    </h2>
                  </div>
                  
                  {/* Description */}
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {event.description || 'Aucune description disponible'}
                  </p>
                  
                  {/* Informations */}
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center text-gray-700">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                        <div className="text-lg">📅</div>
                      </div>
                      <div>
                        <div className="font-medium">Date</div>
                        <div className="text-gray-500">{formatDate(event.startdate)}</div>
                      </div>
                    </div>
                    
                    {event.location && (
                      <div className="flex items-center text-gray-700">
                        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                          <div className="text-lg">📍</div>
                        </div>
                        <div>
                          <div className="font-medium">Lieu</div>
                          <div className="text-gray-500">{event.location}</div>
                        </div>
                      </div>
                    )}
                    
                    {event.capacity && (
                      <div className="flex items-center text-gray-700">
                        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                          <div className="text-lg">👥</div>
                        </div>
                        <div>
                          <div className="font-medium">Capacité</div>
                          <div className="text-gray-500">{event.capacity} places</div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Bouton d'action */}
                  <div className="mt-6 pt-4 border-t border-gray-100">
                    <Link 
                      to={`/events/${event.id}`} 
                      className="inline-flex items-center justify-center w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-3 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200"
                    >
                      Voir les détails
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsPage;
