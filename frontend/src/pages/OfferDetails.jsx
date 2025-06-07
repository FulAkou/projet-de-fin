import {
  CalendarIcon,
  MapPinIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api/axios";

export default function OfferDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [offer, setOffer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isAuthenticated = localStorage.getItem("token");
  const [showModal, setShowModal] = useState(false);
  const [reservationData, setReservationData] = useState({
    nom: "",
    lieuLivraison: "",
    message: "",
  });

  useEffect(() => {
    const fetchOffer = async () => {
      try {
        const response = await api.get(`/offers/${id}`);
        setOffer(response.data);
        setLoading(false);
      } catch (err) {
        setError("Erreur lors du chargement de l'offre");
        setLoading(false);
      }
    };

    fetchOffer();
  }, [id]);

  const handleReservation = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setReservationData({
      nom: "",
      lieuLivraison: "",
      message: "",
    });
  };

  const handleReservationSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/reservations", {
        offerId: id,
        ...reservationData,
      });
      toast.success("Votre commande a été prise en compte !");
      handleModalClose();
      navigate("/mes-reservations");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Une erreur est survenue lors de la réservation"
      );
    }
  };

  const handleReservationChange = (e) => {
    const { name, value } = e.target;
    setReservationData((prev) => ({
      ...prev,
      [name]: value,
    }));
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

  if (!offer) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Offre non trouvée</p>
      </div>
    );
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
          <div className="lg:max-w-lg lg:self-end">
            <img
              src={offer.image}
              alt={offer.titre}
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
          </div>

          <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
              {offer.titre}
            </h1>

            <div className="mt-6 space-y-6">
              <p className="text-base text-gray-500">{offer.description}</p>

              <div className="space-y-4">
                <div className="flex items-center text-sm text-gray-500">
                  <CalendarIcon className="h-5 w-5 mr-2" />
                  <span>Expire le {formatDate(offer.dateExpiration)}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <MapPinIcon className="h-5 w-5 mr-2" />
                  <span>{offer.localisation}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <UserIcon className="h-5 w-5 mr-2" />
                  <span>Par {offer.userId.nom}</span>
                </div>
              </div>

              {isAuthenticated && offer.statut === "disponible" && (
                <button
                  onClick={handleReservation}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Réserver cette offre
                </button>
              )}

              {!isAuthenticated && (
                <p className="text-sm text-gray-500">
                  Connectez-vous pour réserver cette offre
                </p>
              )}

              {offer.statut === "reserve" && (
                <p className="text-sm text-red-600">
                  Cette offre a déjà été réservée
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal de réservation */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Finaliser votre réservation
            </h2>

            <form onSubmit={handleReservationSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="nom"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Votre nom
                </label>
                <input
                  type="text"
                  id="nom"
                  name="nom"
                  required
                  value={reservationData.nom}
                  onChange={handleReservationChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  placeholder="Entrez votre nom"
                />
              </div>

              <div>
                <label
                  htmlFor="lieuLivraison"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Lieu de livraison
                </label>
                <input
                  type="text"
                  id="lieuLivraison"
                  name="lieuLivraison"
                  required
                  value={reservationData.lieuLivraison}
                  onChange={handleReservationChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  placeholder="Adresse de livraison"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Message (optionnel)
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="3"
                  value={reservationData.message}
                  onChange={handleReservationChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  placeholder="Informations supplémentaires..."
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={handleModalClose}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                >
                  Confirmer la réservation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
