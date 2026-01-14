import { Link } from 'react-router-dom';
import Card from '../common/Card';
import Button from '../common/Button';
import Hero from '../../pages/Home/Hero';

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-blue-50">

      <main className="flex-1">
        {/* Hero Section */}
        <Hero />

        {/* Features Section */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Découvrez nos activités
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Des événements enrichissants aux discussions animées, en passant par le partage de connaissances
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="group">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-8 text-white shadow-xl transform hover:scale-105 transition-all duration-300">
                  <div className="text-4xl mb-4">📅</div>
                  <h3 className="text-xl font-bold mb-3">Événements</h3>
                  <p className="text-blue-100">Rencontres, ateliers et conférences inspirantes</p>
                </div>
                <p className="mt-4 text-sm text-gray-600 group-hover:text-blue-600 transition-colors">
                  Découvrir nos événements →
                </p>
              </div>

              <div className="group">
                <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-8 text-white shadow-xl transform hover:scale-105 transition-all duration-300">
                  <div className="text-4xl mb-4">📝</div>
                  <h3 className="text-xl font-bold mb-3">Blog</h3>
                  <p className="text-emerald-100">Actualités et retours d'expérience</p>
                </div>
                <p className="mt-4 text-sm text-gray-600 group-hover:text-emerald-600 transition-colors">
                  Lire les articles →
                </p>
              </div>

              <div className="group">
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-8 text-white shadow-xl transform hover:scale-105 transition-all duration-300">
                  <div className="text-4xl mb-4">💬</div>
                  <h3 className="text-xl font-bold mb-3">Forum</h3>
                  <p className="text-purple-100">Échanges et discussions entre participants</p>
                </div>
                <p className="mt-4 text-sm text-gray-600 group-hover:text-purple-600 transition-colors">
                  Participer au forum →
                </p>
              </div>

              <div className="group">
                <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl p-8 text-white shadow-xl transform hover:scale-105 transition-all duration-300">
                  <div className="text-4xl mb-4">❤️</div>
                  <h3 className="text-xl font-bold mb-3">Dons</h3>
                  <p className="text-pink-100">Soutenez nos initiatives et projets</p>
                </div>
                <p className="mt-4 text-sm text-gray-600 group-hover:text-pink-600 transition-colors">
                  Faire un don →
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Notre impact en chiffres
              </h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100">
                <div className="text-5xl font-bold text-blue-600 mb-2">150+</div>
                <div className="text-lg font-semibold text-gray-800 mb-1">Membres actifs</div>
                <div className="text-gray-600">Une communauté grandissante</div>
              </div>
              
              <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-100">
                <div className="text-5xl font-bold text-emerald-600 mb-2">50+</div>
                <div className="text-lg font-semibold text-gray-800 mb-1">Événements</div>
                <div className="text-gray-600">Organisés chaque année</div>
              </div>
              
              <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100">
                <div className="text-5xl font-bold text-purple-600 mb-2">1000+</div>
                <div className="text-lg font-semibold text-gray-800 mb-1">Heures de bénévolat</div>
                <div className="text-gray-600">Engagement solidaire</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Prêt à nous rejoindre ?
            </h2>
            <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
              Chaque membre compte. Ensemble, créons un impact positif dans notre communauté.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button className="bg-white text-indigo-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold shadow-xl">
                  S'inscrire maintenant
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="secondary" className="border-2 border-white text-white hover:bg-white hover:text-indigo-600 px-8 py-4 text-lg font-semibold">
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
