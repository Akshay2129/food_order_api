const express = require('express');
const { AddFood, GetFoods, GetVandorProfile, UpdateVandorProfile, UpdateVandorService, VandorLogin } = require('../controllers/VandorController');
const { Authenticate } = require('../Middleware/Authenticate'); // Import the Authenticate middleware

const routes = express.Router();
// Configure multer for image uploads
const multer = require('multer');
const path = require('path');

// Define storage for uploaded images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Specify the directory to save images
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Use current timestamp to avoid file name collisions
    }
});

// Create the multer instance with the storage configuration
const upload = multer({ storage: storage });
// Login route - does not require authentication
routes.post('/login', VandorLogin);

// Protect the following routes with the Authenticate middleware
routes.get('/profile', Authenticate, GetVandorProfile);
routes.put('/profile', Authenticate, UpdateVandorProfile);
routes.put('/service', Authenticate, UpdateVandorService);

// Use multer to handle image uploads in the AddFood route
routes.post('/food', Authenticate, upload.array('images', 5), AddFood); // Allow multiple images (up to 5)

routes.get('/foods', GetFoods);

// Basic route to test the Vandor endpoint
routes.get('/', (req, res) => {
    res.json({ message: "Hello from Vandor" });
});

module.exports = routes; // Export the routes directly
