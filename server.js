const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const methodOverride = require("method-override");
const petController = require('./controllers/petController'); 

dotenv.config();

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static('public'));

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

app.use('/pets', petController);

app.get('/', (req, res) => {
    res.redirect('/pets'); 
});

app.listen(port, () => {
    console.log(`Server is running at ${port}`);
});
