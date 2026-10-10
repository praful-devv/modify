const songModel = require("../models/song.model");
const id3 = require("node-id3");
const storageService = require("../services/storage.service");

const createSongController = async (req, res) => {
  
  const songBuffer = req.file.buffer;
  const tags = id3.read(songBuffer);
  const { mood } = req.body;

  const [songFile, posterFile] = await Promise.all([
    storageService.uploadFile({
      buffer: songBuffer,
      filename: tags.title + ".mp3",
      folder: "moodify-songs",
    }),
    storageService.uploadFile({
      buffer: tags.image.imageBuffer,
      filename: tags.title + ".jpeg",
      folder: "moodify-thumbails",
    }),
  ]);

  const song = await songModel.create({
    title: tags.title,
    url: songFile.url,
    poster: posterFile.url,
    mood: mood,
  });

  res.status(201).json({
    message: "song upload successfully",
    song,
  });
};

const getSongController = async(req,res)=>{

  const {mood} = req.query

  const song = await songModel.findOne({
    mood:mood
  })

  res.status(200).json({
    message: "get song",
    song,
  });

}

module.exports = { createSongController, getSongController };
