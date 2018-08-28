const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const songs = require('./routes/api/songs');
const album = require('./routes/api/album');
const artist = require('./routes/api/artist');

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// DB config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Use routes
app.use('/api/songs', songs);
app.use('/api/album', album)
app.use('/api/artist', artist);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
