const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const authRouter = require("./routes/auth.route");
const SongRouter = require("../src/routes/song.route");
const app = express();

app.use(express.json());

app.use(
  cors({ credentials: true, origin: "https://modify-c3x9.onrender.com/" }),
);

app.use(cookieParser());

app.use(express.static(path.join(__dirname, "..", "public")));

app.use("/api/auth", authRouter);
app.use("/api/song", SongRouter);

app.get("/{*splat}", (req, res, next) => {
  if (req.path.startsWith("/api/")) {
    return next();
  }

  res.sendFile(path.join(publicPath, "index.html"));
});

module.exports = app;
