const mongoose = require("mongoose");
const offreSchema = mongoose.Schema({
  libelle_offre: String,
  description_offre: String,
  date_offre : Date,
  prix_offre: Number
});
module.exports = mongoose.model("offre", offreSchema, "Offre");
