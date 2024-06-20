const express = require('express');
const router = express.Router();
const { gettipsByName} = require('../controllers/tipsController');
const { verifyToken } = require('../middlewares/authMiddleware'); // Sesuaikan dengan jalur middleware Anda

// Rute untuk mendapatkan sayur berdasarkan nama
router.get('/:name', verifyToken, gettipsByName);

module.exports = router;