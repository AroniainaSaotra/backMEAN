const RendezVous = require("../models/backOffice/rendezVousModel");
const Offre = require("../models/frontOffice/offre.model");

exports.getOffers = async (req, res) => {
  try {
    const offers = await Offre.find();
    res.json(offers);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des offres" });
  }
};


