import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="w-full px-6 py-4 border-b border-gray-200 bg-white">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="text-xl font-semibold">Association</div>
        <nav className="space-x-4 text-sm text-gray-600">
          <Link to="/">Accueil</Link>
          <Link to="/events">Événements</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/forum">Forum</Link>
          <Link to="/donations">Dons</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;