import { useState, useEffect } from 'react';
import { getAllDonations, getDonationStats, updateDonationStatus } from '../../services/adminService';
import toast from 'react-hot-toast';

const DonationManagement = () => {
  const [donations, setDonations] = useState([]);
  const [stats, setStats] = useState({
    totalAmount: 0,
    totalDonations: 0,
    averageAmount: 0,
    thisMonth: 0
  });
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPeriod, setFilterPeriod] = useState('all');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [donationsResponse, statsResponse] = await Promise.all([
        getAllDonations(),
        getDonationStats()
      ]);
      setDonations(donationsResponse.data);
      setStats(statsResponse.data);
    } catch (error) {
      toast.error('Erreur lors du chargement des données');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (donationId, newStatus) => {
    try {
      await updateDonationStatus(donationId, newStatus);
      toast.success('Statut mis à jour avec succès');
      fetchData();
    } catch (error) {
      toast.error('Erreur lors de la mise à jour du statut');
    }
  };

  const filteredDonations = donations.filter(donation => {
    const matchesStatus = filterStatus === 'all' || donation.status === filterStatus;
    
    if (filterPeriod === 'all') return matchesStatus;
    
    const donationDate = new Date(donation.createdAt);
    const now = new Date();
    const thisMonth = donationDate.getMonth() === now.getMonth() && 
                     donationDate.getFullYear() === now.getFullYear();
    const lastMonth = donationDate.getMonth() === now.getMonth() - 1 && 
                     donationDate.getFullYear() === now.getFullYear();
    
    return matchesStatus && (
      (filterPeriod === 'thisMonth' && thisMonth) ||
      (filterPeriod === 'lastMonth' && lastMonth)
    );
  });

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
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">Gestion des dons</h1>
        <p className="text-gray-600">Suivi des contributions financières</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="text-2xl font-bold text-green-600">{stats.totalAmount || 0}€</div>
          <div className="text-sm text-gray-600">Total des dons</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="text-2xl font-bold text-blue-600">{stats.totalDonations || 0}</div>
          <div className="text-sm text-gray-600">Nombre de dons</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="text-2xl font-bold text-purple-600">{stats.averageAmount || 0}€</div>
          <div className="text-sm text-gray-600">Moyenne par don</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="text-2xl font-bold text-orange-600">{stats.thisMonth || 0}€</div>
          <div className="text-sm text-gray-600">Ce mois-ci</div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <select
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">Tous les statuts</option>
            <option value="PENDING">En attente</option>
            <option value="COMPLETED">Complété</option>
            <option value="FAILED">Échoué</option>
            <option value="REFUNDED">Remboursé</option>
          </select>
          <select
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filterPeriod}
            onChange={(e) => setFilterPeriod(e.target.value)}
          >
            <option value="all">Toutes les périodes</option>
            <option value="thisMonth">Ce mois</option>
            <option value="lastMonth">Le mois dernier</option>
          </select>
        </div>

        {filteredDonations.length === 0 ? (
          <p className="text-gray-500 text-center py-8">Aucun don trouvé</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Donateur</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Montant</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Type</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Date</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Statut</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredDonations.map((donation) => (
                  <tr key={donation.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div>
                        <div className="font-medium text-gray-800">
                          {donation.donorName || 'Anonyme'}
                        </div>
                        <div className="text-sm text-gray-600">
                          {donation.donorEmail || 'N/A'}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-semibold text-green-600">{donation.amount}€</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        donation.type === 'ONE_TIME' ? 'bg-blue-100 text-blue-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {donation.type === 'ONE_TIME' ? 'Ponctuel' : 'Récurrent'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {new Date(donation.createdAt).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="py-3 px-4">
                      <select
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          donation.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                          donation.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                          donation.status === 'FAILED' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}
                        value={donation.status}
                        onChange={(e) => handleStatusUpdate(donation.id, e.target.value)}
                      >
                        <option value="PENDING">En attente</option>
                        <option value="COMPLETED">Complété</option>
                        <option value="FAILED">Échoué</option>
                        <option value="REFUNDED">Remboursé</option>
                      </select>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-800 text-sm">
                          Détails
                        </button>
                        <button className="text-red-600 hover:text-red-800 text-sm">
                          Rembourser
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Actions rapides</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors">
            <div className="font-medium">Exporter les dons</div>
            <div className="text-sm text-green-600">Télécharger CSV/Excel</div>
          </button>
          <button className="p-4 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
            <div className="font-medium">Générer un rapport</div>
            <div className="text-sm text-blue-600">Rapport mensuel/annuel</div>
          </button>
          <button className="p-4 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors">
            <div className="font-medium">Envoyer des reçus</div>
            <div className="text-sm text-purple-600">Reçus fiscaux</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DonationManagement;
