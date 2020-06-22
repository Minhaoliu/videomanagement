var express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Video = require('../models/video')

// connection string
const db = "mongodb://localhost:27017/videoplayer";
mongoose.Promise = global.Promise;
mongoose.connect(db, function(err){
  if(err) {
    console.log("Error! " + err);
  }
});

router.get('/videos', function(req, res){
  console.log("Get Request for all videos");
  Video.find({})
        .exec(function(err, videos){
          if(err) {
            console.log("Error Retrieving Videos");
          } else {
            res.json(videos);
          }
        });
});


router.get('/videos/:id', function(req, res){
  console.log("Get Request for a single video");
  Video.findById(req.params.id)
        .exec(function(err, video){
          if(err) {
            console.log("Error Retrieving Videos");
          } else {
            res.json(video);
          }
        });
});

router.post('/video', function(req, res){
  console.log("Post a video");
  var newVideo = new Video();
  newVideo.title = req.body.title;
  newVideo.url = req.body.url;
  newVideo.description = req.body.description;

  newVideo.save(function(err, insertedVideo){
    if(err) {
      console.log("Error Saving Video");
    } else {
      res.json(insertedVideo);
    }
  })

});

router.put('/video/:id', function(req, res){
  console.log("Updating a video");

  Video.findByIdAndUpdate(req.params.id,
    {
      $set:{
        title: req.body.title,
        url: req.body.url,
        description: req.body.description
      }
    },
    {
      new: true
    },

      function(err, updatedVideo){
        if(err){
          res.send("Error updating the video")
        } else {
          res.json(updatedVideo);
        }
      }
  );

});

router.delete('/video/:id', function(req, res){
  console.log("Deleting a video");
  Video.findByIdAndRemove(req.params.id, function(err, deletedVideo){
    if(err){
      res.send("Error deleting the video")
    } else {
      res.json(deletedVideo);
    }
  });

});



module.exports = router;
