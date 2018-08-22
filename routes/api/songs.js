const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Songs model
const Song = require('../../models/Song');

// @route  GET api/songs
// @desc   Get all songs
// @access Public
router.get('/', (req, res) => {
  // res.json({msg: 'Show all songs'});
  Song.find()
    .sort({album: 1})
    .then(songs => res.json(songs))
    .catch(err => res.status(404).json({nosongs: 'No songs found'}));
});

router.post('/', (req, res) => {
  const newSong = new Song({
    title: req.body.title,
    artist: req.body.artist,
    album: req.body.album,
    genre: req.body.genre,
    duration: req.body.duration,
    path: req.body.path,
    albumOrder: req.body.albumOrder
  });

  newSong.save().then(song => res.json(song));
});

module.exports = router;
