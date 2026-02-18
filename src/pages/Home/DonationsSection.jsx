import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import donsImage1 from "../../assets/images/dons1.jpeg";
import donsImage2 from "../../assets/images/dons2.jpeg";

const DonationsSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('donations-section');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);
  return (
    <section id="donations-section" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-rose-50 via-orange-50 to-transparent">
      <div className="max-w-6xl mx-auto">
        <div className={`relative overflow-hidden rounded-3xl border border-rose-100 bg-rose-50 transition-all duration-1000 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="absolute inset-0">
            <img
              src={donsImage1}
              alt="Dons"
              className="h-full w-full object-cover opacity-45"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-rose-50 via-rose-50/80 to-white/30" />
          </div>

          <div className="relative p-6 sm:p-10 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
              <div className="lg:col-span-3">
                <div className={`inline-flex items-center gap-2 rounded-full bg-rose-100 px-4 py-2 text-rose-800 text-sm font-medium transition-all duration-1000 delay-200 transform ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
                }`}>
                  <span>❤️</span>
                  <span>Solidarité & projets</span>
                </div>

                <h2 className={`mt-5 text-3xl sm:text-4xl font-bold text-gray-900 transition-all duration-1000 delay-300 transform ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
                }`}>Dons</h2>
                <p className={`mt-4 text-lg text-gray-700 leading-relaxed max-w-2xl transition-all duration-1000 delay-400 transform ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
                }`}>
                  Chaque contribution aide à financer des actions concrètes: soutien aux initiatives locales, entraide et projets communautaires.
                </p>

                <div className={`mt-7 flex flex-col sm:flex-row gap-3 transition-all duration-1000 delay-500 transform ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
                }`}>
                  <Link
                    to="/donations"
                    className="inline-flex justify-center items-center px-6 py-3 rounded-xl bg-rose-600 text-white font-semibold hover:bg-rose-700 transition-colors"
                  >
                    Faire un don
                  </Link>
                  <Link
                    to="/about"
                    className="inline-flex justify-center items-center px-6 py-3 rounded-xl border border-rose-200 text-rose-800 font-semibold hover:bg-rose-100 transition-colors"
                  >
                    Voir nos actions
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-2">
                <div className={`rounded-3xl bg-white/80 backdrop-blur border border-rose-100 shadow-sm p-6 transition-all duration-1000 delay-600 transform ${
                  isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-5 opacity-0 scale-95'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-semibold text-gray-900">Objectif du mois</div>
                    <div className="text-xs font-semibold text-rose-700">62%</div>
                  </div>

                  <div className="mt-4 overflow-hidden rounded-2xl border border-rose-100 bg-white">
                    <img
                      src={donsImage2}
                      alt="Soutien"
                      className="h-36 w-full object-cover"
                      loading="lazy"
                    />
                  </div>

                  <div className="mt-3 h-2 w-full rounded-full bg-rose-100 overflow-hidden">
                    <div className={`h-full w-[62%] rounded-full bg-gradient-to-r from-rose-500 to-orange-500 transition-all duration-1500 delay-700 ${
                      isVisible ? 'w-[62%]' : 'w-0'
                    }`} />
                  </div>

                  <div className="mt-4 flex items-end justify-between">
                    <div>
                      <div className="text-2xl font-bold text-gray-900">620 000 FCFA</div>
                      <div className="text-xs text-gray-500">collectés sur 1 000 000 FCFA</div>
                    </div>
                    <div className="text-xs text-gray-500">reste 12 jours</div>
                  </div>

                  <div className={`mt-6 space-y-3`}>
                    <div className={`rounded-2xl border border-rose-100 bg-white p-4 transition-all duration-1000 delay-800 transform hover:scale-105 hover:shadow-md ${
                      isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
                    }`}>
                      <div className="text-sm font-semibold text-gray-900">Kit scolaire</div>
                      <div className="mt-1 text-xs text-gray-600">Soutien aux familles</div>
                    </div>
                    <div className={`rounded-2xl border border-rose-100 bg-white p-4 transition-all duration-1000 delay-900 transform hover:scale-105 hover:shadow-md ${
                      isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
                    }`}>
                      <div className="text-sm font-semibold text-gray-900">Santé & solidarité</div>
                      <div className="mt-1 text-xs text-gray-600">Aide d'urgence</div>
                    </div>
                    <div className={`rounded-2xl border border-rose-100 bg-white p-4 transition-all duration-1000 delay-1000 transform hover:scale-105 hover:shadow-md ${
                      isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
                    }`}>
                      <div className="text-sm font-semibold text-gray-900">Projet communautaire</div>
                      <div className="mt-1 text-xs text-gray-600">Actions locales</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DonationsSection;
