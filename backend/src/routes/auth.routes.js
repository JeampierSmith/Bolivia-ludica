const express = require('express');
const router = express.Router();
const { login, registro, logout } = require('../controllers/auth.controller');

router.post('/login', login);
router.post('/registro', registro);
router.post('/logout', logout);

module.exports = router;
