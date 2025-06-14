import {
  CalendarIcon,
  MapPinIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

export default function MyReservations() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedReservationId, setSelectedReservationId] = useState(null);

  useEffect(() => {
    const fetchMyReservations = async () => {
      try {
        const response = await api.get("/reservations/me");
        setReservations(response.data);
        setLoading(false);
      } catch (err) {
        setError("Erreur lors du chargement de vos réservations");
        setLoading(false);
      }
    };

    fetchMyReservations();
  }, []);

  const handleCancelClick = (id) => {
    setSelectedReservationId(id);
    setShowModal(true);
  };

  const handleConfirmCancel = async () => {
    try {
      // Récupérer l'ID de l'offre avant de supprimer la réservation
      const reservationToCancel = reservations.find(
        (res) => res._id === selectedReservationId
      );
      if (!reservationToCancel) {
        throw new Error("Réservation non trouvée");
      }

      // Supprimer la réservation (le backend s'occupera de mettre à jour le statut de l'offre)
      await api.delete(`/reservations/${selectedReservationId}`);

      // Mettre à jour l'état local
      setReservations(
        reservations.filter((res) => res._id !== selectedReservationId)
      );
      setShowModal(false);
      setSelectedReservationId(null);
    } catch (err) {
      setError("Erreur lors de l'annulation de la réservation");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedReservationId(null);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
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
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Mes réservations
        </h1>

        {reservations.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">
              Vous n'avez pas encore de réservations.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {reservations.map((reservation) => (
              <div
                key={reservation._id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <img
                  src={reservation.offerId.image}
                  alt={reservation.offerId.titre}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {reservation.offerId.titre}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {reservation.offerId.description}
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-500">
                      <CalendarIcon className="h-5 w-5 mr-2" />
                      <span>
                        Réservé le {formatDate(reservation.dateReservation)}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPinIcon className="h-5 w-5 mr-2" />
                      <span>{reservation.offerId.localisation}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <UserIcon className="h-5 w-5 mr-2" />
                      <span>Par {reservation.offerId.userId.nom}</span>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between">
                    <Link
                      to={`/offres/${reservation.offerId._id}`}
                      className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
                    >
                      Voir les détails
                    </Link>
                    <button
                      onClick={() => handleCancelClick(reservation._id)}
                      className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                    >
                      Annuler
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal de confirmation */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                Confirmer l'annulation
              </h3>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-500"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <p className="text-gray-500 mb-6">
              Êtes-vous sûr de vouloir annuler cette réservation ?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
              >
                Non, garder
              </button>
              <button
                onClick={handleConfirmCancel}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md"
              >
                Oui, annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
