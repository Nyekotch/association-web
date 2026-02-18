
import { useState, useEffect } from 'react';
import Hero from '../../pages/Home/Hero';
import EventsSection from '../../pages/Home/EventsSection';
import BlogSection from '../../pages/Home/BlogSection';
import ForumSection from '../../pages/Home/ForumSection';
import DonationsSection from '../../pages/Home/DonationsSection';

const HomePage = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e) => setMousePosition({ x: e.clientX, y: e.clientY });

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute w-96 h-96 bg-blue-200/20 rounded-full blur-3xl animate-pulse"
          style={{
            transform: `translate(${mousePosition.x * 0.05}px, ${mousePosition.y * 0.05}px)`,
            top: '10%',
            left: '10%'
          }}
        />
        <div
          className="absolute w-96 h-96 bg-purple-200/20 rounded-full blur-3xl animate-pulse"
          style={{
            transform: `translate(${mousePosition.x * -0.03}px, ${mousePosition.y * -0.03}px)`,
            top: '50%',
            right: '10%'
          }}
        />
        <div
          className="absolute w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl animate-pulse"
          style={{
            transform: `translate(${mousePosition.x * 0.04}px, ${mousePosition.y * 0.04}px)`,
            bottom: '10%',
            left: '30%'
          }}
        />
      </div>

      {/* Scroll progress indicator */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
          style={{ width: `${Math.min((scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100, 100)}%` }}
        />
      </div>

      {/* Floating particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/30 rounded-full animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      <main className="relative z-10">
        {/* Hero Section */}
        <Hero />

        {/* Section separators with animations */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
          </div>
          <div className="relative bg-white/80 backdrop-blur-sm px-6 py-2 rounded-full inline-block mx-auto my-8">
            <span className="text-sm text-gray-600 font-medium">Découvrez nos activités</span>
          </div>
        </div>

        <EventsSection />

        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
          </div>
          <div className="relative bg-white/80 backdrop-blur-sm px-6 py-2 rounded-full inline-block mx-auto my-8">
            <span className="text-sm text-gray-600 font-medium">Actualités et témoignages</span>
          </div>
        </div>

        <BlogSection />

        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
          </div>
          <div className="relative bg-white/80 backdrop-blur-sm px-6 py-2 rounded-full inline-block mx-auto my-8">
            <span className="text-sm text-gray-600 font-medium">Rejoignez la discussion</span>
          </div>
        </div>

        <ForumSection />

        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
          </div>
          <div className="relative bg-white/80 backdrop-blur-sm px-6 py-2 rounded-full inline-block mx-auto my-8">
            <span className="text-sm text-gray-600 font-medium">Soutenez nos projets</span>
          </div>
        </div>

        <DonationsSection />
      </main>

    </div>
  );
};

export default HomePage;