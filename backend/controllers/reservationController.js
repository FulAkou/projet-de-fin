const Reservation = require("../models/Reservation");
const Offer = require("../models/Offer");

// @desc    Créer une nouvelle réservation
// @route   POST /api/reservations
// @access  Private
const createReservation = async (req, res) => {
  try {
    const { offerId, nom, lieuLivraison, message } = req.body;

    // Vérifier si l'offre existe
    const offer = await Offer.findById(offerId);
    if (!offer) {
      return res.status(404).json({ message: "Offre non trouvée" });
    }

    // Vérifier si l'offre est disponible
    if (offer.statut !== "disponible") {
      return res
        .status(400)
        .json({ message: "Cette offre n'est plus disponible" });
    }

    // Vérifier si l'utilisateur ne réserve pas sa propre offre
    if (offer.userId.toString() === req.user._id.toString()) {
      return res
        .status(400)
        .json({ message: "Vous ne pouvez pas réserver votre propre offre" });
    }

    // Vérifier si l'offre n'est pas expirée
    if (new Date(offer.dateExpiration) < new Date()) {
      return res.status(400).json({ message: "Cette offre est expirée" });
    }

    // Vérifier si l'utilisateur a déjà réservé cette offre
    const existingReservation = await Reservation.findOne({
      offerId: offer._id,
      userId: req.user._id,
    });

    if (existingReservation) {
      return res.status(400).json({
        message: "Vous avez déjà réservé cette offre",
      });
    }

    // Créer la réservation
    const reservation = await Reservation.create({
      userId: req.user._id,
      offerId: offer._id,
      nom,
      lieuLivraison,
      message,
    });

    // Mettre à jour le statut de l'offre
    offer.statut = "reserve";
    offer.reservedBy = req.user._id;
    await offer.save();

    res.status(201).json(reservation);
  } catch (error) {
    // Gérer spécifiquement l'erreur de clé dupliquée
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Vous avez déjà réservé cette offre",
      });
    }
    res.status(400).json({ message: error.message });
  }
};

// @desc    Récupérer les réservations de l'utilisateur connecté
// @route   GET /api/reservations/me
// @access  Private
const getMyReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find({
      userId: req.user._id,
    }).populate({
      path: "offerId",
      populate: {
        path: "userId",
        select: "nom email",
      },
    });
    res.json(reservations);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Annuler une réservation
// @route   DELETE /api/reservations/:id
// @access  Private
const cancelReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);

    if (!reservation) {
      return res.status(404).json({ message: "Réservation non trouvée" });
    }

    // Vérifier si l'utilisateur est le propriétaire de la réservation
    if (reservation.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Non autorisé" });
    }

    // Mettre à jour le statut de l'offre
    const offer = await Offer.findById(reservation.offerId);
    offer.statut = "disponible";
    offer.reservedBy = null;
    await offer.save();

    // Supprimer la réservation
    await Reservation.deleteOne({ _id: reservation._id });

    res.json({ message: "Réservation annulée" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createReservation,
  getMyReservations,
  cancelReservation,
};
