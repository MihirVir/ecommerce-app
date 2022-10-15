const router = require('express').Router();
const {verifyToken, verifyTokenAndAuth, verifyTokenAndAdmin} = require("./verifyToken");
const {updateUser, deleteUser, getUser, getAllUsers, stats} = require('../controllers/user_controller');
router.put("/:id", verifyToken, updateUser);
router.delete("/:id", verifyTokenAndAuth, deleteUser);
router.get("/find/:id", verifyTokenAndAdmin, getUser);
router.get("/", verifyTokenAndAdmin, getAllUsers)
router.get("/stats", stats)
module.exports = router;