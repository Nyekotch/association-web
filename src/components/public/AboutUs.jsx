function AboutPage() {
  const values = [
    {
      icon: "👥",
      title: "Solidarité",
      description: "Lorem ipsum dolor sit amet consectetur",
      color: "bg-green-500"
    },
    {
      icon: "🤝",
      title: "Partage",
      description: "Lorem ipsum dolor sit amet consectetur",
      color: "bg-yellow-500"
    },
    {
      icon: "❤️",
      title: "Engagement",
      description: "Lorem ipsum dolor sit amet consectetur",
      color: "bg-red-500"
    }
  ];

  const team = [
    {
      name: "Emila Doon",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisque quam enim. Dignissim eius vitae ipsum. Dignissim eu elit velit duis."
    },
    {
      name: "Pericle Vania",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisque quam enim. Dignissim eius vitae ipsum. Dignissim eu elit velit duis."
    },
    {
      name: "Projee Nalge",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisque quam enim. Dignissim eius vitae ipsum. Dignissim eu elit velit duis."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Notre Mission Section */}
        <section className="mb-20">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Notre Mission</h1>
          <p className="text-gray-600 leading-relaxed max-w-4xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </section>

        {/* Nos Valeurs Section */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-12">Nos Valeurs</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="flex flex-col items-start">
                <div className={`${value.color} text-white p-4 rounded-full mb-4 text-3xl flex items-center justify-center w-16 h-16`}>
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Notre Équipe Section */}
        {/* <section>
          <h2 className="text-4xl font-bold text-gray-900 mb-12">Notre Équipe</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{member.name}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {member.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section> */}

      </div>
    </div>
  );
}

export default AboutPage;