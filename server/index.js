const express = require('express');
const keys = require('./config/keys');
const mongoose = require('mongoose');
const fileFunctions = require('./file/fileFunctions.js');
require('./models/User');
require('./services/passport');

const fs = require('fs');
const app = express();

require('./routes/authRoutes')(app);

//connect to mLab with mongoose
mongoose.connect(keys.mongoUrl);

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'mLab connection error'));

const PORT = process.env.PORT || 5000;
app.listen(5000);
