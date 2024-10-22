const express = require('express');
const { AddFood, GetFoods, GetVandorProfile, UpdateVandorProfile, UpdateVandorService, VandorLogin } = require('../controllers/VandorController');
const { Authenticate } = require('../Middleware/Authenticate'); // Import the Authenticate middleware

const routes = express.Router();

// Login route - does not require authentication
routes.post('/login', VandorLogin);

// Protect the following routes with the Authenticate middleware
routes.get('/profile', Authenticate, GetVandorProfile);
routes.put('/profile', Authenticate, UpdateVandorProfile);
routes.put('/service', Authenticate, UpdateVandorService);

routes.post('/food', Authenticate, AddFood);
routes.get('/foods', GetFoods);

// Basic route to test the Vandor endpoint
routes.get('/', (req, res) => {
    res.json({ message: "Hello from Vandor" });
});

module.exports = routes; // Export the routes directly
