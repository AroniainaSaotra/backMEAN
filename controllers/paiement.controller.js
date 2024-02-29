const Paiement = require("../models/frontOffice/paiement.model");

const handlePayment = async (req, res) => {
  const { cardCode, rdvId, userId, prestationPrixDetail } = req.body;

  try {
    // Créez un nouvel objet de paiement
    const payment = new Paiement({
      id: rdvId, // Utilisez rdvId pour le champ id
      id_rdv: rdvId,
      id_utilisateur: userId, // Utilisez userId pour le champ id_utilisateur
      montant: prestationPrixDetail, // Utilisez prestationPrixDetail pour le champ montant
      cardcode: cardCode, // Utilisez cardCode pour le champ cardcode
    });

    // Enregistrez l'objet de paiement dans la base de données
    const savedPayment = await payment.save();

    // Renvoyez une réponse réussie
    res.json(savedPayment);
  } catch (error) {
    // Gérez les erreurs
    res
      .status(500)
      .json({ error: "Erreur lors de l'enregistrement du paiement" });
  }
};

module.exports = handlePayment;
