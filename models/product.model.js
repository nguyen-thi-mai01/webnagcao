const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    breed: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    image: { type: String },
    category: { type: String, enum: ['Mèo Anh lông ngắn', 'Mèo Anh lông dài', 'Mèo Ba Tư', 'Mèo Munchkin'] }
});

module.exports = mongoose.model('Product', productSchema);