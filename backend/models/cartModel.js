import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    items: [
      {
        id: { type: Number, required: true }, // ID from the API
        title: { type: String, required: true },
        price: { type: Number, required: true },
        description: { type: String },
        image: { type: String },
        rating: {
          rate: { type: Number, default: 0 },
          count: { type: Number, default: 0 },
        },
        quantity: { type: Number, default: 1 }, // User-selected quantity
      },
    ],
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
