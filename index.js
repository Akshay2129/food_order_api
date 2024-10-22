// index.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const AdminRoute = require('./routes/AdminRoutes'); // Import the admin route
const VandorRoutes = require('./routes/VandorRoutes'); // Import the vandor route
const { MONGO_URL } = require('./config/config'); // Import the MongoDB URL

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/admin', AdminRoute);
app.use('/vandor', VandorRoutes);

// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URL, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Could not connect to MongoDB:', err);
        process.exit(1);
    }
};

// Start the server
app.listen(8000, () => {
    connectDB();
    console.log('Server is running on port 8000');
});
