const express = require('express');

const {
    registerUser,
    loginUser,
    signout
  } = require("../../controller/userControllers");

const router = express.Router();

router.get('/register-test', (req, res) => {
    return res.status(200).json({message: "Register runnig"})
})
router.post('/register-user', registerUser);
router.post('/login-user', loginUser);
router.post('/signout', signout);

module.exports = router;