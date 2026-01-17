import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Bell, Menu, X, User, LogOut } from 'lucide-react';
import useAuthStore from '../../stores/authStore';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Déterminer la destination du lien Accueil selon le rôle
  const getHomeLink = () => {
    if (!isAuthenticated) return '/';
    if (user?.role === 'ADMIN') return '/admin/dashboard';
    return '/dashboard';
  };

  const navLinks = [
    { to: getHomeLink(), label: 'Accueil' },
    { to: '/about', label: 'À propos' },
    { to: '/events', label: 'Événements' },
    { to: '/blog', label: 'Blog' },
    { to: '/forum', label: 'Forum' },
    { to: '/donations', label: 'Dons' },
  ];

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to={getHomeLink()} className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Association</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all duration-200 font-medium text-sm"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-3">
            {/* Search */}
            <div className="hidden md:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="w-64 pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 hover:bg-white transition-colors"
                />
              </div>
            </div>

            {/* Notifications */}
            {isAuthenticated && (
              <button className="relative p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            )}

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white text-sm font-medium">
                    {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                  <div className="hidden lg:block text-left">
                    <div className="text-sm font-medium text-gray-900">
                      {user?.name || 'Utilisateur'}
                    </div>
                    <div className="text-xs text-gray-500">
                      {user?.role || 'Membre'}
                    </div>
                  </div>
                </button>

                {/* Dropdown */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                    <Link
                      to="/dashboard"
                      className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <User className="w-4 h-4" />
                      <span>Tableau de bord</span>
                    </Link>
                    {user?.role === 'ADMIN' && (
                      <Link
                        to="/admin/dashboard"
                        className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <User className="w-4 h-4" />
                        <span>Administration</span>
                      </Link>
                    )}
                    <div className="border-t border-gray-100 my-2"></div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Déconnexion</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="px-4 py-2 text-gray-600 hover:text-gray-900 font-medium text-sm transition-colors"
                >
                  Connexion
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium text-sm shadow-sm"
                >
                  Inscription
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 py-4">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              
              {/* Mobile Search */}
              <div className="pt-3 border-t border-gray-100">
                <div className="relative px-4">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Rechercher..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
