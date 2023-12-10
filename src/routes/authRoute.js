const router = require("express").Router();

const cors = require('cors');

const allowedOrigins = ['http://localhost:5501','http://localhost:8080','http://localhost:5500','http://localhost:5503' ,'http://127.0.0.1:5501'];

router.use(cors({
  credentials: true,
  origin: allowedOrigins,
}));
const {
	loginController,
	logoutController,
	registerUserController,
	deleteUserController,
	getAllUsersController,
	getLoggedInUserController,
} = require("../controllers/authController");
const { isLoggedIn, isLoggedOut, isAdmin } = require("../middlewares/authMiddleware");
const { Router } = require("express");

router.get("/", isLoggedIn, isAdmin, getAllUsersController);
router.get("/logged-user", isLoggedIn, getLoggedInUserController);
router.post("/login", isLoggedOut, loginController);
router.post("/register", isLoggedOut, registerUserController);
router.post("/logout", isLoggedIn, logoutController);
router.delete("/delete/:userId", isLoggedIn, isAdmin, deleteUserController);

module.exports = router;
