import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api/axios";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("token");

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (isAuthenticated) {
        try {
          const response = await api.get("/auth/profile");
          setUserName(response.data.nom);
        } catch (error) {
          console.error("Erreur lors de la récupération du profil:", error);
        }
      }
    };

    fetchUserProfile();
  }, [isAuthenticated]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Déconnexion réussie");
    navigate("/");
  };

  return (
    <nav className="bg-gradient-to-r from-green-50 to-green-100 shadow-lg border-b-2 border-green-200">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16 lg:h-18">
          {/* Logo et liens principaux */}
          <div className="flex items-center  space-x-2 sm:space-x-4 lg:space-x-8">
            <Link to="/" className="flex-shrink-0 flex items-center group">
              <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-700 group-hover:text-green-800 transition-colors duration-200">
                FoodShare
              </span>
            </Link>
            <div className="hidden md:flex md:space-x-4 lg:space-x-8">
              <Link
                to="/"
                className="text-green-800 inline-flex items-center px-2 lg:px-3 py-1 text-sm lg:text-base font-medium border-b-2 border-transparent hover:border-green-500 hover:text-green-600 transition-all duration-200"
              >
                Accueil
              </Link>
              <Link
                to="/offres"
                className="text-green-800 inline-flex items-center px-2 lg:px-3 py-1 text-sm lg:text-base font-medium border-b-2 border-transparent hover:border-green-500 hover:text-green-600 transition-all duration-200"
              >
                Offres
              </Link>
              <Link
                to="/comment-ca-marche"
                className="text-green-800 inline-flex items-center px-2 lg:px-3 py-1 text-sm lg:text-base font-medium border-b-2 border-transparent hover:border-green-500 hover:text-green-600 transition-all duration-200"
              >
                Comment ca marche ?
              </Link>
              <Link
                to="/a-propos"
                className="text-green-800 inline-flex items-center px-2 lg:px-3 py-1 text-sm lg:text-base font-medium border-b-2 border-transparent hover:border-green-500 hover:text-green-600 transition-all duration-200"
              >
                À propos
              </Link>
            </div>
          </div>

          {/* Bouton hamburger pour mobile */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-green-600 hover:text-green-700 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500 transition-all duration-200"
            >
              <span className="sr-only">Ouvrir le menu</span>
              {/* Icône hamburger */}
              <svg
                className={`${isMenuOpen ? "hidden" : "block"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {/* Icône X */}
              <svg
                className={`${isMenuOpen ? "block" : "hidden"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Menu desktop */}
          <div className="hidden md:flex md:items-center md:space-x-2 lg:space-x-4">
            {isAuthenticated ? (
              <>
                <Link
                  to="/mes-offres"
                  className="text-green-800 hover:text-green-600 hover:bg-green-200 px-3 py-2 rounded-lg text-sm lg:text-base font-medium transition-all duration-200"
                >
                  Mes offres
                </Link>
                <Link
                  to="/mes-reservations"
                  className="text-green-800 hover:text-green-600 hover:bg-green-200 px-3 py-2 rounded-lg text-sm lg:text-base font-medium transition-all duration-200"
                >
                  Mes réservations
                </Link>
                {/* Menu déroulant utilisateur */}
                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center space-x-2 text-green-800 hover:text-green-600 hover:bg-green-200 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200"
                  >
                    <span className="text-sm lg:text-base font-medium max-w-24 lg:max-w-32 truncate">
                      {userName}
                    </span>
                    <svg
                      className={`h-4 w-4 lg:h-5 lg:w-5 transition-transform duration-200 ${
                        isDropdownOpen ? "transform rotate-180" : ""
                      }`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  {/* Menu déroulant */}
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg bg-white ring-1 ring-green-200 ring-opacity-80 z-50">
                      <div className="py-1">
                        <button
                          onClick={() => {
                            handleLogout();
                            setIsDropdownOpen(false);
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-green-800 hover:bg-green-50 hover:text-green-600 transition-colors duration-200"
                        >
                          Déconnexion
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="bg-green-600 text-white px-4 py-2 flex items-center gap-3 rounded-lg text-sm lg:text-base font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 shadow-md hover:shadow-lg transition-all duration-200"
                >
                  {/* {icons} */}
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  Connexion
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } md:hidden bg-white border-t border-green-200 shadow-lg`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link
            to="/"
            className="block px-3 py-2 rounded-lg text-base font-medium text-green-800 hover:bg-green-100 hover:text-green-600 transition-all duration-200"
            onClick={() => setIsMenuOpen(false)}
          >
            Accueil
          </Link>
          <Link
            to="/offres"
            className="block px-3 py-2 rounded-lg text-base font-medium text-green-800 hover:bg-green-100 hover:text-green-600 transition-all duration-200"
            onClick={() => setIsMenuOpen(false)}
          >
            Offres
          </Link>
          {isAuthenticated ? (
            <>
              <Link
                to="/mes-offres"
                className="block px-3 py-2 rounded-lg text-base font-medium text-green-800 hover:bg-green-100 hover:text-green-600 transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Mes offres
              </Link>
              <Link
                to="/mes-reservations"
                className="block px-3 py-2 rounded-lg text-base font-medium text-green-800 hover:bg-green-100 hover:text-green-600 transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Mes réservations
              </Link>
              <div className="border-t border-green-200 pt-2 mt-2">
                <div className="px-3 py-2 text-base font-medium text-green-700 bg-green-50 rounded-lg mx-1">
                  {userName}
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 mt-1 rounded-lg text-base font-medium text-green-800 hover:bg-green-100 hover:text-green-600 transition-all duration-200"
                >
                  Déconnexion
                </button>
              </div>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="block px-3 py-2 rounded-lg text-base font-medium text-green-800 hover:bg-green-100 hover:text-green-600 transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Connexion
              </Link>
              <Link
                to="/register"
                className="block mx-3 mt-2 px-4 py-2 rounded-lg text-base font-medium text-white bg-green-600 hover:bg-green-700 transition-all duration-200 text-center shadow-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Inscription
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
