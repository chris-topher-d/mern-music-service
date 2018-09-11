const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Playlist model
const Playlist = require('../../models/Playlist');

// Song model
const Song = require('../../models/Song');

// @route  GET api/playlists
// @desc   Get all playlists
// @access Public
router.get('/', (req, res) => {
  Playlist.find()
    .then(playlists => res.json(playlists))
    .catch(err => res.status(404).json({noplaylists: 'No playlists found'}));
});

// @route  GET api/playlists/:playlist
// @desc   Get playlist by id
// @access Public
router.get('/:playlistId', (req, res) => {
  Playlist.findById(req.params.playlistId)
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

// @route  DELETE api/playlists/:playlistId
// @desc   Delete playlist
// @access Public
router.delete('/:playlistId', (req, res) => {
  Playlist.findByIdAndRemove(req.params.playlistId, (err, data) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(data);
  });
});

// @route  POST api/playlists/:playlist/:songId
// @desc   Add new song to playlist
// @access Public
router.post('/:playlistId/:songId', (req, res) => {
  Playlist.findById(req.params.playlistId)
    .then(playlist => {
      if (playlist.tracks.findIndex(track => track._id.toString() === req.params.songId) === -1) {
        Song.findById(req.params.songId)
          .then(song => {
            if (song) {
              Playlist.update(
                { _id: req.params.playlistId },
                { $push: { tracks: song }}
              )
              .then(playlist => res.json(playlist));
            }
          })
          .catch(err => res.json(err));
      }
    })
    .catch(err => res.status(404).json(err));
});

// @route  DELETE api/playlists/:playlist/:songId
// @desc   Delete song from playlist
// @access Public
router.delete('/:playlistId/:songId', (req, res) => {
  Playlist.findById(req.params.playlistId)
    .then(playlist => {
      if (playlist) {
        let newPlaylist = playlist.tracks.filter(track => track._id.toString() !== req.params.songId);
        Playlist.update(
          { _id: req.params.playlistId },
          { tracks: newPlaylist },
          { multi: true }
        )
        .then(playlist => res.json(playlist));
      }
    })
    .catch(err => res.status(404).json(err));
});

module.exports = router;
