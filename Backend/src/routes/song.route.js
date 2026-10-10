const express = require("express")
const songController = require("../controllers/song.controller")
const authMiddleware = require("../middleware/auth.middleware")
const upload = require("../middleware/upload.middleware")
const SongRouter = express.Router()

SongRouter.post("/",authMiddleware.identiUser,upload.single("song"),songController.createSongController)

SongRouter.get("/",authMiddleware.identiUser,songController.getSongController)

module.exports = SongRouter