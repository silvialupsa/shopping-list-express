const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const elementSchema = new Schema({
    title: String,
    comment: String,
    quantity: Number,
    unit: String,
    createdAt: Date,
    status: Boolean,
});

const Element = model('Element', elementSchema);


module.exports = Element;
