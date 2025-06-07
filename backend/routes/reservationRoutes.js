const express = require("express");
const router = express.Router();
const {
  createReservation,
  getMyReservations,
  cancelReservation,
} = require("../controllers/reservationController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, createReservation);
router.get("/me", protect, getMyReservations);
router.delete("/:id", protect, cancelReservation);

module.exports = router;
