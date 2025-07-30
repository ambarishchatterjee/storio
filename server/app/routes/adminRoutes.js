// routes/adminRoutes.js
const express = require("express");
const router = express.Router();
const { getAllUsers } = require("../controllers/adminController");
const {AuthCheck, AdminCheck} = require("../middleware/auth");

router.get("/users", AuthCheck, getAllUsers);

// PATCH /api/admin/user/:id/status
router.patch('/user/:id/status', AuthCheck, AdminCheck, async (req, res) => {
  try {
    const { isActive } = req.body;
    await User.findByIdAndUpdate(req.params.id, { isActive });
    res.json({ message: `User has been ${isActive ? 'unbanned' : 'banned'}` });
  } catch (err) {
    res.status(500).json({ message: 'Error updating user status' });
  }
});

// PATCH /api/admin/user/:id/plan
router.patch('/user/:id/plan', AuthCheck, AdminCheck, async (req, res) => {
  try {
    const { plan } = req.body;

    let storageLimit = 10 * 1024 * 1024 * 1024;
    if (plan === 'pro') storageLimit = 50 * 1024 * 1024 * 1024;
    if (plan === 'premium') storageLimit = 100 * 1024 * 1024 * 1024;

    await User.findByIdAndUpdate(req.params.id, { plan, storageLimit });
    res.json({ message: `User plan updated to ${plan}` });
  } catch (err) {
    res.status(500).json({ message: 'Error updating user plan' });
  }
});



module.exports = router;
