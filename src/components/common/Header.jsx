const Header = () => {
  return (
    <header className="w-full px-6 py-4 border-b border-gray-200 bg-white">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="text-xl font-semibold">Association</div>
        <nav className="space-x-4 text-sm text-gray-600">
          <a href="/">Accueil</a>
          <a href="/events">Événements</a>
          <a href="/blog">Blog</a>
          <a href="/forum">Forum</a>
          <a href="/donations">Dons</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
