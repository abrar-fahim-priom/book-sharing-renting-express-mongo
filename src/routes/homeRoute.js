const router = require("express").Router();
const homePageEjsLoader = require("../middlewares/homePageEjsLoader");

router.get("/",homePageEjsLoader(), (req, res) => {
	res.status(200).json({
		message: "Welcome to Book Sharing and Renting systems's api",
	});
});

module.exports = router;
