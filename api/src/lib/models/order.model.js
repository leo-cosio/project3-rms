const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    table: {
      type: Schema.Types.ObjectId,
      ref: "Table",
      required: true,
    },
    guests: {
      type: Number,
      required: true,
      min: 1,
      validate: {
        validator: async function (value) {
          const table = await mongoose.model("Table").findById(this.table);

          if (!table) return false;

          return value <= table.capacity;
        },
        message: "Numero de clientes excede la capacidad de la mesa",
      },
    },
    items: [
      {
        menuItem: {
          type: Schema.Types.ObjectId,
          ref: "Item",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],
    subtotal: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret._id;
        delete ret.__v;
        ret.id = doc.id;
        return ret;
      },
    },
  },
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
