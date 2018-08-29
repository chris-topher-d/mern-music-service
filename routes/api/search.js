const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Song model
const Song = require('../../models/Song');

router.get('/:query', (req, res) => {
  Song.find({$or: [{artist: req.params.query}, {title: req.params.query}, {album: req.params.query}]})
    .then(data => res.json(data))
    .catch(err => res.status(404).json({noitemsfound: 'No items found matching search criteria'}));
});

module.exports = router;
