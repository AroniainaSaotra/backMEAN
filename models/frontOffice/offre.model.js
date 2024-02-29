const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const OffreSchema = new mongoose.Schema({
  libelle_offre: String,
  description_offre: String,
  date_offre: Date,
});
module.exports = mongoose.model("offres", OffreSchema, "Offres");
