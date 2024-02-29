const RendezVous = require("../models/backOffice/rendezVousModel");

const getRdvHistory = async (req, res) => {
  const userId = req.params.userId;

  try {
    const rdvs = await RendezVous.find({ id_utilisateur: userId })
      .populate("id_detail")
      .populate("id_employe");
    // Renvoyez une réponse réussie
    res.json(rdvs);
  } catch (error) {
    // Gérez les erreurs
    res.status(500).json({
      error: "Erreur lors de la récupération de l'historique des rendez-vous",
    });
  }
};

module.exports = getRdvHistory;
