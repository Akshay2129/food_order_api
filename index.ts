import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { AdminRoute, VandorRoutes } from './routes';
import { MONGO_URL } from './config';

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
            //useNewUrlParser: true,
           // useUnifiedTopology: true
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
    console.clear();
    console.log('Server is running on port 8000');
});
