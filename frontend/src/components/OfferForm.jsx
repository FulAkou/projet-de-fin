import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";

export default function OfferForm({ offer: initialOffer, isEditing = false }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    titre: initialOffer?.titre || "",
    description: initialOffer?.description || "",
    image: initialOffer?.image || "",
    dateExpiration: initialOffer?.dateExpiration
      ? new Date(initialOffer.dateExpiration).toISOString().split("T")[0]
      : "",
    localisation: initialOffer?.localisation || "",
  });

  useEffect(() => {
    const fetchOffer = async () => {
      if (id) {
        try {
          const response = await api.get(`/offers/${id}`);
          const offerData = response.data;
          setFormData({
            titre: offerData.titre,
            description: offerData.description,
            image: offerData.image,
            dateExpiration: new Date(offerData.dateExpiration)
              .toISOString()
              .split("T")[0],
            localisation: offerData.localisation,
          });
        } catch (error) {
          console.error("Erreur lors du chargement de l'offre:", error);
          setError("Erreur lors du chargement de l'offre");
        }
      }
    };

    fetchOffer();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      if (id) {
        await api.put(`/offers/${id}`, formData);
      } else {
        await api.post("/offers", formData);
      }
      navigate("/mes-offres");
    } catch (error) {
      console.error("Erreur lors de la sauvegarde:", error);
      setError(
        "Une erreur est survenue lors de la sauvegarde de l'offre. Veuillez réessayer."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            {isEditing ? "Modifier l'offre" : "Créer une nouvelle offre"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="titre"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Titre
                </label>
                <input
                  type="text"
                  name="titre"
                  id="titre"
                  required
                  value={formData.titre}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  placeholder="Entrez le titre de l'offre"
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Description
                </label>
                <textarea
                  name="description"
                  id="description"
                  rows={4}
                  required
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  placeholder="Décrivez votre offre en détail"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                <div>
                  <label
                    htmlFor="image"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    URL de l'image
                  </label>
                  <input
                    type="url"
                    name="image"
                    id="image"
                    required
                    value={formData.image}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                    placeholder="https://exemple.com/image.jpg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="dateExpiration"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Date d'expiration
                  </label>
                  <input
                    type="date"
                    name="dateExpiration"
                    id="dateExpiration"
                    required
                    value={formData.dateExpiration}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="localisation"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Localisation
                  </label>
                  <input
                    type="text"
                    name="localisation"
                    id="localisation"
                    required
                    value={formData.localisation}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                    placeholder="Ville, adresse..."
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-6">
              {error && (
                <div className="text-red-600 text-sm mb-4">{error}</div>
              )}
              <button
                type="button"
                onClick={() => navigate("/mes-offres")}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                disabled={isLoading}
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                {isLoading
                  ? "Chargement..."
                  : isEditing
                  ? "Modifier l'offre"
                  : "Créer l'offre"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
