import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-green-50 to-green-100 border-t-2 border-green-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* À propos */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-green-800">FoodShare</h3>
            <p className="text-green-700 text-sm">
              Notre mission est de réduire le gaspillage alimentaire en
              connectant les personnes qui ont des surplus de nourriture avec
              ceux qui en ont besoin.
            </p>
          </div>

          {/* Liens rapides */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-green-800 m">
              Liens rapides
            </h3>
            <div className="flex items-center justify-center space-x-2">
              <Link
                to="/"
                className="text-green-700 hover:text-green-600 text-sm hover:underline font-semibold transition-colors duration-200"
              >
                Accueil
              </Link>
              <Link
                to="/offres"
                className="text-green-700 hover:text-green-600 text-sm hover:underline font-semibold transition-colors duration-200"
              >
                Offres
              </Link>

              <Link
                to="/mes-offres"
                className="text-green-700 hover:text-green-600 text-sm hover:underline font-semibold transition-colors duration-200"
              >
                Mes offres
              </Link>

              <Link
                to="/mes-reservations"
                className="text-green-700 hover:text-green-600 text-sm hover:underline font-semibold transition-colors duration-200"
              >
                Mes réservations
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-green-200">
          <p className="text-center text-green-700 text-sm">
            © {new Date().getFullYear()} FoodShare. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
