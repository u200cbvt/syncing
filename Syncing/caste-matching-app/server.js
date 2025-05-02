const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const User = require('./models/User');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

app.post('/submit', upload.single('photo'), async (req, res) => {
  try {
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      caste: req.body.caste,
      subCaste: req.body.subCaste,
      job: req.body.job,
      assets: req.body.assets,
      photoPath: req.file.path,
    });

    await newUser.save();
    res.send("Details submitted successfully.");
  } catch (error) {
    res.status(500).send("Error saving data");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
