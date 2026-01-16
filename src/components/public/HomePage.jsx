import { Link } from 'react-router-dom';
import Card from '../common/Card';
import Button from '../common/Button';
import Hero from '../../pages/Home/Hero';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <main className="flex-1">
        {/* Hero Section */}
        <Hero />

        {/* Features Section - Redesign */}
        <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
                Découvrez nos activités
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Des événements enrichissants aux discussions animées, en passant par le partage de connaissances et l'entraide mutuelle
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="group relative">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-white shadow-xl transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
                  <div className="text-3xl sm:text-4xl mb-4">📅</div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-3">Événements</h3>
                  <p className="text-blue-100 text-sm sm:text-base">Rencontres, ateliers et conférences inspirantes</p>
                  <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl sm:rounded-3xl"></div>
                </div>
                <div className="mt-4 sm:mt-6">
                  <p className="text-sm text-gray-600 group-hover:text-blue-200 transition-colors">
                    Découvrir nos événements →
                  </p>
                </div>
              </div>

              <div className="group relative">
                <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-white shadow-xl transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
                  <div className="text-3xl sm:text-4xl mb-4">📝</div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-3">Blog</h3>
                  <p className="text-emerald-100 text-sm sm:text-base">Actualités et retours d'expérience</p>
                  <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl sm:rounded-3xl"></div>
                </div>
                <div className="mt-4 sm:mt-6">
                  <p className="text-sm text-gray-600 group-hover:text-emerald-200 transition-colors">
                    Lire les articles →
                  </p>
                </div>
              </div>

              <div className="group relative">
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-white shadow-xl transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
                  <div className="text-3xl sm:text-4xl mb-4">💬</div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-3">Forum</h3>
                  <p className="text-purple-100 text-sm sm:text-base">Échanges et discussions entre participants</p>
                  <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl sm:rounded-3xl"></div>
                </div>
                <div className="mt-4 sm:mt-6">
                  <p className="text-sm text-gray-600 group-hover:text-purple-200 transition-colors">
                    Participer au forum →
                  </p>
                </div>
              </div>

              <div className="group relative">
                <div className="bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-white shadow-xl transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
                  <div className="text-3xl sm:text-4xl mb-4">❤️</div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-3">Dons</h3>
                  <p className="text-pink-100 text-sm sm:text-base">Soutenez nos initiatives et projets</p>
                  <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl sm:rounded-3xl"></div>
                </div>
                <div className="mt-4 sm:mt-6">
                  <p className="text-sm text-gray-600 group-hover:text-pink-200 transition-colors">
                    Faire un don →
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section - Enhanced */}
        <section className="py-12 sm:py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Notre impact en chiffres
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Des résultats concrets qui témoignent de notre engagement communautaire
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              <div className="group relative">
                <div className="text-center p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105">
                  <div className="text-4xl sm:text-5xl font-bold text-blue-600 mb-3">150+</div>
                  <div className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">Membres actifs</div>
                  <div className="text-sm sm:text-base text-gray-600">Une communauté grandissante</div>
                  <div className="absolute inset-0 bg-gradient-to-t from-transparent to-blue-50 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl"></div>
                </div>
              </div>

              <div className="group relative">
                <div className="text-center p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-100 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105">
                  <div className="text-4xl sm:text-5xl font-bold text-emerald-600 mb-3">50+</div>
                  <div className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">Événements</div>
                  <div className="text-sm sm:text-base text-gray-600">Organisés chaque année</div>
                  <div className="absolute inset-0 bg-gradient-to-t from-transparent to-emerald-50 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl"></div>
                </div>
              </div>

              <div className="group relative">
                <div className="text-center p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105">
                  <div className="text-4xl sm:text-5xl font-bold text-purple-600 mb-3">1000+</div>
                  <div className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">Heures de bénévolat</div>
                  <div className="text-sm sm:text-base text-gray-600">Engagement solidaire</div>
                  <div className="absolute inset-0 bg-gradient-to-t from-transparent to-purple-50 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl"></div>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center mt-12">
              <Link 
                to="/membership" 
                className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Rejoindre notre communauté
              </Link>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-6">
              Chaque membre compte. Ensemble, créons un impact positif dans notre communauté.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Link to="/register">
                <Button className="bg-white text-indigo-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold shadow-xl transform hover:scale-105 transition-all duration-200">
                  S'inscrire maintenant
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="secondary" className="border-2 border-white text-white hover:bg-white hover:text-indigo-600 px-8 py-4 text-lg font-semibold transform hover:scale-105 transition-all duration-200">
                  En savoir plus
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

    </div>
  );
};

export default HomePage;