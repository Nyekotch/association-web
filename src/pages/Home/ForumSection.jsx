import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import forumImage from "../../assets/images/forum1.jpg";

const ForumSection = () => {
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

    const element = document.getElementById('forum-section');
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
    <section id="forum-section" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-purple-50 via-fuchsia-50 to-transparent">
      <div className="max-w-6xl mx-auto">
        <div className={`relative overflow-hidden rounded-3xl shadow-xl border border-purple-100 bg-white transition-all duration-1000 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Image à gauche */}
            <div className="relative h-64 lg:h-auto min-h-[400px]">
              <img
                src={forumImage}
                alt="Forum communautaire"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 via-purple-800/60 to-transparent" />
              
              {/* Contenu superposé sur l'image */}
              <div className="absolute inset-0 flex items-center px-6 sm:px-8 lg:px-10">
                <div className="max-w-md">
                  <div className={`inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-white/90 text-sm backdrop-blur transition-all duration-1000 delay-200 transform ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
                  }`}>
                    <span className="font-semibold">💬</span>
                    <span>Communauté • Entraide • Partage</span>
                  </div>

                  <h2 className={`mt-5 text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight transition-all duration-1000 delay-300 transform ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
                  }`}>
                    Forum
                  </h2>

                  <p className={`mt-4 text-base sm:text-lg text-white/90 leading-relaxed transition-all duration-1000 delay-400 transform ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
                  }`}>
                    Un espace pour poser des questions, partager des idées et trouver de l'aide auprès de la communauté.
                  </p>

                  <div className={`mt-7 flex flex-col sm:flex-row gap-3 transition-all duration-1000 delay-500 transform ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
                  }`}>
                    <Link
                      to="/forum"
                      className="inline-flex justify-center items-center px-6 py-3 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-all hover:scale-105"
                    >
                      Ouvrir le forum
                    </Link>
                    <Link
                      to="/register"
                      className="inline-flex justify-center items-center px-6 py-3 rounded-xl border border-white/40 text-white font-semibold hover:bg-white/10 transition-all hover:scale-105"
                    >
                      Rejoindre la discussion
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Contenu à droite */}
            <div className="p-6 sm:p-8 lg:p-10">
              <div className="space-y-6">

                {/* Discussions récentes */}
                <div className={`transition-all duration-1000 delay-700 transform ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}>
                  <div className="text-sm font-semibold text-gray-900 mb-4">Discussions récentes</div>
                  <div className="space-y-3">
                    <div className="p-4 rounded-2xl border border-purple-100 bg-purple-50/50 hover:bg-purple-50 transition-all hover:scale-[1.02] cursor-pointer">
                      <div className="font-medium text-gray-900 text-sm mb-1">
                        Organisation d'un événement local
                      </div>
                      <div className="text-xs text-gray-600 mb-2">
                        Conseils, budget, autorisations...
                      </div>
                      <div className="text-xs text-purple-600 font-medium">12 réponses</div>
                    </div>

                    <div className="p-4 rounded-2xl border border-purple-100 bg-purple-50/50 hover:bg-purple-50 transition-all hover:scale-[1.02] cursor-pointer">
                      <div className="font-medium text-gray-900 text-sm mb-1">
                        Idées de projets solidaires 2026
                      </div>
                      <div className="text-xs text-gray-600 mb-2">
                        Propositions et besoins prioritaires
                      </div>
                      <div className="text-xs text-purple-600 font-medium">8 réponses</div>
                    </div>

                    <div className="p-4 rounded-2xl border border-purple-100 bg-purple-50/50 hover:bg-purple-50 transition-all hover:scale-[1.02] cursor-pointer">
                      <div className="font-medium text-gray-900 text-sm mb-1">
                        Présentations nouveaux membres
                      </div>
                      <div className="text-xs text-gray-600 mb-2">
                        Bienvenue, parcours, centres d'intérêt
                      </div>
                      <div className="text-xs text-purple-600 font-medium">25 réponses</div>
                    </div>
                  </div>
                </div>

                {/* Règle d'or */}
                <div className={`rounded-2xl border border-purple-200 bg-gradient-to-r from-purple-50 to-fuchsia-50 p-4 transition-all duration-1000 delay-800 transform ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">💜</span>
                    <div>
                      <div className="text-sm font-semibold text-purple-900">Règle d'or</div>
                      <div className="mt-1 text-sm text-purple-800/80">
                        Respect, entraide et bienveillance: c'est comme ça qu'on avance ensemble.
                      </div>
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

export default ForumSection;
