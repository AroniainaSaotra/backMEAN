const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const PaiementSchema = new mongoose.Schema({
  id: String,
  id_rdv: ObjectId,
  id_utilisateur: ObjectId,
  montant: Number,
  cardcode: Number,
});
module.exports = mongoose.model("paiement", PaiementSchema, "Paiement");
