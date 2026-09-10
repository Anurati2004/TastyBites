const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },

        description: {
            type: String
        },

        price: {
            type: Number,
            required: true
        },

        category: {
            type: String,
            required: true
        },

        availability: {
            type: Boolean,
            default: true
        },

        image: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("MenuItem", menuItemSchema);