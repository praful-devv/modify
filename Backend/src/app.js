const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");

const authRouter = require("./routes/auth.route");
const SongRouter = require("./routes/song.route");

const app = express();

const publicPath = path.join(__dirname, "..", "public");

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    credentials: true,
    origin: "https://modify-c3x9.onrender.com",
  }),
);

app.use("/api/auth", authRouter);
app.use("/api/song", SongRouter);

app.use(express.static(publicPath));

app.get("/{*splat}", (req, res, next) => {
  if (req.path.startsWith("/api")) {
    return next();
  }

  res.sendFile(path.join(publicPath, "index.html"), (err) => {
    if (err) {
      console.error("Frontend fallback error:", err);
      next(err);
    }
  });
});

module.exports = app;
