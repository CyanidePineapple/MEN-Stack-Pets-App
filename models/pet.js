const mongoose = require("mongoose");

const petSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  age: { type: Number, required: true },
  hasOwner: { type: Boolean, default: false },
});

const Pet = mongoose.model("Pet", petSchema);
module.exports = Pet;
