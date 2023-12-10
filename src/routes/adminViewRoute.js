const router = require("express").Router();
const { getTotalUserCountController, getTotalRentCountController, getTopPointEarnerController } = require("../controllers/adminViewController");
const { isLoggedIn, isAdmin } = require("../middlewares/authMiddleware");

router.get("/total-users", isLoggedIn, isAdmin, getTotalUserCountController);
router.get("/total-rent", isLoggedIn, isAdmin, getTotalRentCountController);
router.get("/top-point-earner", isLoggedIn, isAdmin, getTopPointEarnerController);

module.exports = router;
