import { Link } from "react-router-dom";
import { Globe, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Hero() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <section
      className="relative h-screen w-full bg-cover bg-center"
      style={{
        backgroundImage: "url('/src/assets/images/IMG_9149.JPG')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Navbar */}
      <header className="relative z-50 flex items-center justify-between px-4 sm:px-8 py-6 text-white">
        <h1 className="text-xl font-semibold">Association</h1>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm">
          <Link to="/">Accueil</Link>
          <Link to="/events">Événements</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/forum">Forum</Link>
          <Link to="/donations">Dons</Link>
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden sm:flex items-center gap-4">
          <button className="flex items-center gap-1 text-sm hover:text-blue-200 transition-colors">
            <Globe size={16} /> Français
          </button>
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
        <div className="max-w-2xl text-white">
          <h2 className="mb-6 text-4xl font-bold leading-tight md:text-5xl">
            Buy data, airtime for all <br />
            networks without charges
          </h2>

          <p className="mb-8 text-sm text-gray-200 md:text-base">
            You can buy data, airtime for all networks (CAMTEL, neXttel, MTN,
            Orange, Yoomee) with your preferred payment method (Mobile Money,
            Orange Money) with <strong>no extra charge</strong>.
          </p>


        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-white text-sm opacity-80">
        Scroll
      </div>
    </section>
  );
}