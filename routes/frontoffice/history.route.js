const express = require("express");
const router = express.Router();
const getRdvHistory = require("../../controllers/history.controller");

router.get("/rdvHistory/:userId", getRdvHistory);

module.exports = router;
