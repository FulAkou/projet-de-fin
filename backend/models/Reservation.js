const mongoose = require("mongoose");

const reservationSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    offerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Offer",
      required: true,
    },
    nom: {
      type: String,
      required: [true, "Le nom est requis"],
    },
    lieuLivraison: {
      type: String,
      required: [true, "Le lieu de livraison est requis"],
    },
    message: {
      type: String,
      default: "",
    },
    dateReservation: {
      type: Date,
      default: Date.now,
    },
    statut: {
      type: String,
      enum: ["en_cours", "complete", "annule"],
      default: "en_cours",
    },
  },
  {
    timestamps: true,
  }
);

// Empêcher les réservations multiples pour la même offre
reservationSchema.index({ offerId: 1, userId: 1 }, { unique: true });

module.exports = mongoose.model("Reservation", reservationSchema);
