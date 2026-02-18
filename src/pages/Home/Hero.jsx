import { Link } from "react-router-dom";
import { Globe, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import heroImage from "../../assets/images/IMG_9149.JPG";

export default function Hero() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

    const element = document.getElementById('hero-section');
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
    <section
      id="hero-section"
      className="relative h-screen w-full bg-cover bg-center fixed bg-fixed"
      style={{
        backgroundImage: `url(${heroImage})`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Navbar */}
      <header className={`relative z-50 flex items-center justify-between px-4 sm:px-8 py-6 text-white transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'
        }`}>
        <h1 className="text-xl font-semibold">Association</h1>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm">
          <Link to="/">Accueil</Link>
          <Link to="/events">Événements</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/forum">Forum</Link>
          <Link to="/donations">Dons</Link>
          <Link to="/about">A propos</Link>
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden sm:flex items-center gap-4">

          <Link to="/login" className="text-sm hover:text-blue-200 transition-colors">
            Se connecter
          </Link>
          <Link to="/register" className="rounded-xl bg-sky-500 px-4 py-2 text-sm font-semibold hover:bg-sky-600 transition-colors">
            S'inscrire
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex items-center"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-black/95 backdrop-blur-sm md:hidden z-[60]">
            <nav className="flex flex-col p-4 space-y-4 text-sm">
              <Link to="/" className="hover:text-blue-200 transition-colors">Accueil</Link>
              <Link to="/events" className="hover:text-blue-200 transition-colors">Événements</Link>
              <Link to="/blog" className="hover:text-blue-200 transition-colors">Blog</Link>
              <Link to="/forum" className="hover:text-blue-200 transition-colors">Forum</Link>
              <Link to="/donations" className="hover:text-blue-200 transition-colors">Dons</Link>
              <div className="border-t border-white/20 pt-4 space-y-3">
                <button className="flex items-center gap-1 text-sm hover:text-blue-200 transition-colors">
                  <Globe size={16} /> Français
                </button>
                <Link to="/login" className="block hover:text-blue-200 transition-colors">
                  Se connecter
                </Link>
                <Link to="/register" className="block rounded-xl bg-sky-500 px-4 py-2 text-sm font-semibold hover:bg-sky-600 transition-colors text-center">
                  S'inscrire
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Hero content */}
      <div className="relative z-20 flex h-full items-center px-8">
        <div className={`max-w-2xl text-white transition-all duration-1000 delay-300 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
          <h2 className="mb-6 text-4xl font-bold leading-tight md:text-5xl">
            Fiers de nos racines, <br />
            unis pour notre département
          </h2>

          <p className="mb-8 text-sm text-gray-200 md:text-base">
            Rejoignez les fils et filles de notre terre natale pour célébrer notre culture,
            soutenir nos projets et construire un avenir prospère pour notre communauté.
            <strong>Ensemble, faisons briller notre département !</strong>
          </p>

          <div className={`flex flex-col sm:flex-row gap-4 transition-all duration-1000 delay-500 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
            <Link
              to="/register"
              className="rounded-xl bg-orange-500 px-6 py-3 text-sm font-semibold hover:bg-orange-600 transition-colors text-center"
            >
              Rejoindre nos rangs
            </Link>

          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div className={`absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-white text-sm transition-all duration-1000 delay-700 transform ${isVisible ? 'translate-y-0 opacity-80' : 'translate-y-10 opacity-0'
        }`}>
        <div className="flex flex-col items-center gap-2">
          <span>Scroll</span>
          <div className="w-1 h-8 bg-white/50 rounded-full animate-bounce"></div>
        </div>
      </div>
    </section>
  );
}