const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    table: {
      type: Schema.Types.ObjectId,
      ref: "Table",
      required: true,
    },

    items: [
      {
        _id: false,

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
      min: 0,
    },

    status: {
      type: String,
      enum: ["open", "closed"],
      default: "open",
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

orderSchema.index(
  { table: 1 },
  {
    unique: true,
    partialFilterExpression: {
      status: "open",
    },
  },
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
