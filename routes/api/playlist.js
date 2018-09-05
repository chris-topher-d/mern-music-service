const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Playlist model
const Playlist = require('../../models/Playlist');

// @route  GET api/playlists
// @desc   Get all playlists
// @access Public
router.get('/', (req, res) => {
  Playlist.find()
    .then(playlists => res.json(playlists))
    .catch(err => res.status(404).json({noplaylists: 'No playlists found'}));
});

// @route  GET api/playlists/:playlist
// @desc   Get playlist by title
// @access Public
router.get('/:playlist', (req, res) => {
  Playlist.find({ title: req.params.playlist })
    .then(playlist => res.json(playlist))
    .catch(err => res.status(404).json({noplaylist: 'No playlist found'}));
});

// @route  POST api/playlists
// @desc   Create playlist
// @access Public
router.post('/', (req, res) => {
  const newPlaylist = new Playlist({
    title: req.body.playlist,
    tracks: []
  });

  newPlaylist.save()
    .then(playlist => res.json(playlist))
    .catch(err => res.status(400).json({error: 'Unable to create playlist'}));
});

module.exports = router;
