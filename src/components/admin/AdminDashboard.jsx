import { useState, useEffect } from 'react';
import { getAllUsers, getUserStats, getAllEvents, getAllArticles } from '../../services/adminService';
import UserManagement from './UserManagement';
import EventManagement from './EventManagement';
import BlogManagement from './BlogManagement';
import AdminSidebar from './AdminSidebar';
import toast from 'react-hot-toast';
import useAuthStore from '../../stores/authStore';
import { useNavigate } from 'react-router-dom';
import { Menu } from 'lucide-react';

const AdminDashboard = () => {
  const { user, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalEvents: 0,
    totalArticles: 0,
    totalRegistrations: 0,
    activeUsers: 0
  });
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Vérifier si l'utilisateur est authentifié et admin
    if (!isAuthenticated || !user || user.role !== 'ADMIN') {
      toast.error('Accès non autorisé. Vous devez être administrateur.');
      navigate('/login');
      return;
    }

    if (currentView === 'dashboard') {
      fetchAdminData();
    }
  }, [currentView, isAuthenticated, user, navigate]);

  const fetchAdminData = async () => {
    try {
      // Récupérer les statistiques de base
      const statsResponse = await getUserStats();
      
      // Récupérer les données réelles pour calculer les statistiques
      // Gérer les erreurs 404 pour les endpoints qui n'existent pas encore
      const [usersResponse, eventsResponse, articlesResponse] = await Promise.allSettled([
        getAllUsers(),
        getAllEvents().catch(() => ({ data: [] })), // Endpoint non implémenté
        getAllArticles().catch(() => ({ data: [] })) // Endpoint articles
      ]);

      // Extraire les données seulement si les promesses sont résolues
      const usersData = usersResponse.status === 'fulfilled' ? usersResponse.value.data : [];
      const eventsData = eventsResponse.status === 'fulfilled' ? eventsResponse.value.data : [];
      const articlesData = articlesResponse.status === 'fulfilled' ? articlesResponse.value.data : [];

      // Combiner les statistiques avec les données réelles
      const combinedStats = {
        ...statsResponse.data,
        totalEvents: eventsData.length,
        totalArticles: articlesData.length,
        totalUsers: usersData.length,
        activeUsers: usersData.filter(user => user.isactive).length
      };

      setStats(combinedStats);
      setUsers(usersData.slice(0, 5));
    } catch (error) {
      console.error('Erreur lors du chargement des données admin:', error);
      toast.error('Erreur lors du chargement des données');
    } finally {
      setLoading(false);
    }
  };


  const renderCurrentView = () => {
    switch (currentView) {
      case 'users':
        return <UserManagement />;
      case 'events':
        return <EventManagement />;
      case 'blog':
        return <BlogManagement />;
      case 'donations':
        return (
          <div className="p-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h1 className="text-2xl font-semibold text-gray-800">Gestion des dons</h1>
              <p className="text-gray-600 mt-2">Cette fonctionnalité sera bientôt disponible.</p>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="p-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h1 className="text-2xl font-semibold text-gray-800">Paramètres</h1>
              <p className="text-gray-600 mt-2">Cette fonctionnalité sera bientôt disponible.</p>
            </div>
          </div>
        );
      default:
        return (
          <div className="space-y-6">
            {/* En-tête */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h1 className="text-2xl font-semibold text-gray-800 mb-2">Tableau de bord Admin</h1>
              <p className="text-gray-600">Vue d'ensemble des utilisateurs, événements et contenus.</p>
            </div>

            {/* Statistiques */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="text-2xl font-bold text-blue-600">{stats.totalUsers || 0}</div>
                <div className="text-sm text-gray-600">Total utilisateurs</div>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="text-2xl font-bold text-green-600">{stats.totalEvents || 0}</div>
                <div className="text-sm text-gray-600">Total événements</div>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="text-2xl font-bold text-purple-600">{stats.totalArticles || 0}</div>
                <div className="text-sm text-gray-600">Total articles</div>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="text-2xl font-bold text-orange-600">{stats.activeUsers || 0}</div>
                <div className="text-sm text-gray-600">Utilisateurs actifs</div>
              </div>
            </div>

            {/* Utilisateurs récents */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-4 sm:p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800">Utilisateurs récents</h2>
              </div>
              <div className="p-4 sm:p-6">
                {users.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">Aucun utilisateur trouvé.</p>
                ) : (
                  <div className="space-y-3 overflow-x-auto">
                    {users.map((user) => (
                      <div key={user.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-gray-50 rounded-lg min-w-[280px]">
                        <div className="flex items-center space-x-3 mb-2 sm:mb-0">
                          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                            <span className="text-gray-600 font-medium">
                              {user.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <div className="font-medium text-gray-800">{user.name}</div>
                            <div className="text-sm text-gray-600">{user.email}</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            user.role === 'ADMIN' ? 'bg-red-100 text-red-800' :
                            user.role === 'MODERATOR' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {user.role}
                          </span>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            user.isactive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {user.isactive ? 'Actif' : 'Inactif'}
                          </span>
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <button
                  onClick={() => setCurrentView('users')}
                  className="p-4 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <div className="font-medium">Gérer les utilisateurs</div>
                  <div className="text-sm text-blue-600">Voir et modifier les comptes</div>
                </button>
                <button
                  onClick={() => setCurrentView('events')}
                  className="p-4 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors"
                >
                  <div className="font-medium">Gérer les événements</div>
                  <div className="text-sm text-green-600">Modérer les activités</div>
                </button>
                <button
                  onClick={() => setCurrentView('blog')}
                  className="p-4 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors"
                >
                  <div className="font-medium">Gérer les articles</div>
                  <div className="text-sm text-purple-600">Modérer le blog</div>
                </button>
              </div>
            </div>
          </div>
        );
    }
  };

  if (loading && currentView === 'dashboard') {
    return (
      <div className="p-6">
        <div className="text-center">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <AdminSidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />

      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        {/* Header with toggle button */}
        <div className="bg-white border-b border-gray-200 px-4 py-3 lg:hidden sticky top-0 z-30">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-lg font-semibold text-gray-800">Admin Panel</h1>
            <div className="w-10"></div> {/* Spacer pour équilibrer */}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6">
          {renderCurrentView()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
