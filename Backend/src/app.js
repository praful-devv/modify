const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const authRouter = require("./routes/auth.route");
const SongRouter = require("../src/routes/song.route");
const app = express();

app.use(express.json());

app.use(cors({ credentials: true, origin: "http://localhost:5173" }));

app.use(cookieParser());

app.use(express.static(path.join(__dirname, "..", "public")));

app.use("/api/auth", authRouter);
app.use("/api/song", SongRouter);

module.exports = app;
