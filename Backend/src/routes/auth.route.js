const express = require("express")
const authController = require("../controllers/auth.controller")
const authMiddleware = require("../middleware/auth.middleware");
const authRouter = express.Router()

authRouter.post("/register",authController.registerController);

authRouter.post("/login",authController.loginController);

authRouter.get("/me", authMiddleware.identiUser, authController.meController);

authRouter.get("/logout",authMiddleware.identiUser,authController.logoutController)

module.exports = authRouter