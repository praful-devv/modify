const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const authRouter = require("./routes/auth.route")
const app = express()


app.use(express.json())

app.use(cors({credentials:true,
    origin:"http://localhost:5173",
  }),
);

app.use(cookieParser())

app.use("/api/auth",authRouter)

module.exports = app
