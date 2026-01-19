function AboutPage() {
  const values = [
    {
      icon: "🤝",
      title: "Solidarité",
      description: "Nous cultivons l'entraide entre les ressortissants de notre département pour soutenir nos membres dans leurs projets et défis quotidiens.",
      color: "bg-orange-500"
    },
    {
      icon: "🌱",
      title: "Développement",
      description: "Nous œuvrons pour le développement économique et social de notre région d'origine à travers des initiatives concrètes et durables.",
      color: "bg-green-500"
    },
    {
      icon: "🏛️",
      title: "Culture",
      description: "Nous préservons et valorisons notre patrimoine culturel départemental en le partageant avec nos enfants et la communauté d'accueil.",
      color: "bg-blue-500"
    },
    {
      icon: "🌍",
      title: "Diaspora",
      description: "Nous créons des ponts entre les ressortissants restés au pays et ceux vivant à l'étranger pour un développement mutuel.",
      color: "bg-emerald-500"
    },
    {
      icon: "🎯",
      title: "Engagement",
      description: "Nous nous investissons avec passion dans les projets qui bénéficient directement à notre communauté départementale.",
      color: "bg-purple-500"
    },
    {
      icon: "❤️",
      title: "Fraternité",
      description: "Nous entretenons les liens familiaux et amicaux qui nous unissent en tant que fils et filles de notre terre natale.",
      color: "bg-red-500"
    }
  ];

  const activities = [
    {
      icon: "🎓",
      title: "Éducation",
      description: "Bourses d'études, parrainage scolaire, soutien aux jeunes étudiants de notre département"
    },
    {
      icon: "💼",
      title: "Entrepreneuriat",
      description: "Soutien aux projets d'entreprises, réseau professionnel, partage d'opportunités"
    },
    {
      icon: "🏥",
      title: "Santé",
      description: "Aide médicale d'urgence, campagnes de santé, soutien aux malades de notre communauté"
    },
    {
      icon: "🎉",
      title: "Événements",
      description: "Rencontres annuelles, fêtes traditionnelles, célébrations culturelles départementales"
    },
    {
      icon: "🤲",
      title: "Aide sociale",
      description: "Soutien aux familles en difficulté, aide d'urgence, entraide communautaire"
    },
    {
      icon: "🌐",
      title: "Réseau",
      description: "Mise en relation des membres, partage d'informations, collaboration inter-départementale"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Notre Mission Section */}
        <section className="mb-20">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Notre Mission</h1>
          <div className="text-gray-600 leading-relaxed max-w-4xl space-y-4">
            <p>
              Notre association rassemble les fils et filles de notre département bien-aimé, 
              dispersés aux quatre coins du Cameroun et du monde. Unis par nos origines communes 
              et notre attachement à notre terre natale, nous œuvrons pour maintenir les liens 
              fraternels qui nous unissent et contribuer au développement de notre région.
            </p>
            <p>
              Que vous soyez installé dans votre région d'origine, dans une autre ville camerounaise 
              ou à l'étranger, cette association est votre famille, votre réseau et votre soutien. 
              Ensemble, nous pouvons préserver notre identité culturelle tout en participant activement 
              au progrès de notre communauté et à l'épanouissement de chaque membre.
            </p>
          </div>
        </section>

        {/* Nos Valeurs Section */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-12">Nos Valeurs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow duration-300">
                <div className={`${value.color} text-white p-4 rounded-full mb-4 text-3xl flex items-center justify-center w-16 h-16`}>
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Nos Activités Section */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-12">Nos Activités</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.map((activity, index) => (
              <div key={index} className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-lg p-6 border border-orange-200">
                <div className="text-4xl mb-4">{activity.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{activity.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{activity.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Appel à l'action */}
        <section className="bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Rejoignez votre famille !</h2>
          <p className="mb-6 text-lg">
            Que vous soyez né dans notre département, d'origine départementale ou simplement 
            attaché à notre communauté, vous avez votre place parmi nous. 
            Ensemble, faisons briller notre région !
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-orange-500 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Rejoindre l'association
            </button>
            <button className="border-2 border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-orange-500 transition-colors">
              Soutenir nos projets
            </button>
          </div>
        </section>

      </div>
    </div>
  );
}

export default AboutPage;