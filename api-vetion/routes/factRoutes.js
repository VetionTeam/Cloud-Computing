const express = require('express');
const router = express.Router();
const { getFact, addFact,  deleteFact, updateFact} = require('../controllers/factController');
const { verifyToken } = require('../middlewares/authMiddleware'); // Sesuaikan dengan jalur middleware Anda

// Rute untuk mendapatkan fun fact
router.get('/:judul_fakta', verifyToken, getFact);

// Rute untuk menambahkan fun fact
router.post('/', verifyToken, addFact);

// Rute untuk menghapus fun fact berdasarkan nama
router.delete('/:judul_fakta', verifyToken, deleteFact);

// Rute untuk memperbarui fun fact berdasarkan nama
router.put('/judul_fakta', verifyToken, updateFact);

module.exports = router;