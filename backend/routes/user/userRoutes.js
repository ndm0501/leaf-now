const express = require('express');
const router = express.Router();

const {getAllUsers, updateUser, getCurrentUser} = require("../../controller/userControllers");
const { verifyToken } = require('../../middleware/jwtAuth');

router.get("/", getAllUsers);
router.get("/current", verifyToken, getCurrentUser)
router.post('/',verifyToken, updateUser )

module.exports = router;


