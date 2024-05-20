const mongoose = require('mongoose');

const menuItemSchema = mongoose.model({
    itemId: String,
    name: String,
    price: Number,
    description: String,
    restaurantId: String
});

const menuItemModel = mongoose.model("menuItem", menuItemSchema);

module.exports = menuItemModel;