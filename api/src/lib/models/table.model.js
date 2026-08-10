const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tableSchema = new Schema({
  number: {
    type: Number,
    required: true,
    unique: true,
  },
  location: {
    type: String,
    required: true,
    enum: ["terraza", "sala", "otra"],
  },
  status: {
    type: String,
    required: true,
    enum: ["libre", "ocupada", "pendiente"],
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
    min: 1,
    max: 12,
  },
});

const Table = mongoose.model("Table", tableSchema);
module.exports = Table;
