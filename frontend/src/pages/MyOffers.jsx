import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api/axios";
import OfferCard from "../components/OfferCard";

export default function MyOffers() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [offerToDelete, setOfferToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

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

  const handleDelete = (id) => {
    setOfferToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!offerToDelete) return;

    setIsDeleting(true);
    try {
      // Appel à l'API pour supprimer l'offre
      await api.delete(`/offers/${offerToDelete}`);

      // Mise à jour de la liste des offres en filtrant l'offre supprimée
      setOffers((currentOffers) =>
        currentOffers.filter((offer) => offer._id !== offerToDelete)
      );

      toast.success("L'offre a été supprimée avec succès");
      setShowDeleteModal(false);
    } catch (err) {
      console.error("Erreur lors de la suppression:", err);
      toast.error("Erreur lors de la suppression de l'offre");
    } finally {
      setIsDeleting(false);
      setOfferToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setOfferToDelete(null);
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
                    to={`/mes-offres/modifier/${offer._id}`}
                    className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
                  >
                    Modifier
                  </Link>
                  <button
                    onClick={() => handleDelete(offer._id)}
                    className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal de confirmation de suppression */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Confirmer la suppression
            </h2>
            <p className="text-gray-600 mb-6">
              Êtes-vous sûr de vouloir supprimer cette offre ? Cette action est
              irréversible.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={cancelDelete}
                disabled={isDeleting}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
              >
                Annuler
              </button>
              <button
                onClick={confirmDelete}
                disabled={isDeleting}
                className="px-4 py-2 border border-transparent rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
              >
                {isDeleting ? "Suppression..." : "Supprimer"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
