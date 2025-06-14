const Offer = require("../models/Offer");

// @desc    Créer une nouvelle offre
// @route   POST /api/offers
// @access  Private
const createOffer = async (req, res) => {
  try {
    const { titre, description, image, dateExpiration, localisation } =
      req.body;

    const offer = await Offer.create({
      titre,
      description,
      image,
      dateExpiration,
      localisation,
      userId: req.user._id,
    });

    res.status(201).json(offer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Récupérer toutes les offres disponibles
// @route   GET /api/offers
// @access  Public
const getOffers = async (req, res) => {
  try {
    const offers = await Offer.find({
      statut: "disponible",
      dateExpiration: { $gt: new Date() },
    }).populate("userId", "nom email");

    res.json(offers);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Récupérer les offres de l'utilisateur connecté
// @route   GET /api/offers/me
// @access  Private
const getMyOffers = async (req, res) => {
  try {
    const offers = await Offer.find({ userId: req.user._id }).populate(
      "reservedBy",
      "nom email"
    );
    res.json(offers);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Récupérer une offre par son ID
// @route   GET /api/offers/:id
// @access  Public
const getOfferById = async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.id)
      .populate("userId", "nom email")
      .populate("reservedBy", "nom email");

    if (!offer) {
      return res.status(404).json({ message: "Offre non trouvée" });
    }

    res.json(offer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Mettre à jour une offre
// @route   PUT /api/offers/:id
// @access  Private
const updateOffer = async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.id);

    if (!offer) {
      return res.status(404).json({ message: "Offre non trouvée" });
    }

    // Vérifier si l'utilisateur est le propriétaire de l'offre
    if (offer.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Non autorisé" });
    }

    // Vérifier si l'offre n'est pas déjà réservée
    if (offer.statut === "reserve") {
      return res
        .status(400)
        .json({ message: "Impossible de modifier une offre réservée" });
    }

    const updatedOffer = await Offer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedOffer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Supprimer une offre
// @route   DELETE /api/offers/:id
// @access  Private
const deleteOffer = async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.id);

    if (!offer) {
      return res.status(404).json({ message: "Offre non trouvée" });
    }

    // Vérifier si l'utilisateur est le propriétaire de l'offre
    if (offer.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Non autorisé" });
    }

    await offer.remove();
    res.json({ message: "Offre supprimée" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createOffer,
  getOffers,
  getMyOffers,
  getOfferById,
  updateOffer,
  deleteOffer,
};
