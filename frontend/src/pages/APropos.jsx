import { Link } from "react-router-dom";

export default function APropos() {
  const stats = [
    {
      value: "10 000+",
      label: "Utilisateurs actifs",
      icon: (
        <svg
          className="h-8 w-8 text-green-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
    },
    {
      value: "50 000+",
      label: "Kilos de nourriture sauvés",
      icon: (
        <svg
          className="h-8 w-8 text-green-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      value: "15 000+",
      label: "Offres publiées",
      icon: (
        <svg
          className="h-8 w-8 text-green-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-green-800 mb-4">
            À propos de FoodShare
          </h1>
          <p className="text-lg text-green-700 max-w-3xl mx-auto">
            Notre mission est de lutter contre le gaspillage alimentaire en
            connectant les personnes qui ont des surplus de nourriture avec ceux
            qui en ont besoin.
          </p>
        </div>

        {/* Notre histoire */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
          <h2 className="text-2xl font-bold text-green-800 mb-6">
            Notre histoire
          </h2>
          <div className="prose prose-green max-w-none">
            <p className="text-green-700 mb-4">
              FoodShare est né d'un constat simple : chaque année, des millions
              de tonnes de nourriture sont gaspillées en France, alors que de
              nombreuses personnes peinent à se nourrir correctement.
            </p>
            <p className="text-green-700 mb-4">
              En 2023, nous avons créé FoodSaver avec l'objectif de mettre en
              relation les personnes qui ont des surplus alimentaires
              (particuliers, commerçants, restaurants) avec celles qui
              souhaitent acheter ces produits à prix réduit.
            </p>
            <p className="text-green-700">
              Aujourd'hui, notre communauté ne cesse de grandir, et nous sommes
              fiers de contribuer à la réduction du gaspillage alimentaire tout
              en créant des liens entre les personnes.
            </p>
          </div>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-8 text-center transform hover:scale-105 transition-transform duration-200"
            >
              <div className="flex justify-center mb-4">{stat.icon}</div>
              <div className="text-3xl font-bold text-green-800 mb-2">
                {stat.value}
              </div>
              <div className="text-green-700">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Appel à l'action */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-green-800 mb-4">
            Rejoignez notre mission
          </h2>
          <p className="text-green-700 mb-8">
            Ensemble, nous pouvons faire la différence dans la lutte contre le
            gaspillage alimentaire.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              to="/register"
              className="bg-green-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
            >
              S'inscrire
            </Link>
            <Link
              to="/contact"
              className="bg-white text-green-600 px-8 py-3 rounded-lg font-medium border-2 border-green-600 hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
            >
              Nous contacter
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
