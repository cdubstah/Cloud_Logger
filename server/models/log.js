const mongoose = require('mongoose');
const { Schema } = mongoose;

const logSchema = new Schema({
  userId: String,
  logFile: Buffer
  //numOfFiles: Number
});

mongoose.model('Log', logSchema);
