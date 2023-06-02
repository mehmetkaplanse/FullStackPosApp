const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema(
    {
        title: { type: String, required: true},
        img: { type: String, required: true},
        price: { type: Number, required: true},
        category: { type: String, required: true}
    },
    {timestamps: true}
)

const Products = mongoose.model("products", ProductSchema);

module.exports = Products;