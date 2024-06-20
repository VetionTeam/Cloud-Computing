const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const vegetablesRoutes = require('./routes/vegRoutes');
const funfactRoutes = require('./routes/factRoutes');
const tipsRoutes = require('./routes/tipsRoutes');
const { verifyToken } = require('./middlewares/authMiddleware');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware untuk mengizinkan penggunaan JSON
app.use(express.json());

// Routes untuk autentikasi
app.use('/auth', authRoutes);

//vegetable Routes
app.use('/vegetables', vegetablesRoutes);

//fun fact routes
app.use('/fact', funfactRoutes);

//tips routes
app.use('/tips', tipsRoutes);

// Rute terproteksi
app.get('/protected', verifyToken, (req, res) => {
    res.json({ message: 'Protected route', user: req.user });
});

// Handle 404 - Not Found
app.use((req, res) => {
    res.status(404).json({ error: 'Not Found' });
});

// Handle errors
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
