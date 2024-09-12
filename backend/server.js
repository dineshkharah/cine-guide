require('dotenv').config();
require('express-async-errors');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Connect to MongoDB
const connectDB = require('./db/connect');

// Middleware
const authenticateUser = require('./middleware/authentication');

// Routers
const authRouter = require('./routes/auth');
const listRouter = require('./routes/listRoutes');
// Additional routers (like watchlist, favorites) can be added here later

// Error Handlers
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// Cors
app.use(cors({
    origin: `http://localhost:5000`, // allow to server to accept request from different origin
    credentials: true // allow session cookie from browser to pass through
}));


// Middleware to parse JSON
app.use(express.json());

// Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/lists', authenticateUser, listRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 4000;

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