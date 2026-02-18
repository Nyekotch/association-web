import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import eventsImage from "../../assets/images/events1.png";

const EventsSection = () => {
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

    const element = document.getElementById('events-section');
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
    <section id="events-section" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50 via-sky-50 to-transparent">
      <div className="max-w-6xl mx-auto">
        <div className={`relative overflow-hidden rounded-3xl shadow-xl border border-white/30 transition-all duration-1000 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div
            className="relative h-96 md:h-[500px] bg-cover bg-center"
            style={{ backgroundImage: `url(${eventsImage})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-800/80 to-transparent" />
            
            <div className="relative h-full flex items-center px-6 sm:px-10 lg:px-12">
              <div className="max-w-3xl">
                <div className={`inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-white/90 text-sm backdrop-blur transition-all duration-1000 delay-200 transform ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
                }`}>
                  <span className="font-semibold">📅</span>
                  <span>Agenda • Rencontres • Ateliers</span>
                </div>

                <h2 className={`mt-5 text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight transition-all duration-1000 delay-300 transform ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
                }`}>
                  Nos événements
                </h2>

                <p className={`mt-4 text-base sm:text-lg text-white/90 leading-relaxed transition-all duration-1000 delay-400 transform ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
                }`}>
                  Participez aux rendez-vous de l'association: conférences, activités culturelles et actions solidaires.
                </p>

                <div className={`mt-7 flex flex-col sm:flex-row gap-3 transition-all duration-1000 delay-500 transform ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
                }`}>
                  <Link
                    to="/events"
                    className="inline-flex justify-center items-center px-6 py-3 rounded-xl bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-all hover:scale-105"
                  >
                    Voir le calendrier
                  </Link>
                  <Link
                    to="/membership"
                    className="inline-flex justify-center items-center px-6 py-3 rounded-xl border border-white/40 text-white font-semibold hover:bg-white/10 transition-all hover:scale-105"
                  >
                    Devenir membre
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 sm:p-8">
            <div className={`grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 transition-all duration-1000 delay-600 transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <div className="text-center p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-sky-50 hover:shadow-lg transition-all hover:scale-105">
                <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
                <div className="text-sm text-gray-600 font-medium">événements/an</div>
              </div>
              <div className="text-center p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-sky-50 hover:shadow-lg transition-all hover:scale-105">
                <div className="text-3xl font-bold text-blue-600 mb-2">150+</div>
                <div className="text-sm text-gray-600 font-medium">membres actifs</div>
              </div>
              <div className="text-center p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-sky-50 hover:shadow-lg transition-all hover:scale-105">
                <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
                <div className="text-sm text-gray-600 font-medium">infos & actus</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
