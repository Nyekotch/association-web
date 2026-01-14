import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../stores/authStore';
import { getEventsByUser } from '../../services/userService';
import { getRegistrationsByUser } from '../../services/userService';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [userEvents, setUserEvents] = useState([]);
  const [userRegistrations, setUserRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) {
        navigate('/login');
        return;
      }

      try {
        // Récupérer les événements créés par l'utilisateur
        const eventsResponse = await getEventsByUser(user.id);
        setUserEvents(eventsResponse.data);

        // Récupérer les inscriptions de l'utilisateur
        const registrationsResponse = await getRegistrationsByUser(user.id);
        setUserRegistrations(registrationsResponse.data);
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
        toast.error('Erreur lors du chargement de vos données');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user, navigate]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const isUpcoming = (endDate) => {
    return new Date(endDate) > new Date();
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="text-center">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* En-tête */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          Bienvenue, {user?.name} !
        </h1>
        <p className="text-gray-600">
          Voici un aperçu de vos activités et de vos inscriptions.
        </p>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="text-2xl font-bold text-blue-600">{userEvents.length}</div>
          <div className="text-sm text-gray-600">Événements créés</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="text-2xl font-bold text-green-600">
            {userRegistrations.filter(reg => reg.status === 'REGISTERED').length}
          </div>
          <div className="text-sm text-gray-600">Inscriptions actives</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="text-2xl font-bold text-purple-600">
            {userRegistrations.filter(reg => isUpcoming(reg.event?.enddate)).length}
          </div>
          <div className="text-sm text-gray-600">Événements à venir</div>
        </div>
      </div>

      {/* Mes événements créés */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Mes événements créés</h2>
        </div>
        <div className="p-6">
          {userEvents.length === 0 ? (
            <p className="text-gray-500 text-center py-4">
              Vous n'avez pas encore créé d'événements.
            </p>
          ) : (
            <div className="space-y-3">
              {userEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <h3 className="font-medium text-gray-800">{event.title}</h3>
                    <p className="text-sm text-gray-600">
                      {formatDate(event.startdate)} - {formatDate(event.enddate)}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      event.ispublished
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {event.ispublished ? 'Publié' : 'Brouillon'}
                    </span>
                    <button
                      onClick={() => navigate(`/events/${event.id}`)}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      Voir
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mes inscriptions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Mes inscriptions</h2>
        </div>
        <div className="p-6">
          {userRegistrations.length === 0 ? (
            <p className="text-gray-500 text-center py-4">
              Vous n'êtes pas encore inscrit à des événements.
            </p>
          ) : (
            <div className="space-y-3">
              {userRegistrations.map((registration) => (
                <div
                  key={registration.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <h3 className="font-medium text-gray-800">
                      {registration.event?.title || 'Événement inconnu'}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {registration.event?.startdate && formatDate(registration.event.startdate)}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      registration.status === 'REGISTERED'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {registration.status === 'REGISTERED' ? 'Inscrit' : registration.status}
                    </span>
                    <button
                      onClick={() => navigate(`/events/${registration.eventid}`)}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      Voir
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Actions rapides */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Actions rapides</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => navigate('/events/create')}
            className="p-4 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <div className="font-medium">Créer un événement</div>
            <div className="text-sm text-blue-600">Organiser une nouvelle activité</div>
          </button>
          <button
            onClick={() => navigate('/events')}
            className="p-4 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors"
          >
            <div className="font-medium">Découvrir les événements</div>
            <div className="text-sm text-green-600">Parcourir les activités disponibles</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
