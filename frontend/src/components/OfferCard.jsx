import {
  CalendarIcon,
  MapPinIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export default function OfferCard({ offer }) {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={offer.image}
        alt={offer.titre}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {offer.titre}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {offer.description}
        </p>
        <div className="space-y-2">
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
        <div className="mt-4">
          <Link
            to={`/offres/${offer._id}`}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Voir les détails
          </Link>
        </div>
      </div>
    </div>
  );
}
