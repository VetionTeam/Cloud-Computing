const express = require('express');
const router = express.Router();
const { getvegetableByName, addvegetable, deleteVegetable, updateVegetable } = require('../controllers/vegetableController');
const { verifyToken } = require('../middlewares/authMiddleware'); // Sesuaikan dengan jalur middleware Anda

// Rute untuk mendapatkan sayur berdasarkan nama
router.get('/:name', verifyToken, getvegetableByName);

// Rute untuk menambahkan sayur
router.post('/', verifyToken, addvegetable);

// Rute untuk menghapus sayur berdasarkan nama
router.delete('/:name', verifyToken, deleteVegetable);

// Rute untuk memperbarui sayur berdasarkan nama
router.put('/:name', verifyToken, updateVegetable);

module.exports = router;
