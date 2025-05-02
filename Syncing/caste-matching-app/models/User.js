const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  caste: String,
  subCaste: String,
  job: String,
  assets: String,
  email: String,
  photoPath: String,
});

module.exports = mongoose.model('User', userSchema);
