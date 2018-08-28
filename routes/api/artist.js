const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Song model
const Song = require('../../models/Song');

router.get('/:artist', (req, res) => {
  Song.find({ artist: req.params.artist })
    .then(artist => res.json(artist))
    .catch(err => res.status(404).json({noartist: 'Artist not found'}));
});

module.exports = router;
