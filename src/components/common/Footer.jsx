import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full px-6 py-8 border-t border-gray-200 bg-white text-sm text-gray-600">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0">
        <div>© {new Date().getFullYear()} Association. Tous droits réservés.</div>
        <div className="space-x-4">
          <Link to="/about" className="hover:text-gray-900 transition-colors">À propos</Link>
          <Link to="/donations" className="hover:text-gray-900 transition-colors">Dons</Link>
          <Link to="/contact" className="hover:text-gray-900 transition-colors">Contact</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
