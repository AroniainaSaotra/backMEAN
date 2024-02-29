const express = require("express");
const router = express.Router();
const notificationController = require("../../controllers/notification.controller");

router.get("/offres", notificationController.getOffers);
router.get("/rdvs/:userId", notificationController.getRdvs);

module.exports = router;
