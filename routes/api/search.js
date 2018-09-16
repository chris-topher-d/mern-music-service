const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Song model
const Song = require('../../models/Song');

// @route  GET api/search
// @desc   Get query matches
// @access Public
router.get('/:query', (req, res) => {
  Song.find({ $or: [ { artist: { $regex: req.params.query, $options: 'i' } }, { title: { $regex: req.params.query, $options: 'i' } }, { album: { $regex: req.params.query, $options: 'i' } }]})
    .then(results => res.json(results))
    .catch(err => res.status(404).json({noitemsfound: 'No items found matching search criteria'}));
});

module.exports = router;
