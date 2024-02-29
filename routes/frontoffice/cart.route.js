const express = require("express");
const router = express.Router();
const cartController = require("../../controllers/cart.controller");
const RendezVous = require("../../models/backOffice/rendezVousModel");
// Route pour afficher toutes les prestations
router.get("/employe", cartController.getAllEmploye);
router.get("/horaires", cartController.getHoraires);
router.post("/createrdv", cartController.createRdv);
router.get("/employe/:id", cartController.getEmployeById);
/*router.get("/rendezvous/dates", function (req, res) {
  // Utilisation de la méthode find() pour récupérer tous les rendez-vous
  RendezVous.find({}, "dateHeureRDV")
    .then((rendezvous) => {
      // Si aucun erreur, récupérer les dates de chaque rendez-vous

      const dates = rendezvous.map((rdv) => rdv.dateHeureRDV);
      // Envoyer les dates en réponse
      res.send(dates);
    })
    .catch((err) => {
      // Gérer l'erreur, par exemple en renvoyant une réponse d'erreur
      console.error("Erreur lors de la récupération des rendez-vous :", err);
      res.status(500).json({
        message: "Erreur serveur lors de la récupération des rendez-vous.",
      });
    });
});
router.get("/rendezvous", async (req, res) => {
  try {
    const rdvs = await RendezVous.find();
    res.json(rdvs);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des rendez-vous" });
  }
});*/
module.exports = router;
