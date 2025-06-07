import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import OfferCard from "../components/OfferCard";

export default function MyOffers() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMyOffers = async () => {
      try {
        const response = await api.get("/offers/me");
        setOffers(response.data);
        setLoading(false);
      } catch (err) {
        setError("Erreur lors du chargement de vos offres");
        setLoading(false);
      }
    };

    fetchMyOffers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette offre ?")) {
      try {
        await api.delete(`/offers/${id}`);
        setOffers(offers.filter((offer) => offer._id !== id));
      } catch (err) {
        setError("Erreur lors de la suppression de l'offre");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Mes offres</h1>
          <Link
            to="/creer-offre"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Créer une offre
          </Link>
        </div>

        {offers.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">
              Vous n'avez pas encore créé d'offres.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {offers.map((offer) => (
              <div key={offer._id} className="relative">
                <OfferCard offer={offer} />
                <div className="absolute top-4 right-4 space-x-2">
                  <Link
                    to={`/modifier-offre/${offer._id}`}
                    className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
                  >
                    Modifier
                  </Link>
                  <button
                    onClick={() => handleDelete(offer._id)}
                    className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
