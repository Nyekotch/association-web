import donsImage from "../../assets/images/dons1.jpeg";

const DonationPage = () => (
  <div 
    className="min-h-screen bg-cover bg-no-repeat bg-center relative"
    style={{
      backgroundImage: `url(${donsImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed'
    }}
  >
    <div className="absolute inset-0 bg-black/50" />
    <div className="relative z-10 max-w-3xl mx-auto px-6 py-10 space-y-4">
      <h1 className="text-3xl font-bold text-white">Faire un don</h1>
      <p className="text-gray-200 text-lg">Formulaire de don à implémenter.</p>
    </div>
  </div>
);

export default DonationPage;
