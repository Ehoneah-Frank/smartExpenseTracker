import express from 'express'
import dbConnection from './config/db.js';
import authRouter from './routes/authRoute.js';
import userRouter from './routes/userProfileRoute.js';
import expenseRouter from './routes/expenseRoute.js';
import categoryRouter from './routes/categoryRoute.js';
import budgetRouter from './routes/budgetRoute.js'
import cors from 'cors';
import expressOasGenerator from 'express-oas-generator';
import mongoose from 'mongoose';
import analyticsRouter from './routes/analyticsRoute.js';





// Connect to database
dbConnection();


// Create an express app
const trackerApp = express();
expressOasGenerator.handleResponses(trackerApp, {
    alwaysServeDocs: true,
    tags: ['Auth', 'User', 'Expense', 'Category', 'Budget', 'Analytics'],
    mongooseModels: mongoose.modelNames(),
});

// use middlewares

trackerApp.use(express.json());
trackerApp.use(cors({credentials: true, origin: '*'}));



// Routes
trackerApp.use( '/auth', authRouter);
trackerApp.use( '/user', userRouter);
trackerApp.use('/expenses', expenseRouter);
trackerApp.use( '/category', categoryRouter);
trackerApp.use( '/budget', budgetRouter)
trackerApp.use('/analytics', analyticsRouter)
expressOasGenerator.handleRequests();
trackerApp.use((req, res) => res.redirect('/api-docs/'));

const port = process.env.PORT || 8000;

// connect to a port
trackerApp.listen(port, () => {
    console.log(`App is listening on port ${port}`)
});