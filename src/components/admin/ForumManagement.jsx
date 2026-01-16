import { useState, useEffect } from 'react';
import { getAllTopics, deleteTopic, lockTopic, pinTopic } from '../../services/adminService';
import toast from 'react-hot-toast';
import { Search, Plus, Edit, Trash2, MessageSquare, Lock, Pin, Eye, Users } from 'lucide-react';

const ForumManagement = () => {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    fetchTopics();
  }, []);

  const fetchTopics = async () => {
    try {
      const response = await getAllTopics();
      setTopics(response.data || []);
      setLoading(false);
    } catch (error) {
      console.error('Erreur lors du chargement des topics:', error);
      toast.error('Erreur lors du chargement des topics');
      setTopics([]);
      setLoading(false);
    }
  };

  const filteredTopics = topics.filter(topic =>
    topic.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    topic.creator?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (topic) => {
    if (topic.isclosed) return 'bg-red-100 text-red-800';
    if (topic.ispinned) return 'bg-blue-100 text-blue-800';
    return 'bg-green-100 text-green-800';
  };

  const getStatusLabel = (topic) => {
    if (topic.isclosed) return 'Verrouillé';
    if (topic.ispinned) return 'Épinglé';
    return 'Actif';
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Annonces': return 'bg-purple-100 text-purple-800';
      case 'Questions': return 'bg-blue-100 text-blue-800';
      case 'Support': return 'bg-orange-100 text-orange-800';
      case 'Suggestions': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleStatusToggle = async (topicId, currentStatus) => {
    try {
      const newStatus = currentStatus === 'active' ? 'archived' : 'active';
      // TODO: Implémenter l'appel API
      setTopics(prev =>
        prev.map(topic =>
          topic.id === topicId ? { ...topic, status: newStatus } : topic
        )
      );
      toast.success(`Topic ${newStatus === 'active' ? 'activé' : 'archivé'} avec succès`);
    } catch (error) {
      toast.error('Erreur lors du changement de statut');
    }
  };

  const handleDelete = async (topicId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce topic ?')) {
      try {
        // TODO: Implémenter l'appel API
        setTopics(prev => prev.filter(topic => topic.id !== topicId));
        toast.success('Topic supprimé avec succès');
      } catch (error) {
        toast.error('Erreur lors de la suppression');
      }
    }
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
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">Gestion du forum</h1>
        <p className="text-gray-600">Modération et gestion des sujets du forum</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Rechercher par titre ou auteur..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">Tous les statuts</option>
            <option value="pinned">Épinglés</option>
            <option value="locked">Verrouillés</option>
            <option value="active">Actifs</option>
          </select>
        </div>

        {filteredTopics.length === 0 ? (
          <p className="text-gray-500 text-center py-8">Aucun sujet trouvé</p>
        ) : (
          <div className="overflow-x-auto -mx-6 lg:mx-0">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Sujet
                      </th>
                      <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Auteur
                      </th>
                      <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Catégorie
                      </th>
                      <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Messages
                      </th>
                      <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Vues
                      </th>
                      <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Statut
                      </th>
                      <th scope="col" className="relative px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredTopics.map((topic) => (
                      <tr key={topic.id} className="hover:bg-gray-50">
                        <td className="px-3 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{topic.title}</div>
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                                <span className="text-gray-600 font-medium text-sm">
                                  {topic.creator?.name?.charAt(0)?.toUpperCase() || 'A'}
                                </span>
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{topic.creator?.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(topic.category)}`}>
                            {topic.category}
                          </span>
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap">
                          <div className="flex items-center text-sm text-gray-500">
                            <MessageSquare className="w-4 h-4 mr-1" />
                            {topic.posts?.length || 0}
                          </div>
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap">
                          <div className="flex items-center text-sm text-gray-500">
                            <Eye className="w-4 h-4 mr-1" />
                            {topic.viewcount?.toLocaleString() || '0'}
                          </div>
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(topic)}`}>
                            {topic.isclosed && <Lock className="w-3 h-3 mr-1" />}
                            {getStatusLabel(topic)}
                          </span>
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <button className="text-blue-600 hover:text-blue-900">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="text-green-600 hover:text-green-900">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="text-red-600 hover:text-red-900">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForumManagement;
