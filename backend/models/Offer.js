const mongoose = require("mongoose");

const offerSchema = mongoose.Schema(
  {
    titre: {
      type: String,
      required: [true, "Le titre est requis"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "La description est requise"],
    },
    image: {
      type: String,
      required: [true, "L'image est requise"],
    },
    dateExpiration: {
      type: Date,
      required: [true, "La date d'expiration est requise"],
    },
    localisation: {
      type: String,
      required: [true, "La localisation est requise"],
    },
    statut: {
      type: String,
      enum: ["disponible", "reserve"],
      default: "disponible",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reservedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Offer", offerSchema);
