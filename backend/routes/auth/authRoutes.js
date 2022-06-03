const express = require('express');

const {
    registerUser,
    loginUser
  } = require("../../controller/userControllers");

const router = express.Router();

router.get('/register-test', (req, res) => {
    return res.status(200).json({message: "Register runnig"})
})
router.post('/register-user', registerUser);
router.post('/login-user', loginUser);

module.exports = router;