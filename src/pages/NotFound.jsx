const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
    <div className="text-center space-y-3">
      <h1 className="text-4xl font-bold text-gray-800">404</h1>
      <p className="text-gray-600">Page non trouvée.</p>
      <a href="/" className="text-blue-600 hover:underline text-sm">Retour à l’accueil</a>
    </div>
  </div>
);

export default NotFound;
