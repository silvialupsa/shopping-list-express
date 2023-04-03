const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

let Element = require('./model/Shopping.js');

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

mongoose.connect("mongodb+srv://lupsasilvia:W6ko7AW0cXonTuwz@cluster0.iqpguv4.mongodb.net/ShoppingListApp");

app.post('/api/shopping', (req, res) => {
    const title = req.body.title;
    const comment = req.body.comment;
    const createdAt = Date.now()
    const status = req.body.status;
    const quantity = req.body.quantity;
    const unit = req.body.unit
    const shoppingElementObject = new Element({ title, comment, createdAt, status, quantity, unit });
    console.log(shoppingElementObject)
    shoppingElementObject.save()
        .then(shoppingElementObject => res.json(shoppingElementObject))
        .catch(err => res.status(400).json({ success: false }));
})


app.get('/api/shopping', async (req, res) => {
    Element.find()
        .then((shopping) => res.json(shopping))
        .catch((err) => res.status(400).json({ success: false }));
});

app.delete('/api/shopping/:id', async (req, res) => {
    Element.findByIdAndDelete(req.params.id)
        .then((shopping) => res.json(shopping))
        .catch((err) => res.status(400).json({ success: false }));
})

app.patch('/api/shopping/:id', async (req, res) => {
    Element.findOneAndUpdate({ _id: req.params.id }, { status: req.body.status }, { new: true })
        .then((shopping) => res.json(shopping))
        .catch((err) => res.status(400).json({ success: false }));
});

app.listen(3000, () => console.log('Server started on port 3000'));
mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB!");
})