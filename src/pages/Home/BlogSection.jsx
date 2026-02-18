import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import heroImage from "../../assets/images/IMG_9149.JPG";

const BlogSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredArticle, setHoveredArticle] = useState(null);

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

    const element = document.getElementById('blog-section');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const articles = [
    { title: "Retour sur notre dernier rassemblement", time: "Lecture: 3 min", id: 1 },
    { title: "Nouveaux projets communautaires 2026", time: "Lecture: 4 min", id: 2 },
    { title: "Portrait: bénévoles et initiatives", time: "Lecture: 5 min", id: 3 }
  ];

  return (
    <section id="blog-section" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-emerald-50 via-green-50 to-transparent">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            <div className={`relative overflow-hidden rounded-3xl border border-gray-100 shadow-xl transition-all duration-1000 transform hover:scale-[1.02] hover:shadow-2xl ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <div className="relative h-72 sm:h-96">
                <img
                  src={heroImage}
                  alt="Blog"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="absolute left-6 right-6 bottom-6">
                  <div className={`flex flex-wrap gap-2 mb-3 transition-all duration-1000 delay-200 transform ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
                  }`}>
                    <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur hover:bg-white/25 transition-colors cursor-pointer">
                      Actualités
                    </span>
                    <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur hover:bg-white/25 transition-colors cursor-pointer">
                      Témoignages
                    </span>
                    <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur hover:bg-white/25 transition-colors cursor-pointer">
                      Projets
                    </span>
                  </div>

                  <h2 className={`text-3xl sm:text-4xl font-bold text-white leading-tight transition-all duration-1000 delay-300 transform ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
                  }`}>Blog</h2>
                  <p className={`mt-2 text-sm sm:text-base text-white/90 max-w-2xl transition-all duration-1000 delay-400 transform ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
                  }`}>
                    Des articles courts et utiles pour suivre la vie de l'association, ses annonces et ses réussites.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className={`rounded-3xl bg-white/70 backdrop-blur border border-gray-100 shadow-sm p-6 sm:p-8 transition-all duration-1000 delay-500 transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <h3 className="text-lg font-semibold text-gray-900">À la une</h3>
              <div className="mt-4 space-y-4">
                {articles.map((article, index) => (
                  <div
                    key={article.id}
                    className={`rounded-2xl border border-gray-100 bg-white p-4 transition-all duration-300 cursor-pointer ${
                      hoveredArticle === article.id ? 'scale-105 shadow-lg border-emerald-200 bg-emerald-50' : 'hover:shadow-md'
                    }`}
                    style={{ transitionDelay: `${600 + index * 100}ms` }}
                    onMouseEnter={() => setHoveredArticle(article.id)}
                    onMouseLeave={() => setHoveredArticle(null)}
                  >
                    <div className="text-sm font-semibold text-gray-900">{article.title}</div>
                    <div className="mt-1 text-xs text-gray-500">{article.time}</div>
                  </div>
                ))}
              </div>

              <div className={`mt-6 flex flex-col gap-3 transition-all duration-1000 delay-900 transform ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
              }`}>
                <Link
                  to="/blog"
                  className="inline-flex justify-center items-center px-6 py-3 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-all hover:scale-105 hover:shadow-lg"
                >
                  Lire les articles
                </Link>
                <Link
                  to="/blog/create"
                  className="inline-flex justify-center items-center px-6 py-3 rounded-xl border border-emerald-200 text-emerald-700 font-semibold hover:bg-emerald-50 transition-all hover:scale-105"
                >
                  Proposer un article
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
