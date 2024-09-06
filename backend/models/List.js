// backend/models/List.js
const mongoose = require('mongoose');

const ListSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    name: {
        type: String,
        required: [true, 'List name is required'],
    },
    items: [
        {
            tmdbId: {
                type: Number,
                required: true,
            },

            mediaType: {
                type: String,
                enum: ['movie', 'tv'],
                required: true,
            },
            addedAt: {
                type: Date,
                default: Date.now,
            },
        },
    ],
}, { timestamps: true });

module.exports = mongoose.model('List', ListSchema);
