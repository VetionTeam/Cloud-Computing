const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { userCollection } = require('../config/firestoreService');
require('dotenv').config();

const register = async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const userDoc = await userCollection.doc(email).get();
        if (userDoc.exists) {
            return res.status(400).send({message: 'User already exists'});
        }

        await userCollection.doc(email).set({
            username,
            email,
            password: hashedPassword,
        });

        res.status(201).send({message: 'User registered successfully'});
    } catch (error) {
        res.status(500).send({message: 'Internal Server Error'});
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const userDoc = await userCollection.doc(email).get();
        if (!userDoc.exists) {
            return res.status(400).send({message: 'User not found'});
        }

        const user = userDoc.data();
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).send({message: 'Invalid credentials'});
        }

        const token = jwt.sign({ email }, process.env.TOKEN_KEY, { expiresIn: '1h' });
        const refreshToken = jwt.sign({ email }, process.env.REFRESH_TOKEN_KEY);

        res.json({message:'Logged in Succesfully', token, refreshToken });
    } catch (error) {
        res.status(500).send({message: 'Internal Server Error'});
    }
};

const logout = (req, res) => {
    res.send({message: 'Logout successful'});
};

module.exports = {
    register,
    login,
    logout,
};
