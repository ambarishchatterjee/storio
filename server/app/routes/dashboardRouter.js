const express = require("express");
const dashController = require("../controllers/dashboardController");
const upload = require("../helpers/imageUpload");
const {AuthCheck} = require("../middleware/auth");

const router = express.Router();

router.get('/dashboard', AuthCheck,  dashController.getDashboard);

router.put("/update", AuthCheck, dashController.updateUser);
router.put("/change-password", AuthCheck, dashController.changepassword);

module.exports = router;
