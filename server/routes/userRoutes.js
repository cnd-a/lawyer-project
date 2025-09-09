const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController.js');
const upload = require('../middleware/upload.js');

router.post('/register', upload.single("image"), controller.register);
router.post('/login', controller.login);

module.exports = router;
