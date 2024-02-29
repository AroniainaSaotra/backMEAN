const employeService = require("../models/backOffice/employeModel");
const genererHoraires = require("../services/horaire.service");
const RendezVous = require("../models/backOffice/rendezVousModel");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const getAllEmploye = async (req, res) => {
  try {
    const Employe = await employeService.find();
    return res.status(200).json({ Employe });
  } catch (error) {
    console.error("Erreur lors de la récupération des Employe :", error);
    return res.status(500).json({
      message: "Erreur serveur lors de la récupération des Employe.",
    });
  }
};
async function getHoraires(req, res) {
  const { jour, idEmploye } = req.query;
  const employe = await Employe.findById(idEmploye);
  if (!employe) {
    return res.status(404).send("Employé non trouvé");
  }
  const rendezVous = await RendezVous.find({ id_employe: idEmploye });
  const jourDate = new Date(jour);

  // Générer les horaires disponibles
  const horaires = genererHoraires(jourDate, employe, rendezVous);

  // Envoyer les horaires en réponse
  res.json(horaires);
}
const createRdv = async (req, res) => {
  try {
    const { id_utilisateur, id_employe, id_detail, dateHeureRDV, statut } =
      req.body;

    // Créer un nouveau rendez-vous
    console.log(dateHeureRDV);

    const newRdv = new RendezVous({
      id_utilisateur: new ObjectId(id_utilisateur),
      id_employe: new ObjectId(id_employe),
      id_detail: new ObjectId(id_detail),
      dateHeureRDV: dateHeureRDV, // Convertir la date en objet Date
      statut: statut,
    });

    // Enregistrer le nouveau rendez-vous dans la base de données
    const savedRdv = await newRdv.save();

    // Envoyer une réponse avec le rendez-vous enregistré
    res.json(savedRdv);
  } catch (error) {
    console.error("Erreur lors de la création du rendez-vous :", error);
    res.status(500).json({
      message: "Erreur serveur lors de la création du rendez-vous.",
    });
  }
};
async function updateHoraires(nouveauRdv) {
  // Récupérer tous les rendez-vous existants
  const rdvs = await RendezVous.find();

  let horaires = [];
  let dateHeureRDV = new Date(nouveauRdv.dateHeureRDV);
  let heure = dateHeureRDV.getHours();
  const finHeure = heure + nouveauRdv.delai_detail / 60; // Convertir delai_detail en heures

  while (heure < finHeure) {
    let rdvExist = rdvs.find(
      (rdv) =>
        rdv.id_employe === nouveauRdv.id_employe &&
        new Date(rdv.dateRdv).getHours() === heure
    );

    if (rdvExist) {
      console.log("efa misy");
      // Si l'horaire existe déjà, ajoutez le délai de la prestation à l'horaire
      heure += rdvExist.delai_detail / 60; // Convertir delai_detail en heures
    } else {
      horaires.push(heure);
      heure += 15 / 60; // Ajoute 15 minutes converties en heures
    }
  }

  return horaires;
}

async function main() {
  let nouveauRdv = {
    dateHeureRDV: "2024-03-10T08:00:00.000+00:00", // Remplacez par la date/heure réelle
    id_employe: "65d8118c399e76ad23c8892d", // Remplacez par l'ID réel de l'employé
    delai_detail: 120 / 60, // Remplacez par le délai réel
  };

  let horaires = await updateHoraires(nouveauRdv);
  console.log(horaires);
}

main();
module.exports = {
  getAllEmploye,
  getHoraires,
  createRdv,
  getEmployeById: (req, res, next) => {
    const employeId = req.params.id.trim();
    employeService
      .findById(employeId)
      .then((employe) => {
        if (!employe) {
          return res.status(404).json({ message: "Employé non trouvé" });
        }
        res.status(200).json(employe);
      })
      .catch((error) => res.status(400).json({ error }));
  },
  updateHoraires,
};
