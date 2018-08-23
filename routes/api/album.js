const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Song model
const Song = require('../../models/Song');

router.get('/:album', (req, res) => {
  console.log(req.params.album);
  Song.find({ album: req.params.album })
    .then(album => res.json(album))
    .catch(err => res.status(404).json({noalbum: 'Album not found'}));
});

module.exports = router;
