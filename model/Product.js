const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    min: [1, "Please enter a valid Price"],
    max: [10000, "Max Price should not exceed 10000"],
  },
  discountPercentage: {
    type: Number,
    min: [0, "Please enter a valid Value"],
    max: [99, "Discount should not exceed 99"],
  },
  rating: {
    type: Number,
    min: [0, "Please enter a valid Value"],
    max: [5, "Rating should not exceed 5"],
    default: 0,
  },
  stock: {
    type: Number,
    min: [0, "Please enter a valid Value"],
    default: 0,
  },
  brand: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
    required: true,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
});

const virtual = productSchema.virtual("id");
virtual.get(function () {
  return this._id;
});

productSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

exports.Product = mongoose.model("Product", productSchema);
