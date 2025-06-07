import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="bg-white">
      {/* Section Hero Moderne */}
      <div className="relative min-h-screen flex items-center bg-gradient-to-br from-green-400 via-green-500 to-green-600 overflow-hidden">
        {/* Éléments décoratifs */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 right-20 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/5 rounded-full blur-lg"></div>
        </div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Contenu principal */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-6">
                🌱 Ensemble contre le gaspillage
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
                Transformez vos
                <span className="block text-green-100">
                  surplus alimentaires
                </span>
                en actions solidaires
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-green-100 max-w-2xl">
                Rejoignez FoodShare, la plateforme qui connecte les donateurs et
                les bénéficiaires pour réduire le gaspillage alimentaire dans
                votre quartier.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  to="/offres"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-green-600 font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                >
                  Découvrir les offres
                  <svg
                    className="ml-2 h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-green-600 transition-all duration-300"
                >
                  Rejoindre la communauté
                </Link>
              </div>

              {/* Statistiques */}
              <div className="mt-12 grid grid-cols-3 gap-4 text-center">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-2xl sm:text-3xl font-bold text-white">
                    1,2K+
                  </div>
                  <div className="text-green-100 text-sm">
                    Utilisateurs actifs
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-2xl sm:text-3xl font-bold text-white">
                    5,8K
                  </div>
                  <div className="text-green-100 text-sm">Repas sauvés</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-2xl sm:text-3xl font-bold text-white">
                    95%
                  </div>
                  <div className="text-green-100 text-sm">Satisfaction</div>
                </div>
              </div>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="relative z-10">
                <img
                  src="https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
                  alt="Partage alimentaire"
                  className="w-full rounded-2xl shadow-2xl"
                />
              </div>
              <div className="absolute -inset-4 bg-white/20 rounded-2xl blur-lg"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Section Comment ça marche - Design Cards */}
      <div className="py-20 sm:py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Trois étapes simples pour commencer à lutter contre le gaspillage
              alimentaire
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Créez votre offre",
                description:
                  "Photographiez vos surplus, ajoutez une description et fixez la date limite de récupération.",
                icon: "📸",
                color: "from-green-400 to-green-500",
              },
              {
                step: "02",
                title: "Gérez les demandes",
                description:
                  "Recevez les demandes de réservation et choisissez les bénéficiaires selon vos critères.",
                icon: "💬",
                color: "from-blue-400 to-blue-500",
              },
              {
                step: "03",
                title: "Organisez la remise",
                description:
                  "Coordonnez le point de rendez-vous et l'heure de récupération avec le bénéficiaire.",
                icon: "🤝",
                color: "from-purple-400 to-purple-500",
              },
            ].map((item, index) => (
              <div key={index} className="relative group">
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 transform group-hover:-translate-y-2">
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-r ${item.color} text-white text-2xl mb-6`}
                  >
                    {item.icon}
                  </div>
                  <div className="text-sm font-bold text-gray-400 mb-2">
                    ÉTAPE {item.step}
                  </div>
                  <h3 className="text-lg   font-bold text-gray-900 mb-4">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section Avantages - Design moderne */}
      <div className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Pourquoi choisir FoodShared ?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Une plateforme conçue pour maximiser l'impact social et
                environnemental
              </p>

              <div className="space-y-6">
                {[
                  {
                    title: "Impact environnemental",
                    description:
                      "Réduisez votre empreinte carbone en évitant que la nourriture finisse à la poubelle",
                    icon: "🌍",
                  },
                  {
                    title: "Solidarité locale",
                    description:
                      "Aidez les familles de votre quartier tout en créant du lien social",
                    icon: "❤️",
                  },
                  {
                    title: "Économies réelles",
                    description:
                      "Accédez à des produits de qualité gratuitement ou à prix réduit",
                    icon: "💰",
                  },
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-xl">
                      {benefit.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {benefit.title}
                      </h3>
                      <p className="text-gray-600">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <img
                src="./hero.jpg"
                alt="Communauté FoodShare"
                className="w-full rounded-2xl shadow-xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-green-500 text-white p-6 rounded-2xl shadow-lg">
                <div className="text-2xl font-bold">2.3 tonnes</div>
                <div className="text-green-100">de nourriture sauvée</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section CTA finale */}
      <div className="relative py-20 sm:py-24 bg-gradient-to-r from-green-600 to-green-700">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Prêt à faire la différence ?
          </h2>
          <p className="text-xl text-green-100 mb-10 max-w-2xl mx-auto">
            Rejoignez des milliers d'utilisateurs qui luttent déjà contre le
            gaspillage alimentaire
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-green-600 font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              Créer mon compte gratuitement
            </Link>
            <Link
              to="/offres"
              className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-green-600 transition-all duration-300"
            >
              Explorer les offres
            </Link>
          </div>

          <p className="text-green-200 text-sm mt-6">
            Inscription gratuite • Pas d'engagement • Impact immédiat
          </p>
        </div>
      </div>
    </div>
  );
}
