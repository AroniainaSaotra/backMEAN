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

exports.getRdvs = async (req, res) => {
  const userId = req.params.userId;
  try {
    const rdvs = await RendezVous.find({ id_utilisateur: userId }).maxTimeMS(20000);;
    res.json(rdvs);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des rendez-vous" });
  }
};
