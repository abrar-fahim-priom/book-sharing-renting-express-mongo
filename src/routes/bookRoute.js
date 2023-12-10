const router = require("express").Router();
const cors = require('cors');

// const allowedOrigins = ['http://localhost:5501','http://localhost:8080','http://localhost:5500','http://localhost:5503','http://127.0.0.1:5502/' ,'http://127.0.0.1:5501'];

const allowedOrigins = ['http://127.0.0.1:5501'];

router.use(cors({
  credentials: true,
  origin: allowedOrigins,
}));


const {
	getAllBookController,
	addBookController,
	getSingleBookController,
	deleteBookController,
    rentBookController,
	updateBookController,
} = require("../controllers/bookController");
const { isAdmin, isLoggedIn } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/upload");

router.options("/:bookId", cors());  

router.get("/", getAllBookController);
router.post("/", isLoggedIn, upload.single("image"), addBookController);
router.get("/:bookId", getSingleBookController);
router.patch("/rent/:bookId", isLoggedIn, rentBookController);
router.delete("/:bookId", isLoggedIn, isAdmin, deleteBookController);
router.get("/:bookId", isLoggedIn, isAdmin, deleteBookController);
router.put("/:id",updateBookController)
module.exports = router;
