import { Link } from "react-router-dom";

export default function CommentCaMarche() {
  const steps = [
    {
      title: "Créez votre compte",
      description:
        "Inscrivez-vous gratuitement en quelques clics pour accéder à toutes les fonctionnalités de FoodSaver.",
      icon: (
        <svg
          className="h-12 w-12 text-green-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
    },
    {
      title: "Publiez vos offres",
      description:
        "Partagez vos surplus alimentaires en créant une offre avec photos, description et prix.",
      icon: (
        <svg
          className="h-12 w-12 text-green-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      ),
    },
    {
      title: "Réservez des offres",
      description:
        "Parcourez les offres disponibles et réservez celles qui vous intéressent.",
      icon: (
        <svg
          className="h-12 w-12 text-green-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      title: "Échangez en toute sécurité",
      description:
        "Organisez la livraison ou le retrait de vos produits en toute sécurité.",
      icon: (
        <svg
          className="h-12 w-12 text-green-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
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
            Comment ça marche ?
          </h1>
          <p className="text-lg text-green-700 max-w-3xl mx-auto">
            FoodSaver vous permet de lutter contre le gaspillage alimentaire en
            connectant les personnes qui ont des surplus de nourriture avec ceux
            qui en ont besoin. Voici comment ça fonctionne :
          </p>
        </div>

        {/* Étapes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-8 transform hover:scale-105 transition-transform duration-200"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 bg-green-100 rounded-full p-3">
                  {step.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-green-800 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-green-700">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Avantages */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
          <h2 className="text-2xl font-bold text-green-800 mb-6 text-center">
            Pourquoi utiliser FoodSaver ?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
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
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-green-800 mb-2">
                Économique
              </h3>
              <p className="text-green-700">
                Achetez des produits de qualité à prix réduit
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
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
              </div>
              <h3 className="text-lg font-semibold text-green-800 mb-2">
                Écologique
              </h3>
              <p className="text-green-700">
                Contribuez à réduire le gaspillage alimentaire
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
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
              </div>
              <h3 className="text-lg font-semibold text-green-800 mb-2">
                Communautaire
              </h3>
              <p className="text-green-700">Rejoignez une communauté engagée</p>
            </div>
          </div>
        </div>

        {/* Appel à l'action */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-green-800 mb-4">
            Prêt à commencer ?
          </h2>
          <p className="text-green-700 mb-8">
            Rejoignez FoodSaver dès aujourd'hui et commencez à lutter contre le
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
              to="/offres"
              className="bg-white text-green-600 px-8 py-3 rounded-lg font-medium border-2 border-green-600 hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
            >
              Voir les offres
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
