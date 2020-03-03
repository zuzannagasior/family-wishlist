const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const giftSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    gift: {
        type: String,
        required: true,
        trim: true
    },
    giftLink: {
        type: String,
        trim: true
    },
    whoBuysName: {
        type: String,
        trim: true
    }
}, {
    timestamps: true,
});

const Gift = mongoose.model('Gift', giftSchema);

module.exports = Gift;