const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    productId: {
      type: mongoose.Types.ObjectId,
      ref: "product",
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    size: {
      required: false,
      type: String,
    },
    color: {
      required: false,
      type: String,
    },
    quantities: {
      required: true,
      type: Number,
    },
    address: {
      required: true,
      type: Map,
    },
    status: {
      default: false,
      type: Boolean,
    },
    received: {
      default: false,
      type: Boolean,
    },
    // review: {
    //   default: false,
    //   type: Boolean,
    // },
  },
  {
    timestamps: true,
  }
);

const OrderModel = mongoose.model("order", orderSchema);
module.exports = OrderModel;
