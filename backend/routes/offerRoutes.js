const express = require("express");
const router = express.Router();
const {
  createOffer,
  getOffers,
  getMyOffers,
  getOfferById,
  updateOffer,
  deleteOffer,
} = require("../controllers/offerController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(getOffers).post(protect, createOffer);

router.get("/me", protect, getMyOffers);

router
  .route("/:id")
  .get(getOfferById)
  .put(protect, updateOffer)
  .delete(protect, deleteOffer);

module.exports = router;
