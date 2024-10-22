// routes/adminRoute.js
const express = require('express');
const { CreateVandor, GetVandors, GetVandorByID } = require('../controllers/AdminController');

const routes = express.Router();

routes.post('/vandor', CreateVandor);
routes.get('/vandors', GetVandors);
routes.get('/vandor/:id', GetVandorByID);

// Simple route for the root admin endpoint
routes.get('/', (req, res) => {
    res.json({ message: "Hello from admin" });
});

module.exports = routes; // Export the routes directly
