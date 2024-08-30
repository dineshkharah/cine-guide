require('dotenv').config();
require('express-async-errors');
const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Connect to MongoDB
const connectDB = require('./db/connect');

// Middleware
const authenticateUser = require('./middleware/authentication');

// Routers
const authRouter = require('./routes/auth');
// Additional routers (like watchlist, favorites) can be added here later

// Error Handlers
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use('/api/v1/auth', authRouter);



app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () =>
            console.log(`Server is listening on port ${port}...`)
        );
    } catch (error) {
        console.log(error);
    }
};

start();


// Example of protected routes (add your protected routes here)
// app.use('/api/v1/watchlist', authenticateUser, watchlistRouter);
// app.use('/api/v1/favorites', authenticateUser, favoritesRouter);