// routes/vandorRoute.js
const express = require('express');
const { AddFood, GetFoods, GetVandorProfile, UpdateVandorProfile, UpdateVandorService, VandorLogin } = require('../controllers/VandorController');

const routes = express.Router();

routes.post('/login', VandorLogin);

// Authenticate middleware for protecting routes
routes.get('/profile', GetVandorProfile);
routes.put('/profile', UpdateVandorProfile);
routes.put('/service', UpdateVandorService);

routes.post('/food', AddFood);
routes.get('/foods', GetFoods);

// Basic route to test the Vandor endpoint
routes.get('/', (req, res) => {
    res.json({ message: "Hello from Vandor" });
});

module.exports = routes; // Export the routes directly
